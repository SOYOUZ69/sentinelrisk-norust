import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Asset, AssetType } from '../../models/asset.model';
import { SnmpService } from '../../services/snmp.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assets: Asset[] = [];
  loading = false;
  displayedColumns: string[] = ['hostname', 'ipAddress', 'type', 'snmpVersion', 'active', 'actions'];

  constructor(
    private snmpService: SnmpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.loading = true;
    this.snmpService.getAllAssets().subscribe({
      next: (assets) => {
        this.assets = assets;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des assets:', error);
        this.snackBar.open('Erreur lors du chargement des assets', 'Fermer', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  createAsset(): void {
    this.router.navigate(['/snmp/assets/new']);
  }

  editAsset(asset: Asset): void {
    this.router.navigate(['/snmp/assets/edit', asset.id]);
  }

  toggleAssetStatus(asset: Asset): void {
    if (!asset.id) return;
    
    this.snmpService.toggleAssetStatus(asset.id).subscribe({
      next: (updatedAsset) => {
        const index = this.assets.findIndex(a => a.id === updatedAsset.id);
        if (index !== -1) {
          this.assets[index] = updatedAsset;
        }
        this.snackBar.open(
          `Asset ${updatedAsset.active ? 'activé' : 'désactivé'}`, 
          'Fermer', 
          { duration: 3000 }
        );
      },
      error: (error) => {
        console.error('Erreur lors du changement de statut:', error);
        this.snackBar.open('Erreur lors du changement de statut', 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  deleteAsset(asset: Asset): void {
    if (!asset.id) return;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'asset ${asset.hostname || asset.ipAddress} ?`)) {
      this.snmpService.deleteAsset(asset.id).subscribe({
        next: () => {
          this.assets = this.assets.filter(a => a.id !== asset.id);
          this.snackBar.open('Asset supprimé avec succès', 'Fermer', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  getAssetTypeLabel(type: AssetType): string {
    const labels: { [key in AssetType]: string } = {
      [AssetType.SERVER]: 'Serveur',
      [AssetType.PC]: 'PC',
      [AssetType.SWITCH]: 'Switch',
      [AssetType.ROUTER]: 'Routeur',
      [AssetType.PRINTER]: 'Imprimante',
      [AssetType.FIREWALL]: 'Firewall',
      [AssetType.OTHER]: 'Autre'
    };
    return labels[type] || type;
  }
}
