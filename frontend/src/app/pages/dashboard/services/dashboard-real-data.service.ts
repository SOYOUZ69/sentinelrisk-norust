import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RiskService } from '../../../features/risks/services/risk.service';

export interface RiskStatusCount {
  status: string;
  count: number;
}

export interface RiskLevelCount {
  level: string;
  count: number;
}

export interface RiskCategoryCount {
  category: string;
  count: number;
}

export interface AssessmentScore {
  id: number;
  score: number;
  date: string;
  riskId: number;
}

export interface ControlEffectiveness {
  id: number;
  effectiveness: number;
  date: string;
  controlId: number;
}

export interface RemediationPlanCompletion {
  id: number;
  efficacite: number;
  status: string;
  date: string;
}

export interface RiskStatusHistory {
  id: number;
  riskId: number;
  oldStatus: string;
  newStatus: string;
  changedAt: string;
  changedBy: string;
}

export interface AssessmentScoreHistory {
  id: number;
  assessmentId: number;
  oldScore: number;
  newScore: number;
  changedAt: string;
  changedBy: string;
}

export interface RiskImpactHistory {
  id: number;
  riskId: number;
  planId: number;
  oldImpact: string;
  newImpact: string;
  oldScore: number;
  newScore: number;
  changedAt: string;
  changedBy: string;
}

export interface DashboardRealData {
  risks: {
    totalRisks: number;
    risksByStatus: RiskStatusCount[];
    risksByLevel: RiskLevelCount[];
    risksByCategory: RiskCategoryCount[];
    openRisks: number;
    closedRisks: number;
    averageScore: number;
  };
  assessments: {
    totalAssessments: number;
    averageScore: number;
    scoreEvolution: AssessmentScore[];
  };
  controls: {
    totalControls: number;
    averageEffectiveness: number;
    effectivenessEvolution: ControlEffectiveness[];
  };
  remediationPlans: {
    totalPlans: number;
    completionRate: number;
    plansByStatus: { status: string; count: number }[];
    completionEvolution: RemediationPlanCompletion[];
  };
  history: {
    riskStatusHistory: RiskStatusHistory[];
    assessmentScoreHistory: AssessmentScoreHistory[];
    riskImpactHistory: RiskImpactHistory[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardRealDataService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private riskService: RiskService) {}

  /**
   * Récupère les données réelles du dashboard
   */
  getDashboardRealData(): Observable<DashboardRealData> {
    return forkJoin({
      risks: this.getRisksData(),
      assessments: this.getAssessmentsData(),
      controls: this.getControlsData(),
      remediationPlans: this.getRemediationPlansData(),
      history: this.getHistoryData()
    }).pipe(
      map(data => this.aggregateDashboardData(data)),
      catchError(error => {
        console.error('Erreur lors de la récupération des données réelles:', error);
        return of(this.getDefaultData());
      })
    );
  }

  /**
   * Récupère les données des risques
   */
  private getRisksData(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/risks`).pipe(
      map((risks: any[]) => {
        const totalRisks = risks.length;
        const risksByStatus = this.groupBy(risks, 'status');
        const risksByLevel = this.groupBy(risks, 'level');
        const risksByCategory = this.groupBy(risks, 'category');
        
        const openRisks = risks.filter(r => 
          ['IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED'].includes(r.status)
        ).length;
        const closedRisks = risks.filter(r => 
          ['CLOSED', 'ACCEPTED'].includes(r.status)
        ).length;

        const averageScore = risks.length > 0 
          ? risks.reduce((sum, risk) => sum + (risk.score || 0), 0) / risks.length 
          : 0;

        return {
          totalRisks,
          risksByStatus,
          risksByLevel,
          risksByCategory,
          openRisks,
          closedRisks,
          averageScore: Math.round(averageScore * 10) / 10
        };
      }),
      catchError(() => of({
        totalRisks: 0,
        risksByStatus: [],
        risksByLevel: [],
        risksByCategory: [],
        openRisks: 0,
        closedRisks: 0,
        averageScore: 0
      }))
    );
  }

  /**
   * Récupère les données des évaluations
   */
  private getAssessmentsData(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/assessments`).pipe(
      map((assessments: any[]) => {
        const totalAssessments = assessments.length;
        const averageScore = assessments.length > 0 
          ? assessments.reduce((sum, assessment) => sum + (assessment.score || 0), 0) / assessments.length 
          : 0;

        const scoreEvolution = assessments.map(assessment => ({
          id: assessment.id,
          score: assessment.score || 0,
          date: assessment.createdAt || new Date().toISOString(),
          riskId: assessment.riskId
        }));

        return {
          totalAssessments,
          averageScore: Math.round(averageScore * 10) / 10,
          scoreEvolution
        };
      }),
      catchError(() => of({
        totalAssessments: 0,
        averageScore: 0,
        scoreEvolution: []
      }))
    );
  }

  /**
   * Récupère les données des contrôles
   */
  private getControlsData(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/controls`).pipe(
      map((controls: any[]) => {
        const totalControls = controls.length;
        const averageEffectiveness = controls.length > 0 
          ? controls.reduce((sum, control) => sum + (control.effectiveness || 0), 0) / controls.length 
          : 0;

        const effectivenessEvolution = controls.map(control => ({
          id: control.id,
          effectiveness: control.effectiveness || 0,
          date: control.updatedAt || control.createdAt || new Date().toISOString(),
          controlId: control.id
        }));

        return {
          totalControls,
          averageEffectiveness: Math.round(averageEffectiveness * 10) / 10,
          effectivenessEvolution
        };
      }),
      catchError(() => of({
        totalControls: 0,
        averageEffectiveness: 0,
        effectivenessEvolution: []
      }))
    );
  }

  /**
   * Récupère les données des plans de remédiation
   */
  private getRemediationPlansData(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/remediation-plans`).pipe(
      map((plans: any[]) => {
        const totalPlans = plans.length;
        const plansByStatus = this.groupBy(plans, 'status');
        
        const completedPlans = plans.filter(p => p.status === 'DONE').length;
        const completionRate = totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;

        const completionEvolution = plans.map(plan => ({
          id: plan.id,
          efficacite: plan.efficacite || 0,
          status: plan.status,
          date: plan.updatedAt || plan.createdAt || new Date().toISOString()
        }));

        return {
          totalPlans,
          completionRate: Math.round(completionRate * 10) / 10,
          plansByStatus,
          completionEvolution
        };
      }),
      catchError(() => of({
        totalPlans: 0,
        completionRate: 0,
        plansByStatus: [],
        completionEvolution: []
      }))
    );
  }

  /**
   * Récupère les données d'historique
   */
  private getHistoryData(): Observable<any> {
    // On commence par récupérer tous les risques pour avoir leurs IDs
    return this.http.get<any[]>(`${this.apiUrl}/risks`).pipe(
      switchMap((risks: any[]) => {
        const riskIds = risks.map(r => r.id?.toString()).filter(Boolean);
        // Appels en parallèle pour chaque historique
        return forkJoin({
          riskStatusHistory: riskIds.length > 0 ? forkJoin(riskIds.map(id => this.riskService.getRiskStatusHistory(id).pipe(catchError(() => of([]))))) : of([]),
          riskScoreHistory: riskIds.length > 0 ? forkJoin(riskIds.map(id => this.riskService.getRiskScoreHistory(id).pipe(catchError(() => of([]))))) : of([]),
          riskImpactHistory: riskIds.length > 0 ? forkJoin(riskIds.map(id => this.riskService.getRiskImpactHistory(id).pipe(catchError(() => of([]))))) : of([])
        });
      }),
      map(({ riskStatusHistory, riskScoreHistory, riskImpactHistory }) => ({
        riskStatusHistory: ([] as any[]).concat(...riskStatusHistory),
        assessmentScoreHistory: ([] as any[]).concat(...riskScoreHistory),
        riskImpactHistory: ([] as any[]).concat(...riskImpactHistory)
      }))
    );
  }

  /**
   * Agrège les données pour le dashboard
   */
  private aggregateDashboardData(data: any): DashboardRealData {
    return {
      risks: data.risks,
      assessments: data.assessments,
      controls: data.controls,
      remediationPlans: data.remediationPlans,
      history: data.history
    };
  }

  /**
   * Retourne des données par défaut en cas d'erreur
   */
  private getDefaultData(): DashboardRealData {
    return {
      risks: {
        totalRisks: 0,
        risksByStatus: [],
        risksByLevel: [],
        risksByCategory: [],
        openRisks: 0,
        closedRisks: 0,
        averageScore: 0
      },
      assessments: {
        totalAssessments: 0,
        averageScore: 0,
        scoreEvolution: []
      },
      controls: {
        totalControls: 0,
        averageEffectiveness: 0,
        effectivenessEvolution: []
      },
      remediationPlans: {
        totalPlans: 0,
        completionRate: 0,
        plansByStatus: [],
        completionEvolution: []
      },
      history: {
        riskStatusHistory: [],
        assessmentScoreHistory: [],
        riskImpactHistory: []
      }
    };
  }

  /**
   * Groupe les données par propriété
   */
  private groupBy(array: any[], key: string): any[] {
    const groups = array.reduce((groups, item) => {
      const value = item[key] || 'N/A';
      groups[value] = (groups[value] || 0) + 1;
      return groups;
    }, {});

    return Object.keys(groups).map(key => ({
      [key.toLowerCase()]: key,
      count: groups[key]
    }));
  }
} 