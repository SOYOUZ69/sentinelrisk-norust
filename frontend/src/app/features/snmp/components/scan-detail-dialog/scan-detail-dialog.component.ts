import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnmpScanHistoryDto } from '../../models/scan-history.model';

@Component({
  selector: 'app-scan-detail-dialog',
  templateUrl: './scan-detail-dialog.component.html',
  styleUrls: ['./scan-detail-dialog.component.scss']
})
export class ScanDetailDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ScanDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public scan: SnmpScanHistoryDto
  ) {}

  /**
   * Ferme la dialog
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Obtient la couleur de statut pour un résultat OID
   */
  getResultStatusColor(success: boolean, status?: string): string {
    if (!success) return '#F44336'; // Rouge pour échec
    switch (status) {
      case 'CRITICAL': return '#F44336'; // Rouge
      case 'WARNING': return '#FF9800'; // Orange  
      case 'NORMAL': return '#4CAF50'; // Vert
      default: return '#2196F3'; // Bleu par défaut
    }
  }

  /**
   * Obtient l'icône de statut pour un résultat OID
   */
  getResultStatusIcon(success: boolean, status?: string): string {
    if (!success) return 'error';
    switch (status) {
      case 'CRITICAL': return 'error';
      case 'WARNING': return 'warning';
      case 'NORMAL': return 'check_circle';
      default: return 'info';
    }
  }

  /**
   * Formate la durée en millisecondes
   */
  formatDuration(durationMs: number): string {
    if (durationMs < 1000) {
      return `${durationMs}ms`;
    } else if (durationMs < 60000) {
      return `${(durationMs / 1000).toFixed(1)}s`;
    } else {
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);
      return `${minutes}min ${seconds}s`;
    }
  }

  /**
   * Formate la date
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  /**
   * TrackBy function pour optimiser le rendu de la liste
   */
  trackByOid(index: number, result: any): string {
    return result.oid || index.toString();
  }
} 