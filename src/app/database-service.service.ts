import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../tablas/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  private apiUrl = 'http://localhost:3000/api'; // Asegúrate de que tu API corre en la ruta correcta

  constructor(private http: HttpClient) {}

  RegistroEstudiante(usuario: user) {
    // Enviar los datos correctamente como un objeto con los campos individuales
    return this.http.post<any>(`${this.apiUrl}/RegisterEst`, { usuario: usuario });
  }

  RegistroProf(usuario: user) {
    return this.http.post<any>(`${this.apiUrl}/RegisterProf`, { usuario });
  }

    // Login para estudiantes
    LoginEstudiante(usuario: user) {
      return this.http.post<any>(`${this.apiUrl}/LoginEst`, { usuario }).pipe(
        tap((response) => {
          if (response.usuario) {
            // Guardar los datos del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
          }
        })
      );
    }
  
    // Login para profesores
    LoginProfesor(usuario: user) {
      return this.http.post<any>(`${this.apiUrl}/LoginProf`, { usuario }).pipe(
        tap((response) => {
          if (response.usuario) {
            // Guardar los datos del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
          }
        })
      );
    }

    recuperarContrasena(correo: string) {
      return this.http.post<any>(`${this.apiUrl}/recuperarContrasena`, { correo });
    }
}
