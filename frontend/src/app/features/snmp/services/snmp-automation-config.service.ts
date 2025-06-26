import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface SnmpScanTarget {
  id?: number;
  zabbixHostId: string;
  hostname: string;
  displayName?: string;
  ipAddress?: string;
  snmpPort?: number;
  description?: string;
  enabled: boolean;
  priority?: number;
  lastSync?: string;
  createdAt?: string;
  updatedAt?: string;
  configuredBy?: string;
}

export interface TargetStatistics {
  totalTargets: number;
  enabledTargets: number;
  disabledTargets: number;
  lastSyncTime?: string;
  syncStatus?: string;
}

export interface ConfigurationResponse {
  targets: SnmpScanTarget[];
  statistics: TargetStatistics;
  total: number;
  timestamp: number;
}

export interface BatchConfigRequest {
  hostIds: string[];
  enabled: boolean;
  priority?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnmpAutomationConfigService {
  private readonly apiUrl = `${environment.apiUrl}/snmp/automation/config`;
  
  // State management
  private targetsSubject = new BehaviorSubject<SnmpScanTarget[]>([]);
  private statisticsSubject = new BehaviorSubject<TargetStatistics | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public targets$ = this.targetsSubject.asObservable();
  public statistics$ = this.statisticsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les assets disponibles pour configuration
   */
  getAvailableTargets(): Observable<ConfigurationResponse> {
    this.loadingSubject.next(true);
    
    return this.http.get<ConfigurationResponse>(`${this.apiUrl}/targets`).pipe(
      tap(response => {
        this.targetsSubject.next(response.targets);
        this.statisticsSubject.next(response.statistics);
        this.loadingSubject.next(false);
      })
    );
  }

  /**
   * Récupère uniquement les assets activés
   */
  getEnabledTargets(): Observable<{ targets: SnmpScanTarget[]; count: number; timestamp: number }> {
    return this.http.get<{ targets: SnmpScanTarget[]; count: number; timestamp: number }>(
      `${this.apiUrl}/targets/enabled`
    );
  }

  /**
   * Configure un asset pour les scans automatiques
   */
  configureTarget(zabbixHostId: string, enabled: boolean, priority: number = 3): Observable<any> {
    const body = {
      enabled: enabled,
      priority: priority
    };

    return this.http.post(`${this.apiUrl}/targets/${zabbixHostId}`, body).pipe(
      tap(() => {
        // Rafraîchir la liste après modification
        this.refreshTargets();
      })
    );
  }

  /**
   * Met à jour rapidement le statut d'activation d'un asset
   */
  updateTargetStatus(zabbixHostId: string, enabled: boolean): Observable<any> {
    const body = { enabled: enabled };

    return this.http.put(`${this.apiUrl}/targets/${zabbixHostId}/status`, body).pipe(
      tap(() => {
        // Mettre à jour localement
        const currentTargets = this.targetsSubject.value;
        const updatedTargets = currentTargets.map(target => 
          target.zabbixHostId === zabbixHostId 
            ? { ...target, enabled: enabled }
            : target
        );
        this.targetsSubject.next(updatedTargets);
      })
    );
  }

  /**
   * Configuration en lot (activer/désactiver plusieurs assets)
   */
  configureBatchTargets(request: BatchConfigRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/targets/batch`, request).pipe(
      tap(() => {
        // Rafraîchir la liste après modification en lot
        this.refreshTargets();
      })
    );
  }

  /**
   * Synchronise les assets avec Zabbix
   */
  synchronizeTargets(): Observable<any> {
    return this.http.post(`${this.apiUrl}/sync`, {}).pipe(
      tap(() => {
        // Rafraîchir la liste après synchronisation
        this.refreshTargets();
      })
    );
  }

  /**
   * Récupère les statistiques de configuration
   */
  getConfigurationStatistics(): Observable<TargetStatistics> {
    return this.http.get<TargetStatistics>(`${this.apiUrl}/statistics`).pipe(
      tap(stats => {
        this.statisticsSubject.next(stats);
      })
    );
  }

  /**
   * Rafraîchit la liste des targets
   */
  refreshTargets(): void {
    this.getAvailableTargets().subscribe();
  }

  /**
   * Filtre les targets par statut
   */
  filterTargetsByStatus(enabled: boolean): Observable<SnmpScanTarget[]> {
    return this.targets$.pipe(
      map(targets => targets.filter(target => target.enabled === enabled))
    );
  }

  /**
   * Recherche dans les targets
   */
  searchTargets(query: string): Observable<SnmpScanTarget[]> {
    return this.targets$.pipe(
      map(targets => {
        if (!query || query.trim() === '') {
          return targets;
        }
        
        const searchTerm = query.toLowerCase().trim();
        return targets.filter(target => 
          target.hostname.toLowerCase().includes(searchTerm) ||
          (target.displayName && target.displayName.toLowerCase().includes(searchTerm)) ||
          (target.ipAddress && target.ipAddress.toLowerCase().includes(searchTerm)) ||
          (target.description && target.description.toLowerCase().includes(searchTerm))
        );
      })
    );
  }

  /**
   * Groupe les targets par priorité
   */
  groupTargetsByPriority(): Observable<{ [priority: number]: SnmpScanTarget[] }> {
    return this.targets$.pipe(
      map(targets => {
        const grouped: { [priority: number]: SnmpScanTarget[] } = {};
        
        targets.forEach(target => {
          const priority = target.priority || 3;
          if (!grouped[priority]) {
            grouped[priority] = [];
          }
          grouped[priority].push(target);
        });
        
        return grouped;
      })
    );
  }

  /**
   * Obtient le nom d'affichage effectif d'un target
   */
  getEffectiveDisplayName(target: SnmpScanTarget): string {
    return target.displayName || target.hostname || target.zabbixHostId;
  }

  /**
   * Obtient la priorité formatée
   */
  getFormattedPriority(priority?: number): string {
    switch (priority) {
      case 1: return 'Très haute';
      case 2: return 'Haute';
      case 3: return 'Normale';
      case 4: return 'Basse';
      case 5: return 'Très basse';
      default: return 'Normale';
    }
  }

  /**
   * Obtient la couleur CSS pour une priorité
   */
  getPriorityColor(priority?: number): string {
    switch (priority) {
      case 1: return 'danger';
      case 2: return 'warning';
      case 3: return 'primary';
      case 4: return 'info';
      case 5: return 'secondary';
      default: return 'primary';
    }
  }

  /**
   * Valide qu'un target est valide pour le scan
   */
  isValidForScan(target: SnmpScanTarget): boolean {
    return !!(target.zabbixHostId && 
             target.hostname && 
             target.enabled &&
             (target.ipAddress || target.hostname));
  }

  /**
   * Obtient les statistiques en temps réel
   */
  getLiveStatistics(): Observable<TargetStatistics> {
    return this.targets$.pipe(
      map(targets => {
        const enabled = targets.filter(t => t.enabled).length;
        const disabled = targets.length - enabled;
        
        return {
          totalTargets: targets.length,
          enabledTargets: enabled,
          disabledTargets: disabled,
          lastSyncTime: new Date().toISOString(),
          syncStatus: 'live'
        };
      })
    );
  }

  /**
   * Exporte la configuration vers JSON
   */
  exportConfiguration(): Observable<Blob> {
    return this.targets$.pipe(
      map(targets => {
        const config = {
          exportDate: new Date().toISOString(),
          version: '1.0',
          targets: targets.map(target => ({
            zabbixHostId: target.zabbixHostId,
            hostname: target.hostname,
            displayName: target.displayName,
            ipAddress: target.ipAddress,
            snmpPort: target.snmpPort,
            enabled: target.enabled,
            priority: target.priority,
            description: target.description
          }))
        };
        
        const blob = new Blob([JSON.stringify(config, null, 2)], 
                             { type: 'application/json' });
        return blob;
      })
    );
  }

  /**
   * Importe une configuration depuis JSON
   */
  importConfiguration(file: File): Observable<any> {
    return new Observable(observer => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target?.result as string);
          
          if (!config.targets || !Array.isArray(config.targets)) {
            observer.error('Format de fichier invalide');
            return;
          }
          
          // Appliquer la configuration importée
          const batchRequests = config.targets.map((target: any) => 
            this.configureTarget(target.zabbixHostId, target.enabled, target.priority)
          );
          
          // Attendre que toutes les configurations soient appliquées
          Promise.all(batchRequests.map((req: Observable<any>) => req.toPromise()))
            .then(() => {
              observer.next({ success: true, imported: config.targets.length });
              observer.complete();
            })
            .catch(error => observer.error(error));
            
        } catch (error) {
          observer.error('Erreur lors du parsing du fichier JSON');
        }
      };
      
      reader.onerror = () => observer.error('Erreur lors de la lecture du fichier');
      reader.readAsText(file);
    });
  }

  /**
   * Réinitialise l'état du service
   */
  reset(): void {
    this.targetsSubject.next([]);
    this.statisticsSubject.next(null);
    this.loadingSubject.next(false);
  }
} 