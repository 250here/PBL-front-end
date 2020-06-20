import { Component, OnInit } from '@angular/core';
import {CourseService} from 'src/app/service/course.service';
@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {
   courseName;
  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
  }

  public doSearchCourse(){
    this.courseService.searchCourse(this.courseName)
      .subscribe(data => {
        console.log(data);
      });
  }
  onSearchClick(){
  }
}
