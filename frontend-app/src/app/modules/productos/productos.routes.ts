import { Routes } from '@angular/router';

export const PRODUCTOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/lista-productos/lista-productos.component').then(c => c.ListaProductosComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./components/form-producto/form-producto.component').then(c => c.FormProductoComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./components/form-producto/form-producto.component').then(c => c.FormProductoComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/detalle-producto/detalle-producto.component').then(c => c.DetalleProductoComponent)
  }
];
