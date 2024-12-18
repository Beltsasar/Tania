import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherLoginPage } from './teacher-login.page';

describe('TeacherLoginPage', () => {
  let component: TeacherLoginPage;
  let fixture: ComponentFixture<TeacherLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
