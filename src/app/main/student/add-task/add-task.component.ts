import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../service/course.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Constants} from '../../../common/Constants';
import {Router} from '@angular/router';
import {TeacherService} from '../../../service/teacher.service';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  task = {
    courseId: '',
    projectName: '',
    startTime: null,
    endTime: null,
    projectDsc: '',
    evaluationTime: null,
    teacherEvaWeight: '',
    stuEvaWeight: '',
  }
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public constants: Constants,
    private router: Router,
    private courseService: CourseService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      courseId: [null],
      projectName: [null],
      rangePickerTime: [[]],
      projectDsc: [null],
      evaluationTime: [],
      teacherEvaWeight: [null],
      stuEvaWeight: [null],
    });
  }

  submitForm(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let datas: any = this.validateForm.getRawValue();
    console.log(datas);
    this.task.startTime = datas.rangePickerTime[0];
    this.task.endTime = datas.rangePickerTime[1];
    this.task.evaluationTime = datas.evaluationTime;
    this.courseService.addTask(this.task).subscribe(
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
