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
      
      <!-- Menu Conformité avec sous-menus -->
      <mat-expansion-panel class="mat-elevation-z0">
        <mat-expansion-panel-header expandedHeight="48px" collapsedHeight="48px">
          <mat-panel-title class="sidebar-menu-title">
            <mat-icon>gavel</mat-icon>
            <span>Conformité</span>
          </mat-panel-title>
        </mat-expansion-panel-header>
        
        <mat-nav-list class="sub-menu">
          <a mat-list-item routerLink="/compliance/frameworks" routerLinkActive="active">
            <mat-icon matListItemIcon>library_books</mat-icon>
            <span matListItemTitle>Référentiels Normatifs</span>
          </a>
          <a mat-list-item routerLink="/compliance/requirements" routerLinkActive="active">
            <mat-icon matListItemIcon>fact_check</mat-icon>
            <span matListItemTitle>Exigences</span>
          </a>
          <a mat-list-item routerLink="/compliance/mappings" routerLinkActive="active">
            <mat-icon matListItemIcon>link</mat-icon>
            <span matListItemTitle>Mappings Risques-Conformité</span>
          </a>
          <a mat-list-item routerLink="/compliance/gap-analysis" routerLinkActive="active">
            <mat-icon matListItemIcon>analytics</mat-icon>
            <span matListItemTitle>Analyse d'Écarts</span>
          </a>
          <a mat-list-item routerLink="/remediation-plans" routerLinkActive="active">
            <mat-icon matListItemIcon>assignment</mat-icon>
            <span matListItemTitle>Plans d'Action</span>
          </a>
        </mat-nav-list>
      </mat-expansion-panel>

      <!-- Menu SNMP avec sous-menus -->
      <mat-expansion-panel class="mat-elevation-z0" *appHasRole="['admin', 'risk_manager']">
        <mat-expansion-panel-header expandedHeight="48px" collapsedHeight="48px">
          <mat-panel-title class="sidebar-menu-title">
            <mat-icon>router</mat-icon>
            <span>SNMP</span>
          </mat-panel-title>
        </mat-expansion-panel-header>
        
        <mat-nav-list class="sub-menu">
          <a mat-list-item routerLink="/snmp" routerLinkActive="active">
            <mat-icon matListItemIcon>devices</mat-icon>
            <span matListItemTitle>Assets</span>
          </a>
          <a mat-list-item routerLink="/snmp/configs" routerLinkActive="active">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Configurations</span>
          </a>
          <a mat-list-item routerLink="/snmp/run" routerLinkActive="active">
            <mat-icon matListItemIcon>play_circle</mat-icon>
            <span matListItemTitle>Scan Manuel</span>
          </a>
          <a mat-list-item routerLink="/snmp/results" routerLinkActive="active">
            <mat-icon matListItemIcon>history</mat-icon>
            <span matListItemTitle>Historique</span>
          </a>
        </mat-nav-list>
      </mat-expansion-panel>
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
    .sidebar-menu-title {
      display: flex;
      align-items: center;
      height: 48px;
    }
    .sidebar-menu-title mat-icon {
      margin-right: 8px;
    }
    .sub-menu {
      padding-left: 8px;
    }
    mat-expansion-panel {
      box-shadow: none !important;
      background: transparent;
    }
    ::ng-deep .mat-expansion-panel-body {
      padding: 0 !important;
    }
  `]
})
export class SidebarComponent {
  constructor(public keycloakService: KeycloakService) {}
} 