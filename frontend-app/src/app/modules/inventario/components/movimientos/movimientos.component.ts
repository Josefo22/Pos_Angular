import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>
        Movimientos de Inventario
        <small class="text-muted" *ngIf="productoSeleccionado">
          ({{ productoSeleccionado.nombre }})
        </small>
      </h2>
      <div>
        <a routerLink="/inventario" class="btn btn-secondary me-2">
          <i class="bi bi-arrow-left me-1"></i> Volver
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
            <label class="form-label">Producto:</label>
            <select class="form-select" [(ngModel)]="filtroProductoId">
              <option value="">Todos los productos</option>
              <option *ngFor="let producto of productos" [value]="producto.id">{{ producto.nombre }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Tipo:</label>
            <select class="form-select" [(ngModel)]="filtroTipo">
              <option value="">Todos los tipos</option>
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
              <option value="ajuste">Ajuste</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12">
            <button class="btn btn-primary me-2">
              <i class="bi bi-search me-1"></i> Filtrar
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-x-circle me-1"></i> Limpiar Filtros
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Stock Anterior</th>
                <th>Stock Resultante</th>
                <th>Usuario</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let movimiento of movimientos">
                <td>{{ movimiento.fecha | date:'dd/MM/yyyy HH:mm' }}</td>
                <td>{{ movimiento.producto }}</td>
                <td>
                  <span class="badge" [ngClass]="{
                    'bg-success': movimiento.tipo === 'Entrada',
                    'bg-warning': movimiento.tipo === 'Salida',
                    'bg-info': movimiento.tipo === 'Ajuste'
                  }">
                    {{ movimiento.tipo }}
                  </span>
                </td>
                <td>{{ movimiento.cantidad }}</td>
                <td>{{ movimiento.stockAnterior }}</td>
                <td>{{ movimiento.stockResultante }}</td>
                <td>{{ movimiento.usuario }}</td>
                <td>{{ movimiento.observacion }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav aria-label="Paginación de movimientos">
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
export class MovimientosComponent implements OnInit {
  filtroDesde: string = '';
  filtroHasta: string = '';
  filtroProductoId: string = '';
  filtroTipo: string = '';

  productoSeleccionado: any = null;

  productos = [
    { id: 1, nombre: 'Coca Cola 600ml' },
    { id: 2, nombre: 'Papas fritas 150g' },
    { id: 3, nombre: 'Jabón líquido 500ml' },
    { id: 4, nombre: 'Agua mineral 1L' }
  ];

  movimientos = [
    {
      id: 1,
      fecha: new Date('2025-03-25T10:30:00'),
      producto: 'Coca Cola 600ml',
      tipo: 'Entrada',
      cantidad: 10,
      stockAnterior: 14,
      stockResultante: 24,
      usuario: 'Juan Pérez',
      observacion: 'Reposición de stock'
    },
    {
      id: 2,
      fecha: new Date('2025-03-26T14:15:00'),
      producto: 'Coca Cola 600ml',
      tipo: 'Salida',
      cantidad: 3,
      stockAnterior: 24,
      stockResultante: 21,
      usuario: 'Ana Gómez',
      observacion: 'Venta #V0025'
    },
    {
      id: 3,
      fecha: new Date('2025-03-27T09:45:00'),
      producto: 'Papas fritas 150g',
      tipo: 'Entrada',
      cantidad: 15,
      stockAnterior: 5,
      stockResultante: 20,
      usuario: 'Juan Pérez',
      observacion: 'Reposición de stock'
    },
    {
      id: 4,
      fecha: new Date('2025-03-28T11:20:00'),
      producto: 'Papas fritas 150g',
      tipo: 'Salida',
      cantidad: 12,
      stockAnterior: 20,
      stockResultante: 8,
      usuario: 'Ana Gómez',
      observacion: 'Ventas del día'
    },
    {
      id: 5,
      fecha: new Date('2025-03-29T16:10:00'),
      producto: 'Agua mineral 1L',
      tipo: 'Ajuste',
      cantidad: 0,
      stockAnterior: 5,
      stockResultante: 0,
      usuario: 'Carlos Rodríguez',
      observacion: 'Producto vencido'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el parámetro del producto si existe
    this.route.queryParams.subscribe(params => {
      if (params['producto']) {
        this.filtroProductoId = params['producto'];
        this.productoSeleccionado = this.productos.find(p => p.id === Number(this.filtroProductoId));

        // Filtrar movimientos por producto (simulado)
        if (this.productoSeleccionado) {
          this.movimientos = this.movimientos.filter(m => m.producto === this.productoSeleccionado.nombre);
        }
      }
    });

    // Establecer las fechas por defecto (último mes)
    const hoy = new Date();
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);

    this.filtroHasta = hoy.toISOString().split('T')[0];
    this.filtroDesde = unMesAtras.toISOString().split('T')[0];
  }
}
