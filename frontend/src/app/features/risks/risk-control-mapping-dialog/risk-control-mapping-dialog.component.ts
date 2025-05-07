import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { ControlService } from '../../controls/services/control.service';
import { RiskService } from '../services/risk.service';
import { Control } from '../../controls/models/control.model';

export interface RiskControlMappingDialogData {
  riskId: string;
  controlIds: string[];
}

@Component({
  selector: 'app-risk-control-mapping-dialog',
  templateUrl: './risk-control-mapping-dialog.component.html',
  styleUrls: ['./risk-control-mapping-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class RiskControlMappingDialogComponent implements OnInit {
  mappingForm: FormGroup;
  controls: Control[] = [];
  isLoading = false;
  isSaving = false;

  // Fonction de comparaison adaptée pour gérer les IDs numériques et string
  compareById = (id1: any, id2: any) => {
    if (id1 === null || id2 === null || id1 === undefined || id2 === undefined) return false;
    // Convertir explicitement en string pour la comparaison
    return String(id1) === String(id2);
  };

  constructor(
    public dialogRef: MatDialogRef<RiskControlMappingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RiskControlMappingDialogData,
    private formBuilder: FormBuilder,
    private controlService: ControlService,
    private riskService: RiskService
  ) {
    // Initialisation avec un tableau vide - les valeurs réelles seront définies dans ngOnInit
    this.mappingForm = this.formBuilder.group({
      controlIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadControls();
  }

  loadControls(): void {
    this.isLoading = true;
    this.controlService.getControls()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (controls) => {
          this.controls = controls;
          console.log('Contrôles disponibles:', this.controls.map(c => c.id));
          
          // Convertir explicitement les IDs en nombres après le chargement des contrôles
          const ids: number[] = this.data.controlIds.map(id => +id);
          console.log('IDs de contrôles convertis en nombres pour présélection:', ids);
          
          // Patcher le formulaire avec les IDs numériques
          this.mappingForm.patchValue({ controlIds: ids });
        },
        error: (error) => {
          console.error('Erreur lors du chargement des contrôles:', error);
        }
      });
  }

  onSave(): void {
    if (this.mappingForm.invalid) {
      return;
    }

    // Récupérer et convertir les IDs en nombre
    const selectedControlIds = this.mappingForm.get('controlIds')?.value || [];
    console.log('Contrôles sélectionnés avant envoi:', selectedControlIds);
    
    this.isSaving = true;
    this.riskService.updateRiskControls(this.data.riskId, selectedControlIds)
      .pipe(finalize(() => this.isSaving = false))
      .subscribe({
        next: (updatedRisk) => {
          console.log('Risque mis à jour avec succès:', updatedRisk);
          this.dialogRef.close(updatedRisk);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour des contrôles:', error);
          // Afficher plus de détails sur l'erreur pour faciliter le débogage
          if (error.error) {
            console.error('Détails de l\'erreur:', error.error);
          }
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
