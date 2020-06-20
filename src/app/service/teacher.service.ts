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
  // getStudents(){
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

  getProject(projectId){
    let httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.TEACHER_GET_PROJECT + projectId, httpoptions);
  }
  removeProject(projectId){
    let httpoptions = this.constants.tokenOptions();
    return this.httpClient.delete(this.constants.urls.TEACHER_REMOVE_PROJECT + projectId, httpoptions);

  }
}
