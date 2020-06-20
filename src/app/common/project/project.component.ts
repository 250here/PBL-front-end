import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {Constants} from '../Constants';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  courseId;
  projectId;
  myGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private constants: Constants,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId');
      this.projectId = +params.get('projectId');
      if (this.constants.state.role == this.constants.ROLES.STUDENT) {
        this.getMyGroup();
      }
    });
  }
  getMyGroup() {
    this.courseService.getMyPjGroupInfo(this.projectId).subscribe(
      (result:any)=>{
        if(result.code=='0'){
          this.myGroup=result.data;
        }else{
          this.message.error(result.message);
        }
      }
    );
  }
}
