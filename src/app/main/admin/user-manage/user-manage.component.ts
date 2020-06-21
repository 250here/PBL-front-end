import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {Constants} from '../../../common/Constants';
import {Router} from '@angular/router';
import {TeacherService} from '../../../service/teacher.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  userName;
  data: any = null;
  radioValue = 'teacher';
  user = {
    userName: '',
    password: '',
    userId: '',
  };
  validateForm!: FormGroup;
  dataSet: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public constants: Constants,
    private router: Router,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null],
      password: [null],
      userId: [null],
    });
  }

  addUser() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid) {
      return;
    }
    let datas: any = this.validateForm.getRawValue();
    console.log(datas);
    const newUser = {
      username: this.user.userName,
      password: Md5.hashStr(this.user.password),
      id: this.user.userId,
    };
    if (this.radioValue == 'teacher') {
      this.userService.addTeacher(newUser)
        .subscribe((result: any) => {
          console.log(result);
          if (result.code == '0') {
            this.message.create('success', result.message);
          } else {
            this.message.create('error', result.message);
          }
        });
    }
    if (this.radioValue == 'student') {
      this.userService.addStudent(newUser)
        .subscribe((result: any) => {
          console.log(result);
          if (result.code == '0') {
            this.message.create('success', result.message);
          } else {
            this.message.create('error', result.message);
          }
        });
    }
  }

  searchUser() {
    this.userService.searchUser(this.userName)
      .subscribe(
        (result: any) => {
          console.log(result);
          this.data = result.data;
        }
      );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId)
      .subscribe((result: any) => {
        if (result.code == '0') {
          this.message.success('删除成功');
          this.data=null;
        } else {
          this.message.error(result.message);
        }
      });
  }
}
