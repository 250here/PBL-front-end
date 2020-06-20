import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './main/student/student.component';
import { TeacherComponent } from './main/teacher/teacher.component';
import { IndexComponent } from './main/index/index.component';
import { SearchCourseComponent } from './main/student/search-course/search-course.component';
import { CoursesComponent as StudentCourseComponent } from './main/student/courses/courses.component';
import { CoursesComponent as TeacherCourseComponent } from './main/teacher/courses/courses.component';
import { AdminComponent } from './main/admin/admin.component';
import { UserManageComponent } from './main/admin/user-manage/user-manage.component';
import {StudentGroupComponent} from './main/student/student-group/student-group.component';
import {TaskComponent} from './main/student/task/task.component';
import {DiscussComponent} from './main/student/discuss/discuss.component';
import {AddTaskComponent} from './main/student/add-task/add-task.component';
import {ScoreComponent} from './main/teacher/score/score.component';
import {FileComponent} from './main/student/file/file.component';

const routes: Routes = [
  { path: '', redirectTo: "index", pathMatch: "full" },
  { path: "index", component: IndexComponent },
  { path: "admin", component: AdminComponent },
  { path: "admin/userManage", component: UserManageComponent },
  { path: "student", component: StudentComponent },
  { path: "student/studentGroup", component: StudentGroupComponent },
  { path: "student/searchCourse", component: SearchCourseComponent },
  { path: "student/task", component: TaskComponent },
  { path: "student/addTask", component: AddTaskComponent },
  { path: "student/discuss", component: DiscussComponent },
  { path: "student/courses", component: StudentCourseComponent },
  { path: "teacher", component: TeacherComponent },
  { path: "teacher/score", component: ScoreComponent },
  { path: "teacher/courses", component: TeacherCourseComponent },
  { path: "student/file", component: FileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
