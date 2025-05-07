import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Control, ControlType, ControlStatus, ControlFrequency } from '../models/control.model';
import { ControlService } from '../services/control.service';
import { ControlFormDialogComponent } from '../control-form-dialog/control-form-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../admin/shared/confirm-dialog/confirm-dialog.component';
import { finalize } from 'rxjs/operators';
import { RiskService } from '../../risks/services/risk.service';
import { Risk } from '../../../core/models/risk.model';
import { Observable, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-control-detail',
  templateUrl: './control-detail.component.html',
  styleUrls: ['./control-detail.component.scss']
})
export class ControlDetailComponent implements OnInit {
  control: Control | null = null;
  isLoading = false;
  associatedRisks: Risk[] = [];
  
  // Mappage pour les traductions
  typeTranslations: Record<string, string> = {
    [ControlType.PREVENTIVE]: 'Préventif',
    [ControlType.DETECTIVE]: 'Détectif',
    [ControlType.CORRECTIVE]: 'Correctif',
    [ControlType.DIRECTIVE]: 'Directif'
  };
  
  statusTranslations: Record<string, string> = {
    [ControlStatus.PLANNED]: 'Planifié',
    [ControlStatus.IMPLEMENTED]: 'Implémenté',
    [ControlStatus.TESTED]: 'Testé',
    [ControlStatus.INEFFECTIVE]: 'Inefficace',
    [ControlStatus.EFFECTIVE]: 'Efficace',
    [ControlStatus.DEPRECATED]: 'Obsolète'
  };
  
  frequencyTranslations: Record<string, string> = {
    [ControlFrequency.CONTINUOUS]: 'Continu',
    [ControlFrequency.DAILY]: 'Quotidien',
    [ControlFrequency.WEEKLY]: 'Hebdomadaire',
    [ControlFrequency.MONTHLY]: 'Mensuel',
    [ControlFrequency.QUARTERLY]: 'Trimestriel',
    [ControlFrequency.ANNUALLY]: 'Annuel',
    [ControlFrequency.ON_DEMAND]: 'Sur demande'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private controlService: ControlService,
    private riskService: RiskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadControlDetails();
  }

  loadControlDetails(): void {
    this.isLoading = true;
    const controlId = this.route.snapshot.paramMap.get('id');
    
    if (!controlId) {
      this.showError('Identifiant de contrôle non valide');
      this.router.navigate(['/controls']);
      return;
    }

    this.controlService.getControl(controlId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (control) => {
          this.control = control;
          if (control.riskIds && control.riskIds.length > 0) {
            this.loadAssociatedRisks(control.riskIds);
          }
        },
        error: (error) => {
          console.error(`Erreur lors du chargement du contrôle ${controlId}:`, error);
          this.showError('Impossible de charger les détails du contrôle');
          this.router.navigate(['/controls']);
        }
      });
  }
  
  loadAssociatedRisks(riskIds: string[]): void {
    this.isLoading = true;
    
    const observables: Observable<Risk>[] = riskIds.map(id => 
      this.riskService.getRisk(id)
    );
    
    if (observables.length === 0) {
      this.isLoading = false;
      return;
    }
    
    forkJoin(observables)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (risks: Risk[]) => {
          this.associatedRisks = risks;
          console.log('Risques associés chargés:', risks);
        },
        error: (error: any) => {
          console.error('Erreur lors du chargement des risques associés:', error);
          this.showError('Impossible de charger les détails des risques associés');
        }
      });
  }

  editControl(): void {
    if (!this.control) return;

    const dialogRef = this.dialog.open(ControlFormDialogComponent, {
      width: '600px',
      data: { control: this.control }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.control = result;
        // Recharger les risques associés si nécessaire
        if (result.riskIds && result.riskIds.length > 0) {
          this.loadAssociatedRisks(result.riskIds);
        } else {
          this.associatedRisks = [];
        }
      }
    });
  }

  deleteControl(): void {
    if (!this.control) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Supprimer le contrôle',
        message: `Êtes-vous sûr de vouloir supprimer le contrôle "${this.control.name}" ?`,
        confirmText: 'Supprimer',
        cancelText: 'Annuler'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.control) {
        this.isLoading = true;
        this.controlService.deleteControl(this.control.id)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe({
            next: () => {
              this.snackBar.open('Contrôle supprimé avec succès', 'Fermer', { duration: 3000 });
              this.router.navigate(['/controls']);
            },
            error: (error) => {
              console.error('Erreur lors de la suppression du contrôle:', error);
              this.showError('Erreur lors de la suppression du contrôle');
            }
          });
      }
    });
  }

  getTypeClass(type: string): string {
    return type.toLowerCase();
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getEffectivenessClass(score: number | undefined): string {
    if (!score && score !== 0) return '';
    if (score >= 80) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
} 