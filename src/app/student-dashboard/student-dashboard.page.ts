import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage implements OnInit {
  userLogeado: any;
  nombre: string = '';
  apellido: string = '';
  correo: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar si el usuario está logeado y recuperar los datos
    if (localStorage.getItem('usuario')) {
      this.userLogeado = JSON.parse(localStorage.getItem('usuario')!); // Convertir de string a objeto
      console.log('Usuario logeado:', this.userLogeado);

      // Llamar a la función para mostrar los datos
      this.mostrarDatos();
    } else {
      console.log('No se ha encontrado datos del usuario');
      this.router.navigate(['/user-selection']); // Redirigir si no hay datos
    }
  }

  mostrarDatos() {
    this.nombre = this.userLogeado.nombre;
    this.apellido = this.userLogeado.apellido;
    this.correo = this.userLogeado.correo; // Asignar correo si es necesario
  }

  // Función para cerrar sesión
  logout() {
    localStorage.clear();
    this.router.navigate(['/user-selection']); // Redirige al login
  }

  camara(){
    this.router.navigate(['/camara'])
  }
}
