import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cierre-caja',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Cierre de Caja</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-header bg-light">
                <h6 class="mb-0">Resumen de Ventas</h6>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                  <span>Total ventas:</span>
                  <strong>{{ resumenVentas.totalVentas }}</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Monto total:</span>
                  <strong>{{ resumenVentas.montoTotal | currency }}</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ventas en efectivo:</span>
                  <strong>{{ resumenVentas.ventasEfectivo | currency }}</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ventas con tarjeta:</span>
                  <strong>{{ resumenVentas.ventasTarjeta | currency }}</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ventas por transferencia:</span>
                  <strong>{{ resumenVentas.ventasTransferencia | currency }}</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-light">
                <h6 class="mb-0">Arqueo de Caja</h6>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label class="form-label">Monto inicial:</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" [(ngModel)]="arqueoCaja.montoInicial" disabled>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Efectivo en caja:</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" [(ngModel)]="arqueoCaja.efectivoEnCaja">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Diferencia:</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" [value]="calcularDiferencia()" disabled
                           [ngClass]="{'bg-success text-white': calcularDiferencia() >= 0, 'bg-danger text-white': calcularDiferencia() < 0}">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Observaciones:</label>
                  <textarea class="form-control" rows="3" [(ngModel)]="arqueoCaja.observaciones"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr>

        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-outline-secondary">Imprimir Reporte</button>
          <button class="btn btn-success">Confirmar Cierre</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CierreCajaComponent {
  resumenVentas = {
    totalVentas: 15,
    montoTotal: 2580.75,
    ventasEfectivo: 1250.30,
    ventasTarjeta: 830.45,
    ventasTransferencia: 500.00
  };

  arqueoCaja = {
    montoInicial: 500,
    efectivoEnCaja: 1750.30,
    observaciones: ''
  };

  calcularDiferencia(): number {
    return this.arqueoCaja.efectivoEnCaja - (this.arqueoCaja.montoInicial + this.resumenVentas.ventasEfectivo);
  }
}
