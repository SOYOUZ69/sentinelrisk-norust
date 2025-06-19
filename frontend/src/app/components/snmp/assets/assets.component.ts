import { Component, OnInit } from '@angular/core';
import { SnmpService } from '../../../services/snmp.service';
import { SnmpAsset } from '../../../models/snmp.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snmp-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  assets: SnmpAsset[] = [];
  loading = false;
  displayedColumns: string[] = ['host', 'ip', 'version', 'status', 'actions'];

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
        this.assets = data;
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

  toggleDemoMode(): void {
    this.snmpService.isDemoMode = !this.snmpService.isDemoMode;
    this.loadAssets();
  }

  pauseAsset(asset: SnmpAsset): void {
    // TODO: Implémenter la logique de pause
    this.snackBar.open(`Pause de l'asset ${asset.host}`, 'Fermer', {
      duration: 2000
    });
  }

  editAsset(asset: SnmpAsset): void {
    // TODO: Implémenter la logique d'édition
    this.snackBar.open(`Édition de l'asset ${asset.host}`, 'Fermer', {
      duration: 2000
    });
  }

  deleteAsset(asset: SnmpAsset): void {
    // TODO: Implémenter la logique de suppression
    this.snackBar.open(`Suppression de l'asset ${asset.host}`, 'Fermer', {
      duration: 2000
    });
  }
} 