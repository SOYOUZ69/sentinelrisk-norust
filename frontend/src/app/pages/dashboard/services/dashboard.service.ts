import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { 
  RiskSummary, 
  ComplianceSummary, 
  SnmpSummary, 
  ActionPlansSummary, 
  GlobalDashboardSummary,
  DashboardFilter 
} from '../../../core/models/dashboard.model';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = `${environment.apiUrl}/dashboard`;
  private readonly snmpApiUrl = `${environment.apiUrl}/snmp`;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  /**
   * Récupère le résumé des risques avec les vraies données
   */
  getRiskSummary(filter?: DashboardFilter): Observable<RiskSummary> {
    // Appel avec path sans slash initial pour forcer le double /api
    return this.apiService.get<any[]>('risks')
      .pipe(
        map(risksData => {
          const totalRisks = risksData.length;
          const risksByLevel = this.groupBy(risksData, 'level');
          const risksByCategory = this.groupBy(risksData, 'category');
          const openRisks = risksData.filter(r => ['IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED'].includes(r.status)).length;
          const closedRisks = risksData.filter(r => ['CLOSED', 'ACCEPTED'].includes(r.status)).length;
          return {
            totalRisks,
            risksByLevel,
            risksByCategory,
            openRisks,
            closedRisks
          };
        }),
        catchError(() => of({
          totalRisks: 0,
          risksByLevel: {},
          risksByCategory: {},
          openRisks: 0,
          closedRisks: 0
        }))
      );
  }

  /**
   * Récupère le résumé de conformité (vraies données)
   */
  getComplianceSummary(filter?: DashboardFilter): Observable<ComplianceSummary> {
    return this.http.get<any[]>(`${environment.apiUrl}/controls`).pipe(
      map((controls: any[]) => {
        const totalControls = controls.length;
        const compliantControls = controls.filter(c => c.effectiveness >= 70).length;
        const nonCompliantControls = controls.filter(c => c.effectiveness < 70).length;
        const complianceRate = totalControls > 0 ? (compliantControls / totalControls) * 100 : 0;
        // Grouper par framework et statut si besoin
        const controlsByFramework = this.groupBy(controls, 'framework');
        const controlsByStatus = this.groupBy(controls, 'status');
        return {
          totalControls,
          compliantControls,
          nonCompliantControls,
          complianceRate: Math.round(complianceRate * 10) / 10,
          controlsByFramework,
          controlsByStatus
        };
      }),
      catchError(() => of({
        totalControls: 0,
        compliantControls: 0,
        nonCompliantControls: 0,
        complianceRate: 0,
        controlsByFramework: {},
        controlsByStatus: {}
      }))
    );
  }

  /**
   * Récupère le résumé SNMP depuis les APIs SNMP réelles
   */
  getSnmpSummary(filter?: DashboardFilter): Observable<SnmpSummary> {
    const params = this.buildHttpParams(filter);
    if (filter?.assetId) {
      params.set('assetId', filter.assetId);
    }
    
    // Utiliser l'API SNMP réelle pour les statistiques
    return this.http.get<any>(`${this.snmpApiUrl}/automation/config/targets`).pipe(
      map(response => {
        const targets = response.targets || [];
        const statistics = response.statistics || {};
        
        // Calculer les statistiques à partir des données réelles
        const totalAssets = targets.length;
        const activeAssets = targets.filter((t: any) => t.enabled).length;
        const inactiveAssets = totalAssets - activeAssets;
        
        // Grouper par type (basé sur le hostname ou description)
        const assetsByType: { [key: string]: number } = {};
        targets.forEach((target: any) => {
          const hostname = target.hostname || target.displayName || '';
          let type = 'AUTRE';
          
          if (hostname.toLowerCase().includes('router')) type = 'ROUTEUR';
          else if (hostname.toLowerCase().includes('switch')) type = 'COMMUTATEUR';
          else if (hostname.toLowerCase().includes('serveur') || hostname.toLowerCase().includes('server')) type = 'SERVEUR';
          else if (hostname.toLowerCase().includes('imprimante') || hostname.toLowerCase().includes('printer')) type = 'IMPRIMANTE';
          
          assetsByType[type] = (assetsByType[type] || 0) + 1;
        });
        
        // Statut des assets
        const assetsByStatus = {
          'ACTIF': activeAssets,
          'INACTIF': inactiveAssets
        };
        
        // Calculer le taux de succès (utiliser des valeurs par défaut pour l'instant)
        const successRate = totalAssets > 0 ? (activeAssets / totalAssets) * 100 : 0;
        
        return {
          totalAssets,
          activeAssets,
          inactiveAssets,
          assetsByType,
          assetsByStatus,
          recentScans: statistics.totalTargets || 0,
          failedScans: 0, // À implémenter avec l'historique des scans
          successRate: Math.round(successRate * 10) / 10
        };
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des données SNMP:', error);
        // Retourner des données par défaut en cas d'erreur
        return of({
          totalAssets: 0,
          activeAssets: 0,
          inactiveAssets: 0,
          assetsByType: {},
          assetsByStatus: { 'ACTIF': 0, 'INACTIF': 0 },
          recentScans: 0,
          failedScans: 0,
          successRate: 0
        });
      })
    );
  }

  /**
   * Récupère le résumé des plans d'action (vraies données)
   */
  getActionPlansSummary(filter?: DashboardFilter): Observable<ActionPlansSummary> {
    return this.http.get<any[]>(`${environment.apiUrl}/remediation-plans`).pipe(
      map((plans: any[]) => {
        const totalPlans = plans.length;
        const activePlans = plans.filter(p => p.status === 'IN_PROGRESS').length;
        const completedPlans = plans.filter(p => p.status === 'DONE').length;
        const overduePlans = plans.filter(p => p.status === 'OVERDUE').length;
        const plansByStatus = this.groupBy(plans, 'status');
        const completionRate = totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;
        return {
          totalPlans,
          activePlans,
          completedPlans,
          overduePlans,
          plansByStatus,
          completionRate: Math.round(completionRate * 10) / 10
        };
      }),
      catchError(() => of({
        totalPlans: 0,
        activePlans: 0,
        completedPlans: 0,
        overduePlans: 0,
        plansByStatus: {},
        completionRate: 0
      }))
    );
  }

  /**
   * Récupère un résumé global du dashboard en utilisant toutes les APIs
   */
  getGlobalSummary(filter?: DashboardFilter): Observable<GlobalDashboardSummary> {
    return forkJoin({
      risks: this.getRiskSummary(filter),
      compliance: this.getComplianceSummary(filter),
      snmp: this.getSnmpSummary(filter),
      plans: this.getActionPlansSummary(filter)
    });
  }

  /**
   * Construit les paramètres HTTP à partir du filtre
   */
  private buildHttpParams(filter?: DashboardFilter): HttpParams {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.startDate) {
        params = params.set('start', filter.startDate.toISOString());
      }
      if (filter.endDate) {
        params = params.set('end', filter.endDate.toISOString());
      }
      if (filter.role) {
        params = params.set('role', filter.role);
      }
    }
    
    return params;
  }

  /**
   * Groupe les données par propriété (retourne un objet clé:valeur)
   */
  private groupBy(array: any[], key: string): any {
    const groups: any = {};
    array.forEach(item => {
      const value = item[key] || 'N/A';
      groups[value] = (groups[value] || 0) + 1;
    });
    return groups;
  }
} 