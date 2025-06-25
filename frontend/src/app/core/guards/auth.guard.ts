import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    
    console.log(`🔐 [AuthGuard] Vérification d'authentification pour: ${state.url}`);
    
    // Force the user to log in if they are not authenticated
    if (!this.authenticated) {
      console.log('❌ [AuthGuard] Utilisateur non authentifié, redirection vers login');
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
      return false;
    }

    console.log(`✅ [AuthGuard] Utilisateur authentifié`);
    
    // AuthGuard s'occupe UNIQUEMENT de l'authentification
    // La vérification des rôles est déléguée au RoleGuard
    // Cela évite les conflits entre les deux guards
    return true;
  }
} 