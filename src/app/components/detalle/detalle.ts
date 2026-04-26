import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ServicioService, Servicio } from '../../services/servicio.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.html',
  styleUrls: ['./detalle.css']
})
export class DetalleComponent implements OnInit {
  servicio: Servicio | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    public favoritosService: FavoritosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del detalle:', id);
    
    this.servicioService.getServicios().subscribe({
      next: (data) => {
        console.log('Servicios recibidos en detalle:', data.servicios.length);
        this.servicio = data.servicios.find(s => s.id === id) || null;
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Servicio encontrado:', this.servicio);
        console.log('Loading:', this.loading);
      },
      error: (err) => {
        console.error('Error en detalle:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleFavorito(): void {
    if (this.servicio) {
      this.favoritosService.toggleFavorito(this.servicio);
      this.cdr.detectChanges();
    }
  }
}