import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Risk, ImpactLevel, ProbabilityLevel, RiskStatus } from '../../core/models/risk.model';
import { RiskService } from './services/risk.service';
import { RiskFormDialogComponent, RiskFormDialogData } from './risk-form-dialog/risk-form-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../admin/shared/confirm-dialog/confirm-dialog.component';
import { RiskImportDialogComponent } from './risk-import-dialog/risk-import-dialog.component';
import { KeycloakService } from '../../core/auth/keycloak.service';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.scss']
})
export class RisksComponent implements OnInit {
  risks: Risk[] = [];
  displayedColumns: string[] = ['name', 'category', 'impactLevel', 'probabilityLevel', 'score', 'status', 'createdAt', 'actions'];
  isLoading = false;
  
  // Mappage pour les traductions des statuts et niveaux
  statusTranslations: Record<string, string> = {
    [RiskStatus.IDENTIFIED]: 'Identifié',
    [RiskStatus.IN_ASSESSMENT]: 'En évaluation',
    [RiskStatus.MITIGATED]: 'Atténué',
    [RiskStatus.ACCEPTED]: 'Accepté',
    [RiskStatus.CLOSED]: 'Clôturé'
  };
  
  impactTranslations: Record<string, string> = {
    [ImpactLevel.NEGLIGIBLE]: 'Négligeable',
    [ImpactLevel.MINOR]: 'Mineur',
    [ImpactLevel.MODERATE]: 'Modéré',
    [ImpactLevel.SEVERE]: 'Sévère',
    [ImpactLevel.MAJOR]: 'Majeur'
  };
  
  probabilityTranslations: Record<string, string> = {
    [ProbabilityLevel.RARE]: 'Rare',
    [ProbabilityLevel.UNLIKELY]: 'Peu probable',
    [ProbabilityLevel.POSSIBLE]: 'Possible',
    [ProbabilityLevel.LIKELY]: 'Probable',
    [ProbabilityLevel.ALMOST_CERTAIN]: 'Quasi-certain'
  };

  showDebug = false;

  constructor(
    private riskService: RiskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    public keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.loadRisks();
  }

  loadRisks(): void {
    this.isLoading = true;
    this.riskService.getRisks().subscribe({
      next: (risks) => {
        console.log('Risques récupérés:', risks);
        this.risks = risks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des risques:', error);
        this.showError('Erreur lors du chargement des risques');
        this.isLoading = false;
      }
    });
  }

  viewRisk(risk: Risk): void {
    if (risk && risk.id) {
      this.router.navigate(['/risks', risk.id]);
    } else {
      this.showError('Impossible d\'accéder aux détails du risque: identifiant manquant');
    }
  }

  openRiskForm(risk?: Risk): void {
    const dialogData: RiskFormDialogData = {
      risk: risk,
      isEdit: !!risk
    };

    const dialogRef = this.dialog.open(RiskFormDialogComponent, {
      width: '600px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (dialogData.isEdit) {
          this.updateRisk(risk!.id, result);
        } else {
          this.createRisk(result);
        }
      }
    });
  }

  deleteRisk(risk: Risk): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirmation de suppression',
      message: `Êtes-vous sûr de vouloir supprimer le risque "${risk.name}" ?`,
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      color: 'warn'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDeleteRisk(risk.id);
      }
    });
  }

  getScoreClass(score: number): string {
    if (score >= 15) return 'very-high';
    if (score >= 10) return 'high';
    if (score >= 5) return 'medium';
    if (score >= 3) return 'low';
    return 'very-low';
  }

  getStatusClass(status: RiskStatus): string {
    return status.toLowerCase();
  }

  getImpactClass(impact: ImpactLevel): string {
    return impact.toLowerCase();
  }

  getProbabilityClass(probability: ProbabilityLevel): string {
    return probability.toLowerCase();
  }

  private performDeleteRisk(id: string): void {
    this.isLoading = true;
    this.riskService.deleteRisk(id).subscribe({
      next: () => {
        this.loadRisks();
        this.showSuccess('Risque supprimé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du risque:', error);
        this.showError('Erreur lors de la suppression du risque');
        this.isLoading = false;
      }
    });
  }

  private createRisk(riskData: Partial<Risk>): void {
    this.isLoading = true;
    console.log('Données du risque envoyées au backend:', riskData);
    this.riskService.createRisk(riskData).subscribe({
      next: (createdRisk) => {
        console.log('Risque créé avec succès:', createdRisk);
        this.loadRisks();
        this.showSuccess('Risque créé avec succès');
      },
      error: (error) => {
        console.error('Erreur détaillée lors de la création du risque:', error);
        let errorMessage = 'Erreur lors de la création du risque';
        
        // Tenter d'extraire un message d'erreur plus précis
        if (error.error && typeof error.error === 'object') {
          if (error.error.message) {
            errorMessage += ': ' + error.error.message;
          } else if (error.error.detail) {
            errorMessage += ': ' + error.error.detail;
          }
          // Afficher les champs en erreur s'il y en a
          console.log('Champs en erreur:', error.error);
        }
        
        this.showError(errorMessage);
        this.isLoading = false;
      }
    });
  }

  private updateRisk(id: string, riskData: Partial<Risk>): void {
    this.isLoading = true;
    this.riskService.updateRisk(id, riskData).subscribe({
      next: () => {
        this.loadRisks();
        this.showSuccess('Risque mis à jour avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du risque:', error);
        this.showError('Erreur lors de la mise à jour du risque');
        this.isLoading = false;
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000, panelClass: ['error-snackbar'] });
  }

  openImportDialog(): void {
    const dialogRef = this.dialog.open(RiskImportDialogComponent, {
      width: '900px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadRisks();
      }
    });
  }
} 