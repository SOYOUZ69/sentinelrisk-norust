import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="app-title">SentinelRisk</span>
      <span class="spacer"></span>
      <div class="user-info" *ngIf="userProfile$ | async as profile">
        <span class="user-name">{{ profile.firstName }} {{ profile.lastName }}</span>
        <button mat-icon-button (click)="logout()" matTooltip="Déconnexion">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .app-title {
      margin-left: 16px;
      font-size: 1.2em;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .user-name {
      font-size: 0.9em;
    }
  `]
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  userProfile$: Observable<KeycloakProfile>;

  constructor(private keycloakService: KeycloakService) {
    this.userProfile$ = from(this.keycloakService.loadUserProfile());
  }

  ngOnInit(): void {}

  logout(): void {
    this.keycloakService.logout();
  }
} 