import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Gestión de Usuarios</h2>
      <div>
        <button class="btn btn-primary me-2" (click)="mostrarModalUsuario = true">
          <i class="bi bi-person-plus me-1"></i> Nuevo Usuario
        </button>
        <a routerLink="/usuarios" class="btn btn-outline-secondary">
          <i class="bi bi-speedometer me-1"></i> Dashboard
        </a>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Buscar usuario..." [(ngModel)]="terminoBusqueda">
              <button class="btn btn-outline-secondary" type="button">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="filtroRol">
              <option value="">Todos los roles</option>
              <option value="Administrador">Administrador</option>
              <option value="Cajero">Cajero</option>
              <option value="Inventario">Inventario</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="filtroEstado">
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Último Acceso</th>
                <th class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let usuario of usuarios">
                <td>{{ usuario.id }}</td>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.email }}</td>
                <td>
                  <span class="badge" [ngClass]="{
                    'bg-success': usuario.rol === 'Administrador',
                    'bg-info': usuario.rol === 'Cajero',
                    'bg-secondary': usuario.rol === 'Inventario'
                  }">
                    {{ usuario.rol }}
                  </span>
                </td>
                <td>
                  <span class="badge" [ngClass]="{
                    'bg-success': usuario.estado === 'activo',
                    'bg-danger': usuario.estado === 'bloqueado',
                    'bg-warning': usuario.estado === 'inactivo'
                  }">
                    {{ usuario.estado === 'activo' ? 'Activo' :
                       usuario.estado === 'bloqueado' ? 'Bloqueado' : 'Inactivo' }}
                  </span>
                </td>
                <td>{{ usuario.ultimoAcceso | date:'dd/MM/yyyy HH:mm' }}</td>
                <td class="text-end">
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-info" (click)="editarUsuario(usuario)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-warning" (click)="cambiarContrasena(usuario)">
                      <i class="bi bi-key"></i>
                    </button>
                    <button class="btn"
                      [ngClass]="usuario.estado === 'activo' ? 'btn-danger' : 'btn-success'"
                      (click)="cambiarEstado(usuario)">
                      <i class="bi" [ngClass]="usuario.estado === 'activo' ? 'bi-lock' : 'bi-unlock'"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav aria-label="Paginación de usuarios">
          <ul class="pagination justify-content-center mt-4">
            <li class="page-item disabled">
              <a class="page-link" href="#">Anterior</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Siguiente</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal para crear/editar usuario -->
    <div class="modal fade show" tabindex="-1" [ngClass]="{'d-block': mostrarModalUsuario}" [ngStyle]="{'display': mostrarModalUsuario ? 'block' : 'none'}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ usuarioSeleccionado ? 'Editar Usuario' : 'Nuevo Usuario' }}</h5>
            <button type="button" class="btn-close" (click)="cerrarModalUsuario()"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre completo</label>
                <input type="text" class="form-control" id="nombre" [(ngModel)]="usuarioForm.nombre" name="nombre" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" [(ngModel)]="usuarioForm.email" name="email" required>
              </div>
              <div class="mb-3" *ngIf="!usuarioSeleccionado">
                <label for="contrasena" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="contrasena" [(ngModel)]="usuarioForm.contrasena" name="contrasena" required>
              </div>
              <div class="mb-3">
                <label for="rol" class="form-label">Rol</label>
                <select class="form-select" id="rol" [(ngModel)]="usuarioForm.rol" name="rol" required>
                  <option value="Administrador">Administrador</option>
                  <option value="Cajero">Cajero</option>
                  <option value="Inventario">Inventario</option>
                </select>
              </div>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="estado" [(ngModel)]="usuarioForm.activo" name="activo">
                <label class="form-check-label" for="estado">Usuario activo</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cerrarModalUsuario()">Cancelar</button>
            <button type="button" class="btn btn-primary" (click)="guardarUsuario()">Guardar</button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" *ngIf="mostrarModalUsuario"></div>
    </div>

    <!-- Modal para cambiar contraseña -->
    <div class="modal fade show" tabindex="-1" [ngClass]="{'d-block': mostrarModalContrasena}" [ngStyle]="{'display': mostrarModalContrasena ? 'block' : 'none'}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cambiar Contraseña</h5>
            <button type="button" class="btn-close" (click)="cerrarModalContrasena()"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="usuarioNombre" class="form-label">Usuario</label>
                <input type="text" class="form-control" id="usuarioNombre" [value]="usuarioSeleccionado?.nombre" readonly>
              </div>
              <div class="mb-3">
                <label for="nuevaContrasena" class="form-label">Nueva contraseña</label>
                <input type="password" class="form-control" id="nuevaContrasena" [(ngModel)]="nuevaContrasena" name="nuevaContrasena" required>
              </div>
              <div class="mb-3">
                <label for="confirmarContrasena" class="form-label">Confirmar contraseña</label>
                <input type="password" class="form-control" id="confirmarContrasena" [(ngModel)]="confirmarContrasena" name="confirmarContrasena" required>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="requiereCambio" [(ngModel)]="requiereCambioContrasena" name="requiereCambio">
                <label class="form-check-label" for="requiereCambio">Requerir cambio en el próximo inicio de sesión</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cerrarModalContrasena()">Cancelar</button>
            <button type="button" class="btn btn-primary" (click)="guardarContrasena()">Guardar</button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" *ngIf="mostrarModalContrasena"></div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1040;
    }
  `]
})
export class ListaUsuariosComponent implements OnInit {
  terminoBusqueda: string = '';
  filtroRol: string = '';
  filtroEstado: string = '';

  mostrarModalUsuario: boolean = false;
  mostrarModalContrasena: boolean = false;

  usuarioSeleccionado: any = null;

  usuarios = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan.perez@ejemplo.com',
      rol: 'Administrador',
      estado: 'activo',
      ultimoAcceso: new Date('2025-03-29T09:15:00')
    },
    {
      id: 2,
      nombre: 'Ana Gómez',
      email: 'ana.gomez@ejemplo.com',
      rol: 'Cajero',
      estado: 'activo',
      ultimoAcceso: new Date('2025-03-28T18:30:00')
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@ejemplo.com',
      rol: 'Administrador',
      estado: 'activo',
      ultimoAcceso: new Date('2025-03-28T14:45:00')
    },
    {
      id: 4,
      nombre: 'Laura Martínez',
      email: 'laura.martinez@ejemplo.com',
      rol: 'Cajero',
      estado: 'activo',
      ultimoAcceso: new Date('2025-03-27T11:20:00')
    },
    {
      id: 5,
      nombre: 'Pedro Sánchez',
      email: 'pedro.sanchez@ejemplo.com',
      rol: 'Cajero',
      estado: 'bloqueado',
      ultimoAcceso: new Date('2025-03-25T16:10:00')
    },
    {
      id: 6,
      nombre: 'María López',
      email: 'maria.lopez@ejemplo.com',
      rol: 'Cajero',
      estado: 'activo',
      ultimoAcceso: new Date('2025-03-25T10:30:00')
    },
    {
      id: 7,
      nombre: 'Roberto Fernández',
      email: 'roberto.fernandez@ejemplo.com',
      rol: 'Administrador',
      estado: 'activo',
      ultimoAcceso: new Date('2025-03-22T15:40:00')
    },
    {
      id: 8,
      nombre: 'Sofía García',
      email: 'sofia.garcia@ejemplo.com',
      rol: 'Cajero',
      estado: 'inactivo',
      ultimoAcceso: new Date('2025-03-20T13:25:00')
    }
  ];

  usuarioForm = {
    id: 0,
    nombre: '',
    email: '',
    contrasena: '',
    rol: 'Cajero',
    activo: true
  };

  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  requiereCambioContrasena: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  editarUsuario(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.usuarioForm = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      contrasena: '',
      rol: usuario.rol,
      activo: usuario.estado === 'activo'
    };
    this.mostrarModalUsuario = true;
  }

  cerrarModalUsuario(): void {
    this.mostrarModalUsuario = false;
    this.usuarioSeleccionado = null;
    this.resetFormUsuario();
  }

  guardarUsuario(): void {
    if (this.usuarioForm.nombre.trim() === '' || this.usuarioForm.email.trim() === '') {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    if (!this.usuarioSeleccionado && this.usuarioForm.contrasena.trim() === '') {
      alert('La contraseña es obligatoria para nuevos usuarios');
      return;
    }

    if (this.usuarioSeleccionado) {
      // Editar usuario existente
      const index = this.usuarios.findIndex(u => u.id === this.usuarioSeleccionado.id);
      if (index !== -1) {
        this.usuarios[index] = {
          ...this.usuarioSeleccionado,
          nombre: this.usuarioForm.nombre,
          email: this.usuarioForm.email,
          rol: this.usuarioForm.rol,
          estado: this.usuarioForm.activo ? 'activo' : 'inactivo'
        };
      }
    } else {
      // Crear nuevo usuario
      const nuevoId = Math.max(...this.usuarios.map(u => u.id)) + 1;
      this.usuarios.push({
        id: nuevoId,
        nombre: this.usuarioForm.nombre,
        email: this.usuarioForm.email,
        rol: this.usuarioForm.rol,
        estado: this.usuarioForm.activo ? 'activo' : 'inactivo',
        ultimoAcceso: new Date()
      });
    }

    this.cerrarModalUsuario();
  }

  cambiarContrasena(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    this.requiereCambioContrasena = false;
    this.mostrarModalContrasena = true;
  }

  cerrarModalContrasena(): void {
    this.mostrarModalContrasena = false;
    this.usuarioSeleccionado = null;
  }

  guardarContrasena(): void {
    if (this.nuevaContrasena.trim() === '') {
      alert('Por favor ingrese la nueva contraseña');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí iría la lógica para cambiar la contraseña
    console.log(`Contraseña cambiada para ${this.usuarioSeleccionado.nombre}`);
    console.log(`Requiere cambio: ${this.requiereCambioContrasena}`);

    this.cerrarModalContrasena();
  }

  cambiarEstado(usuario: any): void {
    if (confirm(`¿Está seguro de ${usuario.estado === 'activo' ? 'bloquear' : 'activar'} al usuario ${usuario.nombre}?`)) {
      const index = this.usuarios.findIndex(u => u.id === usuario.id);
      if (index !== -1) {
        this.usuarios[index] = {
          ...usuario,
          estado: usuario.estado === 'activo' ? 'bloqueado' : 'activo'
        };
      }
    }
  }

  resetFormUsuario(): void {
    this.usuarioForm = {
      id: 0,
      nombre: '',
      email: '',
      contrasena: '',
      rol: 'Cajero',
      activo: true
    };
  }
}
