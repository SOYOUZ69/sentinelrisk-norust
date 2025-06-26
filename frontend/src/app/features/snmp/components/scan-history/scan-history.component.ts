import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ScanHistoryService } from '../../services/scan-history.service';
import { 
  SnmpScanHistoryDto, 
  ScanStatistics, 
  SNMP_VERSION_LABELS 
} from '../../models/scan-history.model';
import { ScanDetailDialogComponent } from '../scan-detail-dialog/scan-detail-dialog.component';

@Component({
  selector: 'app-scan-history',
  templateUrl: './scan-history.component.html',
  styleUrls: ['./scan-history.component.css']
})
export class ScanHistoryComponent implements OnInit, AfterViewInit {
  // Données réelles de l'historique
  dataSource = new MatTableDataSource<SnmpScanHistoryDto>([]);
  statistics: ScanStatistics | null = null;
  
  // Configuration de l'interface
  loading = false;
  displayedColumns: string[] = ['id', 'target', 'createdAt', 'success', 'successRate', 'duration', 'actions'];
  
  // Pagination et filtres
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 0;
  pageSize = 20;
  totalElements = 0;
  
  // Filtres
  searchTerm = '';
  showSuccessOnly = false;
  showRecentOnly = false;

  constructor(
    private scanHistoryService: ScanHistoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadScanHistory();
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Charge l'historique des scans
   */
  loadScanHistory(): void {
    this.loading = true;
    console.log('📋 Chargement de l\'historique des scans...');

    this.scanHistoryService.getAllScans(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.log('✅ Historique chargé:', response);
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement de l\'historique:', error);
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement de l\'historique', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  /**
   * Charge les statistiques globales
   */
  loadStatistics(): void {
    this.scanHistoryService.getStatistics().subscribe({
      next: (stats) => {
        console.log('📊 Statistiques chargées:', stats);
        this.statistics = stats;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des statistiques:', error);
      }
    });
  }

  /**
   * Affiche les détails d'un scan
   */
  voirDetails(scan: SnmpScanHistoryDto): void {
    console.log('🔍 Affichage des détails du scan:', scan.id);
    
    this.scanHistoryService.getScanDetails(scan.id).subscribe({
      next: (detailedScan) => {
        console.log('✅ Détails du scan récupérés:', detailedScan);
        // TODO: Ouvrir une dialog avec les détails
        this.openScanDetailsDialog(detailedScan);
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération des détails:', error);
        this.snackBar.open('Erreur lors de la récupération des détails', 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  /**
   * Relance un scan avec les mêmes paramètres
   */
  relancerScan(scan: SnmpScanHistoryDto): void {
    this.snackBar.open(`Relance du scan sur ${scan.target}`, 'Fermer', {
      duration: 3000
    });
    // TODO: Implémenter la relance avec les mêmes paramètres
  }

  /**
   * Supprime un scan de l'historique
   */
  supprimerScan(scan: SnmpScanHistoryDto): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le scan #${scan.id} sur ${scan.target} ?`)) {
      this.scanHistoryService.deleteScan(scan.id).subscribe({
        next: () => {
          console.log('✅ Scan supprimé:', scan.id);
          this.snackBar.open('Scan supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          this.loadScanHistory(); // Recharger la liste
          this.loadStatistics(); // Recharger les stats
        },
        error: (error) => {
          console.error('❌ Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  /**
   * Recherche dans l'historique
   */
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.scanHistoryService.searchScans(this.searchTerm).subscribe({
        next: (scans) => {
          this.dataSource.data = scans;
          this.loading = false;
        },
        error: (error) => {
          console.error('❌ Erreur lors de la recherche:', error);
          this.loading = false;
        }
      });
    } else {
      this.loadScanHistory();
    }
  }

  /**
   * Filtre les scans récents
   */
  onFilterRecent(): void {
    if (this.showRecentOnly) {
      this.loading = true;
      this.scanHistoryService.getRecentScans(24).subscribe({
        next: (scans) => {
          this.dataSource.data = scans;
          this.loading = false;
        },
        error: (error) => {
          console.error('❌ Erreur lors du filtrage:', error);
          this.loading = false;
        }
      });
    } else {
      this.loadScanHistory();
    }
  }

  /**
   * Change de page
   */
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadScanHistory();
  }

  /**
   * Ouvre la dialog des détails
   */
  private openScanDetailsDialog(scan: SnmpScanHistoryDto): void {
    console.log('🎯 Ouverture de la dialog des détails pour le scan:', scan.id);
    
    const dialogRef = this.dialog.open(ScanDetailDialogComponent, {
      width: '80vw',
      maxWidth: '900px',
      height: '80vh',
      maxHeight: '800px',
      data: scan,
      disableClose: false,
      autoFocus: true,
      restoreFocus: true
    });

    // Optionnel : réactions à la fermeture de la dialog
    dialogRef.afterClosed().subscribe(result => {
      console.log('🔒 Dialog des détails fermée');
      // Pas d'action particulière nécessaire
    });
  }

  // === MÉTHODES UTILITAIRES ===

  /**
   * Formate la durée du scan
   */
  formatDuration(durationMs: number): string {
    return this.scanHistoryService.formatDuration(durationMs);
  }

  /**
   * Formate la date de création
   */
  formatCreatedAt(createdAt: string): string {
    return this.scanHistoryService.formatCreatedAt(createdAt);
  }

  /**
   * Obtient la couleur de statut
   */
  getStatusColor(scan: SnmpScanHistoryDto): string {
    return this.scanHistoryService.getScanStatusColor(scan);
  }

  /**
   * Obtient l'icône de statut
   */
  getStatusIcon(scan: SnmpScanHistoryDto): string {
    return this.scanHistoryService.getScanStatusIcon(scan);
  }

  /**
   * Obtient le texte de statut
   */
  getStatusText(scan: SnmpScanHistoryDto): string {
    return this.scanHistoryService.getScanStatusText(scan);
  }

  /**
   * Formate la version SNMP
   */
  formatSnmpVersion(version: string): string {
    return SNMP_VERSION_LABELS[version as keyof typeof SNMP_VERSION_LABELS] || version;
  }

  /**
   * Obtient les statistiques affichables
   */
  get totalScans(): number {
    return this.statistics?.totalScans || 0;
  }

  get successfulScans(): number {
    return this.statistics?.successfulScans || 0;
  }

  get successRate(): number {
    return this.statistics?.successRate || 0;
  }

  get averageDuration(): string {
    if (!this.statistics) return '0ms';
    return this.formatDuration(this.statistics.averageDurationMs);
  }
}
