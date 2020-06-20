import {Injectable} from '@angular/core';

import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Constants {
  urlBase = 'http://localhost:8081/';
  urls = {
    LOGIN_URL: this.urlBase + 'user/login',
    SIGN_UP_URL: this.urlBase + 'student/register',
    ADD_COURSE_URL: this.urlBase + 'teacher/course/courseInfo',
    ADD_TASK_URL: this.urlBase + 'teacher/course/project/projectInfo',
    ADD_TEACHER_URL: this.urlBase + '/admin/teacherInfo',
    ADD_STUDENT_URL: this.urlBase + '/admin/studentInfo',
    SEARCH_USER: this.urlBase + '/userInfo/',
    DELETE_USER: this.urlBase + '/userInfo/',

    UPLOAD_PHOTO: this.urlBase + 'user/userProfilePic',
    UPDATE_PASSWORD: this.urlBase + 'user/pass',
    PHOTO_PATH: this.urlBase + 'user/photo',

    SHARE_FILE: this.urlBase + 'course/project/sharedFile',
    ALL_FILE_OF_PROJECT: this.urlBase + 'course/project/sharedFiles/',
    DOWNLOAD_FILE: this.urlBase + 'course/project/sharedFile/',
    DELETE_FILE: this.urlBase + 'course/project/sharedFile/',

    DISCUSS_LIST: this.urlBase + 'course/project/discussionList/',

    SEARCHCOURSE: this.urlBase + 'student/course/courseIndexInfo/',
    TAKE_COURSE: this.urlBase + 'student/course/studentInfo/takesCourse/',

    GETCOURSES: this.urlBase + 'teacher/course/courseList/',
    DELETE_COURSE: this.urlBase + 'teacher/course/courseInfo/',
    GET_TASK_OF_COURSE: this.urlBase + 'teacher/course/project/projectList/',
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

  jsonTokenOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    };
  }

  jsonOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
    };
  }

  tokenOptions() {
    return {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    };
  }
  token(){
    return 'Bearer ' + localStorage.getItem('token');
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
