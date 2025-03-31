import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Gestión de Clientes</h2>
      <div>
        <button class="btn btn-primary" (click)="mostrarModal = true">
          <i class="bi bi-person-plus me-1"></i> Nuevo Cliente
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Buscar cliente..." [(ngModel)]="terminoBusqueda">
              <button class="btn btn-outline-secondary" type="button">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="filtroTipo">
              <option value="">Todos los tipos</option>
              <option value="Normal">Normal</option>
              <option value="Mayorista">Mayorista</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="filtroEstado">
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Última Compra</th>
                <th class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let cliente of clientes">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>
                  <span class="badge" [ngClass]="{
                    'bg-secondary': cliente.tipo === 'Normal',
                    'bg-info': cliente.tipo === 'Mayorista',
                    'bg-warning': cliente.tipo === 'VIP'
                  }">
                    {{ cliente.tipo }}
                  </span>
                </td>
                <td>
                  <span class="badge" [ngClass]="cliente.activo ? 'bg-success' : 'bg-danger'">
                    {{ cliente.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td>{{ cliente.ultimaCompra | date:'dd/MM/yyyy' }}</td>
                <td class="text-end">
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-info" (click)="editarCliente(cliente)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <a routerLink="/ventas/historial" [queryParams]="{cliente: cliente.id}" class="btn btn-secondary">
                      <i class="bi bi-clock-history"></i>
                    </a>
                    <button class="btn"
                      [ngClass]="cliente.activo ? 'btn-danger' : 'btn-success'"
                      (click)="cambiarEstado(cliente)">
                      <i class="bi" [ngClass]="cliente.activo ? 'bi-person-x' : 'bi-person-check'"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav aria-label="Paginación de clientes">
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

    <!-- Modal para crear/editar cliente -->
    <div class="modal fade show" tabindex="-1" [ngClass]="{'d-block': mostrarModal}" [ngStyle]="{'display': mostrarModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ clienteSeleccionado ? 'Editar Cliente' : 'Nuevo Cliente' }}</h5>
            <button type="button" class="btn-close" (click)="cerrarModal()"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="nombre" class="form-label">Nombre completo</label>
                  <input type="text" class="form-control" id="nombre" [(ngModel)]="clienteForm.nombre" name="nombre" required>
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" [(ngModel)]="clienteForm.email" name="email">
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="telefono" class="form-label">Teléfono</label>
                  <input type="text" class="form-control" id="telefono" [(ngModel)]="clienteForm.telefono" name="telefono">
                </div>
                <div class="col-md-6">
                  <label for="tipo" class="form-label">Tipo de cliente</label>
                  <select class="form-select" id="tipo" [(ngModel)]="clienteForm.tipo" name="tipo">
                    <option value="Normal">Normal</option>
                    <option value="Mayorista">Mayorista</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="direccion" [(ngModel)]="clienteForm.direccion" name="direccion">
              </div>

              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="ciudad" class="form-label">Ciudad</label>
                  <input type="text" class="form-control" id="ciudad" [(ngModel)]="clienteForm.ciudad" name="ciudad">
                </div>
                <div class="col-md-4">
                  <label for="estado" class="form-label">Estado/Provincia</label>
                  <input type="text" class="form-control" id="estado" [(ngModel)]="clienteForm.estado" name="estado">
                </div>
                <div class="col-md-4">
                  <label for="codigoPostal" class="form-label">Código Postal</label>
                  <input type="text" class="form-control" id="codigoPostal" [(ngModel)]="clienteForm.codigoPostal" name="codigoPostal">
                </div>
              </div>

              <div class="mb-3">
                <label for="rfc" class="form-label">RFC</label>
                <input type="text" class="form-control" id="rfc" [(ngModel)]="clienteForm.rfc" name="rfc">
              </div>

              <div class="mb-3">
                <label for="notas" class="form-label">Notas</label>
                <textarea class="form-control" id="notas" rows="3" [(ngModel)]="clienteForm.notas" name="notas"></textarea>
              </div>

              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="activo" [(ngModel)]="clienteForm.activo" name="activo">
                <label class="form-check-label" for="activo">Cliente activo</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cerrarModal()">Cancelar</button>
            <button type="button" class="btn btn-primary" (click)="guardarCliente()">Guardar</button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" *ngIf="mostrarModal"></div>
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
export class ListaClientesComponent implements OnInit {
  terminoBusqueda: string = '';
  filtroTipo: string = '';
  filtroEstado: string = '';

  mostrarModal: boolean = false;
  clienteSeleccionado: any = null;

  clientes = [
    {
      id: 1,
      nombre: 'Juan García',
      email: 'juan.garcia@ejemplo.com',
      telefono: '555-123-4567',
      tipo: 'Normal',
      activo: true,
      ultimaCompra: new Date('2025-03-15'),
      direccion: 'Av. Reforma 123',
      ciudad: 'Ciudad de México',
      estado: 'CDMX',
      codigoPostal: '06500',
      rfc: 'XXXX123456XX7',
      notas: ''
    },
    {
      id: 2,
      nombre: 'Empresa XYZ',
      email: 'contacto@xyz.com',
      telefono: '555-987-6543',
      tipo: 'Mayorista',
      activo: true,
      ultimaCompra: new Date('2025-03-27'),
      direccion: 'Calle Industria 456',
      ciudad: 'Monterrey',
      estado: 'Nuevo León',
      codigoPostal: '64000',
      rfc: 'EXY789456DFG',
      notas: 'Requiere factura en cada compra'
    },
    {
      id: 3,
      nombre: 'María Rodríguez',
      email: 'maria.rodriguez@ejemplo.com',
      telefono: '555-456-7890',
      tipo: 'VIP',
      activo: true,
      ultimaCompra: new Date('2025-03-24'),
      direccion: 'Blvd. Insurgentes 789',
      ciudad: 'Guadalajara',
      estado: 'Jalisco',
      codigoPostal: '44100',
      rfc: 'XXXX456789XX1',
      notas: 'Cliente frecuente, ofrecer descuentos'
    },
    {
      id: 4,
      nombre: 'Pedro Sánchez',
      email: 'pedro.sanchez@ejemplo.com',
      telefono: '555-321-7654',
      tipo: 'Normal',
      activo: false,
      ultimaCompra: new Date('2024-12-05'),
      direccion: 'Calle Principal 234',
      ciudad: 'Puebla',
      estado: 'Puebla',
      codigoPostal: '72000',
      rfc: '',
      notas: 'Cliente inactivo'
    },
    {
      id: 5,
      nombre: 'Distribuidora ABC',
      email: 'ventas@abc.com',
      telefono: '555-234-5678',
      tipo: 'Mayorista',
      activo: true,
      ultimaCompra: new Date('2025-03-20'),
      direccion: 'Av. Comercial 567',
      ciudad: 'León',
      estado: 'Guanajuato',
      codigoPostal: '37000',
      rfc: 'DAB123456GHJ',
      notas: 'Pedidos grandes mensuales'
    }
  ];

  clienteForm = {
    id: 0,
    nombre: '',
    email: '',
    telefono: '',
    tipo: 'Normal',
    activo: true,
    direccion: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    rfc: '',
    notas: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  editarCliente(cliente: any): void {
    this.clienteSeleccionado = cliente;
    this.clienteForm = {
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      tipo: cliente.tipo,
      activo: cliente.activo,
      direccion: cliente.direccion,
      ciudad: cliente.ciudad,
      estado: cliente.estado,
      codigoPostal: cliente.codigoPostal,
      rfc: cliente.rfc,
      notas: cliente.notas
    };
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.clienteSeleccionado = null;
    this.resetForm();
  }

  guardarCliente(): void {
    if (this.clienteForm.nombre.trim() === '') {
      alert('El nombre del cliente es obligatorio');
      return;
    }

    if (this.clienteSeleccionado) {
      // Editar cliente existente
      const index = this.clientes.findIndex(c => c.id === this.clienteSeleccionado.id);
      if (index !== -1) {
        this.clientes[index] = {
          ...this.clienteSeleccionado,
          nombre: this.clienteForm.nombre,
          email: this.clienteForm.email,
          telefono: this.clienteForm.telefono,
          tipo: this.clienteForm.tipo,
          activo: this.clienteForm.activo,
          direccion: this.clienteForm.direccion,
          ciudad: this.clienteForm.ciudad,
          estado: this.clienteForm.estado,
          codigoPostal: this.clienteForm.codigoPostal,
          rfc: this.clienteForm.rfc,
          notas: this.clienteForm.notas
        };
      }
    } else {
      // Crear nuevo cliente
      const nuevoId = Math.max(...this.clientes.map(c => c.id)) + 1;
      this.clientes.push({
        id: nuevoId,
        nombre: this.clienteForm.nombre,
        email: this.clienteForm.email,
        telefono: this.clienteForm.telefono,
        tipo: this.clienteForm.tipo,
        activo: this.clienteForm.activo,
        ultimaCompra: new Date(),
        direccion: this.clienteForm.direccion,
        ciudad: this.clienteForm.ciudad,
        estado: this.clienteForm.estado,
        codigoPostal: this.clienteForm.codigoPostal,
        rfc: this.clienteForm.rfc,
        notas: this.clienteForm.notas
      });
    }

    this.cerrarModal();
  }

  cambiarEstado(cliente: any): void {
    if (confirm(`¿Está seguro de ${cliente.activo ? 'desactivar' : 'activar'} al cliente ${cliente.nombre}?`)) {
      const index = this.clientes.findIndex(c => c.id === cliente.id);
      if (index !== -1) {
        this.clientes[index] = {
          ...cliente,
          activo: !cliente.activo
        };
      }
    }
  }

  resetForm(): void {
    this.clienteForm = {
      id: 0,
      nombre: '',
      email: '',
      telefono: '',
      tipo: 'Normal',
      activo: true,
      direccion: '',
      ciudad: '',
      estado: '',
      codigoPostal: '',
      rfc: '',
      notas: ''
    };
  }
}
