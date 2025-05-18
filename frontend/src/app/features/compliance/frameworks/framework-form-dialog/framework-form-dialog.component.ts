import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComplianceFramework } from '../../../../core/models/compliance.model';

@Component({
  selector: 'app-framework-form-dialog',
  templateUrl: './framework-form-dialog.component.html',
  styleUrls: ['./framework-form-dialog.component.scss']
})
export class FrameworkFormDialogComponent implements OnInit {
  frameworkForm!: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = 'Créer un Référentiel Normatif';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FrameworkFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<ComplianceFramework>
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data.id;
    
    if (this.isEditMode) {
      this.dialogTitle = 'Modifier le Référentiel Normatif';
    }

    this.initForm();
  }

  initForm(): void {
    this.frameworkForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name || '', [Validators.required, Validators.maxLength(100)]],
      version: [this.data.version || '', [Validators.required, Validators.maxLength(20)]],
      description: [this.data.description || '', Validators.maxLength(500)]
    });
  }

  onSubmit(): void {
    if (this.frameworkForm.valid) {
      this.dialogRef.close(this.frameworkForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 