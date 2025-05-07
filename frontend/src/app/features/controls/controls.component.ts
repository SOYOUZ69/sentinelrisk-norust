import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Control, ControlType, ControlStatus, ControlFrequency } from './models/control.model';
import { ControlService } from './services/control.service';
import { ControlFormDialogComponent } from './control-form-dialog/control-form-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../admin/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  controls: Control[] = [];
  displayedColumns: string[] = ['name', 'type', 'status', 'frequency', 'effectivenessScore', 'createdAt', 'actions'];
  isLoading = false;
  
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
    private controlService: ControlService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadControls();
  }

  loadControls(): void {
    this.isLoading = true;
    this.controlService.getControls().subscribe({
      next: (controls) => {
        console.log('Contrôles récupérés:', controls);
        this.controls = controls;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des contrôles:', error);
        this.showError('Erreur lors du chargement des contrôles');
        this.isLoading = false;
      }
    });
  }

  openControlForm(control?: Control): void {
    const dialogRef = this.dialog.open(ControlFormDialogComponent, {
      width: '600px',
      data: { control }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadControls();
      }
    });
  }

  deleteControl(control: Control): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Supprimer le contrôle',
        message: `Êtes-vous sûr de vouloir supprimer le contrôle "${control.name}" ?`,
        confirmText: 'Supprimer',
        cancelText: 'Annuler'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.controlService.deleteControl(control.id).subscribe({
          next: () => {
            this.snackBar.open('Contrôle supprimé avec succès', 'Fermer', { duration: 3000 });
            this.loadControls();
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du contrôle:', error);
            this.showError('Erreur lors de la suppression du contrôle');
            this.isLoading = false;
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

  getEffectivenessClass(score: number): string {
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