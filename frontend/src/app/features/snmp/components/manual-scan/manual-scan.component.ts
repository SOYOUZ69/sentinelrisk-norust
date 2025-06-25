import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ManualScanService } from '../../services/manual-scan.service';
import {
  SnmpManualScanRequest,
  SnmpManualScanResponse,
  SnmpResult,
  ConnectivityTestRequest,
  SNMP_VERSIONS,
  DEFAULT_OIDS,
  PREDEFINED_OIDS,
  PredefinedOid,
  OID_CATEGORIES,
  OidCategory,
  SnmpValueInterpreter
} from '../../models/manual-scan.model';

interface InterpretedResult {
  oid: string;
  predefinedOid?: PredefinedOid;
  rawValue: string;
  formattedValue: string;
  interpretation: string;
  type: string;
  success: boolean;
  status: 'normal' | 'warning' | 'critical';
  error?: string;
}

@Component({
  selector: 'app-manual-scan',
  templateUrl: './manual-scan.component.html',
  styleUrls: ['./manual-scan.component.scss']
})
export class ManualScanComponent implements OnInit {
  scanForm: FormGroup;
  isLoading = false;
  isTestingConnectivity = false;
  connectivityResult: { success: boolean; duration?: number } | null = null;
  
  // Données des résultats
  scanResults: InterpretedResult[] = [];
  lastScanDuration = 0;
  
  // OIDs prédéfinis
  predefinedOids = PREDEFINED_OIDS;
  oidCategories = OID_CATEGORIES;
  categorizedOids: { [key in OidCategory]: PredefinedOid[] } = {
    system: [],
    memory: [],
    cpu: [],
    storage: [],
    network: [],
    process: [],
    other: []
  };
  
  // États UI
  selectedCategory: OidCategory | 'all' = 'system';
  showAdvancedSettings = false;
  showCustomOidInput = false;

  constructor(
    private fb: FormBuilder,
    private manualScanService: ManualScanService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.scanForm = this.createForm();
  }

  ngOnInit(): void {
    this.initializePredefinedOids();
    this.loadDefaultOids();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // Configuration de connexion
      ip: ['127.0.0.1', [
        Validators.required,
        Validators.pattern(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      ]],
      port: [161, [Validators.required, Validators.min(1), Validators.max(65535)]],
      community: ['public', Validators.required],
      version: ['2c', Validators.required],
      
      // Paramètres avancés
      timeout: [5000, [Validators.required, Validators.min(1000), Validators.max(30000)]],
      retries: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      
      // OIDs sélectionnés
      selectedPredefinedOids: [[]],
      customOid: ['', this.oidValidator],
      
      // OIDs finaux (pour compatibilité avec l'ancienne logique)
      oids: this.fb.array([])
    });
  }

  private initializePredefinedOids(): void {
    // Organiser les OIDs par catégorie
    this.predefinedOids.forEach(oid => {
      this.categorizedOids[oid.category].push(oid);
    });
  }

  private loadDefaultOids(): void {
    // Charger quelques OIDs système par défaut
    const defaultSystemOids = this.categorizedOids.system.slice(0, 3);
    this.scanForm.get('selectedPredefinedOids')?.setValue(defaultSystemOids);
    this.updateOidsFormArray();
  }

  // === GESTION DES OIDS ===

  get oidsFormArray(): FormArray {
    return this.scanForm.get('oids') as FormArray;
  }

  get selectedPredefinedOids(): PredefinedOid[] {
    return this.scanForm.get('selectedPredefinedOids')?.value || [];
  }

  isOidSelected(oid: PredefinedOid): boolean {
    return this.selectedPredefinedOids.some(selected => selected.oid === oid.oid);
  }

  togglePredefinedOid(oid: PredefinedOid): void {
    const current = this.selectedPredefinedOids;
    const index = current.findIndex(selected => selected.oid === oid.oid);
    
    if (index > -1) {
      // Retirer l'OID
      current.splice(index, 1);
    } else {
      // Ajouter l'OID
      current.push(oid);
    }
    
    this.scanForm.get('selectedPredefinedOids')?.setValue([...current]);
    this.updateOidsFormArray();
  }

  addCustomOid(): void {
    const customOid = this.scanForm.get('customOid')?.value?.trim();
    if (!customOid) return;

    // Vérifier que l'OID n'existe pas déjà
    const current = this.selectedPredefinedOids;
    if (current.some(oid => oid.oid === customOid)) {
      this.snackBar.open('Cet OID est déjà sélectionné', 'Fermer', { duration: 3000 });
      return;
    }

    // Ajouter l'OID personnalisé
    const customOidObj: PredefinedOid = {
      oid: customOid,
      name: 'OID personnalisé',
      description: 'OID ajouté manuellement par l\'utilisateur',
      category: 'other',
      icon: 'edit',
      interpretation: 'Valeur personnalisée'
    };

    current.push(customOidObj);
    this.scanForm.get('selectedPredefinedOids')?.setValue([...current]);
    this.scanForm.get('customOid')?.setValue('');
    this.updateOidsFormArray();
    this.showCustomOidInput = false;
  }

  removeSelectedOid(oidToRemove: PredefinedOid): void {
    const current = this.selectedPredefinedOids;
    const filtered = current.filter(oid => oid.oid !== oidToRemove.oid);
    this.scanForm.get('selectedPredefinedOids')?.setValue(filtered);
    this.updateOidsFormArray();
  }

  private updateOidsFormArray(): void {
    const oidsArray = this.oidsFormArray;
    oidsArray.clear();
    
    this.selectedPredefinedOids.forEach(oid => {
      oidsArray.push(this.fb.control(oid.oid, [Validators.required, this.oidValidator]));
    });
  }

  // === VALIDATION ===

  private oidValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) return null;
    
    const oidPattern = /^[0-9]+(\.[0-9]+)*$/;
    return oidPattern.test(control.value) ? null : { invalidOid: true };
  }

  getFieldError(fieldName: string): string {
    const field = this.scanForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return `${fieldName} est requis`;
    if (field.errors['pattern']) return `Format ${fieldName} invalide`;
    if (field.errors['min']) return `${fieldName} trop petit`;
    if (field.errors['max']) return `${fieldName} trop grand`;
    if (field.errors['invalidOid']) return 'Format OID invalide (ex: 1.3.6.1.2.1.1.1.0)';
    
    return 'Erreur de validation';
  }

  // === CONNECTIVITÉ ===

  async testConnectivity(): Promise<void> {
    if (this.scanForm.invalid) return;

    this.isTestingConnectivity = true;
    this.connectivityResult = null;

    try {
      const request: ConnectivityTestRequest = {
        ip: this.scanForm.get('ip')?.value,
        port: this.scanForm.get('port')?.value,
        community: this.scanForm.get('community')?.value,
        version: this.scanForm.get('version')?.value
      };

      console.log('🔍 Test de connectivité SNMP...', request);
      
      const response = await this.manualScanService.testConnectivity(request).toPromise();
      
      this.connectivityResult = {
        success: response?.success || false,
        duration: response?.duration
      };

      const message = response?.success 
        ? `✅ Connectivité OK (${response.duration}ms)`
        : `❌ Échec de connexion: ${response?.error}`;
        
      this.snackBar.open(message, 'Fermer', {
        duration: 5000,
        panelClass: response?.success ? 'success-snackbar' : 'error-snackbar'
      });

      console.log('🔍 Résultat du test:', response);
      
    } catch (error) {
      console.error('❌ Erreur lors du test de connectivité:', error);
      this.connectivityResult = { success: false };
      this.snackBar.open('❌ Erreur lors du test de connectivité', 'Fermer', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    } finally {
      this.isTestingConnectivity = false;
    }
  }

  // === SCAN SNMP ===

  async performScan(): Promise<void> {
    if (this.scanForm.invalid || this.selectedPredefinedOids.length === 0) {
      this.snackBar.open('⚠️ Veuillez corriger les erreurs du formulaire', 'Fermer', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.scanResults = [];

    try {
      const request: SnmpManualScanRequest = {
        ip: this.scanForm.get('ip')?.value,
        port: this.scanForm.get('port')?.value,
        community: this.scanForm.get('community')?.value,
        version: this.scanForm.get('version')?.value,
        oids: this.selectedPredefinedOids.map(oid => oid.oid),
        timeout: this.scanForm.get('timeout')?.value,
        retries: this.scanForm.get('retries')?.value
      };

      console.log('🚀 Lancement du scan SNMP...', request);
      
      const response = await this.manualScanService.performManualScan(request).toPromise();
      
      if (response?.success && response.results) {
        this.lastScanDuration = response.duration;
        this.scanResults = this.interpretResults(response.results);
        
        const successCount = this.scanResults.filter(r => r.success).length;
        const totalCount = this.scanResults.length;
        
        this.snackBar.open(
          `✅ Scan terminé: ${successCount}/${totalCount} OIDs récupérés (${response.duration}ms)`,
          'Fermer',
          { duration: 5000, panelClass: 'success-snackbar' }
        );
        
        console.log('✅ Résultats du scan:', this.scanResults);
        
      } else {
        throw new Error(response?.error || 'Échec du scan SNMP');
      }
      
    } catch (error) {
      console.error('❌ Erreur lors du scan:', error);
      this.snackBar.open('❌ Erreur lors du scan SNMP', 'Fermer', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    } finally {
      this.isLoading = false;
    }
  }

  private interpretResults(results: SnmpResult[]): InterpretedResult[] {
    return results.map(result => {
      const predefinedOid = this.predefinedOids.find(p => p.oid === result.oid);
      
      if (result.success && result.value) {
        const interpretation = SnmpValueInterpreter.interpretValue(result.oid, result.value, result.type);
        
        return {
          oid: result.oid,
          predefinedOid,
          rawValue: result.value,
          formattedValue: interpretation.formatted,
          interpretation: interpretation.interpretation,
          type: result.type,
          success: true,
          status: interpretation.status
        };
      } else {
        return {
          oid: result.oid,
          predefinedOid,
          rawValue: '',
          formattedValue: '',
          interpretation: 'Erreur de récupération',
          type: result.type,
          success: false,
          status: 'critical',
          error: result.error
        };
      }
    });
  }

  // === UTILITAIRES UI ===

  getCategoryOids(category: OidCategory): PredefinedOid[] {
    return this.categorizedOids[category] || [];
  }

  getSelectedOidsCount(): number {
    return this.selectedPredefinedOids.length;
  }

  getCriticalResultsCount(): number {
    return this.scanResults.filter(r => r.status === 'critical').length;
  }

  getStatusIcon(status: 'normal' | 'warning' | 'critical'): string {
    switch (status) {
      case 'normal': return 'check_circle';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'help';
    }
  }

  getStatusColor(status: 'normal' | 'warning' | 'critical'): string {
    switch (status) {
      case 'normal': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#9E9E9E';
    }
  }

  // === MÉTHODES POUR LES FILTRES DANS LE TEMPLATE ===

  getResultsByStatus(status: 'normal' | 'warning' | 'critical'): InterpretedResult[] {
    return this.scanResults.filter(r => r.status === status);
  }

  getSuccessfulResultsCount(): number {
    return this.scanResults.filter(r => r.success).length;
  }

  hasResultsWithStatus(status: 'normal' | 'warning' | 'critical'): boolean {
    return this.scanResults.some(r => r.status === status);
  }

  // === DONNÉES POUR LE TEMPLATE ===

  readonly snmpVersions = SNMP_VERSIONS;
  readonly categories = Object.keys(this.oidCategories) as OidCategory[];
}
