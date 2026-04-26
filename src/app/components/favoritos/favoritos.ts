import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritosService } from '../../services/favoritos.service';
import { Servicio } from '../../services/servicio.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.html',
  styleUrls: ['./favoritos.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: Servicio[] = [];

  constructor(public favoritosService: FavoritosService) {}

  ngOnInit() {
    this.favoritos = this.favoritosService.getFavoritos();
  }

  eliminarFavorito(id: number) {
    this.favoritosService.eliminarFavorito(id);
    this.favoritos = this.favoritosService.getFavoritos();
  }
}