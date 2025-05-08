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

  // Fonction de comparaison adaptée pour gérer les IDs de différents types
  compareById = (option: any, selection: any) => {
    if (option === null || selection === null || option === undefined || selection === undefined) {
      return false;
    }
    
    // Convertir explicitement en string pour la comparaison
    const optionStr = String(option);
    const selectionStr = String(selection);
    
    const result = optionStr === selectionStr;
    console.log(`Comparing ${optionStr} to ${selectionStr}: ${result}`);
    return result;
  };

  constructor(
    public dialogRef: MatDialogRef<RiskControlMappingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RiskControlMappingDialogData,
    private formBuilder: FormBuilder,
    private controlService: ControlService,
    private riskService: RiskService
  ) {
    console.log('Dialog initialized with data:', JSON.stringify(data));
    
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
          console.log('Contrôles disponibles:', controls.map(c => ({id: c.id, name: c.name})));
          
          // Conserver les IDs sous forme de chaînes
          const controlIds = this.data.controlIds || [];
          console.log('IDs de contrôles reçus du composant parent:', controlIds);
          
          // Patcher le formulaire avec les valeurs
          this.mappingForm.patchValue({ controlIds: controlIds });
          
          // Vérifier ce qui a été sélectionné
          console.log('Valeur du formulaire après patchValue:', this.mappingForm.get('controlIds')?.value);
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

    // Récupérer les IDs (ils peuvent être des chaînes ou des nombres)
    const selectedControlIds = this.mappingForm.get('controlIds')?.value || [];
    console.log('Contrôles sélectionnés avant envoi (brut):', selectedControlIds);
    
    // Convertir tous les IDs en nombres pour l'API backend
    const numericControlIds = selectedControlIds.map((id: any) => {
      const numId = Number(id);
      console.log(`Converting control ID '${id}' to number: ${numId}`);
      return numId;
    });
    
    console.log('Contrôles sélectionnés convertis en nombres:', numericControlIds);
    
    this.isSaving = true;
    this.riskService.updateRiskControls(this.data.riskId, numericControlIds)
      .pipe(finalize(() => this.isSaving = false))
      .subscribe({
        next: (updatedRisk) => {
          console.log('Risque mis à jour avec succès:', updatedRisk);
          
          // Vérifier les contrôles dans le risque mis à jour
          console.log('Contrôles dans le risque mis à jour:', updatedRisk.controls);
          console.log('IDs de contrôles dans le risque mis à jour:', updatedRisk.controlIds);
          
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
