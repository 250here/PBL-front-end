import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { StudentComponent } from './main/student/student.component';
import { TeacherComponent } from './main/teacher/teacher.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IndexComponent } from './main/index/index.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TeacherComponent,
    NavbarComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
