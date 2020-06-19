import { Component, OnInit } from '@angular/core';
import {CourseService} from 'src/app/service/course.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {
   courseName;
  constructor(
    private courseService: CourseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.navigateByUrl('student/studentCommon');
  }

  public doSearchCourse(){
    this.courseService.searchCourse(this.courseName)
      .subscribe(data => {
      });
  }
  onSearchClick(){
  }
}
