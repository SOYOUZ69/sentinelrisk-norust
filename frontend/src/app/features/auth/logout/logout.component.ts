import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../../../core/auth/keycloak.service';

@Component({
  selector: 'app-logout',
  template: `
    <div class="logout-container">
      <div class="logout-message">
        <h2>Déconnexion en cours...</h2>
        <p>Vous serez redirigé dans un instant.</p>
        <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
      </div>
    </div>
  `,
  styles: [`
    .logout-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .logout-message {
      text-align: center;
    }
    h2 {
      margin-bottom: 16px;
    }
    mat-progress-spinner {
      margin: 24px auto 0;
    }
  `]
})
export class LogoutComponent implements OnInit {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logout();
  }

  private async logout(): Promise<void> {
    try {
      await this.keycloakService.logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      this.router.navigate(['/auth/login']);
    }
  }
} 