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
}
