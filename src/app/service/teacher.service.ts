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
  getStudents(){
  }
}
