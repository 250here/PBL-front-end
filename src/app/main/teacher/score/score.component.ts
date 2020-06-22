import {Component, OnInit} from '@angular/core';
import {Constants} from '../../../common/Constants';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  scoreInfo = [];
  scores = {};

  courseId;
  projectId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public constants: Constants,
    private message: NzMessageService,
    private fb: FormBuilder,
    private teacherService: TeacherService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId');
      this.projectId = +params.get('projectId');
      this.getScoreInfo();
    });
  }

  getScoreInfo() {
    this.teacherService.getGradeRefData(this.projectId).subscribe(
      (result: any) => {
        if (result.code == '0') {
          console.log(result);
          this.scoreInfo = result.data;
        } else {
          this.message.error(result.message);
        }
      }
    );
  }

  score(studentId) {
    let grade = 0;
    for (let data of this.scoreInfo) {
      if (data.userId == studentId) {
        grade = data.score;
      }
    }
    console.log(grade);
    this.teacherService.gradeForStu(this.projectId, studentId, grade).subscribe(
      (result: any) => {
        if (result.code == '0') {
          this.message.success(result.message);
          this.getScoreInfo();
        } else {
          this.message.error(result.message);
        }
      }
    );
  }
}
