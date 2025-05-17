import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { KeycloakService } from '../../core/auth/keycloak.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  private roles: string[] = [];
  private isHidden = true;

  constructor(
    private keycloakService: KeycloakService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set appHasRole(roles: string | string[]) {
    // Convertir en tableau et filtrer les valeurs vides
    if (roles) {
      this.roles = Array.isArray(roles) ? roles.filter(Boolean) : [roles].filter(Boolean);
      console.debug(`[HasRoleDirective] Rôles requis: [${this.roles.join(', ')}]`);
    } else {
      this.roles = [];
      console.debug(`[HasRoleDirective] Aucun rôle requis`);
    }
    this.updateView();
  }

  @Input()
  set appHasRoleElse(templateRef: TemplateRef<any>) {
    if (templateRef && this.isHidden) {
      this.viewContainer.createEmbeddedView(templateRef);
    }
  }

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    
    if (!this.roles || this.roles.length === 0) {
      // Si aucun rôle n'est spécifié, afficher le contenu
      console.debug("[HasRoleDirective] Aucun rôle requis, affichage du contenu");
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isHidden = false;
      return;
    }

    // Obtenir les rôles de l'utilisateur
    const userRoles = this.keycloakService.getUserRoles();
    console.debug(`[HasRoleDirective] Rôles utilisateur: [${userRoles.join(', ')}]`);
    
    // Cas spécial pour l'administrateur
    if (this.roles.includes('admin') && userRoles.includes('ADMIN')) {
      console.debug("[HasRoleDirective] Cas spécial: 'admin' requis et 'ADMIN' trouvé, autorisation accordée");
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isHidden = false;
      return;
    }
    
    // Vérifier si l'utilisateur a au moins un des rôles requis
    const hasAnyRole = this.roles.some(role => {
      const result = this.keycloakService.hasRole(role);
      console.debug(`[HasRoleDirective] Vérification ${role}: ${result}`);
      return result;
    });
    
    if (hasAnyRole) {
      console.debug("[HasRoleDirective] Utilisateur autorisé, affichage du contenu");
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isHidden = false;
    } else {
      console.debug("[HasRoleDirective] Utilisateur non autorisé, contenu masqué");
      this.isHidden = true;
    }
  }
} 