import { Routes } from '@angular/router';

export const VENTAS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/historial-ventas/historial-ventas.component').then(c => c.HistorialVentasComponent)
  },
  {
    path: 'nueva',
    loadComponent: () => import('./components/nueva-venta/nueva-venta.component').then(c => c.NuevaVentaComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/detalle-venta/detalle-venta.component').then(c => c.DetalleVentaComponent)
  }
];
