import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Gestión de Inventario</h2>
      <div>
        <button class="btn btn-primary me-2">
          <i class="bi bi-plus-circle me-1"></i> Nuevo Producto
        </button>
        <div class="btn-group">
          <button class="btn btn-outline-secondary">
            <i class="bi bi-upload me-1"></i> Importar
          </button>
          <button class="btn btn-outline-secondary">
            <i class="bi bi-download me-1"></i> Exportar
          </button>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control" placeholder="Buscar productos...">
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select">
              <option value="">Todas las categorías</option>
              <option value="1">Electrónicos</option>
              <option value="2">Ropa</option>
              <option value="3">Alimentos</option>
              <option value="4">Hogar</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select">
              <option value="">Estado de stock</option>
              <option value="low">Stock bajo</option>
              <option value="normal">Stock normal</option>
              <option value="high">Stock alto</option>
            </select>
          </div>
          <div class="col-md-2">
            <button class="btn btn-outline-primary w-100">Filtrar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th class="text-center">Stock Actual</th>
                <th class="text-center">Stock Mínimo</th>
                <th class="text-center">Precio Compra</th>
                <th class="text-center">Precio Venta</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SKU-001</td>
                <td>Laptop HP 15"</td>
                <td>Electrónicos</td>
                <td class="text-center"><span class="badge bg-success">25</span></td>
                <td class="text-center">10</td>
                <td class="text-center">$800.00</td>
                <td class="text-center">$1,200.00</td>
                <td class="text-center">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-box"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>SKU-002</td>
                <td>Monitor 24"</td>
                <td>Electrónicos</td>
                <td class="text-center"><span class="badge bg-warning">8</span></td>
                <td class="text-center">10</td>
                <td class="text-center">$150.00</td>
                <td class="text-center">$250.00</td>
                <td class="text-center">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-box"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>SKU-003</td>
                <td>Teclado Inalámbrico</td>
                <td>Electrónicos</td>
                <td class="text-center"><span class="badge bg-danger">3</span></td>
                <td class="text-center">15</td>
                <td class="text-center">$25.00</td>
                <td class="text-center">$45.00</td>
                <td class="text-center">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-box"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>SKU-004</td>
                <td>Camisa Casual M</td>
                <td>Ropa</td>
                <td class="text-center"><span class="badge bg-success">45</span></td>
                <td class="text-center">20</td>
                <td class="text-center">$15.00</td>
                <td class="text-center">$35.00</td>
                <td class="text-center">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-box"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>SKU-005</td>
                <td>Pantalón Casual 32</td>
                <td>Ropa</td>
                <td class="text-center"><span class="badge bg-success">30</span></td>
                <td class="text-center">15</td>
                <td class="text-center">$20.00</td>
                <td class="text-center">$45.00</td>
                <td class="text-center">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-box"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer">
        <nav>
          <ul class="pagination justify-content-end mb-0">
            <li class="page-item disabled"><a class="page-link" href="#">Anterior</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: []
})
export class GestionInventarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
