import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants, HttpOptionsGenerater} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private httpOPtionsGenenrate = new HttpOptionsGenerater();

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) {
  }

  public searchCourse(courseName) {
    let httpoptions = this.httpOPtionsGenenrate.clear().token().json().generate();
    return this.httpClient.get(this.constants.urls.LOGIN_URL + '/' + courseName, {}, httpoptions);
  }
}
