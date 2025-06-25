import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../../../core/auth/keycloak.service';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-content">
        <div class="icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        <h1>Accès non autorisé</h1>
        <p class="message">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <div class="user-info" *ngIf="username">
          <p><strong>Utilisateur connecté :</strong> {{ username }}</p>
          <p><strong>Rôles :</strong> {{ userRoles.join(', ') || 'Aucun rôle' }}</p>
        </div>
        <div class="actions">
          <button class="btn btn-primary" (click)="goToDashboard()">
            <i class="fas fa-home"></i> Retour au tableau de bord
          </button>
          <button class="btn btn-secondary" (click)="logout()">
            <i class="fas fa-sign-out-alt"></i> Se déconnecter
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f8f9fa;
      padding: 20px;
    }
    
    .unauthorized-content {
      text-align: center;
      max-width: 500px;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .icon {
      font-size: 4rem;
      color: #dc3545;
      margin-bottom: 20px;
    }
    
    h1 {
      color: #dc3545;
      margin-bottom: 15px;
    }
    
    .message {
      color: #6c757d;
      margin-bottom: 25px;
      font-size: 1.1rem;
    }
    
    .user-info {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 25px;
      text-align: left;
    }
    
    .user-info p {
      margin: 5px 0;
      font-size: 0.9rem;
    }
    
    .actions {
      display: flex;
      gap: 15px;
      justify-content: center;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }
    
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #0056b3;
    }
    
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .btn-secondary:hover {
      background-color: #545b62;
    }
  `]
})
export class UnauthorizedComponent implements OnInit {
  username: string = '';
  userRoles: string[] = [];

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.username = this.keycloakService.getUserDisplayName();
    this.userRoles = this.keycloakService.getUserRoles();
    
    console.log('🚫 Page unauthorized chargée pour:', this.username, 'Rôles:', this.userRoles);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.keycloakService.logout();
  }
} 