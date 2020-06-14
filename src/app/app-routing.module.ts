import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './main/student/student.component';
import { TeacherComponent } from './main/teacher/teacher.component';
import { IndexComponent } from './main/index/index.component';

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: IndexComponent },
  { path: "student", component: StudentComponent },
  { path: "teacher", component: TeacherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
