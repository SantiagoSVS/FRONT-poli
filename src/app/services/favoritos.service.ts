import { Injectable } from '@angular/core';
import { Servicio } from './servicio.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private storageKey = 'serviciosFavoritos';

  constructor() { }

  getFavoritos(): Servicio[] {
    const favoritos = localStorage.getItem(this.storageKey);
    return favoritos ? JSON.parse(favoritos) : [];
  }

  agregarFavorito(servicio: Servicio): void {
    const favoritos = this.getFavoritos();
    if (!favoritos.some(f => f.id === servicio.id)) {
      favoritos.push(servicio);
      localStorage.setItem(this.storageKey, JSON.stringify(favoritos));
    }
  }

  eliminarFavorito(id: number): void {
    const favoritos = this.getFavoritos().filter(f => f.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(favoritos));
  }

  esFavorito(id: number): boolean {
    return this.getFavoritos().some(f => f.id === id);
  }

  toggleFavorito(servicio: Servicio): void {
    if (this.esFavorito(servicio.id)) {
      this.eliminarFavorito(servicio.id);
    } else {
      this.agregarFavorito(servicio);
    }
  }
}