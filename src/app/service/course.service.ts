import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) {
  }

  public searchCourse(courseName) {
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.SEARCHCOURSE + courseName, httpoptions);
  }

  public takeCourse(courseId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.post(this.constants.urls.TAKE_COURSE + courseId, {}, tokenOptions);
  }

  addTask(task: object) {
    console.log(task);
    let httpoptions = this.constants.jsonTokenOptions();
    console.log(httpoptions);
    return this.httpClient.post(this.constants.urls.ADD_COURSE_URL, task, httpoptions);
  }

  getTask(courseId){
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.GET_TASK_OF_COURSE + courseId, httpoptions);
  }

  getTakenCourses() {
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TAKEN_COURSES, httpoptions);
  }

  public quitCourse(courseId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.delete(this.constants.urls.QUIT_COURSES + courseId, tokenOptions);
  }

  getAllProjectList(courseId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.ALL_PROJECTS + courseId, tokenOptions);
  }

  getProject(projectId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.GET_PROJECT + projectId, tokenOptions);
  }

  getMyProject(courseId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.MY_PROJECT + courseId, tokenOptions);
  }

  joinProject(projectId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.post(this.constants.urls.JOIN_PROJECT + projectId, {}, tokenOptions);
  }

  quitProject(projectId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.delete(this.constants.urls.MY_PROJECT + projectId, tokenOptions);
  }

  getAllPjGroupList(projectId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.ALL_PJ_GROUP + projectId, tokenOptions);
  }

  getPjGroupInfo(groupId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.PJ_GROUP_INFO + groupId, tokenOptions);
  }

  getMyPjGroupInfo(projectId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.MY_PJ_GROUP_INFO + projectId, tokenOptions);
  }

  createPjGroup(projectId, groupName) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient
      .post(this.constants.urls.CREATE_GROUP + projectId + '/' + groupName, {}, tokenOptions);
  }

  joinPjGroup(projectId, groupId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient
      .post(this.constants.urls.JOIN_GROUP + projectId + '/' + groupId, {}, tokenOptions);
  }

  quitPjGroup(groupId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient
      .delete(this.constants.urls.QUIT_GROUP + groupId, tokenOptions);
  }

  getPjTaskList(projectId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TASK_FROM_TEACHER_LIST + projectId, tokenOptions);
  }

  getPjTaskInfo(pjTaskId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TTASK + pjTaskId, tokenOptions);
  }

  addPjGroupTask(groupTask) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient
      .post(this.constants.urls.CREATE_STASK, groupTask, tokenOptions);
  }

  getPjGroupTaskList(groupId) {
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.STASK_LIST + groupId, tokenOptions);
  }

  deletePjGroupTask(projectTaskId, groupId, groupTaskId, isFinished) {
    const tokenOptions = this.constants.tokenOptions();
    const arg = '' + projectTaskId + '/' + groupId + '/' + groupTaskId + '/' + isFinished;
    return this.httpClient.delete(this.constants.urls.REMOVE_STASK + arg, tokenOptions);
  }

  finishPjGroupTask(projectTaskId, groupId, groupTaskId) {
    const tokenOptions = this.constants.tokenOptions();
    const arg = '' + projectTaskId + '/' + groupId + '/' + groupTaskId;
    return this.httpClient
      .put(this.constants.urls.FINISH_STASK + arg, {}, tokenOptions);
  }
}
