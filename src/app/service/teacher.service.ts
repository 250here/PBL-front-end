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
}
