import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../database-service.service';
import { user } from 'src/tablas/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  // Constructor e inyección de servicio
  constructor(private data: DatabaseServiceService, private router : Router) {}

  ngOnInit(): void {
    // Inicializar cualquier lógica cuando el componente se carga
  }

  // Modelo de usuario
  user: user = {
    nombre: '',
    apellido: '',
    segundoApellido: '',
    correo: '',
    contrasena: '',
    rol: ''
  };

  // Función genérica para registrar usuario (estudiante o profesor)
  registerUser() {
    // Validación de campos obligatorios
    if (!this.user.nombre || !this.user.apellido || !this.user.correo || !this.user.contrasena || !this.user.rol) {
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }

    // Llamada al servicio según el rol seleccionado
    const registerObservable = this.user.rol === 'estudiante'
      ? this.data.RegistroEstudiante(this.user)
      : this.user.rol === 'profesor'
      ? this.data.RegistroProf(this.user)
      : null;

    if (!registerObservable) {
      alert('Por favor, selecciona un rol válido.');
      return;
    }

    // Realizar la solicitud al backend
    registerObservable.subscribe(
      (response) => {
        console.log(`Registro de ${this.user.rol} exitoso:`, response);
        alert(`¡Registro de ${this.user.rol} completado!`);
        this.router.navigate(['/user-selection'])
      },
      (error) => {
        console.error(`Error en el registro de ${this.user.rol}:`, error);
        alert(`Error al registrar el ${this.user.rol}. Intente nuevamente.`);
      }
    );
  }
}
