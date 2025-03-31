import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-venta',
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
                  <button class="btn btn-primary" type="button" (click)="buscarProductos()">Buscar</button>
                </div>
              </div>
              <div class="col-md-4">
                <button class="btn btn-outline-secondary w-100">Escanear Código</button>
              </div>
            </div>

            <!-- Lista de resultados de búsqueda -->
            <div class="table-responsive mb-3" *ngIf="productosEncontrados.length > 0">
              <table class="table table-sm table-hover">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let producto of productosEncontrados">
                    <td>{{ producto.codigo }}</td>
                    <td>{{ producto.nombre }}</td>
                    <td>{{ producto.precio | currency }}</td>
                    <td [ngClass]="{'text-danger': producto.stock < 5}">{{ producto.stock }}</td>
                    <td>
                      <button class="btn btn-sm btn-success" (click)="agregarProducto(producto)">
                        <i class="bi bi-plus-circle"></i> Agregar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                        <input type="number" class="form-control text-center" min="1" [(ngModel)]="item.cantidad" (change)="actualizarTotales()">
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
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-person-plus"></i>
                </button>
              </div>
            </div>

            <hr>

            <div class="d-flex justify-content-between mb-2">
              <strong>Subtotal:</strong>
              <span>{{ subtotal | currency }}</span>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <strong>IVA (16%):</strong>
              <span>{{ iva | currency }}</span>
            </div>

            <div class="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <span class="fs-4 text-primary">{{ total | currency }}</span>
            </div>

            <div class="mb-3">
              <label for="metodoPago" class="form-label">Método de Pago:</label>
              <select class="form-select" id="metodoPago" [(ngModel)]="metodoPago">
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            <div class="mb-3" *ngIf="metodoPago === 'efectivo'">
              <label for="montoRecibido" class="form-label">Monto Recibido:</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input type="number" class="form-control" id="montoRecibido" [(ngModel)]="montoRecibido" (change)="calcularCambio()">
              </div>
            </div>

            <div class="mb-3" *ngIf="metodoPago === 'efectivo' && cambio > 0">
              <label class="form-label">Cambio:</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control bg-light" [value]="cambio | currency" disabled>
              </div>
            </div>

            <div class="d-grid gap-2">
              <button class="btn btn-success btn-lg" [disabled]="itemsVenta.length === 0" (click)="completarVenta()">
                <i class="bi bi-check-circle me-2"></i>Completar Venta
              </button>
              <button class="btn btn-danger" (click)="cancelar()">
                <i class="bi bi-x-circle me-2"></i>Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class NuevaVentaComponent {
  buscarProducto: string = '';
  cliente: string = 'Cliente General';
  metodoPago: string = 'efectivo';
  montoRecibido: number = 0;
  cambio: number = 0;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  productosEncontrados: any[] = [];

  itemsVenta: any[] = [];

  constructor(private router: Router) {}

  buscarProductos(): void {
    if (this.buscarProducto.trim() === '') {
      this.productosEncontrados = [];
      return;
    }

    // Aquí se buscarían productos desde el servicio
    // Por ahora, datos de ejemplo
    this.productosEncontrados = [
      { id: 1, codigo: 'P001', nombre: 'Coca Cola 600ml', precio: 18.90, stock: 24 },
      { id: 2, codigo: 'P002', nombre: 'Pepsi 600ml', precio: 17.50, stock: 15 },
      { id: 3, codigo: 'P003', nombre: 'Sprite 600ml', precio: 18.50, stock: 3 }
    ];
  }

  agregarProducto(producto: any): void {
    // Verificar si el producto ya está en la lista
    const itemExistente = this.itemsVenta.find(item => item.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.itemsVenta.push({
        id: producto.id,
        codigo: producto.codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      });
    }

    this.actualizarTotales();
    this.productosEncontrados = [];
    this.buscarProducto = '';
  }

  incrementarCantidad(item: any): void {
    item.cantidad++;
    this.actualizarTotales();
  }

  decrementarCantidad(item: any): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.actualizarTotales();
    }
  }

  eliminarItem(item: any): void {
    this.itemsVenta = this.itemsVenta.filter(i => i.id !== item.id);
    this.actualizarTotales();
  }

  actualizarTotales(): void {
    this.subtotal = this.itemsVenta.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    this.iva = this.subtotal * 0.16;
    this.total = this.subtotal + this.iva;
    this.calcularCambio();
  }

  calcularCambio(): void {
    this.cambio = this.montoRecibido > this.total ? this.montoRecibido - this.total : 0;
  }

  completarVenta(): void {
    // Verificar si hay productos
    if (this.itemsVenta.length === 0) {
      alert('Debe agregar al menos un producto a la venta.');
      return;
    }

    // Verificar monto recibido si es efectivo
    if (this.metodoPago === 'efectivo' && this.montoRecibido < this.total) {
      alert('El monto recibido debe ser mayor o igual al total de la venta.');
      return;
    }

    // Aquí se registraría la venta usando el servicio
    console.log('Registrando venta:', {
      cliente: this.cliente,
      metodoPago: this.metodoPago,
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total,
      items: this.itemsVenta
    });

    // Simular registro exitoso y redirigir
    setTimeout(() => {
      alert('Venta registrada con éxito!');
      this.router.navigate(['/ventas']);
    }, 500);
  }

  cancelar(): void {
    if (this.itemsVenta.length > 0) {
      if (confirm('¿Estás seguro de cancelar la venta?')) {
        this.router.navigate(['/ventas']);
      }
    } else {
      this.router.navigate(['/ventas']);
    }
  }
}
