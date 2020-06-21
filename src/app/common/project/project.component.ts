import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {Constants} from '../Constants';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TeacherService} from '../../service/teacher.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DiscussService} from '../../service/discuss.service';
import {ProjectFileService} from '../../service/project-file.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  courseId;
  projectId;
  myGroup = null;
  groups = [];
  tasks = [];

  groupName;
  validateAddTaskForm!: FormGroup;
  addTaskModel = {
    isVisible: false, task: {
      projectId: '',
      taskName: '',
      taskStartTime: null,
      taskEndTime: null,
      taskDiscribe: '',
    },
  };

  commentDatas: any = [];
  commentInput: any = '';


  files = [];

  validateFileForm!: FormGroup;
  fileUpload;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    public constants: Constants,
    private message: NzMessageService,
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private discussService: DiscussService,
    private projectFileService: ProjectFileService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId');
      this.projectId = +params.get('projectId');
      this.getAllTasks();
      this.getgroups();
      this.getDiscusses();
      this.getFiles();
      if (this.constants.state.role == this.constants.ROLES.STUDENT) {
        this.getMyGroup();
      }
    });
    this.validateAddTaskForm = this.fb.group({
      taskName: [null],
      rangePickerTime: [[]],
      taskDiscribe: [null],
    });
    this.validateFileForm= this.fb.group({
      file: [null],
    });
  }

  getMyGroup() {
    this.courseService.getMyPjGroupInfo(this.projectId).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.myGroup = result.data;
        } else {
          this.message.error(result.message);
        }
      }
    );
  }

  getgroups() {
    let obj;
    if (this.constants.state.role == this.constants.ROLES.STUDENT) {
      obj = this.courseService.getAllPjGroupList(this.projectId);
    } else if (this.constants.state.role == this.constants.ROLES.TEACHER) {
      obj = this.courseService.getAllPjGroupList(this.projectId);
    }
    obj.subscribe(
      (result: any) => {
        console.log(result);
        if (result.code == '0') {
          this.groups = result.data;
        } else {
          this.message.error(result.message);
        }
      }
    );
  }

  getAllTasks() {
    let obj;
    if (this.constants.state.role == this.constants.ROLES.STUDENT) {
      obj = this.courseService.getPjTaskList(this.projectId);
    } else if (this.constants.state.role == this.constants.ROLES.TEACHER) {
      obj = this.courseService.getPjTaskList(this.projectId);
    }
    obj.subscribe(
      (result: any) => {
        // console.log(result);
        if (result.code == '0') {
          this.tasks = result.data;
          console.log(this.tasks);
        } else {
          this.message.error(result.message);
        }
      }
    );
  }

  removeTask(pjTaskId) {
    this.teacherService.removeTask(pjTaskId).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.message);
          this.getAllTasks();
        } else {
          this.message.error(result.message);
        }
      }
    );
  }

  quitGroup(groupId) {
    this.courseService.quitPjGroup(groupId).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.message);
          this.getgroups();
          this.getMyGroup();
        } else {
          this.message.error(result.message);
        }
      }
    );
  }

  showAddTaskModel() {
    this.addTaskModel.isVisible = true;
  }

  hiddeAddTaskModel() {
    this.addTaskModel.isVisible = false;
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
    this.addTaskModel.task.projectId = this.projectId;
    this.addTaskModel.task.taskEndTime = datas.rangePickerTime[1];
    console.log(this.addTaskModel.task);
    this.teacherService.createTask(this.addTaskModel.task).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.message);
          this.hiddeAddTaskModel();
          this.getAllTasks();
        } else {
          this.message.error(result.message);
        }
      }
    );
  }

  createGroup() {
    if (this.groupName == null || this.groupName == '') {
      this.message.error('小组名称不能为空');
      return;
    }
    this.courseService.createPjGroup(this.projectId, this.groupName).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.message);
          this.getgroups();
          this.getMyGroup();
        } else {
          this.message.error(result.message);
        }
      });
  }

  getDiscusses() {
    this.discussService.getDiscusses(this.projectId).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.commentDatas = result.data;
          for (let discuss of result.data) {
            this.getDiscuss(discuss.discId);
          }
        } else {
          this.message.error(result.message);
        }
      });
  }

  getDiscuss(disCussId) {
    this.discussService.getDiscuss(disCussId).subscribe(
      (result: any) => {
        console.log(result);
        if (result.code == '0') {
          for (let discuss of this.commentDatas) {
            console.log(this.commentDatas);
            if (discuss.discId == result.data.discussionTheme.discId) {
              discuss.children = result.data.discussionReply;
            }
          }
        } else {
          this.message.error(result.message);
        }
      });
  }

  addReply(discussId) {
    const reply = {
      discId: discussId,
      pjId: this.projectId,
      discMessage: this.commentInput,
    };
    this.discussService.replyDiscuss(reply).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.message);
          this.getDiscusses();
        } else {
          this.message.error(result.message);
        }
      });
  }

  addDiscuss() {
    const discuss = {
      pjId: this.projectId,
      discMessage: this.commentInput,
      discTitle: 'no title',
    };
    this.discussService.newDiscuss(discuss).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.message);
          this.getDiscusses();
        } else {
          this.message.error(result.message);
        }
      });
  }

  clearInput() {
    this.commentInput = '';
  }

  getFiles() {

  }
  upload(){
    for (const i in this.validateFileForm.controls) {
      this.validateFileForm.controls[i].markAsDirty();
      this.validateFileForm.controls[i].updateValueAndValidity();
    }
    if (this.validateFileForm.invalid) {
      return false;
    }
    let datas: any = this.validateFileForm.getRawValue();
    console.log(datas);
    console.log(this.fileUpload);
  }
}
