import {Component, OnInit} from '@angular/core';
import {CourseService} from 'src/app/service/course.service';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {
  courseName;
  data: any;

  constructor(
    private courseService: CourseService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
  }

  public doSearchCourse() {
    this.courseService.searchCourse(this.courseName)
      .subscribe((result:any) => {
        console.log(result);
        this.data = result.data;
      });
  }

  takeCourse(courseId: string) {
    this.courseService.takeCourse(courseId).subscribe(
      (result:any)=>{
        if(result.code=='0'){
          this.message.success("选课成功");
        }else {
          this.message.error(result.message);
        }
      }
    );
  }
}
