import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <button mat-raised-button color="primary" (click)="goToDashboard()">
        Retour au tableau de bord
      </button>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 100vh;
      padding: 0 20px;
    }
    
    h1 {
      font-size: 120px;
      font-weight: 700;
      margin: 0;
      color: #3f51b5;
    }
    
    h2 {
      font-size: 28px;
      font-weight: 500;
      margin: 0 0 20px;
    }
    
    p {
      font-size: 18px;
      margin-bottom: 30px;
      color: rgba(0, 0, 0, 0.6);
    }
  `]
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
} 