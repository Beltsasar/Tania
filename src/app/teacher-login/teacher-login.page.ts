import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../database-service.service';
import { user } from 'src/tablas/user';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.page.html',
  styleUrls: ['./teacher-login.page.scss'],
})
export class TeacherLoginPage implements OnInit {

  constructor(private data: DatabaseServiceService,private router : Router) {}
  user: user = {
    correo: '',
    contrasena: '',
    rol: ''
  };

  ngOnInit() {
  }
  resetPassword(){

  }
    login(){      // Función para login de estudiantes
      this.data.LoginProfesor(this.user).subscribe(
        (response) => {
          console.log('Login de estudiante exitoso:', response);
          alert('¡Login exitoso!');
          this.router.navigate(['student-dashboard'])
        },
        (error) => {
          console.error('Error en el login de estudiante:', error);
          alert('Credenciales incorrectas. Intente nuevamente.');
        }
      );}
  
}
