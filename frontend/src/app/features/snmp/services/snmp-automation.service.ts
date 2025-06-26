import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

/**
 * Service pour la gestion de l'automatisation des scans SNMP via Zabbix
 */
@Injectable({
  providedIn: 'root'
})
export class SnmpAutomationService {
  private apiUrl = `${environment.apiUrl}/snmp/automation`;
  
  // Subject pour les statistiques en temps réel
  private statisticsSubject = new BehaviorSubject<AutomationStatistics | null>(null);
  public statistics$ = this.statisticsSubject.asObservable();

  // Subject pour l'état du scheduler
  private schedulerStatusSubject = new BehaviorSubject<SchedulerStatus | null>(null);
  public schedulerStatus$ = this.schedulerStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Déclenche une synchronisation manuelle complète
   */
  triggerManualSync(): Observable<SyncResponse> {
    return this.http.post<SyncResponse>(`${this.apiUrl}/sync`, {})
      .pipe(
        map(response => {
          console.log('🔄 Synchronisation manuelle déclenchée:', response);
          return response;
        }),
        catchError(error => {
          console.error('❌ Erreur lors de la synchronisation manuelle:', error);
          throw error;
        })
      );
  }

  /**
   * Déclenche la synchronisation d'un hôte spécifique
   */
  triggerHostSync(hostId: string): Observable<SyncResponse> {
    return this.http.post<SyncResponse>(`${this.apiUrl}/sync/host/${hostId}`, {})
      .pipe(
        map(response => {
          console.log(`🎯 Synchronisation de l'hôte ${hostId} déclenchée:`, response);
          return response;
        }),
        catchError(error => {
          console.error(`❌ Erreur lors de la synchronisation de l'hôte ${hostId}:`, error);
          throw error;
        })
      );
  }

  /**
   * Synchronisation détaillée d'un hôte avec retour du scan créé
   */
  triggerDetailedHostSync(hostId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sync/host/${hostId}/detailed`, {})
      .pipe(
        map(response => {
          console.log(`🔍 Synchronisation détaillée de l'hôte ${hostId}:`, response);
          return response;
        }),
        catchError(error => {
          console.error(`❌ Erreur lors de la synchronisation détaillée de l'hôte ${hostId}:`, error);
          throw error;
        })
      );
  }

  /**
   * Récupère les statistiques d'automatisation
   */
  getAutomationStatistics(): Observable<AutomationStatistics> {
    return this.http.get<AutomationStatistics>(`${this.apiUrl}/statistics`)
      .pipe(
        map(stats => {
          console.log('📊 Statistiques d\'automatisation récupérées:', stats);
          this.statisticsSubject.next(stats);
          return stats;
        }),
        catchError(error => {
          console.error('❌ Erreur lors de la récupération des statistiques:', error);
          throw error;
        })
      );
  }

  /**
   * Teste la connectivité avec Zabbix
   */
  testZabbixConnectivity(): Observable<ConnectivityTest> {
    return this.http.get<ConnectivityTest>(`${this.apiUrl}/connectivity/test`)
      .pipe(
        map(test => {
          console.log('🔌 Test de connectivité Zabbix:', test);
          return test;
        }),
        catchError(error => {
          console.error('❌ Erreur lors du test de connectivité:', error);
          throw error;
        })
      );
  }

  /**
   * Récupère l'état du scheduler
   */
  getSchedulerStatus(): Observable<SchedulerStatus> {
    return this.http.get<SchedulerStatus>(`${this.apiUrl}/scheduler/status`)
      .pipe(
        map(status => {
          console.log('⚙️ État du scheduler récupéré:', status);
          this.schedulerStatusSubject.next(status);
          return status;
        }),
        catchError(error => {
          console.error('❌ Erreur lors de la récupération de l\'état du scheduler:', error);
          throw error;
        })
      );
  }

  /**
   * Rafraîchit automatiquement les statistiques
   */
  refreshStatistics(): void {
    this.getAutomationStatistics().subscribe();
  }

  /**
   * Rafraîchit automatiquement l'état du scheduler
   */
  refreshSchedulerStatus(): void {
    this.getSchedulerStatus().subscribe();
  }

  /**
   * Démarre le rafraîchissement automatique (toutes les 30 secondes)
   */
  startAutoRefresh(): void {
    setInterval(() => {
      this.refreshStatistics();
      this.refreshSchedulerStatus();
    }, 30000); // 30 secondes
  }

  /**
   * Obtient les statistiques en cache (sans appel HTTP)
   */
  getCachedStatistics(): AutomationStatistics | null {
    return this.statisticsSubject.value;
  }

  /**
   * Obtient l'état du scheduler en cache (sans appel HTTP)
   */
  getCachedSchedulerStatus(): SchedulerStatus | null {
    return this.schedulerStatusSubject.value;
  }
}

// ============================================================================
// INTERFACES POUR LES TYPES DE DONNÉES
// ============================================================================

export interface SyncResponse {
  success: boolean;
  message: string;
  hostId?: string;
  durationMs: number;
  timestamp: number;
}

export interface AutomationStatistics {
  totalAutomaticScans: number;
  automaticScansLast24h: number;
  automaticSuccessRate: number;
  zabbixConnected: boolean;
  schedulerEnabled: boolean;
  schedulerStatus: string;
  lastHealthCheck: string;
  error?: string;
}

export interface ConnectivityTest {
  connected: boolean;
  status: 'SUCCESS' | 'FAILURE' | 'ERROR';
  message: string;
  responseTimeMs: number;
  timestamp: number;
}

export interface SchedulerStatus {
  enabled: boolean;
  zabbixConnected: boolean;
  status: 'RUNNING' | 'DISABLED' | 'ERROR';
  lastCheck: string;
  timestamp: number;
  error?: string;
}

// Énumérations pour les statuts
export enum AutomationStatus {
  RUNNING = 'RUNNING',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR'
}

export enum ConnectivityStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  ERROR = 'ERROR'
} 