import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Control, ControlType, ControlStatus, ControlFrequency } from '../models/control.model';
import { ControlService } from '../services/control.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RiskService } from '../../risks/services/risk.service';
import { Risk } from '../../../core/models/risk.model';
import { finalize } from 'rxjs/operators';

export interface ControlFormDialogData {
  control?: Control;
}

@Component({
  selector: 'app-control-form-dialog',
  templateUrl: './control-form-dialog.component.html',
  styleUrls: ['./control-form-dialog.component.scss']
})
export class ControlFormDialogComponent implements OnInit {
  controlForm: FormGroup;
  isEditing: boolean;
  isSubmitting = false;
  isLoadingRisks = false;
  risks: Risk[] = [];
  
  controlTypes = Object.values(ControlType);
  controlStatuses = Object.values(ControlStatus);
  controlFrequencies = Object.values(ControlFrequency);
  
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
    private fb: FormBuilder,
    private controlService: ControlService,
    private riskService: RiskService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ControlFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ControlFormDialogData
  ) {
    this.isEditing = !!data.control;
    this.controlForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadRisks();
    
    if (this.isEditing && this.data.control) {
      this.controlForm.patchValue(this.data.control);
    }
  }
  
  loadRisks(): void {
    this.isLoadingRisks = true;
    this.riskService.getRisks()
      .pipe(finalize(() => this.isLoadingRisks = false))
      .subscribe({
        next: (risks) => {
          this.risks = risks;
          console.log('Risques chargés:', risks);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des risques:', error);
          this.snackBar.open('Erreur lors du chargement des risques', 'Fermer', { duration: 5000 });
        }
      });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(1000)],
      type: [ControlType.PREVENTIVE, Validators.required],
      status: [ControlStatus.PLANNED, Validators.required],
      frequency: [null],
      owner: [''],
      implementationDate: [null],
      lastTestedDate: [null],
      effectivenessScore: [null, [Validators.min(0), Validators.max(100)]],
      documentation: [''],
      riskIds: [[]]
    });
  }

  onSubmit(): void {
    if (this.controlForm.invalid) {
      this.markFormGroupTouched(this.controlForm);
      return;
    }

    this.isSubmitting = true;
    const controlData = this.controlForm.value;

    if (this.isEditing && this.data.control) {
      this.controlService.updateControl(this.data.control.id, controlData).subscribe({
        next: (updatedControl) => {
          this.snackBar.open('Contrôle mis à jour avec succès', 'Fermer', { duration: 3000 });
          this.dialogRef.close(updatedControl);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du contrôle:', error);
          this.snackBar.open('Erreur lors de la mise à jour du contrôle', 'Fermer', { duration: 5000 });
          this.isSubmitting = false;
        }
      });
    } else {
      this.controlService.createControl(controlData).subscribe({
        next: (newControl) => {
          this.snackBar.open('Contrôle créé avec succès', 'Fermer', { duration: 3000 });
          this.dialogRef.close(newControl);
        },
        error: (error) => {
          console.error('Erreur lors de la création du contrôle:', error);
          this.snackBar.open('Erreur lors de la création du contrôle', 'Fermer', { duration: 5000 });
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Fonction pour marquer tous les champs comme touchés
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
} 