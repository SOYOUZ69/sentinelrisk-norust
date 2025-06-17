import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Asset, AssetType, SnmpVersion } from '../../models/asset.model';

// Interface pour le résultat de scan statique
interface StaticScanResult {
  date: string;
  statut: 'Terminé' | 'En cours' | 'Échec';
  scoreGlobal: number;
  anomalies: number;
}

@Component({
  selector: 'app-manual-scan',
  templateUrl: './manual-scan.component.html',
  styleUrls: ['./manual-scan.component.css']
})
export class ManualScanComponent implements OnInit {
  scanForm: FormGroup;
  
  // Mock-data des assets disponibles (même liste que AssetListComponent)
  assets: Asset[] = [
    { 
      id: 1, 
      hostname: 'Serveur de base', 
      ipAddress: '10.0.0.12', 
      type: AssetType.SERVER, 
      snmpVersion: SnmpVersion.V2C,
      port: 161,
      active: true
    },
    { 
      id: 2, 
      hostname: 'Poste Utilisateur', 
      ipAddress: '10.0.0.35', 
      type: AssetType.PC, 
      snmpVersion: SnmpVersion.V3,
      port: 161,
      active: true
    },
    { 
      id: 3, 
      hostname: 'Switch Core', 
      ipAddress: '10.0.0.2', 
      type: AssetType.SWITCH, 
      snmpVersion: SnmpVersion.V2C,
      port: 161,
      active: true
    },
    { 
      id: 4, 
      hostname: 'Routeur Bureautique', 
      ipAddress: '10.0.1.1', 
      type: AssetType.ROUTER, 
      snmpVersion: SnmpVersion.V2C,
      port: 161,
      active: true
    },
    { 
      id: 5, 
      hostname: 'Imprimante Réseau', 
      ipAddress: '10.0.0.50', 
      type: AssetType.PRINTER, 
      snmpVersion: SnmpVersion.V1,
      port: 161,
      active: true
    }
  ];

  // Résultat de scan statique comme demandé
  scanResult: StaticScanResult | null = null;
  isScanning = false;
  showResult = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.scanForm = this.fb.group({
      assetId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.showStaticModeNotification();
  }

  showStaticModeNotification(): void {
    this.snackBar.open('Mode statique : Scan de démonstration', 'Fermer', {
      duration: 4000,
      panelClass: ['demo-mode-snackbar']
    });
  }

  onSubmit(): void {
    if (this.scanForm.valid) {
      this.lancerScan();
    }
  }

  lancerScan(): void {
    const selectedAssetId = this.scanForm.get('assetId')?.value;
    const selectedAsset = this.assets.find(a => a.id === selectedAssetId);
    
    if (!selectedAsset) return;

    this.isScanning = true;
    this.showResult = false;
    this.scanResult = null;

    this.snackBar.open(`Lancement du scan sur ${selectedAsset.hostname}...`, 'Fermer', {
      duration: 2000
    });

    // Simulation d'un scan avec délai
    setTimeout(() => {
      this.isScanning = false;
      this.showResult = true;
      
      // Résultat statique comme demandé par l'utilisateur
      this.scanResult = {
        date: '2025-06-12 14:05',
        statut: 'Terminé',
        scoreGlobal: 78,
        anomalies: 3
      };

      this.snackBar.open('Scan terminé avec succès (mode statique)', 'Fermer', {
        duration: 3000
      });
    }, 3000); // 3 secondes de simulation
  }

  resetScan(): void {
    this.scanForm.reset();
    this.showResult = false;
    this.scanResult = null;
    this.isScanning = false;
  }

  getAssetDisplayName(asset: Asset): string {
    return `${asset.hostname} (${asset.ipAddress})`;
  }

  getAssetTypeLabel(type: AssetType): string {
    const labels: { [key in AssetType]: string } = {
      [AssetType.SERVER]: 'Serveur',
      [AssetType.PC]: 'PC',
      [AssetType.SWITCH]: 'Commutateur',
      [AssetType.ROUTER]: 'Routeur',
      [AssetType.PRINTER]: 'Imprimante',
      [AssetType.FIREWALL]: 'Firewall',
      [AssetType.OTHER]: 'Autre'
    };
    return labels[type] || type;
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'primary';
    if (score >= 60) return 'accent';
    return 'warn';
  }
}
