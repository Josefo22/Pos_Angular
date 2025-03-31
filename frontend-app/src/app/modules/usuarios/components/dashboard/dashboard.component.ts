import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Dashboard de Usuarios</h2>
      <div>
        <a routerLink="/usuarios/lista" class="btn btn-primary me-2">
          <i class="bi bi-people me-1"></i> Ver Usuarios
        </a>
        <a routerLink="/usuarios/preferencias" class="btn btn-outline-secondary">
          <i class="bi bi-gear me-1"></i> Preferencias
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="card border-primary h-100">
          <div class="card-body text-center">
            <h1 class="display-4 text-primary mb-2">{{ usuariosActivos }}</h1>
            <h5 class="card-title">Usuarios Activos</h5>
            <p class="card-text text-muted small">De un total de {{ totalUsuarios }} usuarios</p>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-4">
        <div class="card border-success h-100">
          <div class="card-body text-center">
            <h1 class="display-4 text-success mb-2">{{ usuariosAdministradores }}</h1>
            <h5 class="card-title">Administradores</h5>
            <p class="card-text text-muted small">Con acceso completo al sistema</p>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-4">
        <div class="card border-info h-100">
          <div class="card-body text-center">
            <h1 class="display-4 text-info mb-2">{{ usuariosCajeros }}</h1>
            <h5 class="card-title">Cajeros</h5>
            <p class="card-text text-muted small">Con acceso a ventas y caja</p>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-4">
        <div class="card border-warning h-100">
          <div class="card-body text-center">
            <h1 class="display-4 text-warning mb-2">{{ usuariosBloqueados }}</h1>
            <h5 class="card-title">Bloqueados</h5>
            <p class="card-text text-muted small">Cuentas suspendidas o inactivas</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Actividad Reciente</h5>
              <a routerLink="/usuarios/actividad" class="btn btn-sm btn-outline-primary">Ver Todo</a>
            </div>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" *ngFor="let actividad of actividadReciente">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{{ actividad.usuario }}</strong>
                    <span class="text-muted ms-2">{{ actividad.accion }}</span>
                  </div>
                  <span class="badge bg-light text-dark">{{ actividad.fecha | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Usuarios Nuevos</h5>
              <a routerLink="/usuarios/lista" class="btn btn-sm btn-outline-primary">Ver Todos</a>
            </div>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" *ngFor="let usuario of usuariosRecientes">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="bi bi-person-fill me-2"></i>
                    <strong>{{ usuario.nombre }}</strong>
                    <span class="badge ms-2" [ngClass]="usuario.rol === 'Administrador' ? 'bg-success' : usuario.rol === 'Cajero' ? 'bg-info' : 'bg-secondary'">
                      {{ usuario.rol }}
                    </span>
                  </div>
                  <span class="badge bg-light text-dark">{{ usuario.fechaCreacion | date:'dd/MM/yyyy' }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  totalUsuarios: number = 24;
  usuariosActivos: number = 18;
  usuariosAdministradores: number = 4;
  usuariosCajeros: number = 14;
  usuariosBloqueados: number = 6;

  actividadReciente = [
    {
      usuario: 'Juan Pérez',
      accion: 'inició sesión',
      fecha: new Date('2025-03-29T09:15:00')
    },
    {
      usuario: 'Ana Gómez',
      accion: 'cerró caja #3',
      fecha: new Date('2025-03-28T18:30:00')
    },
    {
      usuario: 'Carlos Rodríguez',
      accion: 'modificó el perfil de María López',
      fecha: new Date('2025-03-28T14:45:00')
    },
    {
      usuario: 'Laura Martínez',
      accion: 'registró una nueva venta',
      fecha: new Date('2025-03-27T11:20:00')
    },
    {
      usuario: 'Pedro Sánchez',
      accion: 'cambió su contraseña',
      fecha: new Date('2025-03-26T16:10:00')
    }
  ];

  usuariosRecientes = [
    {
      nombre: 'María López',
      rol: 'Cajero',
      fechaCreacion: new Date('2025-03-25')
    },
    {
      nombre: 'Roberto Fernández',
      rol: 'Administrador',
      fechaCreacion: new Date('2025-03-22')
    },
    {
      nombre: 'Sofía García',
      rol: 'Cajero',
      fechaCreacion: new Date('2025-03-20')
    },
    {
      nombre: 'Diego Torres',
      rol: 'Inventario',
      fechaCreacion: new Date('2025-03-18')
    },
    {
      nombre: 'Lucía Ramírez',
      rol: 'Cajero',
      fechaCreacion: new Date('2025-03-15')
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
