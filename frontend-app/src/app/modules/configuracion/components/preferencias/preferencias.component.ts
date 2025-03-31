import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preferencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Configuración del Sistema</h2>
    </div>

    <div class="card">
      <div class="card-body">
        <ul class="nav nav-tabs" id="configTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="general-tab" data-bs-toggle="tab" data-bs-target="#general"
                    type="button" role="tab" aria-controls="general" aria-selected="true">
              General
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="apariencia-tab" data-bs-toggle="tab" data-bs-target="#apariencia"
                    type="button" role="tab" aria-controls="apariencia" aria-selected="false">
              Apariencia
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="avanzado-tab" data-bs-toggle="tab" data-bs-target="#avanzado"
                    type="button" role="tab" aria-controls="avanzado" aria-selected="false">
              Avanzado
            </button>
          </li>
        </ul>

        <div class="tab-content p-3" id="configTabsContent">
          <!-- Configuración General -->
          <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
            <div class="mb-4">
              <h5 class="text-muted mb-3">Información Básica</h5>
              <div class="mb-3">
                <label for="nombreSistema" class="form-label">Nombre del Sistema</label>
                <input type="text" class="form-control" id="nombreSistema" [(ngModel)]="config.nombreSistema">
              </div>
              <div class="mb-3">
                <label for="descripcionSistema" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcionSistema" rows="2" [(ngModel)]="config.descripcionSistema"></textarea>
              </div>
              <div class="mb-3">
                <label for="versionSistema" class="form-label">Versión</label>
                <input type="text" class="form-control" id="versionSistema" [(ngModel)]="config.versionSistema" readonly>
              </div>
            </div>

            <div class="mb-4">
              <h5 class="text-muted mb-3">Configuración Regional</h5>
              <div class="mb-3">
                <label for="idiomaSistema" class="form-label">Idioma</label>
                <select class="form-select" id="idiomaSistema" [(ngModel)]="config.idiomaSistema">
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="formatoFecha" class="form-label">Formato de Fecha</label>
                <select class="form-select" id="formatoFecha" [(ngModel)]="config.formatoFecha">
                  <option value="dd/MM/yyyy">DD/MM/AAAA</option>
                  <option value="MM/dd/yyyy">MM/DD/AAAA</option>
                  <option value="yyyy-MM-dd">AAAA-MM-DD</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="formatoHora" class="form-label">Formato de Hora</label>
                <select class="form-select" id="formatoHora" [(ngModel)]="config.formatoHora">
                  <option value="12">12 horas (AM/PM)</option>
                  <option value="24">24 horas</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Configuración de Apariencia -->
          <div class="tab-pane fade" id="apariencia" role="tabpanel" aria-labelledby="apariencia-tab">
            <div class="mb-4">
              <h5 class="text-muted mb-3">Tema</h5>
              <div class="mb-3">
                <label for="temaPrincipal" class="form-label">Tema principal</label>
                <select class="form-select" id="temaPrincipal" [(ngModel)]="config.temaPrincipal">
                  <option value="claro">Claro</option>
                  <option value="oscuro">Oscuro</option>
                  <option value="auto">Automático (según sistema)</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="colorPrimario" class="form-label">Color primario</label>
                <input type="color" class="form-control form-control-color" id="colorPrimario" [(ngModel)]="config.colorPrimario">
              </div>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="animaciones" [(ngModel)]="config.animacionesActivadas">
                <label class="form-check-label" for="animaciones">Activar animaciones</label>
              </div>
            </div>

            <div class="mb-4">
              <h5 class="text-muted mb-3">Personalización</h5>
              <div class="mb-3">
                <label for="logoEmpresa" class="form-label">Logo de la empresa</label>
                <input type="file" class="form-control" id="logoEmpresa">
              </div>
              <div class="mb-3">
                <label for="tamanioFuente" class="form-label">Tamaño de fuente</label>
                <select class="form-select" id="tamanioFuente" [(ngModel)]="config.tamanioFuente">
                  <option value="pequeño">Pequeño</option>
                  <option value="normal">Normal</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Configuración Avanzada -->
          <div class="tab-pane fade" id="avanzado" role="tabpanel" aria-labelledby="avanzado-tab">
            <div class="mb-4">
              <h5 class="text-muted mb-3">Rendimiento</h5>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="cacheDatos" [(ngModel)]="config.cacheDatos">
                <label class="form-check-label" for="cacheDatos">Almacenar datos en caché</label>
              </div>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="modoRendimiento" [(ngModel)]="config.modoRendimiento">
                <label class="form-check-label" for="modoRendimiento">Modo de alto rendimiento</label>
                <small class="form-text text-muted d-block">Reduce animaciones y efectos visuales</small>
              </div>
            </div>

            <div class="mb-4">
              <h5 class="text-muted mb-3">Seguridad</h5>
              <div class="mb-3">
                <label for="tiempoInactividad" class="form-label">Tiempo de inactividad antes de cerrar sesión (minutos)</label>
                <input type="number" class="form-control" id="tiempoInactividad" [(ngModel)]="config.tiempoInactividad" min="1" max="60">
              </div>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="verificacionDosPasos" [(ngModel)]="config.verificacionDosPasos">
                <label class="form-check-label" for="verificacionDosPasos">Habilitar verificación en dos pasos</label>
              </div>
            </div>

            <div class="mb-4">
              <h5 class="text-muted mb-3">Diagnóstico</h5>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="registroDebug" [(ngModel)]="config.registroDebug">
                <label class="form-check-label" for="registroDebug">Activar registro de depuración</label>
              </div>
              <div class="mb-3">
                <label for="nivelLog" class="form-label">Nivel de registro</label>
                <select class="form-select" id="nivelLog" [(ngModel)]="config.nivelLog" [disabled]="!config.registroDebug">
                  <option value="info">Información</option>
                  <option value="warning">Advertencias</option>
                  <option value="error">Errores</option>
                  <option value="debug">Depuración</option>
                </select>
              </div>
              <button class="btn btn-outline-secondary" [disabled]="!config.registroDebug">
                <i class="bi bi-download me-1"></i> Descargar registros
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <button class="btn btn-secondary me-2" (click)="restaurarPredeterminados()">Restaurar Predeterminados</button>
        <button class="btn btn-primary" (click)="guardarConfiguracion()">Guardar Cambios</button>
      </div>
    </div>
  `,
  styles: []
})
export class PreferenciasComponent implements OnInit {
  config = {
    // General
    nombreSistema: 'Sistema de Gestión',
    descripcionSistema: 'Sistema integrado para la gestión de ventas e inventario',
    versionSistema: '1.0.0',
    idiomaSistema: 'es',
    formatoFecha: 'dd/MM/yyyy',
    formatoHora: '24',

    // Apariencia
    temaPrincipal: 'claro',
    colorPrimario: '#3f51b5',
    animacionesActivadas: true,
    tamanioFuente: 'normal',

    // Avanzado
    cacheDatos: true,
    modoRendimiento: false,
    tiempoInactividad: 30,
    verificacionDosPasos: false,
    registroDebug: false,
    nivelLog: 'error'
  };

  constructor() { }

  ngOnInit(): void {
  }

  restaurarPredeterminados(): void {
    if (confirm('¿Está seguro de restaurar la configuración a los valores predeterminados?')) {
      // Aquí se restaurarían los valores predeterminados
      alert('Configuración restaurada a valores predeterminados');
    }
  }

  guardarConfiguracion(): void {
    // Aquí se guardaría la configuración en el backend
    alert('Configuración guardada correctamente');
  }
}
