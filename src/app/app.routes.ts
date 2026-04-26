import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ServiciosComponent } from './components/servicios/servicios';
import { FavoritosComponent } from './components/favoritos/favoritos';
import { ContactoComponent } from './components/contacto/contacto';
import { AdminServiciosComponent } from './components/admin-servicios/admin-servicios';
import { DetalleComponent } from './components/detalle/detalle';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin', component: AdminServiciosComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: '**', redirectTo: '' }
];