import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio {
  id: number;
  nombre: string;
  descripcionBreve: string;
  descripcionCompleta: string;
  imagen: string;
  categoria: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private dataUrl = '/assets/data/servicios.json';

  constructor(private http: HttpClient) { }

  getServicios(): Observable<{ servicios: Servicio[] }> {
    return this.http.get<{ servicios: Servicio[] }>(this.dataUrl);
  }
}