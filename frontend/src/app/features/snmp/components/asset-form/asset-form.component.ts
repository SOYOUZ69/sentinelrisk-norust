import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnmpService } from '../../services/snmp.service';
import { Asset, AssetType, SnmpVersion } from '../../models/asset.model';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.scss']
})
export class AssetFormComponent implements OnInit {
  assetForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  isTestingConnection = false;
  
  assetTypes = Object.values(AssetType);
  snmpVersions = Object.values(SnmpVersion);
  
  authProtocols = ['MD5', 'SHA', 'SHA224', 'SHA256', 'SHA384', 'SHA512'];
  privProtocols = ['DES', '3DES', 'AES128', 'AES192', 'AES256'];

  constructor(
    private fb: FormBuilder,
    private snmpService: SnmpService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AssetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asset?: Asset }
  ) {
    this.isEditMode = !!data?.asset;
    this.createForm();
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.asset) {
      this.populateForm(this.data.asset);
    }
    
    // Écouter les changements de version SNMP pour ajuster les validations
    this.assetForm.get('snmpVersion')?.valueChanges.subscribe(version => {
      this.updateValidatorsForSnmpVersion(version);
    });
  }

  private createForm(): void {
    this.assetForm = this.fb.group({
      hostname: ['', [this.hostnameValidator]],
      ipAddress: ['', [this.ipAddressValidator]],
      type: ['', [Validators.required]],
      snmpVersion: ['', [Validators.required]],
      port: [161, [Validators.required, Validators.min(1), Validators.max(65535)]],
      
      // SNMP v1/v2c
      community: [''],
      
      // SNMP v3
      username: [''],
      authProtocol: [''],
      authPassword: [''],
      privProtocol: [''],
      privPassword: [''],
      
      description: ['', [Validators.maxLength(500)]],
      active: [true]
    }, { validators: [this.hostnameOrIpValidator] });
  }

  private populateForm(asset: Asset): void {
    this.assetForm.patchValue({
      hostname: asset.hostname,
      ipAddress: asset.ipAddress,
      type: asset.type,
      snmpVersion: asset.snmpVersion,
      port: asset.port,
      community: asset.community,
      username: asset.username,
      authProtocol: asset.authProtocol,
      authPassword: asset.authPassword,
      privProtocol: asset.privProtocol,
      privPassword: asset.privPassword,
      active: asset.active
    });
  }

  private updateValidatorsForSnmpVersion(version: SnmpVersion): void {
    const communityControl = this.assetForm.get('community');
    const snmpV3UserControl = this.assetForm.get('snmpV3User');
    const authProtocolControl = this.assetForm.get('authProtocol');
    const authPassControl = this.assetForm.get('authPass');
    const privProtocolControl = this.assetForm.get('privProtocol');
    const privPassControl = this.assetForm.get('privPass');

    // Réinitialiser les validateurs
    communityControl?.clearValidators();
    snmpV3UserControl?.clearValidators();
    authProtocolControl?.clearValidators();
    authPassControl?.clearValidators();
    privProtocolControl?.clearValidators();
    privPassControl?.clearValidators();

    if (version === SnmpVersion.V1 || version === SnmpVersion.V2C) {
      // SNMP v1/v2c : community obligatoire
      communityControl?.setValidators([Validators.required, Validators.maxLength(100)]);
    } else if (version === SnmpVersion.V3) {
      // SNMP v3 : utilisateur obligatoire
      snmpV3UserControl?.setValidators([Validators.required, Validators.maxLength(50)]);
      
      // Si auth protocol est défini, auth pass est obligatoire
      if (this.assetForm.get('authProtocol')?.value) {
        authPassControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
      }
      
      // Si priv protocol est défini, priv pass est obligatoire
      if (this.assetForm.get('privProtocol')?.value) {
        privPassControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
      }
    }

    // Mettre à jour la validation
    communityControl?.updateValueAndValidity();
    snmpV3UserControl?.updateValueAndValidity();
    authProtocolControl?.updateValueAndValidity();
    authPassControl?.updateValueAndValidity();
    privProtocolControl?.updateValueAndValidity();
    privPassControl?.updateValueAndValidity();
  }

  // Validateurs personnalisés
  private hostnameValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) return null;
    
    const hostnameRegex = /^[a-zA-Z0-9.-]+$/;
    if (!hostnameRegex.test(control.value)) {
      return { 'invalidHostname': true };
    }
    
    if (control.value.length > 255) {
      return { 'maxlength': true };
    }
    
    return null;
  }

  private ipAddressValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) return null;
    
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(control.value)) {
      return { 'invalidIpAddress': true };
    }
    
    return null;
  }

  private hostnameOrIpValidator(form: AbstractControl): {[key: string]: any} | null {
    const hostname = form.get('hostname')?.value;
    const ipAddress = form.get('ipAddress')?.value;
    
    if (!hostname && !ipAddress) {
      return { 'hostnameOrIpRequired': true };
    }
    
    return null;
  }

  onAuthProtocolChange(): void {
    const authProtocol = this.assetForm.get('authProtocol')?.value;
    const authPassControl = this.assetForm.get('authPass');
    
    if (authProtocol) {
      authPassControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
    } else {
      authPassControl?.clearValidators();
      authPassControl?.setValue('');
    }
    authPassControl?.updateValueAndValidity();
  }

  onPrivProtocolChange(): void {
    const privProtocol = this.assetForm.get('privProtocol')?.value;
    const privPassControl = this.assetForm.get('privPass');
    
    if (privProtocol) {
      privPassControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
    } else {
      privPassControl?.clearValidators();
      privPassControl?.setValue('');
    }
    privPassControl?.updateValueAndValidity();
  }

  async testConnection(): Promise<void> {
    if (this.assetForm.invalid) {
      this.snackBar.open('Veuillez corriger les erreurs du formulaire avant de tester la connexion', 'Fermer', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isTestingConnection = true;
    
    try {
      const assetData = this.assetForm.value;
      const testResult = await this.snmpService.testConnection(assetData).toPromise();
      
      if (testResult?.success) {
        this.snackBar.open('✅ Connexion SNMP réussie !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      } else {
        this.snackBar.open(`❌ Échec de la connexion : ${testResult?.error || 'Erreur inconnue'}`, 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    } catch (error) {
      this.snackBar.open('❌ Erreur lors du test de connexion', 'Fermer', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isTestingConnection = false;
    }
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const assetData = this.assetForm.value;

    const operation = this.isEditMode 
      ? this.snmpService.updateAsset(this.data.asset!.id!, assetData)
      : this.snmpService.createAsset(assetData);

    operation.subscribe({
      next: (asset) => {
        const message = this.isEditMode ? 'Asset mis à jour avec succès' : 'Asset créé avec succès';
        this.snackBar.open(message, 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(asset);
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
        this.snackBar.open('Erreur lors de la sauvegarde de l\'asset', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.assetForm.controls).forEach(key => {
      const control = this.assetForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.assetForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    
    if (errors['required']) return `${this.getFieldDisplayName(fieldName)} est obligatoire`;
    if (errors['minlength']) return `${this.getFieldDisplayName(fieldName)} doit contenir au moins ${errors['minlength'].requiredLength} caractères`;
    if (errors['maxlength']) return `${this.getFieldDisplayName(fieldName)} ne peut pas dépasser ${errors['maxlength'].requiredLength} caractères`;
    if (errors['min']) return `${this.getFieldDisplayName(fieldName)} doit être supérieur à ${errors['min'].min}`;
    if (errors['max']) return `${this.getFieldDisplayName(fieldName)} doit être inférieur à ${errors['max'].max}`;
    if (errors['invalidHostname']) return 'Le hostname ne peut contenir que des lettres, chiffres, points et tirets';
    if (errors['invalidIpAddress']) return 'L\'adresse IP doit être au format IPv4 valide';
    if (errors['hostnameOrIpRequired']) return 'Au moins un hostname ou une adresse IP doit être spécifié';
    
    return 'Champ invalide';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: {[key: string]: string} = {
      'hostname': 'Hostname',
      'ipAddress': 'Adresse IP',
      'type': 'Type d\'asset',
      'snmpVersion': 'Version SNMP',
      'port': 'Port',
      'community': 'Community',
      'snmpV3User': 'Utilisateur SNMP v3',
      'authProtocol': 'Protocole d\'authentification',
      'authPass': 'Mot de passe d\'authentification',
      'privProtocol': 'Protocole de chiffrement',
      'privPass': 'Mot de passe de chiffrement',
      'description': 'Description'
    };
    
    return displayNames[fieldName] || fieldName;
  }

  get isSnmpV3(): boolean {
    return this.assetForm.get('snmpVersion')?.value === SnmpVersion.V3;
  }

  get isSnmpV1OrV2C(): boolean {
    const version = this.assetForm.get('snmpVersion')?.value;
    return version === SnmpVersion.V1 || version === SnmpVersion.V2C;
  }
}
