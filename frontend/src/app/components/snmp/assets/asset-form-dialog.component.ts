import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnmpService, SnmpAssetRequest } from '../../../services/snmp.service';
import { SnmpAsset } from '../../../models/snmp.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-asset-form-dialog',
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Modifier' : 'Créer' }} un Asset SNMP</h2>
    
    <form [formGroup]="assetForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content class="dialog-content">
        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Nom de l'asset *</mat-label>
            <input matInput formControlName="name" placeholder="ex: Router-Principal-01">
            <mat-error *ngIf="assetForm.get('name')?.hasError('required')">
              Le nom est obligatoire
            </mat-error>
            <mat-error *ngIf="assetForm.get('name')?.hasError('maxlength')">
              Le nom ne peut pas dépasser 100 caractères
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Adresse IP *</mat-label>
            <input matInput formControlName="ipAddress" placeholder="192.168.1.1">
            <mat-error *ngIf="assetForm.get('ipAddress')?.hasError('required')">
              L'adresse IP est obligatoire
            </mat-error>
            <mat-error *ngIf="assetForm.get('ipAddress')?.hasError('pattern')">
              Format d'adresse IP invalide
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Port SNMP *</mat-label>
            <input matInput type="number" formControlName="snmpPort" placeholder="161">
            <mat-error *ngIf="assetForm.get('snmpPort')?.hasError('required')">
              Le port SNMP est obligatoire
            </mat-error>
            <mat-error *ngIf="assetForm.get('snmpPort')?.hasError('min') || assetForm.get('snmpPort')?.hasError('max')">
              Le port doit être entre 1 et 65535
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Communauté SNMP *</mat-label>
            <input matInput formControlName="snmpCommunity" placeholder="public">
            <mat-error *ngIf="assetForm.get('snmpCommunity')?.hasError('required')">
              La communauté SNMP est obligatoire
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Version SNMP</mat-label>
            <mat-select formControlName="snmpVersion">
              <mat-option value="1">Version 1</mat-option>
              <mat-option value="2c">Version 2c</mat-option>
              <mat-option value="3">Version 3</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Type d'équipement</mat-label>
            <mat-select formControlName="deviceType">
              <mat-option value="router">Routeur</mat-option>
              <mat-option value="switch">Switch</mat-option>
              <mat-option value="server">Serveur</mat-option>
              <mat-option value="printer">Imprimante</mat-option>
              <mat-option value="other">Autre</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Statut</mat-label>
            <mat-select formControlName="status">
              <mat-option value="active">Actif</mat-option>
              <mat-option value="inactive">Inactif</mat-option>
              <mat-option value="maintenance">Maintenance</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="3" 
                      placeholder="Description de l'équipement"></textarea>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Emplacement</mat-label>
            <input matInput formControlName="location" 
                   placeholder="ex: Salle serveur - Rack A1">
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Annuler</button>
        <button mat-raised-button color="primary" type="submit" 
                [disabled]="assetForm.invalid || isSubmitting">
          <mat-icon *ngIf="isSubmitting">hourglass_empty</mat-icon>
          {{ isSubmitting ? 'Enregistrement...' : (isEdit ? 'Modifier' : 'Créer') }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .dialog-content {
      width: 500px;
      max-height: 70vh;
      overflow-y: auto;
    }
    
    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .full-width {
      width: 100%;
    }
    
    .half-width {
      width: calc(50% - 8px);
    }
    
    mat-form-field {
      margin-bottom: 8px;
    }
    
    .mat-mdc-dialog-actions {
      padding: 16px 24px;
    }
  `]
})
export class AssetFormDialogComponent implements OnInit {
  assetForm: FormGroup;
  isEdit = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private snmpService: SnmpService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AssetFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asset?: SnmpAsset }
  ) {
    this.isEdit = !!data?.asset;
    this.assetForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.isEdit && this.data.asset) {
      this.populateForm(this.data.asset);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      ipAddress: ['', [
        Validators.required,
        Validators.pattern(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      ]],
      snmpPort: [161, [Validators.required, Validators.min(1), Validators.max(65535)]],
      snmpCommunity: ['public', [Validators.required, Validators.maxLength(50)]],
      snmpVersion: ['2c'],
      deviceType: [''],
      status: ['active'],
      description: [''],
      location: ['']
    });
  }

  private populateForm(asset: SnmpAsset): void {
    this.assetForm.patchValue({
      name: asset.name || asset.hostName,
      ipAddress: asset.ipAddress,
      snmpPort: asset.snmpPort || 161,
      snmpCommunity: asset.snmpCommunity || 'public',
      snmpVersion: asset.snmpVersion || '2c',
      deviceType: asset.deviceType || '',
      status: asset.status || 'active',
      description: asset.description || '',
      location: asset.location || ''
    });
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const formValue = this.assetForm.value;
    
    const assetRequest: SnmpAssetRequest = {
      name: formValue.name,
      ipAddress: formValue.ipAddress,
      snmpPort: formValue.snmpPort,
      snmpCommunity: formValue.snmpCommunity,
      snmpVersion: formValue.snmpVersion,
      deviceType: formValue.deviceType,
      status: formValue.status,
      description: formValue.description,
      location: formValue.location
    };

    const operation = this.isEdit 
      ? this.snmpService.updateAsset(this.data.asset!.id!, assetRequest)
      : this.snmpService.createAsset(assetRequest);

    operation.subscribe({
      next: (result) => {
        const message = this.isEdit 
          ? `Asset "${result.name}" modifié avec succès`
          : `Asset "${result.name}" créé avec succès`;
        
        this.snackBar.open(message, 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Erreur lors de l\'opération:', error);
        
        let message = 'Une erreur est survenue';
        if (error.status === 409) {
          message = 'Un asset avec cette adresse IP existe déjà';
        } else if (error.status === 400) {
          message = 'Données invalides';
        } else if (error.status === 404) {
          message = 'Asset non trouvé';
        }
        
        this.snackBar.open(message, 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 