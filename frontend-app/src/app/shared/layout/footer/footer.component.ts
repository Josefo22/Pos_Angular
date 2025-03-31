import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">© 2025 Sistema POS - Proyecto Programación Orientada a Objetos</span>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  `]
})
export class FooterComponent {
}