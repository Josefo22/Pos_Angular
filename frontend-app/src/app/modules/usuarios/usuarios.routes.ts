import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { PreferenciasComponent } from './components/preferencias/preferencias.component';

export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'lista',
    component: ListaUsuariosComponent
  },
  {
    path: 'preferencias',
    component: PreferenciasComponent
  }
];
