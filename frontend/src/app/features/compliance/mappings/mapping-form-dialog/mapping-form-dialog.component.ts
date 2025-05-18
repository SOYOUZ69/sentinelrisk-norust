import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin, finalize } from 'rxjs';
import { ComplianceFramework, ComplianceRequirement, ComplianceStatus, RiskComplianceMapping } from '../../../../core/models/compliance.model';
import { Risk, RiskService } from '../../../../core/services/risk.service';
import { ComplianceFrameworkService } from '../../services/compliance-framework.service';
import { ComplianceRequirementService } from '../../services/compliance-requirement.service';

@Component({
  selector: 'app-mapping-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './mapping-form-dialog.component.html',
  styleUrl: './mapping-form-dialog.component.css'
})
export class MappingFormDialogComponent implements OnInit {
  mappingForm!: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = 'Créer un Mapping Risque-Conformité';
  isSubmitting: boolean = false;
  
  // Données pour les sélecteurs du formulaire
  risks: Risk[] = [];
  frameworks: ComplianceFramework[] = [];
  requirements: ComplianceRequirement[] = [];
  filteredRequirements: ComplianceRequirement[] = [];
  selectedFramework: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MappingFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private riskService: RiskService,
    private frameworkService: ComplianceFrameworkService,
    private requirementService: ComplianceRequirementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.mapping?.id;
    if (this.isEditMode) {
      this.dialogTitle = 'Modifier le Mapping Risque-Conformité';
    }

    this.initForm();
    this.loadData();
  }

  initForm(): void {
    const mapping = this.data?.mapping || {};
    
    this.mappingForm = this.fb.group({
      id: [mapping.id],
      riskId: [mapping.riskId || '', Validators.required],
      requirementId: [mapping.requirementId || '', Validators.required],
      status: [mapping.status || ComplianceStatus.NON_COMPLIANT, Validators.required],
      comment: [mapping.comment || ''],
      evidence: [mapping.evidence || '']
    });

    // Si on est en mode édition et qu'il y a des données préexistantes
    if (this.isEditMode && mapping.requirement?.framework) {
      this.selectedFramework = mapping.requirement.framework.id;
    }
  }

  loadData(): void {
    this.isSubmitting = true;
    
    // Récupération des données nécessaires en parallèle
    forkJoin({
      risks: this.riskService.getRisks(),
      frameworks: this.frameworkService.getFrameworks()
    }).subscribe({
      next: (result) => {
        this.risks = result.risks;
        this.frameworks = result.frameworks;
        
        // Si on est en mode édition et qu'il y a des données préexistantes
        if (this.isEditMode && this.data?.mapping) {
          const mapping = this.data.mapping;
          
          // Charger les exigences du framework si on a un framework
          if (mapping.requirement?.framework) {
            this.selectedFramework = mapping.requirement.framework.id;
            this.loadRequirementsByFramework(this.selectedFramework);
          } else {
            this.loadAllRequirements();
          }
          
          this.mappingForm.patchValue({
            riskId: mapping.riskId,
            requirementId: mapping.requirementId,
            status: mapping.status
          });
        } else {
          // Si on n'est pas en mode édition, charger toutes les exigences
          this.loadAllRequirements();
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données', error);
        this.snackBar.open('Erreur lors du chargement des données. Veuillez réessayer.', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isSubmitting = false;
      }
    });
  }

  loadAllRequirements(): void {
    this.requirementService.getRequirements().subscribe({
      next: (requirements) => {
        this.requirements = requirements;
        this.filteredRequirements = requirements;
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des exigences', error);
        this.snackBar.open('Erreur lors du chargement des exigences. Veuillez réessayer.', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isSubmitting = false;
      }
    });
  }

  loadRequirementsByFramework(frameworkId: string): void {
    if (!frameworkId) {
      this.loadAllRequirements();
      return;
    }

    this.isSubmitting = true;
    this.requirementService.getRequirementsByFramework(frameworkId)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: (requirements) => {
          this.requirements = requirements;
          this.filteredRequirements = requirements;
          
          // Vérifier si l'exigence sélectionnée existe toujours dans la liste
          this.validateRequirementSelection();
        },
        error: (error) => {
          console.error(`Erreur lors du chargement des exigences du framework ${frameworkId}`, error);
          this.snackBar.open('Erreur lors du chargement des exigences. Veuillez réessayer.', 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }

  filterRequirements(): void {
    if (!this.selectedFramework) {
      this.loadAllRequirements();
    } else {
      this.loadRequirementsByFramework(this.selectedFramework);
    }
  }

  validateRequirementSelection(): void {
    // Vérifier si l'exigence sélectionnée existe toujours dans la liste
    const currentReqId = this.mappingForm.get('requirementId')?.value;
    if (currentReqId) {
      const reqExists = this.filteredRequirements.some(req => req.id === currentReqId);
      if (!reqExists) {
        this.mappingForm.patchValue({ requirementId: '' });
      }
    }
  }

  onFrameworkChange(): void {
    this.filterRequirements();
  }

  onSubmit(): void {
    if (this.mappingForm.valid) {
      this.isSubmitting = true;
      
      const formValue = this.mappingForm.value;
      
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
