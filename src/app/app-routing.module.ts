import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'user-selection',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'student-dashboard',
    loadChildren: () => import('./student-dashboard/student-dashboard.module').then( m => m.StudentDashboardPageModule)
  },
  {
    path: 'student-login',
    loadChildren: () => import('./student-login/student-login.module').then( m => m.StudentLoginPageModule)
  },
  {
    path: 'teacher-dashboard',
    loadChildren: () => import('./teacher-dashboard/teacher-dashboard.module').then( m => m.TeacherDashboardPageModule)
  },
  {
    path: 'user-selection',
    loadChildren: () => import('./user-selection/user-selection.module').then( m => m.UserSelectionPageModule)
  },
  {
    path: 'teacher-login',
    loadChildren: () => import('./teacher-login/teacher-login.module').then( m => m.TeacherLoginPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then( m => m.CamaraPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
