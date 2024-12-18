import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.page.html',
  styleUrls: ['./user-selection.page.scss'],
})
export class UserSelectionPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }
  navigateToStudentLogin() {
    this.router.navigate(['/student-login']);
  }

  navigateToTeacherLogin() {
    this.router.navigate(['/teacher-login']);
  }

  navigateToPasswordReset() {
    this.router.navigate(['/password-reset']);
  }
  Register(){
    this.router.navigate(['/registro'])
  }
}
