import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-preferencias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Preferencias del Sistema</h2>
      <div>
        <a routerLink="/usuarios" class="btn btn-secondary">
          <i class="bi bi-arrow-left me-1"></i> Volver
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Navegación</h5>
          </div>
          <div class="list-group list-group-flush">
            <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    [ngClass]="{'active': seccionActiva === 'general'}"
                    (click)="cambiarSeccion('general')">
              General
              <i class="bi bi-gear"></i>
            </button>
            <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    [ngClass]="{'active': seccionActiva === 'seguridad'}"
                    (click)="cambiarSeccion('seguridad')">
              Seguridad
              <i class="bi bi-shield-lock"></i>
            </button>
            <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    [ngClass]="{'active': seccionActiva === 'notificaciones'}"
                    (click)="cambiarSeccion('notificaciones')">
              Notificaciones
              <i class="bi bi-bell"></i>
            </button>
            <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    [ngClass]="{'active': seccionActiva === 'sistema'}"
                    (click)="cambiarSeccion('sistema')">
              Sistema
              <i class="bi bi-sliders"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-9 mb-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">
              <span *ngIf="seccionActiva === 'general'">Preferencias Generales</span>
              <span *ngIf="seccionActiva === 'seguridad'">Configuración de Seguridad</span>
              <span *ngIf="seccionActiva === 'notificaciones'">Configuración de Notificaciones</span>
              <span *ngIf="seccionActiva === 'sistema'">Configuración del Sistema</span>
            </h5>
          </div>
          <div class="card-body">
            <!-- Preferencias Generales -->
            <div *ngIf="seccionActiva === 'general'">
              <div class="mb-4">
                <h6 class="text-muted mb-3">Información de la Empresa</h6>
                <div class="mb-3">
                  <label for="nombreEmpresa" class="form-label">Nombre de la Empresa</label>
                  <input type="text" class="form-control" id="nombreEmpresa" [(ngModel)]="preferencias.nombreEmpresa">
                </div>
                <div class="mb-3">
                  <label for="direccion" class="form-label">Dirección</label>
                  <input type="text" class="form-control" id="direccion" [(ngModel)]="preferencias.direccion">
                </div>
                <div class="mb-3">
                  <label for="telefono" class="form-label">Teléfono</label>
                  <input type="text" class="form-control" id="telefono" [(ngModel)]="preferencias.telefono">
                </div>
                <div class="mb-3">
                  <label for="correo" class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control" id="correo" [(ngModel)]="preferencias.correo">
                </div>
                <div class="mb-3">
                  <label for="rfc" class="form-label">RFC</label>
                  <input type="text" class="form-control" id="rfc" [(ngModel)]="preferencias.rfc">
                </div>
              </div>

              <div class="mb-4">
                <h6 class="text-muted mb-3">Zona Horaria y Localización</h6>
                <div class="mb-3">
                  <label for="zonaHoraria" class="form-label">Zona Horaria</label>
                  <select class="form-select" id="zonaHoraria" [(ngModel)]="preferencias.zonaHoraria">
                    <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                    <option value="America/Tijuana">Tijuana (GMT-8)</option>
                    <option value="America/Cancun">Cancún (GMT-5)</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="formatoFecha" class="form-label">Formato de Fecha</label>
                  <select class="form-select" id="formatoFecha" [(ngModel)]="preferencias.formatoFecha">
                    <option value="dd/MM/yyyy">DD/MM/AAAA</option>
                    <option value="MM/dd/yyyy">MM/DD/AAAA</option>
                    <option value="yyyy-MM-dd">AAAA-MM-DD</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="moneda" class="form-label">Moneda</label>
                  <select class="form-select" id="moneda" [(ngModel)]="preferencias.moneda">
                    <option value="MXN">Peso Mexicano (MXN)</option>
                    <option value="USD">Dólar Estadounidense (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Configuración de Seguridad -->
            <div *ngIf="seccionActiva === 'seguridad'">
              <div class="mb-4">
                <h6 class="text-muted mb-3">Política de Contraseñas</h6>
                <div class="mb-3">
                  <label for="longitudMinima" class="form-label">Longitud Mínima de Contraseña</label>
                  <input type="number" class="form-control" id="longitudMinima" min="6" max="16" [(ngModel)]="preferencias.longitudMinimaContrasena">
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="checkbox" id="requiereMayusculas" [(ngModel)]="preferencias.requiereMayusculas">
                  <label class="form-check-label" for="requiereMayusculas">
                    Requerir letras mayúsculas
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="checkbox" id="requiereNumeros" [(ngModel)]="preferencias.requiereNumeros">
                  <label class="form-check-label" for="requiereNumeros">
                    Requerir números
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="checkbox" id="requiereEspeciales" [(ngModel)]="preferencias.requiereEspeciales">
                  <label class="form-check-label" for="requiereEspeciales">
                    Requerir caracteres especiales
                  </label>
                </div>
              </div>

              <div class="mb-4">
                <h6 class="text-muted mb-3">Configuración de Sesión</h6>
                <div class="mb-3">
                  <label for="tiempoInactividad" class="form-label">Tiempo de Inactividad (minutos)</label>
                  <input type="number" class="form-control" id="tiempoInactividad" min="5" max="60" [(ngModel)]="preferencias.tiempoInactividad">
                  <small class="form-text text-muted">Tiempo antes de cerrar la sesión por inactividad</small>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="checkbox" id="cerrarSesionAlCerrarNavegador" [(ngModel)]="preferencias.cerrarSesionAlCerrarNavegador">
                  <label class="form-check-label" for="cerrarSesionAlCerrarNavegador">
                    Cerrar sesión al cerrar el navegador
                  </label>
                </div>
              </div>
            </div>

            <!-- Configuración de Notificaciones -->
            <div *ngIf="seccionActiva === 'notificaciones'">
              <div class="mb-4">
                <h6 class="text-muted mb-3">Notificaciones del Sistema</h6>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" id="notificacionesStockBajo" [(ngModel)]="preferencias.notificacionesStockBajo">
                  <label class="form-check-label" for="notificacionesStockBajo">
                    Notificar stock bajo
                  </label>
                </div>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" id="notificacionesVentas" [(ngModel)]="preferencias.notificacionesVentas">
                  <label class="form-check-label" for="notificacionesVentas">
                    Notificar ventas realizadas
                  </label>
                </div>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" id="notificacionesAccesos" [(ngModel)]="preferencias.notificacionesAccesos">
                  <label class="form-check-label" for="notificacionesAccesos">
                    Notificar accesos al sistema
                  </label>
                </div>
              </div>

              <div class="mb-4">
                <h6 class="text-muted mb-3">Correos Electrónicos</h6>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" id="enviarCorreosVentas" [(ngModel)]="preferencias.enviarCorreosVentas">
                  <label class="form-check-label" for="enviarCorreosVentas">
                    Enviar recibos de venta por correo electrónico
                  </label>
                </div>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" id="enviarCorreosReportes" [(ngModel)]="preferencias.enviarCorreosReportes">
                  <label class="form-check-label" for="enviarCorreosReportes">
                    Enviar reportes diarios
                  </label>
                </div>
              </div>
            </div>

            <!-- Configuración del Sistema -->
            <div *ngIf="seccionActiva === 'sistema'">
              <div class="mb-4">
                <h6 class="text-muted mb-3">Impuestos y Facturación</h6>
                <div class="mb-3">
                  <label for="porcentajeIVA" class="form-label">Porcentaje de IVA</label>
                  <div class="input-group">
                    <input type="number" class="form-control" id="porcentajeIVA" min="0" max="25" [(ngModel)]="preferencias.porcentajeIVA">
                    <span class="input-group-text">%</span>
                  </div>
                </div>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" id="impuestosIncluidos" [(ngModel)]="preferencias.impuestosIncluidos">
                  <label class="form-check-label" for="impuestosIncluidos">
                    Precios incluyen impuestos
                  </label>
                </div>
              </div>

              <div class="mb-4">
                <h6 class="text-muted mb-3">Opciones de Venta</h6>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" id="permitirVentasSinStock" [(ngModel)]="preferencias.permitirVentasSinStock">
                  <label class="form-check-label" for="permitirVentasSinStock">
                    Permitir ventas sin stock disponible
                  </label>
                </div>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" id="permitirDescuentos" [(ngModel)]="preferencias.permitirDescuentos">
                  <label class="form-check-label" for="permitirDescuentos">
                    Permitir descuentos en ventas
                  </label>
                </div>
                <div class="mb-3">
                  <label for="descuentoMaximo" class="form-label">Descuento Máximo Permitido</label>
                  <div class="input-group">
                    <input type="number" class="form-control" id="descuentoMaximo" min="0" max="100" [disabled]="!preferencias.permitirDescuentos" [(ngModel)]="preferencias.descuentoMaximo">
                    <span class="input-group-text">%</span>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <h6 class="text-muted mb-3">Copia de Seguridad</h6>
                <div class="mb-3">
                  <label for="frecuenciaBackup" class="form-label">Frecuencia de Copia de Seguridad</label>
                  <select class="form-select" id="frecuenciaBackup" [(ngModel)]="preferencias.frecuenciaBackup">
                    <option value="diaria">Diaria</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <button class="btn btn-outline-primary">
                  <i class="bi bi-download me-1"></i> Crear Copia de Seguridad Ahora
                </button>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <button class="btn btn-secondary me-2" (click)="restaurarPredeterminados()">Restaurar Predeterminados</button>
            <button class="btn btn-primary" (click)="guardarPreferencias()">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PreferenciasComponent implements OnInit {
  seccionActiva: string = 'general';

  preferencias = {
    // General
    nombreEmpresa: 'Mi Tienda S.A. de C.V.',
    direccion: 'Av. Insurgentes Sur 1234, Ciudad de México',
    telefono: '(55) 1234-5678',
    correo: 'contacto@mitienda.com',
    rfc: 'MTI123456789',
    zonaHoraria: 'America/Mexico_City',
    formatoFecha: 'dd/MM/yyyy',
    moneda: 'MXN',

    // Seguridad
    longitudMinimaContrasena: 8,
    requiereMayusculas: true,
    requiereNumeros: true,
    requiereEspeciales: false,
    tiempoInactividad: 15,
    cerrarSesionAlCerrarNavegador: true,

    // Notificaciones
    notificacionesStockBajo: true,
    notificacionesVentas: true,
    notificacionesAccesos: false,
    enviarCorreosVentas: true,
    enviarCorreosReportes: false,

    // Sistema
    porcentajeIVA: 16,
    impuestosIncluidos: true,
    permitirVentasSinStock: false,
    permitirDescuentos: true,
    descuentoMaximo: 15,
    frecuenciaBackup: 'diaria'
  };

  constructor() { }

  ngOnInit(): void {
  }

  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }

  restaurarPredeterminados(): void {
    if (confirm('¿Está seguro de restaurar todas las preferencias a sus valores predeterminados?')) {
      // Aquí se restaurarían los valores predeterminados
      alert('Preferencias restauradas a valores predeterminados');
    }
  }

  guardarPreferencias(): void {
    // Aquí se guardarían las preferencias en el backend
    alert('Preferencias guardadas correctamente');
  }
}
