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
}
