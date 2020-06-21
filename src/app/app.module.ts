import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {StudentComponent} from './main/student/student.component';
import {TeacherComponent} from './main/teacher/teacher.component';
import {NavbarComponent} from './common/navbar/navbar.component';
import {
  NgZorroAntdModule,
  NzButtonModule, NzConfigService, NzFormModule,
  NzGridModule, NzIconModule, NzInputModule,
  NzListModule, NzMessageService, NzModalService,
  NzPaginationModule,
  NzSelectModule,
  NzTableModule, NzTabsModule, NzUploadModule
} from 'ng-zorro-antd';

import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {IndexComponent} from './main/index/index.component';
import { CoursesComponent as StudentCourseComponent } from './main/student/courses/courses.component';
import { CoursesComponent as TeacherCourseComponent } from './main/teacher/courses/courses.component';
import { AdminComponent } from './main/admin/admin.component';
import { UserManageComponent } from './main/admin/user-manage/user-manage.component';
import { StudentGroupComponent } from './main/student/student-group/student-group.component';
import { TaskComponent } from './main/student/task/task.component';
import { DiscussComponent } from './main/student/discuss/discuss.component';
import { AddTaskComponent } from './main/student/add-task/add-task.component';
import { AddCourseComponent } from './main/teacher/add-course/add-course.component';
import { ScoreComponent } from './main/teacher/score/score.component';
import { FileComponent } from './main/student/file/file.component';
import {SearchCourseComponent} from './main/student/search-course/search-course.component';
import { UserinfoComponent } from './common/userinfo/userinfo.component';
import { CourseInfoComponent } from './common/course-info/course-info.component';
import { ProjectComponent } from './common/project/project.component';
import { GradeComponent } from './main/student/grade/grade.component';
import { GroupComponent } from './common/group/group.component';
import { ProjectfileComponent } from './common/projectfile/projectfile.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TeacherComponent,
    NavbarComponent,
    IndexComponent,
    StudentGroupComponent,
    DiscussComponent,
    SearchCourseComponent,
    StudentCourseComponent,
    TeacherCourseComponent,
    AdminComponent,
    UserManageComponent,
    StudentGroupComponent,
    TaskComponent,
    DiscussComponent,
    AddTaskComponent,
    AddCourseComponent,
    ScoreComponent,
    FileComponent,
    UserinfoComponent,
    CourseInfoComponent,
    ProjectComponent,
    GroupComponent,
    ProjectComponent,
    GradeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NzPaginationModule,
    NzTableModule,
    NzSelectModule,
    NzListModule,
    NzGridModule,
    NzButtonModule,
    NzTabsModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzUploadModule,
  ],
  providers: [
    NzModalService,
    NzMessageService,
    NzConfigService,
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
