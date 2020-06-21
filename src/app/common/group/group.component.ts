import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../service/course.service';
import {NzMessageService} from 'ng-zorro-antd';
import {TeacherService} from "../../service/teacher.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  data: any;
  projectList: any;
  pjTaskList: any;
  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }
  getProjectList(courseId){
    this.courseService.getAllProjectList(courseId)
      .subscribe((result: any) => {
        console.log(result);
        this.projectList = result.data;
      });
  }
  getPjTask(projectId){
    this.courseService.getPjGroupTaskList(projectId)
      .subscribe(
        (result: any) => {
          console.log(result);
          this.pjTaskList = result.data;
        }
      );
  }
removeProject(projectId){
  this.teacherService.removeProject(projectId)
    .subscribe(
      (result: any) => {
        console.log(result);
      }
    );
}
finishPjGroupTask(projectTaskId, groupId, groupTaskId){
    this.courseService.finishPjGroupTask(projectTaskId, groupId, groupTaskId)
      .subscribe(
        (result: any) => {
          console.log(result);
        }
      );
}
}
