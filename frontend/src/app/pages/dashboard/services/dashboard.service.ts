import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { 
  RiskSummary, 
  ComplianceSummary, 
  SnmpSummary, 
  ActionPlansSummary, 
  GlobalDashboardSummary,
  DashboardFilter 
} from '../../../core/models/dashboard.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère le résumé des risques
   */
  getRiskSummary(filter?: DashboardFilter): Observable<RiskSummary> {
    const params = this.buildHttpParams(filter);
    return this.http.get<RiskSummary>(`${this.apiUrl}/summary/risks`, { params });
  }

  /**
   * Récupère le résumé de conformité
   */
  getComplianceSummary(filter?: DashboardFilter): Observable<ComplianceSummary> {
    const params = this.buildHttpParams(filter);
    if (filter?.framework) {
      params.set('frameworkId', filter.framework);
    }
    return this.http.get<ComplianceSummary>(`${this.apiUrl}/summary/compliance`, { params });
  }

  /**
   * Récupère le résumé SNMP
   */
  getSnmpSummary(filter?: DashboardFilter): Observable<SnmpSummary> {
    const params = this.buildHttpParams(filter);
    if (filter?.assetId) {
      params.set('assetId', filter.assetId);
    }
    return this.http.get<SnmpSummary>(`${this.apiUrl}/summary/snmp`, { params });
  }

  /**
   * Récupère le résumé des plans d'action
   */
  getActionPlansSummary(filter?: DashboardFilter): Observable<ActionPlansSummary> {
    const params = this.buildHttpParams(filter);
    return this.http.get<ActionPlansSummary>(`${this.apiUrl}/summary/plans`, { params });
  }

  /**
   * Récupère un résumé global du dashboard
   */
  getGlobalSummary(filter?: DashboardFilter): Observable<GlobalDashboardSummary> {
    const params = this.buildHttpParams(filter);
    return this.http.get<GlobalDashboardSummary>(`${this.apiUrl}/summary/global`, { params });
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
} 