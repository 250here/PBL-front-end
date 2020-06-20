import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {stringify} from 'querystring';
import {CourseService} from '../../service/course.service';
import {Constants} from '../Constants';
import {NzMessageService} from 'ng-zorro-antd/message';

import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {TeacherService} from '../../service/teacher.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  courseId: number;
  projects = [];
  validateAddPjForm!: FormGroup;
  addProjectModel = {
    isVisible: false,
    task: {
      courseId: '',
      projectName: '',
      startTime: null,
      endTime: null,
      projectDsc: '',
      evaluationTime: null,
      teacherEvaWeight: '',
      stuEvaWeight: '',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    public constants: Constants,
    private message: NzMessageService,
    private fb: FormBuilder,
    private teacherService: TeacherService,
  ) {
  }

  ngOnInit(): void {
    this.validateAddPjForm = this.fb.group({
      projectName: [null],
      rangePickerTime: [[]],
      projectDsc: [null],
      evaluationTime: [],
      teacherEvaWeight: [null],
      stuEvaWeight: [null],
    });
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId');
      this.getAllProjectList();
      if (this.constants.state.role == this.constants.ROLES.STUDENT) {
      }
    });

  }

  getAllProjectList() {
    let obj;
    if(this.constants.ROLES.TEACHER==this.constants.state.role){
      obj=this.teacherService.getProjects(this.courseId);
    }else if(this.constants.ROLES.STUDENT==this.constants.state.role){
      obj=this.courseService.getAllProjectList(this.courseId);
    }
    obj.subscribe(
      (result: any) => {
        console.log(result);
        if (result.code == '0') {
          this.projects = result.data;
        } else {
          this.message.error(result.message);
        }
      }
    );
  }

  addProject() {
    for (const i in this.validateAddPjForm.controls) {
      this.validateAddPjForm.controls[i].markAsDirty();
      this.validateAddPjForm.controls[i].updateValueAndValidity();
    }
    let datas: any = this.validateAddPjForm.getRawValue();
    this.addProjectModel.task.courseId = '' + this.courseId;
    this.addProjectModel.task.startTime = datas.rangePickerTime[0];
    this.addProjectModel.task.endTime = datas.rangePickerTime[1];
    this.addProjectModel.task.evaluationTime = datas.evaluationTime;
    console.log(this.addProjectModel.task);
    this.teacherService.addProject(this.addProjectModel.task).subscribe(
      (result: any) => {
        console.log(result);
        if (result.code == '0') {
          this.message.create('success', result.message);
          this.hiddeAddProjectModel();
        } else {
          this.message.create('error', result.message);
        }
      }
    );
  }

  hiddeAddProjectModel() {
    this.addProjectModel.isVisible = false;
  }

  showAddProjectModel() {
    this.addProjectModel.isVisible = true;
  }
  remove(projectId){
    this.teacherService.removeProject(projectId).subscribe(
      (result: any) => {
        console.log(result);
        if (result.code == '0') {
          this.message.create('success', result.message);
        } else {
          this.message.create('error', result.message);
        }
      }
    );
  }
}
