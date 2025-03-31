import { Routes } from '@angular/router';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

export const CLIENTES_ROUTES: Routes = [
  {
    path: '',
    component: ListaClientesComponent
  }
];
