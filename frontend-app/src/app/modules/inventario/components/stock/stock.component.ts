import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Control de Inventario</h2>
      <div>
        <button class="btn btn-primary me-2" (click)="mostrarModalAjuste = true">
          <i class="bi bi-plus-circle me-2"></i> Ajuste de Inventario
        </button>
        <button class="btn btn-outline-secondary">
          <i class="bi bi-download me-2"></i> Exportar
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Buscar productos..." [(ngModel)]="textoBusqueda">
              <button class="btn btn-outline-secondary" type="button">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="filtroCategoria">
              <option value="">Todas las categorías</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Limpieza">Limpieza</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="filtroEstado">
              <option value="">Todos los estados</option>
              <option value="normal">Stock normal</option>
              <option value="bajo">Stock bajo</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary w-100">
              <i class="bi bi-filter me-1"></i> Filtrar
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock Actual</th>
                <th>Stock Mínimo</th>
                <th>Estado</th>
                <th>Última Actualización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let producto of productos">
                <td>{{ producto.codigo }}</td>
                <td>{{ producto.nombre }}</td>
                <td>{{ producto.categoria }}</td>
                <td [ngClass]="{
                  'text-danger fw-bold': producto.stockActual <= 0,
                  'text-warning fw-bold': producto.stockActual > 0 && producto.stockActual < producto.stockMinimo,
                  'text-success': producto.stockActual >= producto.stockMinimo * 2
                }">
                  {{ producto.stockActual }}
                </td>
                <td>{{ producto.stockMinimo }}</td>
                <td>
                  <span class="badge" [ngClass]="{
                    'bg-danger': producto.stockActual <= 0,
                    'bg-warning': producto.stockActual > 0 && producto.stockActual < producto.stockMinimo,
                    'bg-success': producto.stockActual >= producto.stockMinimo
                  }">
                    {{ producto.stockActual <= 0 ? 'Agotado' :
                       producto.stockActual < producto.stockMinimo ? 'Stock Bajo' : 'Normal' }}
                  </span>
                </td>
                <td>{{ producto.ultimaActualizacion | date:'dd/MM/yyyy' }}</td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-info" (click)="seleccionarProducto(producto)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <a [routerLink]="['/inventario/movimientos']" [queryParams]="{producto: producto.id}" class="btn btn-secondary">
                      <i class="bi bi-clock-history"></i>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav aria-label="Paginación de productos">
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

    <!-- Modal para ajuste de inventario -->
    <div class="modal" tabindex="-1" [ngClass]="{'d-block': mostrarModalAjuste}" [ngStyle]="{'display': mostrarModalAjuste ? 'block' : 'none', 'background-color': 'rgba(0,0,0,0.5)'}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ productoSeleccionado ? 'Ajustar Inventario: ' + productoSeleccionado.nombre : 'Nuevo Ajuste de Inventario' }}</h5>
            <button type="button" class="btn-close" (click)="mostrarModalAjuste = false"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3" *ngIf="!productoSeleccionado">
                <label for="producto" class="form-label">Producto</label>
                <select class="form-select" id="producto" [(ngModel)]="ajusteInventario.productoId" name="productoId" required>
                  <option value="">Seleccionar producto</option>
                  <option *ngFor="let p of productos" [value]="p.id">{{ p.nombre }}</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="tipoMovimiento" class="form-label">Tipo de Movimiento</label>
                <select class="form-select" id="tipoMovimiento" [(ngModel)]="ajusteInventario.tipo" name="tipo" required>
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                  <option value="ajuste">Ajuste manual</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="cantidad" class="form-label">Cantidad</label>
                <input type="number" class="form-control" id="cantidad" [(ngModel)]="ajusteInventario.cantidad" name="cantidad" min="1" required>
              </div>

              <div class="mb-3">
                <label for="observacion" class="form-label">Observación</label>
                <textarea class="form-control" id="observacion" [(ngModel)]="ajusteInventario.observacion" name="observacion" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="mostrarModalAjuste = false">Cancelar</button>
            <button type="button" class="btn btn-primary" (click)="guardarAjusteInventario()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      overflow-y: auto;
    }
  `]
})
export class StockComponent implements OnInit {
  textoBusqueda: string = '';
  filtroCategoria: string = '';
  filtroEstado: string = '';

  mostrarModalAjuste: boolean = false;
  productoSeleccionado: any = null;

  ajusteInventario = {
    productoId: '',
    tipo: 'entrada',
    cantidad: 1,
    observacion: ''
  };

  productos = [
    {
      id: 1,
      codigo: 'P001',
      nombre: 'Coca Cola 600ml',
      categoria: 'Bebidas',
      stockActual: 24,
      stockMinimo: 10,
      ultimaActualizacion: new Date('2025-03-25')
    },
    {
      id: 2,
      codigo: 'P002',
      nombre: 'Papas fritas 150g',
      categoria: 'Alimentos',
      stockActual: 8,
      stockMinimo: 10,
      ultimaActualizacion: new Date('2025-03-26')
    },
    {
      id: 3,
      codigo: 'P003',
      nombre: 'Jabón líquido 500ml',
      categoria: 'Limpieza',
      stockActual: 15,
      stockMinimo: 5,
      ultimaActualizacion: new Date('2025-03-27')
    },
    {
      id: 4,
      codigo: 'P004',
      nombre: 'Agua mineral 1L',
      categoria: 'Bebidas',
      stockActual: 0,
      stockMinimo: 12,
      ultimaActualizacion: new Date('2025-03-28')
    }
  ];

  ngOnInit(): void {
    // Aquí se cargarían los productos desde el servicio
  }

  seleccionarProducto(producto: any): void {
    this.productoSeleccionado = producto;
    this.ajusteInventario.productoId = producto.id;
    this.ajusteInventario.tipo = 'entrada';
    this.ajusteInventario.cantidad = 1;
    this.ajusteInventario.observacion = '';
    this.mostrarModalAjuste = true;
  }

  guardarAjusteInventario(): void {
    // Validar campos
    if ((!this.productoSeleccionado && !this.ajusteInventario.productoId) || this.ajusteInventario.cantidad <= 0) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    // Aquí se registraría el ajuste de inventario usando el servicio
    console.log('Guardando ajuste de inventario:', this.ajusteInventario);

    // Actualizar el stock del producto (simulado)
    const productoId = this.productoSeleccionado ? this.productoSeleccionado.id : this.ajusteInventario.productoId;
    const producto = this.productos.find(p => p.id === Number(productoId));

    if (producto) {
      if (this.ajusteInventario.tipo === 'entrada') {
        producto.stockActual += this.ajusteInventario.cantidad;
      } else if (this.ajusteInventario.tipo === 'salida') {
        producto.stockActual = Math.max(0, producto.stockActual - this.ajusteInventario.cantidad);
      } else if (this.ajusteInventario.tipo === 'ajuste') {
        producto.stockActual = this.ajusteInventario.cantidad;
      }

      producto.ultimaActualizacion = new Date();
    }

    // Cerrar modal y limpiar selección
    this.mostrarModalAjuste = false;
    this.productoSeleccionado = null;
    this.ajusteInventario = {
      productoId: '',
      tipo: 'entrada',
      cantidad: 1,
      observacion: ''
    };
  }
}
