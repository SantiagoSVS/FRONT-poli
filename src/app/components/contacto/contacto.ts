import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class ContactoComponent {
  contacto = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  };
  
  mensajeExito = false;
  mensajeError = false;

  onSubmit(form: any) {
    if (form.valid && this.contacto.nombre && this.contacto.email && this.contacto.mensaje) {
      console.log('Formulario enviado:', this.contacto);
      this.mensajeExito = true;
      this.mensajeError = false;
      
      setTimeout(() => {
        this.mensajeExito = false;
        this.resetForm();
        form.resetForm();
      }, 3000);
    } else {
      this.mensajeError = true;
      setTimeout(() => {
        this.mensajeError = false;
      }, 3000);
    }
  }

  resetForm() {
    this.contacto = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    };
  }
}