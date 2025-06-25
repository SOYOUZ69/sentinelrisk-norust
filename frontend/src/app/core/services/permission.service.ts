import { Injectable } from '@angular/core';
import { KeycloakService } from '../auth/keycloak.service';

export interface Permission {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private keycloakService: KeycloakService) {}

  /**
   * Obtient les permissions pour les utilisateurs
   */
  getUserPermissions(): Permission {
    if (this.keycloakService.hasRole('admin')) {
      return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    }
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  /**
   * Obtient les permissions pour les risques
   */
  getRiskPermissions(): Permission {
    if (this.keycloakService.hasRole('admin') || this.keycloakService.hasRole('risk_manager')) {
      return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    }
    if (this.keycloakService.hasRole('compliance_officer') || 
        this.keycloakService.hasRole('auditor') || 
        this.keycloakService.hasRole('user')) {
      return { canView: true, canCreate: false, canEdit: false, canDelete: false };
    }
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  /**
   * Obtient les permissions pour les contrôles
   */
  getControlPermissions(): Permission {
    if (this.keycloakService.hasRole('admin') || this.keycloakService.hasRole('risk_manager')) {
      return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    }
    if (this.keycloakService.hasRole('compliance_officer') || 
        this.keycloakService.hasRole('auditor') || 
        this.keycloakService.hasRole('user')) {
      return { canView: true, canCreate: false, canEdit: false, canDelete: false };
    }
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  /**
   * Obtient les permissions pour les catégories
   */
  getCategoryPermissions(): Permission {
    if (this.keycloakService.hasRole('admin') || this.keycloakService.hasRole('risk_manager')) {
      return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    }
    if (this.keycloakService.hasRole('compliance_officer') || 
        this.keycloakService.hasRole('auditor') || 
        this.keycloakService.hasRole('user')) {
      return { canView: true, canCreate: false, canEdit: false, canDelete: false };
    }
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  /**
   * Obtient les permissions pour les évaluations
   */
  getAssessmentPermissions(): Permission {
    if (this.keycloakService.hasRole('admin') || this.keycloakService.hasRole('compliance_officer')) {
      return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    }
    if (this.keycloakService.hasRole('risk_manager') || 
        this.keycloakService.hasRole('auditor') || 
        this.keycloakService.hasRole('user')) {
      return { canView: true, canCreate: false, canEdit: false, canDelete: false };
    }
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  /**
   * Obtient les permissions pour la conformité
   */
  getCompliancePermissions(): Permission {
    if (this.keycloakService.hasRole('admin') || this.keycloakService.hasRole('compliance_officer')) {
      return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    }
    if (this.keycloakService.hasRole('risk_manager') || this.keycloakService.hasRole('auditor')) {
      return { canView: true, canCreate: false, canEdit: false, canDelete: false };
    }
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  /**
   * Obtient les permissions pour SNMP
   */
  getSnmpPermissions(): Permission {
    if (this.keycloakService.hasRole('admin') || this.keycloakService.hasRole('risk_manager')) {
      return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    }
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  /**
   * Obtient les permissions pour le dashboard
   */
  getDashboardPermissions(): Permission {
    // Tout utilisateur connecté peut voir le dashboard
    if (this.keycloakService.isLoggedIn()) {
      const canEdit = this.keycloakService.hasRole('admin') || this.keycloakService.hasRole('risk_manager');
      return { canView: true, canCreate: false, canEdit: canEdit, canDelete: false };
    }
    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  /**
   * Vérifie si l'utilisateur peut accéder à une section spécifique
   */
  canAccessSection(section: string): boolean {
    switch (section) {
      case 'users':
        return this.getUserPermissions().canView;
      case 'risks':
        return this.getRiskPermissions().canView;
      case 'controls':
        return this.getControlPermissions().canView;
      case 'categories':
        return this.getCategoryPermissions().canView;
      case 'assessments':
        return this.getAssessmentPermissions().canView;
      case 'compliance':
        return this.getCompliancePermissions().canView;
      case 'snmp':
        return this.getSnmpPermissions().canView;
      case 'dashboard':
        return this.getDashboardPermissions().canView;
      default:
        return false;
    }
  }

  /**
   * Obtient une description du rôle de l'utilisateur
   */
  getUserRoleDescription(): string {
    if (this.keycloakService.hasRole('admin')) {
      return 'Administrateur - Accès complet';
    }
    if (this.keycloakService.hasRole('risk_manager')) {
      return 'Gestionnaire des risques - Gestion des risques et contrôles';
    }
    if (this.keycloakService.hasRole('compliance_officer')) {
      return 'Responsable conformité - Gestion des évaluations et conformité';
    }
    if (this.keycloakService.hasRole('auditor')) {
      return 'Auditeur - Consultation et rapports';
    }
    if (this.keycloakService.hasRole('user')) {
      return 'Utilisateur - Consultation limitée';
    }
    return 'Rôle non défini';
  }

  /**
   * Log des permissions pour debug
   */
  logPermissions(): void {
    console.group('🔐 Permissions utilisateur');
    console.log('Rôles:', this.keycloakService.getUserRoles());
    console.log('Description:', this.getUserRoleDescription());
    console.log('Utilisateurs:', this.getUserPermissions());
    console.log('Risques:', this.getRiskPermissions());
    console.log('Contrôles:', this.getControlPermissions());
    console.log('Catégories:', this.getCategoryPermissions());
    console.log('Évaluations:', this.getAssessmentPermissions());
    console.log('Conformité:', this.getCompliancePermissions());
    console.log('SNMP:', this.getSnmpPermissions());
    console.log('Dashboard:', this.getDashboardPermissions());
    console.groupEnd();
  }
} 