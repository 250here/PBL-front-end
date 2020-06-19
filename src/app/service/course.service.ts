import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  list = [];
  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) {
  }
  public searchCourse(courseName){
    return this.httpClient.post(this.constants.urls.SEARCHCOURSE, courseName);
  }
  getData(){}
}
