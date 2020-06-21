import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../service/course.service';
import {NzMessageService} from 'ng-zorro-antd';
import {TeacherComponent} from '../teacher.component';
import {TeacherService} from '../../../service/teacher.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  data: any;
  constructor(
    private teacherService: TeacherService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    this.teacherService.getCourses()
      .subscribe((result: any) => {
        console.log(result);
        this.data = result.data;
      });
  }
  deleteCourse(courseId: string){
    this.teacherService.deleteCourse(courseId)
      .subscribe(
        (result: any) => {
          if (result.code == '0'){
            this.message.success("删除课程成功");
            this.getCourses();
          }else {
            this.message.error(result.message);
          }
        }
      );
  }
}
