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
    let httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.LOGIN_URL + '/' + courseName, httpoptions);
  }

  addTask(task: object){
    console.log(task);
    let httpoptions = this.constants.jsonTokenOptions();
    console.log(httpoptions);
    return this.httpClient.post(this.constants.urls.ADD_COURSE_URL, task, httpoptions);
  }
}
