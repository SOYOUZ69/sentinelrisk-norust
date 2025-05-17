import { Injectable } from '@angular/core';
import { KeycloakService as KeycloakAngularService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  constructor(private keycloakAngular: KeycloakAngularService) {}

  init(): Promise<boolean> {
    return this.keycloakAngular.init({
      config: {
        url: environment.keycloakUrl,
        realm: environment.keycloakRealm,
        clientId: environment.keycloakClientId
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }
    });
  }

  isLoggedIn(): boolean {
    return this.keycloakAngular.isLoggedIn();
  }

  login(): Promise<void> {
    return this.keycloakAngular.login();
  }

  logout(): Promise<void> {
    return this.keycloakAngular.logout(window.location.origin);
  }

  getUserProfile(): Observable<KeycloakProfile> {
    return from(this.keycloakAngular.loadUserProfile());
  }

  getToken(): Promise<string> {
    return this.keycloakAngular.getToken();
  }

  updateToken(minValidity = 5): Observable<boolean> {
    return from(this.keycloakAngular.updateToken(minValidity));
  }

  getUserRoles(): string[] {
    return this.keycloakAngular.getUserRoles();
  }

  hasRole(role: string): boolean {
    // Si le rôle recherché est vide, retourner false
    if (!role) return false;
    
    // Obtenir les rôles de l'utilisateur
    const userRoles = this.getUserRoles();
    
    // Convertir le rôle recherché en minuscules et supprimer les préfixes
    const roleLower = role.toLowerCase().replace(/^role_/, '');
    
    // Journaliser pour débogage
    console.debug(`[KeycloakService] Vérification du rôle: ${role} (normalisé: ${roleLower})`);
    console.debug(`[KeycloakService] Rôles utilisateur: ${userRoles.join(', ')}`);
    
    // Vérifier si un des rôles de l'utilisateur correspond (indépendamment de la casse)
    const hasRole = userRoles.some(userRole => {
      // Normaliser le rôle utilisateur
      const userRoleLower = userRole.toLowerCase();
      
      // Vérifier l'égalité directe indépendamment de la casse
      const match = userRoleLower === roleLower;
      console.debug(`[KeycloakService] Comparaison ${userRole} avec ${role}: ${match}`);
      
      return match;
    });
    
    console.debug(`[KeycloakService] Résultat final pour ${role}: ${hasRole}`);
    return hasRole;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  getUsername(): string | undefined {
    const userDetails: KeycloakTokenParsed | undefined = this.keycloakAngular.getKeycloakInstance().tokenParsed;
    return userDetails ? userDetails['preferred_username'] as string : undefined;
  }
  
  // Debug function to display all roles
  logUserRoles(): void {
    console.log('User roles:', this.getUserRoles());
    
    // Check standard roles
    const standardRoles = ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'];
    standardRoles.forEach(role => {
      console.log(`Has role '${role}': ${this.hasRole(role)}`);
    });
    
    // Log user details from token
    const token = this.keycloakAngular.getKeycloakInstance().tokenParsed;
    console.log('Token data:', token);
  }
} 