import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage  {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  image: string | null = null;
  isCameraActive: boolean = true;

  constructor(private router: Router, private http: HttpClient) {}

  ngAfterViewInit() {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (this.videoElement && this.videoElement.nativeElement) {
          this.videoElement.nativeElement.srcObject = stream;
        } else {
          console.error('Elemento de video no disponible');
        }
      })
      .catch((err) => {
        console.error('Error al acceder a la cámara: ', err);
        alert('No se puede acceder a la cámara. Verifica los permisos.');
      });
  }

  takePicture() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    if (context) {
      canvas.width = this.videoElement.nativeElement.videoWidth;
      canvas.height = this.videoElement.nativeElement.videoHeight;
      context.drawImage(this.videoElement.nativeElement, 0, 0);
      this.image = canvas.toDataURL('image/png'); // Imagen en base64
  
      console.log('Imagen capturada en base64:', this.image); // Verifica que la imagen es válida
      this.isCameraActive = false; // Desactivar la cámara
    } else {
      console.error('Error al obtener el contexto del canvas');
    }
  }
  

  takeAnother() {
    this.image = null; // Limpiar la imagen
    this.isCameraActive = true; // Reactivar la cámara
    this.startCamera(); // Reiniciar la cámara
  }

  // Cambiar este método para navegar a la página de registro con la imagen
  saveImage() {
    if (this.image) {
      localStorage.setItem('capturedImage', this.image); // Almacenar la imagen en localStorage
      console.log('Imagen guardada en localStorage:', localStorage.getItem('capturedImage')); // Verifica que la imagen se guardó correctamente
      this.router.navigate(['/student-dashboard'], { state: { reload: true } }); // Navegar con estado para recargar
    }
  }
  
  
}
