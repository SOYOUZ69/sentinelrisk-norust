import { Component } from '@angular/core';
import { KeycloakService } from '../../core/auth/keycloak.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <span matListItemTitle>Tableau de bord</span>
      </a>
      <a mat-list-item routerLink="/users" routerLinkActive="active" *appHasRole="['admin']">
        <mat-icon matListItemIcon>people</mat-icon>
        <span matListItemTitle>Utilisateurs</span>
      </a>
      <a mat-list-item routerLink="/risks" routerLinkActive="active">
        <mat-icon matListItemIcon>warning</mat-icon>
        <span matListItemTitle>Risques</span>
      </a>
      <a mat-list-item routerLink="/controls" routerLinkActive="active">
        <mat-icon matListItemIcon>security</mat-icon>
        <span matListItemTitle>Contrôles</span>
      </a>
      <a mat-list-item routerLink="/categories" routerLinkActive="active">
        <mat-icon matListItemIcon>category</mat-icon>
        <span matListItemTitle>Catégories</span>
      </a>
      <a mat-list-item routerLink="/assessments" routerLinkActive="active">
        <mat-icon matListItemIcon>assessment</mat-icon>
        <span matListItemTitle>Évaluations</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    mat-nav-list {
      padding-top: 0;
    }
    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    mat-icon {
      margin-right: 8px;
    }
  `]
})
export class SidebarComponent {
  constructor(private keycloakService: KeycloakService) {}
} 