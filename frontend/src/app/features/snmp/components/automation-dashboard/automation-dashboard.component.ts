import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil, startWith, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { 
  SnmpAutomationService, 
  AutomationStatistics, 
  SchedulerStatus, 
  ConnectivityTest 
} from '../../services/snmp-automation.service';

/**
 * Composant de tableau de bord pour l'automatisation des scans SNMP via Zabbix
 */
@Component({
  selector: 'app-automation-dashboard',
  templateUrl: './automation-dashboard.component.html',
  styleUrls: ['./automation-dashboard.component.scss']
})
export class AutomationDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // État du composant
  isLoading = false;
  isSyncing = false;
  isTestingConnectivity = false;

  // Données
  statistics: AutomationStatistics | null = null;
  schedulerStatus: SchedulerStatus | null = null;
  lastConnectivityTest: ConnectivityTest | null = null;

  // Configuration de l'auto-refresh
  autoRefreshEnabled = true;
  autoRefreshInterval = 30000; // 30 secondes

  constructor(
    private automationService: SnmpAutomationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Charge les données initiales
   */
  private loadInitialData(): void {
    this.isLoading = true;
    
    // Charger les statistiques et l'état du scheduler en parallèle
    Promise.all([
      this.automationService.getAutomationStatistics().toPromise(),
      this.automationService.getSchedulerStatus().toPromise()
    ]).then(([stats, status]) => {
      this.statistics = stats!;
      this.schedulerStatus = status!;
      this.isLoading = false;
    }).catch(error => {
      this.handleError('Erreur lors du chargement des données', error);
      this.isLoading = false;
    });
  }

  /**
   * Configure le rafraîchissement automatique
   */
  private setupAutoRefresh(): void {
    if (this.autoRefreshEnabled) {
      interval(this.autoRefreshInterval)
        .pipe(
          startWith(0),
          switchMap(() => {
            return Promise.all([
              this.automationService.getAutomationStatistics().toPromise(),
              this.automationService.getSchedulerStatus().toPromise()
            ]);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe(
          ([stats, status]) => {
            this.statistics = stats!;
            this.schedulerStatus = status!;
          },
          error => {
            console.warn('Erreur lors du rafraîchissement automatique:', error);
          }
        );
    }
  }

  /**
   * Active/désactive le rafraîchissement automatique
   */
  toggleAutoRefresh(): void {
    this.autoRefreshEnabled = !this.autoRefreshEnabled;
    
    if (this.autoRefreshEnabled) {
      this.setupAutoRefresh();
      this.showSuccess('Rafraîchissement automatique activé');
    } else {
      this.showSuccess('Rafraîchissement automatique désactivé');
    }
  }

  /**
   * Déclenche une synchronisation manuelle complète
   */
  triggerManualSync(): void {
    this.isSyncing = true;
    
    this.automationService.triggerManualSync()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          this.isSyncing = false;
          if (response.success) {
            this.showSuccess(`Synchronisation terminée en ${response.durationMs}ms`);
            this.refreshData(); // Rafraîchir les données après la sync
          } else {
            this.showError('Synchronisation échouée: ' + response.message);
          }
        },
        error => {
          this.isSyncing = false;
          this.handleError('Erreur lors de la synchronisation', error);
        }
      );
  }

  /**
   * Teste la connectivité avec Zabbix
   */
  testZabbixConnectivity(): void {
    this.isTestingConnectivity = true;
    
    this.automationService.testZabbixConnectivity()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        test => {
          this.isTestingConnectivity = false;
          this.lastConnectivityTest = test;
          
          if (test.connected) {
            this.showSuccess(`Zabbix connecté (${test.responseTimeMs}ms)`);
          } else {
            this.showError(`Zabbix déconnecté: ${test.message}`);
          }
        },
        error => {
          this.isTestingConnectivity = false;
          this.handleError('Erreur lors du test de connectivité', error);
        }
      );
  }

  /**
   * Rafraîchit manuellement les données
   */
  refreshData(): void {
    this.loadInitialData();
  }

  /**
   * Obtient la couleur du statut du scheduler
   */
  getSchedulerStatusColor(): string {
    if (!this.schedulerStatus) return 'gray';
    
    switch (this.schedulerStatus.status) {
      case 'RUNNING': return '#4caf50'; // Vert
      case 'DISABLED': return '#ff9800'; // Orange
      case 'ERROR': return '#f44336'; // Rouge
      default: return '#9e9e9e'; // Gris
    }
  }

  /**
   * Obtient l'icône du statut du scheduler
   */
  getSchedulerStatusIcon(): string {
    if (!this.schedulerStatus) return 'help';
    
    switch (this.schedulerStatus.status) {
      case 'RUNNING': return 'play_circle_filled';
      case 'DISABLED': return 'pause_circle_filled';
      case 'ERROR': return 'error';
      default: return 'help';
    }
  }

  /**
   * Obtient la couleur de connectivité Zabbix
   */
  getZabbixConnectivityColor(): string {
    if (this.statistics?.zabbixConnected) {
      return '#4caf50'; // Vert
    } else {
      return '#f44336'; // Rouge
    }
  }

  /**
   * Obtient l'icône de connectivité Zabbix
   */
  getZabbixConnectivityIcon(): string {
    if (this.statistics?.zabbixConnected) {
      return 'cloud_done';
    } else {
      return 'cloud_off';
    }
  }

  /**
   * Formate un nombre avec séparateurs de milliers
   */
  formatNumber(num: number | undefined): string {
    if (num === undefined || num === null) return '0';
    return num.toLocaleString('fr-FR');
  }

  /**
   * Formate un pourcentage
   */
  formatPercentage(num: number | undefined): string {
    if (num === undefined || num === null) return '0%';
    return `${num.toFixed(1)}%`;
  }

  /**
   * Formate une date
   */
  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return 'N/A';
    
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('fr-FR');
    } catch (error) {
      return 'Date invalide';
    }
  }

  /**
   * Obtient le badge CSS pour le taux de succès
   */
  getSuccessRateBadgeClass(): string {
    const rate = this.statistics?.automaticSuccessRate || 0;
    
    if (rate >= 95) return 'success-rate-excellent';
    if (rate >= 85) return 'success-rate-good';
    if (rate >= 70) return 'success-rate-warning';
    return 'success-rate-poor';
  }

  /**
   * Vérifie si les données sont récentes (moins de 5 minutes)
   */
  isDataRecent(): boolean {
    if (!this.schedulerStatus?.lastCheck) return false;
    
    try {
      const lastCheck = new Date(this.schedulerStatus.lastCheck);
      const now = new Date();
      const diffMinutes = (now.getTime() - lastCheck.getTime()) / (1000 * 60);
      return diffMinutes < 5;
    } catch (error) {
      return false;
    }
  }

  /**
   * Affiche un message de succès
   */
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  /**
   * Affiche un message d'erreur
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  /**
   * Gère les erreurs
   */
  private handleError(message: string, error: any): void {
    console.error(message, error);
    let errorMsg = message;
    
    if (error?.error?.message) {
      errorMsg += ': ' + error.error.message;
    } else if (error?.message) {
      errorMsg += ': ' + error.message;
    }
    
    this.showError(errorMsg);
  }
} 