import { Routes } from '@angular/router';

export const INVENTARIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/gestion-inventario/gestion-inventario.component').then(c => c.GestionInventarioComponent)
  }
];
