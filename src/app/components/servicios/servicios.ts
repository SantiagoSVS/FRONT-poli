import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicioService, Servicio } from '../../services/servicio.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  serviciosFiltrados: Servicio[] = [];
  loading: boolean = true;
  categoriaSeleccionada: string = 'todos';

  constructor(
    public favoritosService: FavoritosService,
    private servicioService: ServicioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.servicioService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data.servicios;
        this.serviciosFiltrados = [...data.servicios];
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Servicios cargados:', this.servicios.length);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    if (categoria === 'todos') {
      this.serviciosFiltrados = [...this.servicios];
    } else {
      this.serviciosFiltrados = this.servicios.filter(s => s.categoria === categoria);
    }
    console.log(`Filtrando ${categoria}: ${this.serviciosFiltrados.length} servicios`);
  }

  toggleFavorito(servicio: Servicio, event: Event): void {
    event.stopPropagation();
    this.favoritosService.toggleFavorito(servicio);
  }
}