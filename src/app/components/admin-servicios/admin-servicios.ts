import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService, Servicio } from '../../services/servicio.service';

@Component({
  selector: 'app-admin-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-servicios.html',
  styleUrls: ['./admin-servicios.css']
})
export class AdminServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  loading = true;
  
  nuevoServicio = {
    nombre: '',
    descripcionBreve: '',
    descripcionCompleta: '',
    imagen: 'assets/hero.jpg',
    categoria: 'web',
    precio: 0
  };

  constructor(private servicioService: ServicioService) {}

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data.servicios;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  crearServicio() {
    if (!this.nuevoServicio.nombre || !this.nuevoServicio.descripcionBreve || !this.nuevoServicio.precio) {
      alert('⚠️ Por favor completa los campos obligatorios');
      return;
    }

    const nuevoId = Math.max(...this.servicios.map(s => s.id), 0) + 1;
    const servicio: Servicio = {
      id: nuevoId,
      nombre: this.nuevoServicio.nombre,
      descripcionBreve: this.nuevoServicio.descripcionBreve,
      descripcionCompleta: this.nuevoServicio.descripcionCompleta,
      imagen: this.nuevoServicio.imagen,
      categoria: this.nuevoServicio.categoria,
      precio: this.nuevoServicio.precio
    };
    
    this.servicios.push(servicio);
    alert('✅ Servicio creado exitosamente');
    
    this.nuevoServicio = {
      nombre: '',
      descripcionBreve: '',
      descripcionCompleta: '',
      imagen: 'assets/hero.jpg',
      categoria: 'web',
      precio: 0
    };
  }

  eliminarServicio(id: number) {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      this.servicios = this.servicios.filter(s => s.id !== id);
      alert('🗑️ Servicio eliminado');
    }
  }
}