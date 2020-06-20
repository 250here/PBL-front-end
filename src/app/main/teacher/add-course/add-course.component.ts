import {Component, OnInit} from '@angular/core';

import {UserService} from 'src/app/service/user.service';
import {Router, RouterLink} from '@angular/router';
import { Constants} from 'src/app/common/Constants';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TeacherService} from '../../../service/teacher.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  course = {
    courseName: '',
    courseStartTime: null,
    courseEndTime: null,
  };
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public constants: Constants,
    private router: Router,
    private teacherService: TeacherService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      courseName: [null],
      rangePickerTime: [[]],
    });
  }

  submitForm() {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let datas: any = this.validateForm.getRawValue();
    console.log(datas);
    this.course.courseStartTime = datas.rangePickerTime[0];
    this.course.courseEndTime = datas.rangePickerTime[1];
    this.teacherService.addCourse(this.course).subscribe(
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
