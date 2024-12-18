import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherLoginPageRoutingModule } from './teacher-login-routing.module';

import { TeacherLoginPage } from './teacher-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherLoginPageRoutingModule
  ],
  declarations: [TeacherLoginPage]
})
export class TeacherLoginPageModule {}
