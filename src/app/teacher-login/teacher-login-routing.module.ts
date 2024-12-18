import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherLoginPage } from './teacher-login.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherLoginPageRoutingModule {}
