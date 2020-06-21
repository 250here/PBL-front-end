import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../service/course.service';
import {NzCalendarMode, NzMessageService} from 'ng-zorro-antd';
import {TeacherService} from '../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Constants} from '../Constants';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  addTaskModel = {
    isVisible: false, task: {
      groupId: '',
      projectTaskId: '',
      taskName: '',
      taskStartTime: null,
      taskEndTime: null,
      taskDiscribe: '',
      isFinished: '0',
    },
  };
  date = new Date(2020, 6, 21);
  mode: NzCalendarMode = 'month';
  data: any;
  resultList: any = [];
  courseId;
  projectId;
  projectTaskId;
  groupId;
  pjGroupTaskList: any;
  projectList: any;
  pjTaskList: any;
  validateAddTaskForm!: FormGroup;
  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public constants: Constants,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId');
      this.projectId = +params.get('projectId');
      this.groupId = +params.get('groupId');
      // this.getPjGroupTaskInfo();
      this.getPjTask();
    });
    this.validateAddTaskForm = this.fb.group({
      taskName: [null],
      rangePickerTime: [[]],
      taskDiscribe: [null],
    });
  }

  getProjectList() {
    this.courseService.getAllProjectList(this.courseId)
      .subscribe((result: any) => {
        console.log(result);
        this.projectList = result.data;
      });
  }

  getPjGroupTaskInfo() {
    this.courseService.getPjGroupTaskInfo(this.projectId, this.groupId)
      .subscribe(
        (result: any) => {
          console.log(result);
          this.pjGroupTaskList = result.data;
        }
      );
  }

  getPjTask() {
    this.courseService.getPjTaskList(this.projectId)
      .subscribe(
        (result: any) => {
          console.log(result);
          this.pjTaskList = result.data;
          this.resultList = result.data;
          for (let pjTask of this.resultList) {
            this.courseService.getPjGroupTaskInfo(pjTask.taskId , this.groupId)
              .subscribe(
                (result : any) => {
                  pjTask.groupTask = result.data;
                  console.log(pjTask);
                }
              );
          }
        }
      );
  }

  removeProject(projectId) {
    this.teacherService.removeProject(projectId)
      .subscribe(
        (result: any) => {
          console.log(result);
        }
      );
  }

  finishPjGroupTask(projectTaskId, groupId, groupTaskId) {
    this.courseService.finishPjGroupTask(projectTaskId, groupId, groupTaskId)
      .subscribe(
        (result: any) => {
          console.log(result);
          if (result.code == '0') {
            this.message.success(result.message);
            this.getPjTask();
          } else {
            this.message.error(result.message);
          }
        }
      );
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
  hiddeAddTaskModel() {
    this.addTaskModel.isVisible = false;
  }
  showAddTaskModel(projectTaskId) {
    this.addTaskModel.isVisible = true;
    this.projectTaskId = projectTaskId;
  }
  addTask() {
    for (const i in this.validateAddTaskForm.controls) {
      this.validateAddTaskForm.controls[i].markAsDirty();
      this.validateAddTaskForm.controls[i].updateValueAndValidity();
    }
    if (this.validateAddTaskForm.invalid) {
      return false;
    }
    let datas: any = this.validateAddTaskForm.getRawValue();
    this.addTaskModel.task.taskStartTime = datas.rangePickerTime[0];
    this.addTaskModel.task.projectTaskId = this.projectTaskId;
    this.addTaskModel.task.groupId = this.groupId;
    this.addTaskModel.task.taskEndTime = datas.rangePickerTime[1];
    console.log(this.addTaskModel.task);
    this.courseService.addGroupTask(this.addTaskModel.task).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.message);
          this.hiddeAddTaskModel();
          this.getPjTask();
        } else {
          this.message.error(result.message);
        }
      }
    );
  }
}
