import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Asset, AssetType, SnmpVersion } from '../../models/asset.model';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  // Mock-data statiques comme demandé par l'utilisateur
  assets: Asset[] = [
    { 
      id: 1, 
      hostname: 'Serveur de base', 
      ipAddress: '10.0.0.12', 
      type: AssetType.SERVER, 
      snmpVersion: SnmpVersion.V2C,
      port: 161,
      active: true,
      createdAt: new Date('2023-11-01'),
      updatedAt: new Date('2023-12-01')
    },
    { 
      id: 2, 
      hostname: 'Poste Utilisateur', 
      ipAddress: '10.0.0.35', 
      type: AssetType.PC, 
      snmpVersion: SnmpVersion.V3,
      port: 161,
      active: true,
      createdAt: new Date('2023-11-05'),
      updatedAt: new Date('2023-12-02')
    },
    { 
      id: 3, 
      hostname: 'Switch Core', 
      ipAddress: '10.0.0.2', 
      type: AssetType.SWITCH, 
      snmpVersion: SnmpVersion.V2C,
      port: 161,
      active: true,
      createdAt: new Date('2023-10-20'),
      updatedAt: new Date('2023-11-30')
    },
    { 
      id: 4, 
      hostname: 'Routeur Bureautique', 
      ipAddress: '10.0.1.1', 
      type: AssetType.ROUTER, 
      snmpVersion: SnmpVersion.V2C,
      port: 161,
      active: true,
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2023-11-25')
    },
    { 
      id: 5, 
      hostname: 'Imprimante Réseau', 
      ipAddress: '10.0.0.50', 
      type: AssetType.PRINTER, 
      snmpVersion: SnmpVersion.V1,
      port: 161,
      active: true,
      createdAt: new Date('2023-11-10'),
      updatedAt: new Date('2023-12-05')
    }
  ];

  loading = false;
  displayedColumns: string[] = ['id', 'hostname', 'type', 'ipAddress', 'snmpVersion', 'actions'];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Pas de chargement d'API, les données sont déjà présentes
    this.showStaticModeNotification();
  }

  showStaticModeNotification(): void {
    this.snackBar.open('Mode statique : Données de démonstration', 'Fermer', {
      duration: 4000,
      panelClass: ['demo-mode-snackbar']
    });
  }

  createAsset(): void {
    this.snackBar.open('Fonctionnalité désactivée en mode statique', 'Fermer', {
      duration: 3000
    });
  }

  editAsset(asset: Asset): void {
    this.snackBar.open('Fonctionnalité désactivée en mode statique', 'Fermer', {
      duration: 3000
    });
  }

  toggleAssetStatus(asset: Asset): void {
    // Simulation d'un changement de statut en mode statique
    asset.active = !asset.active;
    asset.updatedAt = new Date();
    
    this.snackBar.open(
      `Asset ${asset.active ? 'activé' : 'désactivé'} (mode statique)`, 
      'Fermer', 
      { duration: 3000 }
    );
  }

  deleteAsset(asset: Asset): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'asset ${asset.hostname || asset.ipAddress} ?`)) {
      // Simulation de suppression en mode statique
      const index = this.assets.findIndex(a => a.id === asset.id);
      if (index !== -1) {
        this.assets.splice(index, 1);
      }
      
      this.snackBar.open('Asset supprimé (mode statique)', 'Fermer', {
        duration: 3000
      });
    }
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

  getSnmpVersionLabel(version: SnmpVersion): string {
    const labels: { [key in SnmpVersion]: string } = {
      [SnmpVersion.V1]: 'v1',
      [SnmpVersion.V2C]: 'v2c',
      [SnmpVersion.V3]: 'v3'
    };
    return labels[version] || version;
  }
}
