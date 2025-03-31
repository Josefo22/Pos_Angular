import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">{{ modoEdicion ? 'Editar Producto' : 'Nuevo Producto' }}</h5>
      </div>
      <div class="card-body">
        <form (ngSubmit)="guardarProducto()">
          <div class="mb-3">
            <label for="codigo" class="form-label">Código</label>
            <input type="text" class="form-control" id="codigo" name="codigo" [(ngModel)]="producto.codigo" required>
          </div>

          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" name="nombre" [(ngModel)]="producto.nombre" required>
          </div>

          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea class="form-control" id="descripcion" name="descripcion" [(ngModel)]="producto.descripcion" rows="3"></textarea>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="categoria" class="form-label">Categoría</label>
              <select class="form-select" id="categoria" name="categoria" [(ngModel)]="producto.categoria">
                <option value="">Seleccione una categoría</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Limpieza">Limpieza</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="precio" class="form-label">Precio</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input type="number" class="form-control" id="precio" name="precio" [(ngModel)]="producto.precio" min="0" step="0.01" required>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="stock" class="form-label">Stock</label>
              <input type="number" class="form-control" id="stock" name="stock" [(ngModel)]="producto.stock" min="0" required>
            </div>

            <div class="col-md-6">
              <label for="activo" class="form-label">Estado</label>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="activo" name="activo" [(ngModel)]="producto.activo">
                <label class="form-check-label" for="activo">
                  {{ producto.activo ? 'Activo' : 'Inactivo' }}
                </label>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" (click)="cancelar()">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class FormProductoComponent implements OnInit {
  modoEdicion: boolean = false;
  productoId: number | null = null;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.modoEdicion = !isNaN(this.productoId) && this.productoId > 0;

    if (this.modoEdicion && this.productoId) {
      // Aquí se cargaría el producto desde el servicio
      // Por ahora, datos de ejemplo
      this.producto = {
        id: this.productoId,
        codigo: 'P00' + this.productoId,
        nombre: 'Producto de ejemplo',
        descripcion: 'Descripción del producto',
        categoria: 'Bebidas',
        precio: 25.99,
        stock: 20,
        activo: true
      };
    }
  }

  guardarProducto(): void {
    // Aquí se guardaría el producto usando el servicio
    console.log('Guardando producto:', this.producto);

    // Simular guardado exitoso y redirigir
    setTimeout(() => {
      this.router.navigate(['/productos']);
    }, 500);
  }

  cancelar(): void {
    this.router.navigate(['/productos']);
  }
}
