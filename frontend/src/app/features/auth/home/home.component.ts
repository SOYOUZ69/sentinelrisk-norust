import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../../core/auth/keycloak.service';
import { Observable } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Bienvenue sur SentinelRisk</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p *ngIf="userProfile$ | async as profile">
            Bonjour {{ profile.firstName }} {{ profile.lastName }} !
          </p>
          <p>Vous êtes connecté avec succès.</p>
          <button mat-raised-button color="warn" (click)="logout()">
            Se déconnecter
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
    }
    mat-card {
      max-width: 600px;
      margin: 0 auto;
    }
    button {
      margin-top: 20px;
    }
  `]
})
export class HomeComponent implements OnInit {
  userProfile$: Observable<KeycloakProfile>;

  constructor(private keycloakService: KeycloakService) {
    this.userProfile$ = this.keycloakService.getUserProfile();
  }

  ngOnInit(): void {}

  logout(): void {
    this.keycloakService.logout();
  }
} 