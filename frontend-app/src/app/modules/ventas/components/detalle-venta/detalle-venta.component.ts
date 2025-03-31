import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-venta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Detalle de Venta #{{ venta.numero }}</h5>
        <div>
          <button class="btn btn-sm btn-light me-2">
            <i class="bi bi-printer me-1"></i> Imprimir Ticket
          </button>
          <button class="btn btn-sm btn-light" (click)="enviarFactura()" *ngIf="venta.cliente !== 'Cliente General'">
            <i class="bi bi-envelope me-1"></i> Enviar Factura
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-6">
            <h6 class="text-muted">Información de la Venta</h6>
            <div class="mb-2">
              <strong>Fecha:</strong> {{ venta.fecha | date:'dd/MM/yyyy HH:mm' }}
            </div>
            <div class="mb-2">
              <strong>Cliente:</strong> {{ venta.cliente }}
            </div>
            <div class="mb-2">
              <strong>Atendido por:</strong> {{ venta.cajero }}
            </div>
            <div class="mb-2">
              <strong>Método de Pago:</strong> {{ venta.metodoPago }}
            </div>
            <div class="mb-2">
              <strong>Estado:</strong>
              <span class="badge ms-2"
                    [ngClass]="{
                      'bg-success': venta.estado === 'Completada',
                      'bg-danger': venta.estado === 'Cancelada',
                      'bg-warning': venta.estado === 'Pendiente'
                    }">
                {{ venta.estado }}
              </span>
            </div>
          </div>
          <div class="col-md-6 text-end">
            <div class="bg-light p-3 rounded">
              <h6 class="text-muted">Resumen</h6>
              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong>{{ venta.subtotal | currency }}</strong>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>IVA (16%):</span>
                <strong>{{ venta.iva | currency }}</strong>
              </div>
              <div class="d-flex justify-content-between">
                <span class="fs-5">Total:</span>
                <strong class="fs-5 text-primary">{{ venta.total | currency }}</strong>
              </div>
            </div>
          </div>
        </div>

        <h6 class="text-muted mb-3">Productos</h6>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th class="text-end">Precio Unitario</th>
                <th class="text-center">Cantidad</th>
                <th class="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of venta.items">
                <td>{{ item.codigo }}</td>
                <td>{{ item.nombre }}</td>
                <td class="text-end">{{ item.precio | currency }}</td>
                <td class="text-center">{{ item.cantidad }}</td>
                <td class="text-end">{{ item.precio * item.cantidad | currency }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4">
          <button class="btn btn-secondary" (click)="volver()">Volver a la lista</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DetalleVentaComponent implements OnInit {
  ventaId: number = 0;

  venta = {
    id: 0,
    numero: '',
    fecha: new Date(),
    cliente: '',
    cajero: '',
    metodoPago: '',
    estado: '',
    subtotal: 0,
    iva: 0,
    total: 0,
    items: [] as any[]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ventaId = Number(this.route.snapshot.paramMap.get('id'));

    // Aquí se cargaría la venta desde el servicio
    // Por ahora, datos de ejemplo
    this.venta = {
      id: this.ventaId,
      numero: 'V000' + this.ventaId,
      fecha: new Date('2025-03-30T10:30:00'),
      cliente: 'Cliente General',
      cajero: 'Juan Pérez',
      metodoPago: 'Efectivo',
      estado: 'Completada',
      subtotal: 219.60,
      iva: 35.15,
      total: 254.75,
      items: [
        { codigo: 'P001', nombre: 'Coca Cola 600ml', precio: 18.90, cantidad: 3 },
        { codigo: 'P002', nombre: 'Papas fritas 150g', precio: 15.50, cantidad: 2 },
        { codigo: 'P003', nombre: 'Jabón líquido 500ml', precio: 45.00, cantidad: 1 },
        { codigo: 'P004', nombre: 'Agua mineral 1L', precio: 12.00, cantidad: 5 }
      ]
    };
  }

  enviarFactura(): void {
    alert(`Factura enviada por correo al cliente ${this.venta.cliente}`);
  }

  volver(): void {
    this.router.navigate(['/ventas']);
  }
}
