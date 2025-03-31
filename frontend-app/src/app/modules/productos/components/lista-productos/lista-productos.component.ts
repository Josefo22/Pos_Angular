import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Gestión de Productos</h2>
      <a routerLink="/productos/nuevo" class="btn btn-primary">
        <i class="bi bi-plus-circle me-2"></i> Nuevo Producto
      </a>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
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
              <option value="1">Bebidas</option>
              <option value="2">Alimentos</option>
              <option value="3">Limpieza</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="ordenarPor">
              <option value="nombre">Ordenar por nombre</option>
              <option value="precio">Ordenar por precio</option>
              <option value="stock">Ordenar por stock</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let producto of productos">
                <td>{{ producto.codigo }}</td>
                <td>{{ producto.nombre }}</td>
                <td>{{ producto.categoria }}</td>
                <td>{{ producto.precio | currency }}</td>
                <td [ngClass]="{'text-danger': producto.stock < 10}">{{ producto.stock }}</td>
                <td>
                  <span class="badge" [ngClass]="producto.activo ? 'bg-success' : 'bg-danger'">
                    {{ producto.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <a [routerLink]="['/productos', producto.id]" class="btn btn-info">
                      <i class="bi bi-eye"></i>
                    </a>
                    <a [routerLink]="['/productos/editar', producto.id]" class="btn btn-warning">
                      <i class="bi bi-pencil"></i>
                    </a>
                    <button class="btn btn-danger" (click)="eliminarProducto(producto)">
                      <i class="bi bi-trash"></i>
                    </button>
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
  `,
  styles: []
})
export class ListaProductosComponent implements OnInit {
  textoBusqueda: string = '';
  filtroCategoria: string = '';
  ordenarPor: string = 'nombre';

  productos = [
    { id: 1, codigo: 'P001', nombre: 'Coca Cola 600ml', categoria: 'Bebidas', precio: 18.90, stock: 24, activo: true },
    { id: 2, codigo: 'P002', nombre: 'Papas fritas 150g', categoria: 'Alimentos', precio: 15.50, stock: 8, activo: true },
    { id: 3, codigo: 'P003', nombre: 'Jabón líquido 500ml', categoria: 'Limpieza', precio: 45.00, stock: 15, activo: true },
    { id: 4, codigo: 'P004', nombre: 'Agua mineral 1L', categoria: 'Bebidas', precio: 12.00, stock: 30, activo: false }
  ];

  ngOnInit(): void {
    // Aquí se cargarían los productos desde el servicio
  }

  eliminarProducto(producto: any): void {
    if (confirm(`¿Estás seguro de eliminar el producto ${producto.nombre}?`)) {
      // Aquí se llamaría al servicio para eliminar el producto
      this.productos = this.productos.filter(p => p.id !== producto.id);
    }
  }
}
