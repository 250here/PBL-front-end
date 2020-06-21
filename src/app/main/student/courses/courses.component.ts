import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Route, Router} from '@angular/router';
import {CourseService} from '../../../service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  data: any;
  requests: any = [];

  constructor(
    private message: NzMessageService,
    private router: Router,
    private courseService: CourseService,
  ) {
  }

  ngOnInit(): void {
    this.updateTakenCourses();
    this.getRequests();
  }

  updateTakenCourses() {
    this.courseService.getTakenCourses().subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.data = result.data;
        } else {
          this.message.error(result.message);
        }
      });
  }

  quitCourse(courseId) {
    this.courseService.quitCourse(courseId).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.data);
        } else {
          this.message.error(result.message);
        }
      });
  }
  getRequests() {
    this.courseService.getRequestsReslut().subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.requests=result.data;
        } else {
          this.message.error(result.message);
        }
      });
  }
  stateString(code) {
    switch (code) {
      case '0' :
        return '正在审核';
      case '1' :
        return '同意';
      case '2' :
        return '拒绝';
      default:
    }
  }

}
