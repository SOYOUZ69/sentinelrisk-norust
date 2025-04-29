import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../core/models/user.model';

export interface UserFormDialogData {
  user?: User;
  isEdit: boolean;
}

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit {
  userForm: FormGroup;
  isEdit = false;
  dialogTitle: string;
  roles = ['admin', 'user', 'risk_manager', 'compliance_officer', 'auditor'];
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFormDialogData
  ) {
    this.isEdit = data.isEdit;
    this.dialogTitle = this.isEdit ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur';
    
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: [''],
      role: ['user', Validators.required],
      active: [true]
    });
    
    if (this.isEdit && data.user) {
      this.userForm.patchValue({
        username: data.user.username,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        department: data.user.department || '',
        role: data.user.role,
        active: data.user.active
      });
      
      // Le nom d'utilisateur ne doit pas être modifiable
      this.userForm.get('username')?.disable();
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: Partial<User> = {
        ...this.userForm.getRawValue(),
      };
      
      this.dialogRef.close(userData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    
    if (!control) return '';
    
    if (control.hasError('required')) {
      return 'Ce champ est requis';
    }
    
    if (control.hasError('email')) {
      return 'Email invalide';
    }
    
    if (control.hasError('minlength')) {
      return `Minimum ${control.getError('minlength').requiredLength} caractères`;
    }
    
    return '';
  }
} 