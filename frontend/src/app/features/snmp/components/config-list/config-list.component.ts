import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnmpScanConfig } from '../../models/scan-config.model';
import { Asset, AssetType, SnmpVersion } from '../../models/asset.model';

// Interface simplifiée pour les besoins du mode statique
interface StaticScanConfig {
  id: number;
  nom: string;
  intervalle: number; // en minutes
  oids: string[];
  statut: 'Activée' | 'Désactivée';
}

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css']
})
export class ConfigListComponent implements OnInit {
  // Mock-data statiques comme demandé par l'utilisateur
  configs: StaticScanConfig[] = [
    { 
      id: 1, 
      nom: 'Scan critique 5 min', 
      intervalle: 5, 
      oids: ['.1.3.6.1.2.1.1.3'], 
      statut: 'Activée' 
    },
    { 
      id: 2, 
      nom: 'Audit mensuel', 
      intervalle: 43200, 
      oids: ['.1.3.6.1.2.1.2.2.1.10', '.1.3.6.1.2.1.1.1', '.1.3.6.1.2.1.25.1.1'], 
      statut: 'Désactivée' 
    },
    { 
      id: 3, 
      nom: 'Perf continue', 
      intervalle: 1, 
      oids: ['.1.3.6.1.4.1.2021.4'], 
      statut: 'Activée' 
    }
  ];

  loading = false;
  displayedColumns: string[] = ['id', 'nom', 'intervalle', 'oids', 'statut', 'actions'];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Pas de chargement d'API, les données sont déjà présentes
    this.showStaticModeNotification();
  }

  showStaticModeNotification(): void {
    this.snackBar.open('Mode statique : Configurations de démonstration', 'Fermer', {
      duration: 4000,
      panelClass: ['demo-mode-snackbar']
    });
  }

  createConfig(): void {
    this.snackBar.open('Fonctionnalité désactivée en mode statique', 'Fermer', {
      duration: 3000
    });
  }

  editConfig(config: StaticScanConfig): void {
    this.snackBar.open('Fonctionnalité désactivée en mode statique', 'Fermer', {
      duration: 3000
    });
  }

  toggleConfigStatus(config: StaticScanConfig): void {
    // Simulation d'un changement de statut en mode statique
    config.statut = config.statut === 'Activée' ? 'Désactivée' : 'Activée';
    
    this.snackBar.open(
      `Configuration ${config.statut.toLowerCase()} (mode statique)`, 
      'Fermer', 
      { duration: 3000 }
    );
  }

  deleteConfig(config: StaticScanConfig): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la configuration "${config.nom}" ?`)) {
      // Simulation de suppression en mode statique
      const index = this.configs.findIndex(c => c.id === config.id);
      if (index !== -1) {
        this.configs.splice(index, 1);
      }
      
      this.snackBar.open('Configuration supprimée (mode statique)', 'Fermer', {
        duration: 3000
      });
    }
  }

  getIntervalleLabel(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} h`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} j`;
    }
  }

  getOidsCount(oids: string[]): number {
    return oids.length;
  }
}
