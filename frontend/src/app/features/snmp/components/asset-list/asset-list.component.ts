import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SnmpService } from '../../../../services/snmp.service';
import { SnmpAsset } from '../../../../models/snmp.model';
import { AssetFormDialogComponent } from '../../../../components/snmp/assets/asset-form-dialog.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assets: SnmpAsset[] = [];
  loading = false;
  syncingAssets = new Set<number>();
  displayedColumns: string[] = ['host', 'ip', 'version', 'status', 'sync', 'actions'];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private snmpService: SnmpService
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
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }

  checkAllSyncStatuses(): void {
    if (this.assets.length === 0) return;

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

  // Créer un nouvel asset avec dialogue
  createAsset(): void {
    const dialogRef = this.dialog.open(AssetFormDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAssets(); // Recharger la liste
      }
    });
  }

  // Modifier un asset existant avec dialogue
  editAsset(asset: SnmpAsset): void {
    const dialogRef = this.dialog.open(AssetFormDialogComponent, {
      width: '600px',
      data: { asset }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAssets(); // Recharger la liste
      }
    });
  }

  // Supprimer un asset
  deleteAsset(asset: SnmpAsset): void {
    if (!asset.id) {
      return;
    }

    const confirmed = confirm(`Êtes-vous sûr de vouloir supprimer l'asset "${asset.name || asset.hostName}" ?`);
    
    if (confirmed) {
      this.snmpService.deleteAsset(asset.id).subscribe({
        next: () => {
          this.snackBar.open(`Asset "${asset.name || asset.hostName}" supprimé avec succès`, 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadAssets(); // Recharger la liste
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          let message = 'Erreur lors de la suppression';
          if (error.status === 404) {
            message = 'Asset non trouvé';
          }
          this.snackBar.open(message, 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
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
          this.snackBar.open(`Asset ${asset.hostName || asset.name} synchronisé avec succès`, 'Fermer', {
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

  // Méthodes helper pour l'affichage
  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'primary';
      case 'inactive': return 'warn';
      case 'maintenance': return 'accent';
      default: return 'basic';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'maintenance': return 'Maintenance';
      default: return status || 'Inconnu';
    }
  }

  pauseAsset(asset: SnmpAsset): void {
    this.snackBar.open(`Pause de l'asset ${asset.hostName || asset.name}`, 'Fermer', {
      duration: 2000
    });
  }

  allAssetsAreSynchronized(): boolean {
    return this.assets.every(asset => asset.synchronizedWithZabbix);
  }
}
