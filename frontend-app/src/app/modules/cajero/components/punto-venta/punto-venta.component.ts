import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-punto-venta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Nueva Venta</h5>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-8">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Buscar producto por código o nombre..."
                         [(ngModel)]="buscarProducto">
                  <button class="btn btn-primary" type="button">Buscar</button>
                </div>
              </div>
              <div class="col-md-4">
                <button class="btn btn-outline-secondary w-100">Escanear Código</button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of itemsVenta">
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.precio | currency }}</td>
                    <td>
                      <div class="input-group input-group-sm">
                        <button class="btn btn-sm btn-outline-secondary" (click)="decrementarCantidad(item)">-</button>
                        <input type="number" class="form-control text-center" min="1" [(ngModel)]="item.cantidad">
                        <button class="btn btn-sm btn-outline-secondary" (click)="incrementarCantidad(item)">+</button>
                      </div>
                    </td>
                    <td>{{ item.precio * item.cantidad | currency }}</td>
                    <td>
                      <button class="btn btn-sm btn-danger" (click)="eliminarItem(item)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">Detalle de Venta</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="cliente" class="form-label">Cliente:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="cliente" [(ngModel)]="cliente">
                <button class="btn btn-outline-secondary">+</button>
              </div>
            </div>

            <hr>

            <div class="d-flex justify-content-between mb-2">
              <strong>Subtotal:</strong>
              <span>{{ calcularSubtotal() | currency }}</span>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <strong>IVA (16%):</strong>
              <span>{{ calcularIVA() | currency }}</span>
            </div>

            <div class="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <span class="fs-4 text-primary">{{ calcularTotal() | currency }}</span>
            </div>

            <div class="mb-3">
              <label for="metodoPago" class="form-label">Método de Pago:</label>
              <select class="form-select" id="metodoPago" [(ngModel)]="metodoPago">
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            <div class="d-grid gap-2">
              <button class="btn btn-success btn-lg">Completar Venta</button>
              <button class="btn btn-danger">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PuntoVentaComponent {
  buscarProducto: string = '';
  cliente: string = '';
  metodoPago: string = 'efectivo';

  itemsVenta: any[] = [
    { id: 1, codigo: 'P001', nombre: 'Producto de ejemplo 1', precio: 25.99, cantidad: 2 },
    { id: 2, codigo: 'P002', nombre: 'Producto de ejemplo 2', precio: 15.50, cantidad: 1 }
  ];

  incrementarCantidad(item: any): void {
    item.cantidad++;
  }

  decrementarCantidad(item: any): void {
    if (item.cantidad > 1) {
      item.cantidad--;
    }
  }

  eliminarItem(item: any): void {
    this.itemsVenta = this.itemsVenta.filter(i => i.id !== item.id);
  }

  calcularSubtotal(): number {
    return this.itemsVenta.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  calcularIVA(): number {
    return this.calcularSubtotal() * 0.16;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularIVA();
  }
}
