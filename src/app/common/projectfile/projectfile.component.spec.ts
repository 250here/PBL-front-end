import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectfileComponent } from './projectfile.component';

describe('ProjectfileComponent', () => {
  let component: ProjectfileComponent;
  let fixture: ComponentFixture<ProjectfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
