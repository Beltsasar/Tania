import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../database-service.service';
import { user } from 'src/tablas/user';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.page.html',
  styleUrls: ['./student-login.page.scss'],
})
export class StudentLoginPage implements OnInit {
  user: user = {
    correo: '',
    contrasena: '',
    rol: ''
  };
  constructor(private data: DatabaseServiceService,private router : Router) {}

  ngOnInit() {
  }
  resetPassword(){
    
  }
  login(){
      // Función para login de estudiantes
    this.data.LoginEstudiante(this.user).subscribe(
      (response) => {
        console.log('Login de estudiante exitoso:', response);
        alert('¡Login exitoso!');
        this.router.navigate(['student-dashboard'])
      },
      (error) => {
        console.error('Error en el login de estudiante:', error);
        alert('Credenciales incorrectas. Intente nuevamente.');
      }
    );
  }
  
}
