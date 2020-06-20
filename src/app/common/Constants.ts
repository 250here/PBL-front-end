import {Injectable} from '@angular/core';

import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Constants {
  urlBase = 'http://localhost:8081/';
  urls = {
    LOGIN_URL: this.urlBase + 'user/login',
    SEARCHCOURSE: this.urlBase + 'student/searchCourse',
    SIGN_UP_URL: this.urlBase + 'student/register',
    ADD_COURSE_URL: this.urlBase + 'teacher/course/courseInfo',
  };
  ROLES = {
    ADMIN: 'ROLE_ADMIN',
    STUDENT: 'ROLE_STUDENT',
    TEACHER: 'ROLE_TEACHER',
  };


  state = {
    username: '',
    role: '',
    profilePhoto: '',
  };

  constructor() {
  }

  updateState() {
    this.state.username = localStorage.getItem('username');
    this.state.role = localStorage.getItem('role');
    this.state.profilePhoto = localStorage.getItem('profilePhoto');
  }

  jsonTokenOptions(){
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    };
  }

  jsonOptions(){
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
    };
  }

  tokenOptions(){
    return {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    };
  }
}
//
// export class HttpOptionsGenerater {
//   httpheaders: object = {};
//
//   clear() {
//     this.httpheaders = {};
//     return this;
//   }
//
//   json() {
//     this.httpheaders.set('Content-Type', 'application/json;charset=utf-8');
//     return this;
//   }
//
//   token() {
//     this.httpheaders.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
//     return this;
//   }
//
//   generate() {
//     let httpOptions = {
//       headers: this.httpheaders
//     };
//     return httpOptions;
//   }
// }
