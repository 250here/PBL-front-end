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
    ADD_TEACHER_URL: this.urlBase + 'admin/teacherInfo',
    ADD_STUDENT_URL: this.urlBase + 'admin/studentInfo',
    SEARCH_USER: this.urlBase + 'userInfo/',
    DELETE_USER: this.urlBase + 'userInfo/',

    ADD_PROJECT_URL: this.urlBase + 'teacher/course/project/projectInfo',
    GET_PROJECTS: this.urlBase + 'teacher/course/project/projectList/',
    TEACHER_GET_PROJECT: this.urlBase + 'teacher/course/project/projectInfo/',
    TEACHER_REMOVE_PROJECT: this.urlBase + 'teacher/course/project/projectInfo/',
    TEACHER_HANDLE_REQUEST: this.urlBase + 'teacher/course/dropCourseInfo/',

    TEACHER_GET_GROUPS: this.urlBase + 'teacher/course/project/pjGroupList/',
    TEACHER_GET_GROUP: this.urlBase + 'teacher/course/project/pjGroupInfo/',
    TEACHER_CREATE_TASK: this.urlBase + 'teacher/course/project/pjTask',
    TEACHER_GET_TASKs: this.urlBase + 'teacher/course/project/pjTaskList/',
    TEACHER_GET_TASK: this.urlBase + 'teacher/course/project/pjTaskInfo/',
    TEACHER_REMOVE_TASK: this.urlBase + 'teacher/course/project/pjTaskInfo/',


    UPLOAD_PHOTO: this.urlBase + 'user/userProfilePic',
    UPDATE_PASSWORD: this.urlBase + 'user/pass',
    PHOTO_PATH: this.urlBase + 'user/photo',

    SHARE_FILE: this.urlBase + 'course/project/sharedFile',
    ALL_FILE_OF_PROJECT: this.urlBase + 'course/project/sharedFiles/',
    DOWNLOAD_FILE: this.urlBase + 'course/project/sharedFile/',
    DELETE_FILE: this.urlBase + 'course/project/sharedFile/',

    DISCUSS_LIST: this.urlBase + 'course/project/discussionList/',
    GET_DISCUSS: this.urlBase + 'course/project/discussionInfo/',
    NEW_DISCUSS: this.urlBase + 'course/project/discussion',
    NEW_REPLLY: this.urlBase + 'course/project/discussionReply',

    SEARCHCOURSE: this.urlBase + 'student/course/courseIndexInfo/',
    TAKE_COURSE: this.urlBase + 'student/course/studentInfo/takesCourse/',
    TAKEN_COURSES: this.urlBase + 'student/course/joinedCourseInfos',
    QUIT_COURSES: this.urlBase + 'student/course/studentInfo/dropCourse/',

    ALL_PROJECTS: this.urlBase + 'student/course/project/projectList/',
    GET_PROJECT: this.urlBase + 'student/course/project/projectInfo/',
    MY_PROJECT: this.urlBase + 'student/course/project/studentPjInfo/joinedPj/',
    JOIN_PROJECT: this.urlBase + 'student/course/project/studentPjInfo/joinPj/',
    QUIT_PROJECT: this.urlBase + 'student/course/project/studentPjInfo/dropPj/',

    ALL_PJ_GROUP: this.urlBase + 'student/course/project/group/pjGroupList/',
    PJ_GROUP_INFO: this.urlBase + 'student/course/project/group/pjGroupInfo/',
    MY_PJ_GROUP_INFO: this.urlBase + 'student/course/project/group/myPjGroupInfo/',
    CREATE_GROUP: this.urlBase + 'student/course/project/group/pjGroupInfo/',
    JOIN_GROUP: this.urlBase + 'student/course/project/group/studentInfo/',
    QUIT_GROUP: this.urlBase + 'student/course/project/group/studentInfo/dropGroup/',

    TASK_FROM_TEACHER_LIST: this.urlBase + 'student/course/project/pjTaskList/',
    TTASK: this.urlBase + 'student/course/project/pjTaskInfo/',
    CREATE_STASK: this.urlBase + 'student/course/project/pjGroupTask',
    STASK_LIST: this.urlBase + 'student/course/project/pjGroupTaskList/',
    REMOVE_STASK: this.urlBase + 'student/course/project/pjGroupTaskInfo/',
    FINISH_STASK: this.urlBase + 'student/course/project/pjGroupTaskFinished/',
    STASK_INFO: this.urlBase + 'student/course/project/pjGroupTaskInfo/',

    GETCOURSES: this.urlBase + 'teacher/course/courseList/',
    DELETE_COURSE: this.urlBase + 'teacher/course/courseInfo/',
    GET_TASK_OF_COURSE: this.urlBase + 'teacher/course/project/projectList/',

    GET_GRADE_OF_PROJECT: this.urlBase + 'student/course/project/studentPjInfo/PjScore/',
    IS_EVALUATED: this.urlBase + 'student/course/project/studentPjInfo/isEvaluated/1',
    TEACHER_UPDATE_GRADE: this.urlBase + 'gradeData/',
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

  token() {
    return 'Bearer ' + localStorage.getItem('token');
  }
  downloadOption(){
    return {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
        .append('responseType', 'blob')
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
