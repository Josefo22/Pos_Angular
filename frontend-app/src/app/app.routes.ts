import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cajero', pathMatch: 'full' },
  {
    path: 'cajero',
    loadChildren: () => import('./modules/cajero/cajero.routes').then(m => m.CAJERO_ROUTES)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./modules/ventas/ventas.routes').then(m => m.VENTAS_ROUTES)
  },
  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/productos.routes').then(m => m.PRODUCTOS_ROUTES)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./modules/inventario/inventario.routes').then(m => m.INVENTARIO_ROUTES)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./modules/clientes/clientes.routes').then(m => m.CLIENTES_ROUTES)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./modules/reportes/reportes.routes').then(m => m.REPORTES_ROUTES)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./modules/configuracion/configuracion.routes').then(m => m.CONFIGURACION_ROUTES)
  },
  { path: '**', redirectTo: 'cajero' }
];
