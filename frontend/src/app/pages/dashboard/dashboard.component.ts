import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Tableau de bord</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Bienvenue sur le tableau de bord de SentinelRisk.</p>
          <p>Cette page affichera bientôt les métriques et statistiques importantes.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    mat-card {
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class DashboardComponent {} 