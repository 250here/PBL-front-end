import { Component, OnInit } from '@angular/core';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserService } from 'src/app/service/user.service';
import { Router, RouterLink } from '@angular/router';
import { HttpOptionsGenerater, Constants } from '../Constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  validateLoginForm!: FormGroup;
  validateSignUpForm!: FormGroup;
  loginModel = {
    isVisible: false,
    isOkLoading: false,
    loginFailMsg: '用户名或密码错误',
    loginfail: false,
    user: {
      username: '',
      password: '',
    }
  };

  SignUpModel = {
    isVisible: false,
    isOkLoading: false,
    signupfail: false,
    user: {
      idcard: '',
      username: '',
      password: '',
      password2: '',
    },
    formErrors: {
      usernameErr: '',
      passwordErr: '',
    },
    errorMsg: {
      usernameErr: '用户名必须为6到15位的字母数字或下划线！',
      passwordErr: '密码必须是6到20位的字母和数字！',
      password2Err: '两次密码输入不一致',
      idcardErr: '必须输入id！',
    }
  };
  private httpOptionGenerater: HttpOptionsGenerater = new HttpOptionsGenerater();
  constructor(
    private fb: FormBuilder,
    public constants: Constants,
    private userService: UserService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.constants.updateState();
    this.validateLoginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.validateSignUpForm = this.fb.group({
      idcard: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.pattern("^[A-Za-z0-9_]{6,15}$")]],
      password: [null, [Validators.required, Validators.pattern("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$")]],
      password2: [null, [this.confirmValidator]],
    });
    //console.log(this.httpOptionGenerater.clear().json().token().generate());
  }
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateSignUpForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  doLogin() {
    for (const i in this.validateLoginForm.controls) {
      this.validateLoginForm.controls[i].markAsDirty();
      this.validateLoginForm.controls[i].updateValueAndValidity();
    }
    this.loginModel.loginfail = false;
    this.loginModel.isOkLoading = true;
    this.userService.login(this.loginModel.user).subscribe(
      (result: any) => {
        this.loginModel.isOkLoading = false;
        if (result.code == '0') {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("role", result.data.role);
          localStorage.setItem("username", this.loginModel.user.username);
          localStorage.setItem("profilePhoto", result.data.profilePhoto);
          this.constants.updateState();
          this.hiddeLoginModel();
          let path = '';
          switch (result.data.role) {
            case this.constants.ROLES.ADMIN: path = 'admin'; break;
            case this.constants.ROLES.STUDENT: path = 'student'; break;
            case this.constants.ROLES.TEACHER: path = 'teacher'; break;
            default:
          }
          this.router.navigateByUrl(path);
        } else if (result.code == '20008') {
          this.createMessage('error', result.message);
          this.loginModel.loginfail = true;
        } else {
          console.error('unknow code result', result);
        }
      }
    );
  }
  showLoginModel() {
    this.loginModel.isVisible = true;
  }
  hiddeLoginModel() {
    this.loginModel.isVisible = false;
  }
  doLogOut() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  doSignUp() {
    for (const i in this.validateSignUpForm.controls) {
      this.validateSignUpForm.controls[i].markAsDirty();
      this.validateSignUpForm.controls[i].updateValueAndValidity();
    }
    if (this.validateSignUpForm.invalid) {
      return;
    }
    this.SignUpModel.isOkLoading = true;
    this.userService.signUp(this.SignUpModel.user).subscribe(
      (result: any) => {
        this.SignUpModel.isOkLoading = false;
        if (result.code == '0') {
          this.createMessage('success', '注册成功');
          this.hiddeSignUpModel();
          this.showLoginModel();
        } else if (result.code == '-1') {
          this.createMessage('error', '注册失败');
        } else {
          console.error('unknow code result', result);
        }
      }
    );
  }

  showSignUpModel() {
    this.SignUpModel.isVisible = true;
  }
  hiddeSignUpModel() {
    this.SignUpModel.isVisible = false;
  }
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
    this.constants.updateState();
  }
}
