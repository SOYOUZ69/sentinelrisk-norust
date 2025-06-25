import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from '../auth/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    console.group(`🛡️ [RoleGuard] Vérification d'accès pour: ${state.url}`);
    
    // Vérifier si l'utilisateur est connecté
    if (!this.keycloakService.isLoggedIn()) {
      console.log('❌ Utilisateur non connecté, redirection vers login');
      console.log('🎯 RETOUR: false (login requis)');
      console.groupEnd();
      // Rediriger vers la page de login de Keycloak
      this.keycloakService.login();
      return false;
    }

    // Afficher les informations utilisateur pour debug
    const username = this.keycloakService.getUserDisplayName();
    const userRoles = this.keycloakService.getUserRoles();
    console.log(`👤 Utilisateur: ${username}`);
    console.log(`🏷️ Rôles utilisateur: [${userRoles.join(', ')}]`);

    // Récupérer les rôles requis depuis la configuration de la route
    const requiredRoles = route.data['roles'] as string[] | undefined;
    console.log(`🎯 Rôles requis: [${requiredRoles?.join(', ') || 'aucun'}]`);
    
    // Si aucun rôle n'est requis, autoriser l'accès
    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('✅ Aucun rôle requis, accès autorisé');
      console.log('🎯 RETOUR: true (pas de rôle requis)');
      console.groupEnd();
      return true;
    }

    // Vérifier si l'utilisateur a au moins un des rôles requis
    try {
      const hasRequiredRole = this.keycloakService.hasAnyRole(requiredRoles);

      if (hasRequiredRole) {
        console.log(`✅ Accès autorisé - utilisateur a un des rôles requis`);
        console.log('🎯 RETOUR: true (rôle valide)');
        console.groupEnd();
        return true;
      }

      console.log(`❌ Accès refusé - rôles insuffisants`);
      console.log(`   Requis: [${requiredRoles.join(', ')}]`);
      console.log(`   Utilisateur: [${userRoles.join(', ')}]`);
      
      const redirectUrl = this.router.createUrlTree(['/unauthorized']);
      console.log('🎯 RETOUR: UrlTree vers /unauthorized');
      console.groupEnd();
      
      // Rediriger vers la page unauthorized
      return redirectUrl;
      
    } catch (error) {
      console.error('💥 Erreur lors de la vérification des rôles:', error);
      
      const redirectUrl = this.router.createUrlTree(['/unauthorized']);
      console.log('🎯 RETOUR: UrlTree vers /unauthorized (erreur)');
      console.groupEnd();
      
      // En cas d'erreur, rediriger vers unauthorized pour éviter une page blanche
      return redirectUrl;
    }
  }

  /**
   * @deprecated Utiliser la page /unauthorized à la place
   */
  private getRedirectUrlForRole(): UrlTree {
    console.log('⚠️ [RoleGuard] getRedirectUrlForRole() est déprécié, redirection vers /unauthorized');
    return this.router.createUrlTree(['/unauthorized']);
  }
} 