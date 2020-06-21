import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constants} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) {
  }

  addCourse(course: object) {
    console.log(course);
    let httpoptions = this.constants.jsonTokenOptions();
    console.log(httpoptions);
    return this.httpClient.post(this.constants.urls.ADD_COURSE_URL, course, httpoptions);
  }

  getCourses(){
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.GETCOURSES, httpoptions);
  }

  deleteCourse(courseId){
    const tokenOptions = this.constants.tokenOptions();
    return this.httpClient.post(this.constants.urls.DELETE_COURSE + courseId, {}, tokenOptions);
  }

  addProject(project: any) {
    let httpoptions = this.constants.jsonTokenOptions();
    console.log(this.constants.urls.ADD_PROJECT_URL);
    return this.httpClient.post(this.constants.urls.ADD_PROJECT_URL, project, httpoptions);
  }

  getProjects(courseId) {
    let httpoptions = this.constants.tokenOptions();
    console.log(this.constants.urls.ADD_PROJECT_URL);
    return this.httpClient.get(this.constants.urls.GET_PROJECTS + courseId, httpoptions);
  }

  getProject(projectId) {
    let httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TEACHER_GET_PROJECT + projectId, httpoptions);
  }

  removeProject(projectId) {
    let httpoptions = this.constants.tokenOptions();
    return this.httpClient.delete(this.constants.urls.TEACHER_REMOVE_PROJECT + projectId, httpoptions);

  }
  getAllPjGroupList(projectId){
    let httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TEACHER_GET_GROUPS + projectId, httpoptions);
  }
  getPjGroupInfo(groupId){
    let httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TEACHER_GET_GROUP + groupId, httpoptions);
  }
  createTask(pjTask){
    const httpoptions = this.constants.jsonTokenOptions();
    return this.httpClient.post(this.constants.urls.TEACHER_CREATE_TASK, pjTask, httpoptions);
  }
  getPjTaskList(projectId){
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TEACHER_GET_TASKs + projectId, httpoptions);
  }

  getPjTaskInfo(pjTaskId){
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TEACHER_GET_TASK + pjTaskId, httpoptions);
  }
  removeTask(pjTaskId){
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.delete(this.constants.urls.TEACHER_REMOVE_TASK + pjTaskId, httpoptions);
  }

  getStuDropRequests(courseId) {
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urlBase + 'teacher/course/' + courseId + '/stuDropRequests', httpoptions);
  }

  handleStuDropCourse(courseId, userId, isAgree) {
    const httpoptions = this.constants.tokenOptions();
    const arg = courseId + '/' + userId + '/' + isAgree;
    return this.httpClient.put(this.constants.urls.TEACHER_HANDLE_REQUEST + arg, {}, httpoptions);
  }
}
