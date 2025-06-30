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
    const roles = this.keycloakAngular.getUserRoles();
    console.debug(`🔍 [KeycloakService] getUserRoles() -> Rôles bruts:`, roles);
    return roles;
  }

  hasRole(role: string): boolean {
    
    
    // Vérifier si on a un token valide
    const keycloakInstance = this.keycloakAngular.getKeycloakInstance();
    if (!keycloakInstance.tokenParsed) {
      console.warn('❌ Token non disponible');
      console.groupEnd();
      return false;
    }

    // Récupérer tous les rôles de l'utilisateur
    const userRoles = this.getUserRoles();
    console.debug(`👤 Rôles utilisateur:`, userRoles);
    
    if (!userRoles || userRoles.length === 0) {
      console.warn('❌ Aucun rôle trouvé pour l\'utilisateur');
      console.groupEnd();
      return false;
    }

    // Normaliser le rôle recherché (supprimer ROLE_ prefix et mettre en minuscule)
    const normalizedRole = role.toLowerCase().replace(/^role_/, '');
    console.debug(`🔄 Rôle normalisé recherché: "${normalizedRole}"`);
    
    // Vérifier si l'utilisateur a le rôle (plusieurs formats possibles)
    const hasRole = userRoles.some(userRole => {
      // Formats possibles: "admin", "role_admin", "ROLE_ADMIN", "ADMIN"
      const normalizedUserRole = userRole.toLowerCase().replace(/^role_/, '');
      const match = normalizedUserRole === normalizedRole;
      
      if (match) {
        console.debug(`✅ Match trouvé: "${userRole}" -> "${normalizedUserRole}" === "${normalizedRole}"`);
      }
      
      return match;
    });
    
    console.debug(`🎯 Résultat final: ${hasRole ? '✅ AUTORISÉ' : '❌ REFUSÉ'}`);
    console.groupEnd();
    
    return hasRole;
  }

  hasAnyRole(roles: string[]): boolean {
    console.group(`🔒 [KeycloakService] Vérification de rôles multiples:`, roles);
    
    const result = roles.some(role => {
      const hasRole = this.hasRole(role);
      console.debug(`- ${role}: ${hasRole ? '✅' : '❌'}`);
      return hasRole;
    });
    
    console.debug(`🎯 Résultat final hasAnyRole: ${result ? '✅ AUTORISÉ' : '❌ REFUSÉ'}`);
    console.groupEnd();
    
    return result;
  }

  getUsername(): string | undefined {
    const userDetails: KeycloakTokenParsed | undefined = this.keycloakAngular.getKeycloakInstance().tokenParsed;
    return userDetails ? userDetails['preferred_username'] as string : undefined;
  }
  
  /**
   * Force un rafraîchissement du token et des rôles
   */
  async refreshUserInfo(): Promise<void> {
    try {
      console.log('[KeycloakService] Rafraîchissement des informations utilisateur...');
      await this.keycloakAngular.getKeycloakInstance().updateToken(5);
      console.log('[KeycloakService] Token rafraîchi avec succès');
      this.logUserRoles();
    } catch (error) {
      console.error('[KeycloakService] Erreur lors du rafraîchissement du token:', error);
    }
  }

     /**
    * Vérifie si le token est expiré ou près d'expirer
    */
   isTokenExpiring(minValidity: number = 30): boolean {
     const keycloak = this.keycloakAngular.getKeycloakInstance();
     return !keycloak.tokenParsed || keycloak.isTokenExpired();
   }

  // Debug function to display all roles
  logUserRoles(): void {
    console.group('👤 Informations utilisateur Keycloak');
    console.log('Est connecté:', this.isLoggedIn());
    console.log('Rôles utilisateur:', this.getUserRoles());
    
    // Check standard roles
    const standardRoles = ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'];
    standardRoles.forEach(role => {
      console.log(`A le rôle '${role}': ${this.hasRole(role)}`);
    });
    
    // Log user details from token
    const token = this.keycloakAngular.getKeycloakInstance().tokenParsed;
    if (token) {
             console.log('Détails du token:', {
         sub: token['sub'],
         preferred_username: token['preferred_username'],
         email: token['email'],
         realm_access: token['realm_access'],
         resource_access: token['resource_access']
       });
    }
    
    console.groupEnd();
  }

  /**
   * Obtient le nom d'affichage de l'utilisateur
   */
     getUserDisplayName(): string {
     const token = this.keycloakAngular.getKeycloakInstance().tokenParsed;
     if (token) {
       return token['preferred_username'] || token['email'] || token['sub'] || 'Utilisateur inconnu';
     }
     return 'Non connecté';
   }

  /**
   * Obtient l'email de l'utilisateur
   */
     getUserEmail(): string {
     const token = this.keycloakAngular.getKeycloakInstance().tokenParsed;
     return token?.['email'] || '';
   }
} 