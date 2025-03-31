import { Routes } from '@angular/router';

export const CAJERO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/punto-venta/punto-venta.component').then(c => c.PuntoVentaComponent)
  },
  {
    path: 'cierre',
    loadComponent: () => import('./components/cierre-caja/cierre-caja.component').then(c => c.CierreCajaComponent)
  }
];
