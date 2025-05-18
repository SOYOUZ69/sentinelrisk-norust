import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComplianceRequirement, ComplianceRequirementType, ComplianceFramework } from '../../../../core/models/compliance.model';

@Component({
  selector: 'app-requirement-form-dialog',
  templateUrl: './requirement-form-dialog.component.html',
  styleUrls: ['./requirement-form-dialog.component.scss']
})
export class RequirementFormDialogComponent implements OnInit {
  requirementForm!: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = 'Créer une Exigence';
  frameworks: ComplianceFramework[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RequirementFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.frameworks = data.frameworks || [];
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data.requirement?.id;
    
    if (this.isEditMode) {
      this.dialogTitle = 'Modifier l\'Exigence';
    }

    this.initForm();
  }

  initForm(): void {
    const requirement = this.data.requirement || {};
    
    this.requirementForm = this.fb.group({
      id: [requirement.id],
      code: [requirement.code || '', [Validators.required, Validators.maxLength(50)]],
      description: [requirement.description || '', [Validators.required, Validators.maxLength(500)]],
      type: [requirement.type || ComplianceRequirementType.PREVENTIVE, Validators.required],
      frameworkId: [requirement.frameworkId || '', Validators.required]
    });

    console.log('Framework de l\'exigence en édition :', requirement.framework);

    // Si on est en mode édition et que l'exigence a un framework
    if (this.isEditMode && requirement.framework) {
      this.requirementForm.patchValue({
        frameworkId: requirement.framework.id
      });

      console.log('Framework ID pré-rempli :', requirement.framework.id);
    }
  }

  onSubmit(): void {
    if (this.requirementForm.valid) {
      const formValue = this.requirementForm.value;
      
      // Pour les APIs backend, on a besoin du frameworkId
      const result = {
        ...formValue
      };
      
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 