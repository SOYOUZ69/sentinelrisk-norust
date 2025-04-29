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
    return this.keycloakAngular.isUserInRole(role);
  }

  getUsername(): string | undefined {
    const userDetails: KeycloakTokenParsed | undefined = this.keycloakAngular.getKeycloakInstance().tokenParsed;
    return userDetails ? userDetails['preferred_username'] as string : undefined;
  }
} 