import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from '../auth/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Vérifier si l'utilisateur est connecté et a le rôle admin
    if (this.keycloakService.isLoggedIn() && this.keycloakService.hasRole('admin')) {
      console.log('AdminGuard: Accès autorisé - rôle admin détecté');
      return true;
    }
    
    console.log('AdminGuard: Accès refusé - rôle admin requis');
    
    // Rediriger vers la page principale en cas d'accès non autorisé
    return this.router.createUrlTree(['/compliance/frameworks']);
  }
}
