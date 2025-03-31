import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Panel de Reportes</h2>
      <div>
        <button class="btn btn-outline-primary me-2">
          <i class="bi bi-download me-1"></i> Exportar
        </button>
        <button class="btn btn-outline-secondary">
          <i class="bi bi-printer me-1"></i> Imprimir
        </button>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card bg-light">
          <div class="card-body">
            <h6 class="text-muted">Ventas Total (Mes)</h6>
            <h3>$24,500.00</h3>
            <div class="d-flex align-items-center">
              <span class="badge bg-success me-2">+15%</span>
              <small class="text-muted">vs mes anterior</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card bg-light">
          <div class="card-body">
            <h6 class="text-muted">Productos Vendidos</h6>
            <h3>432</h3>
            <div class="d-flex align-items-center">
              <span class="badge bg-success me-2">+8%</span>
              <small class="text-muted">vs mes anterior</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card bg-light">
          <div class="card-body">
            <h6 class="text-muted">Clientes Nuevos</h6>
            <h3>27</h3>
            <div class="d-flex align-items-center">
              <span class="badge bg-danger me-2">-3%</span>
              <small class="text-muted">vs mes anterior</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card bg-light">
          <div class="card-body">
            <h6 class="text-muted">Ticket Promedio</h6>
            <h3>$65.30</h3>
            <div class="d-flex align-items-center">
              <span class="badge bg-success me-2">+5%</span>
              <small class="text-muted">vs mes anterior</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 mb-4">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Tendencia de Ventas</h5>
            <div>
              <select class="form-select form-select-sm">
                <option selected>Últimos 30 días</option>
                <option>Últimos 3 meses</option>
                <option>Último año</option>
              </select>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-container" style="position: relative; height:300px;">
              <!-- Aquí iría el gráfico de ventas -->
              <div class="text-center text-muted p-5">
                [Gráfico de líneas: Tendencia de ventas por día/semana]
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-4">
        <div class="card h-100">
          <div class="card-header">
            <h5 class="mb-0">Productos Más Vendidos</h5>
          </div>
          <div class="card-body">
            <div class="chart-container" style="position: relative; height:250px;">
              <!-- Aquí iría el gráfico de productos -->
              <div class="text-center text-muted p-5">
                [Gráfico circular: Distribución por producto]
              </div>
            </div>
            <ul class="list-group list-group-flush mt-3">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Producto A
                <span class="badge bg-primary rounded-pill">134</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Producto B
                <span class="badge bg-primary rounded-pill">98</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Producto C
                <span class="badge bg-primary rounded-pill">76</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 mb-4">
        <div class="card h-100">
          <div class="card-header">
            <h5 class="mb-0">Ventas por Categoría</h5>
          </div>
          <div class="card-body">
            <div class="chart-container" style="position: relative; height:250px;">
              <!-- Aquí iría el gráfico de categorías -->
              <div class="text-center text-muted p-5">
                [Gráfico de barras: Ventas por categoría]
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-4">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Ventas Recientes</h5>
            <a href="#" class="text-primary">Ver todo</a>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th class="text-end">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#VNT-1082</td>
                    <td>Juan Pérez</td>
                    <td>12/07/2023</td>
                    <td class="text-end">$120.50</td>
                  </tr>
                  <tr>
                    <td>#VNT-1081</td>
                    <td>María López</td>
                    <td>12/07/2023</td>
                    <td class="text-end">$85.00</td>
                  </tr>
                  <tr>
                    <td>#VNT-1080</td>
                    <td>Carlos García</td>
                    <td>11/07/2023</td>
                    <td class="text-end">$220.75</td>
                  </tr>
                  <tr>
                    <td>#VNT-1079</td>
                    <td>Ana Martínez</td>
                    <td>11/07/2023</td>
                    <td class="text-end">$45.20</td>
                  </tr>
                  <tr>
                    <td>#VNT-1078</td>
                    <td>Roberto Sánchez</td>
                    <td>10/07/2023</td>
                    <td class="text-end">$310.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
