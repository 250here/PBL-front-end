import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constants {
  urlBase = 'http://localhost:8081/';
  urls = {
    LOGIN_URL: this.urlBase + 'user/login',
    SEARCHCOURSE: this.urlBase + 'student/searchCourse',
    SIGN_UP_URL: this.urlBase + 'student/register',
  };

  ROLES = {
    ADMIN: 'ROLE_TEACHER',
    STUDENT: 'ROLE_STUDENT',
    TEACHER: 'ROLE_ADMIN',
  };


  state = {
    username: '',
    role: '',
    profilePhoto: '',
  };

  constructor() { }

  updateState() {
    this.state.username = localStorage.getItem('username');
    this.state.role = localStorage.getItem('role');
    this.state.profilePhoto = localStorage.getItem('profilePhoto');
  }

}
