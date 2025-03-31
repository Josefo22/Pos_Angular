import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Detalle del Producto</h5>
        <div>
          <a [routerLink]="['/productos/editar', producto.id]" class="btn btn-sm btn-light me-2">
            <i class="bi bi-pencil me-1"></i> Editar
          </a>
          <button class="btn btn-sm btn-danger" (click)="eliminarProducto()">
            <i class="bi bi-trash me-1"></i> Eliminar
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-8">
            <h3>{{ producto.nombre }}</h3>
            <p class="text-muted">Código: {{ producto.codigo }}</p>
            <p>{{ producto.descripcion }}</p>

            <div class="d-flex mt-4">
              <div class="me-4">
                <span class="text-muted">Categoría:</span>
                <span class="badge bg-info ms-2">{{ producto.categoria }}</span>
              </div>
              <div class="me-4">
                <span class="text-muted">Estado:</span>
                <span class="badge ms-2" [ngClass]="producto.activo ? 'bg-success' : 'bg-danger'">
                  {{ producto.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
              <div>
                <span class="text-muted">Stock:</span>
                <span class="ms-2" [ngClass]="{'text-danger fw-bold': producto.stock < 10}">
                  {{ producto.stock }} unidades
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <div class="p-3 bg-light rounded">
              <h4 class="text-primary">Precio</h4>
              <h2 class="mb-0">{{ producto.precio | currency }}</h2>
            </div>
          </div>
        </div>

        <hr>

        <div class="row">
          <div class="col-md-12">
            <h5>Historial de Movimientos</h5>
            <table class="table table-sm table-striped">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Usuario</th>
                  <th>Observación</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let movimiento of movimientos">
                  <td>{{ movimiento.fecha | date:'dd/MM/yyyy HH:mm' }}</td>
                  <td>
                    <span class="badge" [ngClass]="movimiento.tipo === 'Entrada' ? 'bg-success' : 'bg-warning'">
                      {{ movimiento.tipo }}
                    </span>
                  </td>
                  <td>{{ movimiento.cantidad }}</td>
                  <td>{{ movimiento.usuario }}</td>
                  <td>{{ movimiento.observacion }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-4">
          <button class="btn btn-secondary" (click)="volver()">Volver a la lista</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DetalleProductoComponent implements OnInit {
  productoId: number = 0;

  producto = {
    id: 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: 0,
    stock: 0,
    activo: true
  };

  movimientos = [
    {
      fecha: new Date('2025-03-25T10:30:00'),
      tipo: 'Entrada',
      cantidad: 10,
      usuario: 'Juan Pérez',
      observacion: 'Reposición de stock'
    },
    {
      fecha: new Date('2025-03-27T14:15:00'),
      tipo: 'Salida',
      cantidad: 2,
      usuario: 'Ana Gómez',
      observacion: 'Venta #V0023'
    },
    {
      fecha: new Date('2025-03-29T09:45:00'),
      tipo: 'Entrada',
      cantidad: 5,
      usuario: 'Juan Pérez',
      observacion: 'Reposición de stock'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));

    // Aquí se cargaría el producto desde el servicio
    // Por ahora, datos de ejemplo
    this.producto = {
      id: this.productoId,
      codigo: 'P00' + this.productoId,
      nombre: 'Producto de ejemplo ' + this.productoId,
      descripcion: 'Este es un producto de ejemplo con una descripción detallada de sus características y usos.',
      categoria: 'Bebidas',
      precio: 25.99,
      stock: 15,
      activo: true
    };
  }

  eliminarProducto(): void {
    if (confirm(`¿Estás seguro de eliminar el producto ${this.producto.nombre}?`)) {
      // Aquí se eliminaría el producto usando el servicio
      console.log('Eliminando producto:', this.producto.id);

      // Simular eliminación exitosa y redirigir
      setTimeout(() => {
        this.router.navigate(['/productos']);
      }, 500);
    }
  }

  volver(): void {
    this.router.navigate(['/productos']);
  }
}
