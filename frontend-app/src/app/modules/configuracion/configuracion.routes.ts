import { Routes } from '@angular/router';

export const CONFIGURACION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/preferencias/preferencias.component').then(c => c.PreferenciasComponent)
  }
];
