import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicioService, Servicio } from '../../services/servicio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  serviciosDestacados: Servicio[] = [];
  loading: boolean = true;

  constructor(
    private servicioService: ServicioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.servicioService.getServicios().subscribe({
      next: (data) => {
        this.serviciosDestacados = data.servicios.slice(0, 3);
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Destacados cargados:', this.serviciosDestacados.length);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}