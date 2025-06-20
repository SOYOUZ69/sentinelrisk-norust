import { Component, OnInit } from '@angular/core';
import { SnmpService } from '../../../services/snmp.service';
import { SnmpAsset } from '../../../models/snmp.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-snmp-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  assets: SnmpAsset[] = [];
  loading = false;
  syncingAssets = new Set<number>();
  displayedColumns: string[] = ['host', 'ip', 'version', 'status', 'sync', 'actions'];

  constructor(
    private snmpService: SnmpService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.loading = true;
    this.snmpService.getAssets().subscribe({
      next: (data) => {
        this.assets = data.map((asset, index) => ({
          ...asset,
          id: asset.id || index + 1, // Assigner un ID si manquant
          synchronizedWithZabbix: false,
          syncInProgress: false
        }));
        
        // Vérifier le statut de synchronisation pour chaque asset
        this.checkAllSyncStatuses();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des assets SNMP:', error);
        this.snackBar.open('Erreur lors du chargement des assets SNMP', 'Fermer', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  checkAllSyncStatuses(): void {
    const syncChecks = this.assets.map(asset => 
      this.snmpService.checkSyncStatus(asset.id!)
    );

    forkJoin(syncChecks).subscribe({
      next: (results) => {
        results.forEach((result, index) => {
          if (this.assets[index]) {
            this.assets[index].synchronizedWithZabbix = result.synchronized;
            this.assets[index].zabbixHostId = result.zabbixHostId;
            this.assets[index].lastSyncCheck = result.lastChecked;
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la vérification des statuts de synchronisation:', error);
      }
    });
  }

  syncAsset(asset: SnmpAsset): void {
    if (!asset.id || this.syncingAssets.has(asset.id)) {
      return;
    }

    this.syncingAssets.add(asset.id);
    asset.syncInProgress = true;

    this.snmpService.syncAssetWithZabbix(asset.id).subscribe({
      next: (result) => {
        if (result.success) {
          asset.synchronizedWithZabbix = true;
          asset.zabbixHostId = result.zabbixHostId;
          this.snackBar.open(`Asset ${asset.host} synchronisé avec succès`, 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        } else {
          this.snackBar.open(`Échec de synchronisation: ${result.message}`, 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de la synchronisation:', error);
        this.snackBar.open('Erreur lors de la synchronisation', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      },
      complete: () => {
        this.syncingAssets.delete(asset.id!);
        asset.syncInProgress = false;
      }
    });
  }

  syncAllAssets(): void {
    const unsyncedAssets = this.assets.filter(asset => !asset.synchronizedWithZabbix);
    
    if (unsyncedAssets.length === 0) {
      this.snackBar.open('Tous les assets sont déjà synchronisés', 'Fermer', {
        duration: 3000
      });
      return;
    }

    // Marquer tous les assets non synchronisés comme en cours
    unsyncedAssets.forEach(asset => {
      if (asset.id) {
        this.syncingAssets.add(asset.id);
        asset.syncInProgress = true;
      }
    });

    this.snmpService.syncAllAssets().subscribe({
      next: (result) => {
        const message = `Synchronisation terminée: ${result.synchronized} réussies, ${result.failed} échecs`;
        this.snackBar.open(message, 'Fermer', {
          duration: 5000,
          panelClass: result.failed > 0 ? ['warning-snackbar'] : ['success-snackbar']
        });
        
        // Rafraîchir les statuts
        this.checkAllSyncStatuses();
      },
      error: (error) => {
        console.error('Erreur lors de la synchronisation en lot:', error);
        this.snackBar.open('Erreur lors de la synchronisation en lot', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      },
      complete: () => {
        // Nettoyer les statuts de synchronisation en cours
        unsyncedAssets.forEach(asset => {
          if (asset.id) {
            this.syncingAssets.delete(asset.id);
            asset.syncInProgress = false;
          }
        });
      }
    });
  }

  getSyncStatusIcon(asset: SnmpAsset): string {
    if (asset.syncInProgress) {
      return 'sync';
    } else if (asset.synchronizedWithZabbix) {
      return 'check_circle';
    } else {
      return 'error';
    }
  }

  getSyncStatusColor(asset: SnmpAsset): string {
    if (asset.syncInProgress) {
      return 'accent';
    } else if (asset.synchronizedWithZabbix) {
      return 'primary';
    } else {
      return 'warn';
    }
  }

  getSyncStatusText(asset: SnmpAsset): string {
    if (asset.syncInProgress) {
      return 'Synchronisation...';
    } else if (asset.synchronizedWithZabbix) {
      return 'Synchronisé';
    } else {
      return 'Non synchronisé';
    }
  }

  toggleDemoMode(): void {
    this.snmpService.isDemoMode = !this.snmpService.isDemoMode;
    this.loadAssets();
  }

  pauseAsset(asset: SnmpAsset): void {
    this.snackBar.open(`Pause de l'asset ${asset.host}`, 'Fermer', {
      duration: 2000
    });
  }

  editAsset(asset: SnmpAsset): void {
    this.snackBar.open(`Édition de l'asset ${asset.host}`, 'Fermer', {
      duration: 2000
    });
  }

  deleteAsset(asset: SnmpAsset): void {
    this.snackBar.open(`Suppression de l'asset ${asset.host}`, 'Fermer', {
      duration: 2000
    });
  }
} 