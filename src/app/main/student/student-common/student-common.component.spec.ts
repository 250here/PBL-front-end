import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommonComponent } from './student-common.component';

describe('StudentCommonComponent', () => {
  let component: StudentCommonComponent;
  let fixture: ComponentFixture<StudentCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
