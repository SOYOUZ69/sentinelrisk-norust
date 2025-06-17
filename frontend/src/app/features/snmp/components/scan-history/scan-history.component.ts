import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interface pour l'historique de scan statique
interface StaticScanHistory {
  id: number;
  actif: string;
  date: string;
  statut: 'Succès' | 'Echec';
  score: number;
}

@Component({
  selector: 'app-scan-history',
  templateUrl: './scan-history.component.html',
  styleUrls: ['./scan-history.component.css']
})
export class ScanHistoryComponent implements OnInit {
  // Mock-data des derniers scans comme demandé par l'utilisateur
  scanHistory: StaticScanHistory[] = [
    { 
      id: 101, 
      actif: 'Serveur de base', 
      date: '2025-06-10 09:12', 
      statut: 'Succès', 
      score: 85 
    },
    { 
      id: 102, 
      actif: 'Switch Core', 
      date: '2025-06-09 11:45', 
      statut: 'Succès', 
      score: 92 
    },
    { 
      id: 103, 
      actif: 'Routeur Bureautique', 
      date: '2025-06-08 16:30', 
      statut: 'Echec', 
      score: 0 
    },
    { 
      id: 104, 
      actif: 'Poste Utilisateur', 
      date: '2025-06-07 08:00', 
      statut: 'Succès', 
      score: 74 
    }
  ];

  loading = false;
  displayedColumns: string[] = ['id', 'actif', 'date', 'statut', 'score', 'actions'];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Pas de chargement d'API, les données sont déjà présentes
    this.showStaticModeNotification();
  }

  showStaticModeNotification(): void {
    this.snackBar.open('Mode statique : Historique de démonstration', 'Fermer', {
      duration: 4000,
      panelClass: ['demo-mode-snackbar']
    });
  }

  voirDetails(scan: StaticScanHistory): void {
    this.snackBar.open('Fonctionnalité désactivée en mode statique', 'Fermer', {
      duration: 3000
    });
  }

  relancerScan(scan: StaticScanHistory): void {
    this.snackBar.open(`Relance du scan sur ${scan.actif} (mode statique)`, 'Fermer', {
      duration: 3000
    });
  }

  supprimerScan(scan: StaticScanHistory): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le scan #${scan.id} ?`)) {
      // Simulation de suppression en mode statique
      const index = this.scanHistory.findIndex(s => s.id === scan.id);
      if (index !== -1) {
        this.scanHistory.splice(index, 1);
      }
      
      this.snackBar.open('Scan supprimé (mode statique)', 'Fermer', {
        duration: 3000
      });
    }
  }

  getStatutColor(statut: string): string {
    return statut === 'Succès' ? 'primary' : 'warn';
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'primary';
    if (score >= 60) return 'accent';
    if (score > 0) return 'warn';
    return 'warn'; // Pour les scores à 0 (échecs)
  }

  getScoreClass(score: number): string {
    if (score >= 80) return 'high-score';
    if (score >= 60) return 'medium-score';
    return 'low-score';
  }

  getTotalScans(): number {
    return this.scanHistory.length;
  }

  getSuccessfulScans(): number {
    return this.scanHistory.filter(s => s.statut === 'Succès').length;
  }

  getSuccessRate(): number {
    const total = this.getTotalScans();
    if (total === 0) return 0;
    return Math.round((this.getSuccessfulScans() / total) * 100);
  }

  getAverageScore(): number {
    const successfulScans = this.scanHistory.filter(s => s.statut === 'Succès');
    if (successfulScans.length === 0) return 0;
    const totalScore = successfulScans.reduce((sum, scan) => sum + scan.score, 0);
    return Math.round(totalScore / successfulScans.length);
  }
}
