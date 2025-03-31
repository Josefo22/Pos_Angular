import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Categorías de Productos</h2>
      <button class="btn btn-primary" (click)="mostrarModal = true">
        <i class="bi bi-plus-circle me-1"></i> Nueva Categoría
      </button>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar categoría..."
              [(ngModel)]="terminoBusqueda"
            >
            <button class="btn btn-outline-secondary" type="button">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Productos</th>
                <th>Estado</th>
                <th class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let categoria of categorias">
                <td>{{ categoria.id }}</td>
                <td>{{ categoria.nombre }}</td>
                <td>{{ categoria.descripcion }}</td>
                <td>{{ categoria.cantidadProductos }}</td>
                <td>
                  <span class="badge" [ngClass]="categoria.activo ? 'bg-success' : 'bg-danger'">
                    {{ categoria.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="text-end">
                  <button class="btn btn-sm btn-primary me-1" (click)="editarCategoria(categoria)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" (click)="eliminarCategoria(categoria)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav aria-label="Paginación de categorías">
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

    <!-- Modal para crear/editar categoría -->
    <div class="modal fade show" tabindex="-1" [ngClass]="{'d-block': mostrarModal}" [ngStyle]="{'display': mostrarModal ? 'block' : 'none'}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ categoriaSeleccionada ? 'Editar' : 'Nueva' }} Categoría</h5>
            <button type="button" class="btn-close" (click)="cerrarModal()"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" [(ngModel)]="categoriaForm.nombre" name="nombre" required>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcion" rows="3" [(ngModel)]="categoriaForm.descripcion" name="descripcion"></textarea>
              </div>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="activo" [(ngModel)]="categoriaForm.activo" name="activo">
                <label class="form-check-label" for="activo">Activo</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cerrarModal()">Cancelar</button>
            <button type="button" class="btn btn-primary" (click)="guardarCategoria()">Guardar</button>
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
export class CategoriasComponent implements OnInit {
  terminoBusqueda: string = '';
  mostrarModal: boolean = false;

  categorias = [
    { id: 1, nombre: 'Bebidas', descripcion: 'Refrescos, aguas, cervezas', cantidadProductos: 15, activo: true },
    { id: 2, nombre: 'Snacks', descripcion: 'Botanas, papas, galletas', cantidadProductos: 22, activo: true },
    { id: 3, nombre: 'Lácteos', descripcion: 'Leche, queso, yogurt', cantidadProductos: 8, activo: true },
    { id: 4, nombre: 'Limpieza', descripcion: 'Jabón, detergente, cloro', cantidadProductos: 12, activo: true },
    { id: 5, nombre: 'Panadería', descripcion: 'Pan, pasteles, galletas', cantidadProductos: 6, activo: false }
  ];

  categoriaSeleccionada: any = null;
  categoriaForm = {
    id: 0,
    nombre: '',
    descripcion: '',
    activo: true
  };

  constructor() {}

  ngOnInit(): void {
  }

  editarCategoria(categoria: any): void {
    this.categoriaSeleccionada = categoria;
    this.categoriaForm = {
      id: categoria.id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      activo: categoria.activo
    };
    this.mostrarModal = true;
  }

  eliminarCategoria(categoria: any): void {
    if (confirm(`¿Está seguro de eliminar la categoría "${categoria.nombre}"?`)) {
      // Aquí iría la lógica para eliminar la categoría
      this.categorias = this.categorias.filter(c => c.id !== categoria.id);
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.categoriaSeleccionada = null;
    this.resetForm();
  }

  guardarCategoria(): void {
    if (this.categoriaForm.nombre.trim() === '') {
      alert('El nombre de la categoría es obligatorio');
      return;
    }

    if (this.categoriaSeleccionada) {
      // Editar categoría existente
      const index = this.categorias.findIndex(c => c.id === this.categoriaSeleccionada.id);
      if (index !== -1) {
        this.categorias[index] = {
          ...this.categoriaSeleccionada,
          nombre: this.categoriaForm.nombre,
          descripcion: this.categoriaForm.descripcion,
          activo: this.categoriaForm.activo
        };
      }
    } else {
      // Crear nueva categoría
      const nuevoId = Math.max(...this.categorias.map(c => c.id)) + 1;
      this.categorias.push({
        id: nuevoId,
        nombre: this.categoriaForm.nombre,
        descripcion: this.categoriaForm.descripcion,
        cantidadProductos: 0,
        activo: this.categoriaForm.activo
      });
    }

    this.cerrarModal();
  }

  resetForm(): void {
    this.categoriaForm = {
      id: 0,
      nombre: '',
      descripcion: '',
      activo: true
    };
  }
}
