import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Historial de Ventas</h2>
      <div>
        <a routerLink="/ventas/nueva" class="btn btn-primary me-2">
          <i class="bi bi-plus-circle me-2"></i> Nueva Venta
        </a>
        <button class="btn btn-outline-secondary">
          <i class="bi bi-download me-2"></i> Exportar
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-3">
            <label class="form-label">Desde:</label>
            <input type="date" class="form-control" [(ngModel)]="filtroDesde">
          </div>
          <div class="col-md-3">
            <label class="form-label">Hasta:</label>
            <input type="date" class="form-control" [(ngModel)]="filtroHasta">
          </div>
          <div class="col-md-3">
            <label class="form-label">Cliente:</label>
            <input type="text" class="form-control" placeholder="Nombre del cliente" [(ngModel)]="filtroCliente">
          </div>
          <div class="col-md-3">
            <label class="form-label">Estado:</label>
            <select class="form-select" [(ngModel)]="filtroEstado">
              <option value="">Todos</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12">
            <button class="btn btn-primary me-2">
              <i class="bi bi-search me-2"></i> Filtrar
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-x-circle me-2"></i> Limpiar filtros
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th># Venta</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Cajero</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let venta of ventas">
                <td>{{ venta.numero }}</td>
                <td>{{ venta.fecha | date:'dd/MM/yyyy HH:mm' }}</td>
                <td>{{ venta.cliente }}</td>
                <td>{{ venta.cajero }}</td>
                <td>{{ venta.total | currency }}</td>
                <td>{{ venta.metodoPago }}</td>
                <td>
                  <span class="badge"
                       [ngClass]="{
                         'bg-success': venta.estado === 'Completada',
                         'bg-danger': venta.estado === 'Cancelada',
                         'bg-warning': venta.estado === 'Pendiente'
                       }">
                    {{ venta.estado }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <a [routerLink]="['/ventas', venta.id]" class="btn btn-info">
                      <i class="bi bi-eye"></i>
                    </a>
                    <button class="btn btn-outline-secondary">
                      <i class="bi bi-printer"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav aria-label="Paginación de ventas">
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
  `,
  styles: []
})
export class HistorialVentasComponent implements OnInit {
  filtroDesde: string = '';
  filtroHasta: string = '';
  filtroCliente: string = '';
  filtroEstado: string = '';

  ventas = [
    {
      id: 1,
      numero: 'V0001',
      fecha: new Date('2025-03-30T10:30:00'),
      cliente: 'Cliente General',
      cajero: 'Juan Pérez',
      total: 254.75,
      metodoPago: 'Efectivo',
      estado: 'Completada'
    },
    {
      id: 2,
      numero: 'V0002',
      fecha: new Date('2025-03-30T11:15:00'),
      cliente: 'María López',
      cajero: 'Juan Pérez',
      total: 178.50,
      metodoPago: 'Tarjeta',
      estado: 'Completada'
    },
    {
      id: 3,
      numero: 'V0003',
      fecha: new Date('2025-03-30T12:45:00'),
      cliente: 'Roberto García',
      cajero: 'Ana Gómez',
      total: 320.25,
      metodoPago: 'Transferencia',
      estado: 'Pendiente'
    },
    {
      id: 4,
      numero: 'V0004',
      fecha: new Date('2025-03-30T14:20:00'),
      cliente: 'Laura Martínez',
      cajero: 'Ana Gómez',
      total: 150.00,
      metodoPago: 'Efectivo',
      estado: 'Cancelada'
    }
  ];

  ngOnInit(): void {
    // Aquí se cargarían las ventas desde el servicio
    // Establecer las fechas por defecto (último mes)
    const hoy = new Date();
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);

    this.filtroHasta = hoy.toISOString().split('T')[0];
    this.filtroDesde = unMesAtras.toISOString().split('T')[0];
  }
}
