import { Component } from '@angular/core';
import { KeycloakService } from '../../../core/auth/keycloak.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Connexion à SentinelRisk</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <button mat-raised-button color="primary" (click)="login()">
            Se connecter avec Keycloak
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    mat-card {
      width: 400px;
      text-align: center;
    }
    button {
      margin-top: 20px;
    }
  `]
})
export class LoginComponent {
  constructor(private keycloakService: KeycloakService) {}

  login(): void {
    this.keycloakService.login();
  }
} 