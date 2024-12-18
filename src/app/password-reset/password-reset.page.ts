import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseServiceService } from '../database-service.service';
DatabaseServiceService
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  username: string = '';

  constructor(private data: DatabaseServiceService) {}
  correo: string = ''; // Variable para almacenar el correo ingresado
  mensaje: string = ''; // Variable para mostrar el mensaje al usuario

  ngOnInit() {
  }
  resetPassword() {
    if (!this.correo) {
      this.mensaje = 'Por favor, ingrese su correo';
      return;
    }

    this.data.recuperarContrasena(this.correo).subscribe(
      (response) => {

        // Mostrar la contraseña recuperada o un mensaje de éxito
        console.log( `Tu contraseña es: ${response.contrasena}`)
      },
      (error) => {
        // Mostrar error si no se encuentra el correo
        if (error.status === 404) {
          this.mensaje = 'Correo no encontrado';
        } else {
          this.mensaje = 'Error al recuperar la contraseña';
        }
      }
    );
  }
}
