import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">POS System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/cajero" routerLinkActive="active">Punto de Venta</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/ventas" routerLinkActive="active">Ventas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/productos" routerLinkActive="active">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/inventario" routerLinkActive="active">Inventario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/clientes" routerLinkActive="active">Clientes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/reportes" routerLinkActive="active">Reportes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/usuarios" routerLinkActive="active">Usuarios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/configuracion" routerLinkActive="active">Configuración</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class HeaderComponent {
}
