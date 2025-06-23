import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManualScanService } from '../../services/manual-scan.service';
import { 
  SnmpManualScanRequest, 
  SnmpManualScanResponse, 
  ConnectivityTestResponse,
  SNMP_VERSIONS,
  DEFAULT_OIDS,
  COMMON_OIDS
} from '../../models/manual-scan.model';

@Component({
  selector: 'app-manual-scan',
  templateUrl: './manual-scan.component.html',
  styleUrls: ['./manual-scan.component.css']
})
export class ManualScanComponent implements OnInit {
  scanForm: FormGroup;
  
  // État du composant
  isScanning = false;
  isTesting = false;
  showResult = false;
  scanResult: SnmpManualScanResponse | null = null;
  connectivityResult: ConnectivityTestResponse | null = null;

  // Options de configuration
  snmpVersions = SNMP_VERSIONS;
  commonOids = COMMON_OIDS;
  
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private manualScanService: ManualScanService
  ) {
    this.scanForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDefaultOids();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      ip: ['', [Validators.required, Validators.pattern(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)]],
      port: [161, [Validators.required, Validators.min(1), Validators.max(65535)]],
      community: ['public', Validators.required],
      version: ['2c', Validators.required],
      timeout: [5000, [Validators.required, Validators.min(1000), Validators.max(30000)]],
      retries: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      oids: this.fb.array([])
    });
  }

  get oidsArray(): FormArray {
    return this.scanForm.get('oids') as FormArray;
  }

  private loadDefaultOids(): void {
    DEFAULT_OIDS.forEach(oid => {
      this.addOid(oid);
    });
  }

  addOid(oid: string = ''): void {
    const oidControl = this.fb.control(oid, [
      Validators.required,
      Validators.pattern(/^[0-9]+(\.[0-9]+)*$/)
    ]);
    this.oidsArray.push(oidControl);
  }

  removeOid(index: number): void {
    if (this.oidsArray.length > 1) {
      this.oidsArray.removeAt(index);
    } else {
      this.snackBar.open('Au moins un OID est requis', 'Fermer', { duration: 3000 });
    }
  }

  addCommonOid(oid: string): void {
    // Vérifier si l'OID n'existe pas déjà
    const currentOids = this.oidsArray.value;
    if (!currentOids.includes(oid)) {
      this.addOid(oid);
      this.snackBar.open(`OID ${oid} ajouté`, 'Fermer', { duration: 2000 });
    } else {
      this.snackBar.open('Cet OID est déjà dans la liste', 'Fermer', { duration: 2000 });
    }
  }

  onSubmit(): void {
    if (this.scanForm.valid) {
      this.performScan();
    } else {
      this.snackBar.open('Veuillez corriger les erreurs du formulaire', 'Fermer', { duration: 3000 });
    }
  }

  testConnectivity(): void {
    if (!this.scanForm.get('ip')?.valid || !this.scanForm.get('port')?.valid) {
      this.snackBar.open('Veuillez saisir une IP et un port valides', 'Fermer', { duration: 3000 });
      return;
    }

    this.isTesting = true;
    this.connectivityResult = null;

    const testRequest = {
      ip: this.scanForm.get('ip')?.value,
      port: this.scanForm.get('port')?.value,
      community: this.scanForm.get('community')?.value,
      version: this.scanForm.get('version')?.value
    };

    console.log('🔗 Test de connectivité:', testRequest);

    this.manualScanService.testConnectivity(testRequest).subscribe({
      next: (response) => {
        console.log('✅ Réponse test connectivité:', response);
        this.connectivityResult = response;
        this.isTesting = false;
        
        const message = response.success 
          ? `🟢 Connectivité réussie (${response.duration}ms)`
          : `🔴 Échec de connectivité: ${response.error}`;
        
        this.snackBar.open(message, 'Fermer', { 
          duration: 5000,
          panelClass: response.success ? 'success-snackbar' : 'error-snackbar'
        });
      },
      error: (error) => {
        console.error('❌ Erreur test connectivité:', error);
        this.isTesting = false;
        this.snackBar.open(`🔴 Erreur de test: ${error.message || 'Erreur inconnue'}`, 'Fermer', { 
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  performScan(): void {
    this.isScanning = true;
    this.showResult = false;
    this.scanResult = null;

    const scanRequest: SnmpManualScanRequest = {
      ip: this.scanForm.get('ip')?.value,
      port: this.scanForm.get('port')?.value,
      community: this.scanForm.get('community')?.value,
      version: this.scanForm.get('version')?.value,
      timeout: this.scanForm.get('timeout')?.value,
      retries: this.scanForm.get('retries')?.value,
      oids: this.oidsArray.value.filter((oid: string) => oid.trim() !== '')
    };

    console.log('🔍 Lancement du scan:', scanRequest);
    
    this.snackBar.open(`Lancement du scan SNMP sur ${scanRequest.ip}:${scanRequest.port}...`, 'Fermer', {
      duration: 2000
    });

    this.manualScanService.performManualScan(scanRequest).subscribe({
      next: (response) => {
        console.log('✅ Réponse scan:', response);
        this.scanResult = response;
        this.isScanning = false;
        this.showResult = true;

        const message = response.success 
          ? `🟢 Scan terminé avec succès (${response.duration}ms)`
          : `🔴 Scan échoué: ${response.error}`;
        
        this.snackBar.open(message, 'Fermer', { 
          duration: 5000,
          panelClass: response.success ? 'success-snackbar' : 'error-snackbar'
        });
      },
      error: (error) => {
        console.error('❌ Erreur scan:', error);
        this.isScanning = false;
        this.snackBar.open(`🔴 Erreur de scan: ${error.message || 'Erreur inconnue'}`, 'Fermer', { 
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  resetScan(): void {
    this.scanForm.reset();
    this.showResult = false;
    this.scanResult = null;
    this.connectivityResult = null;
    this.isScanning = false;
    this.isTesting = false;
    
    // Recharger les valeurs par défaut
    this.scanForm.patchValue({
      port: 161,
      community: 'public',
      version: '2c',
      timeout: 5000,
      retries: 3
    });
    
    // Vider et recharger les OIDs par défaut
    while (this.oidsArray.length !== 0) {
      this.oidsArray.removeAt(0);
    }
    this.loadDefaultOids();
  }

  getOidLabel(oid: string): string {
    const commonOid = this.commonOids.find(item => item.oid === oid);
    return commonOid ? `${commonOid.label} (${commonOid.category})` : 'OID personnalisé';
  }

  getSnmpVersionLabel(version: string): string {
    switch (version) {
      case '1': return 'SNMP v1';
      case '2c': return 'SNMP v2c';
      case '3': return 'SNMP v3';
      default: return version;
    }
  }

  formatDuration(duration: number): string {
    if (duration < 1000) {
      return `${duration}ms`;
    } else {
      return `${(duration / 1000).toFixed(1)}s`;
    }
  }

  getResultTypeIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'integer': return 'looks_one';
      case 'octetstring': return 'text_fields';
      case 'counter32': case 'counter64': return 'trending_up';
      case 'gauge32': return 'speed';
      case 'timeticks': return 'schedule';
      case 'ipaddress': return 'language';
      default: return 'help_outline';
    }
  }
}
