import {Component, OnInit} from '@angular/core';
import {Constants} from '../Constants';
import {UserService} from '../../service/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  validateUpdatePasswordForm!: FormGroup;
  passwordupdateModel = {
    passwords : {
      oldPassword: '',
      newPassword: '',
    },
    errorMsg : {
      oldPasswordErr: '格式不正确！',
      newPasswordErr: '格式不正确！',
      newPassword2Err: '两次不一致！',
    }
  };

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.validateUpdatePasswordForm.controls.newpassword.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  constructor(
    public constants: Constants,
    private userService: UserService,
    private message: NzMessageService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this.validateUpdatePasswordForm = this.fb.group({
      oldpassword: [null, [Validators.required, Validators.pattern('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$')]],
      newpassword: [null, [Validators.required, Validators.pattern('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$')]],
      newpassword2: [null, [this.confirmValidator]],
    });
  }


  doUpdatePassword() {
    for (const i in this.validateUpdatePasswordForm.controls) {
      this.validateUpdatePasswordForm.controls[i].markAsDirty();
      this.validateUpdatePasswordForm.controls[i].updateValueAndValidity();
    }
    if (this.validateUpdatePasswordForm.invalid) {
      return;
    }
    this.userService.updatePassword(this.passwordupdateModel.passwords).subscribe(
      (result: any) => {
        console.log(result);
        if (result.code == '0') {
          localStorage.setItem('token', result.data.token);
          this.constants.updateState();
          this.message.success('密码更新成功');
        } else {
          this.message.create('error', result.message);
        }
      }
    );
  }

  handleAvatarChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.userService.getAvatar().subscribe(
        (result: any) => {
          if (result.code == '0') {
            localStorage.setItem('profilePhoto', result.data);
            this.constants.updateState();
            this.message.success('头像更换成功');
            window.location.reload();
          } else {
            this.message.create('error', result.message);
            window.location.reload();
          }
        }
      );
    } else if (info.file.status === 'error') {
      this.message.error(`${info.file.name} avatar upload failed.`);
    }
  }
}
