import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { RiskComplianceMapping, GapAnalysisResult } from '../../../core/models/compliance.model';

@Injectable({
  providedIn: 'root'
})
export class RiskComplianceMappingService {
  private readonly basePath = '/risk-compliance-mappings';
  private readonly gapAnalysisPath = '/risk-compliance-mappings/gap-analysis';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère la liste de tous les mappings risques-conformité
   * @returns Observable contenant un tableau de mappings
   */
  getMappings(): Observable<RiskComplianceMapping[]> {
    return this.apiService.get<RiskComplianceMapping[]>(this.basePath)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des mappings', error);
          return throwError(() => new Error('Impossible de récupérer la liste des mappings. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère la liste des mappings risque-conformité filtrés par risque
   * @param riskId Identifiant du risque
   * @returns Observable contenant un tableau de mappings
   */
  getMappingsByRisk(riskId: string): Observable<RiskComplianceMapping[]> {
    return this.apiService.get<RiskComplianceMapping[]>(`${this.basePath}?riskId=${riskId}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération des mappings du risque ${riskId}`, error);
          return throwError(() => new Error('Impossible de récupérer les mappings de ce risque. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère la liste des mappings risque-conformité filtrés par framework
   * @param frameworkId Identifiant du framework
   * @returns Observable contenant un tableau de mappings
   */
  getMappingsByFramework(frameworkId: string): Observable<RiskComplianceMapping[]> {
    return this.apiService.get<RiskComplianceMapping[]>(`${this.basePath}?frameworkId=${frameworkId}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération des mappings du framework ${frameworkId}`, error);
          return throwError(() => new Error('Impossible de récupérer les mappings de ce framework. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère un mapping par son identifiant
   * @param id Identifiant du mapping
   * @returns Observable contenant le mapping
   */
  getMapping(id: string): Observable<RiskComplianceMapping> {
    return this.apiService.get<RiskComplianceMapping>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération du mapping ${id}`, error);
          return throwError(() => new Error('Impossible de récupérer les détails du mapping. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Crée un nouveau mapping
   * @param mapping Données du mapping à créer
   * @returns Observable contenant le mapping créé
   */
  createMapping(mapping: Partial<RiskComplianceMapping>): Observable<RiskComplianceMapping> {
    return this.apiService.post<RiskComplianceMapping>(this.basePath, mapping)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création du mapping', error);
          return throwError(() => new Error('Impossible de créer le mapping. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Met à jour un mapping existant
   * @param id Identifiant du mapping
   * @param mapping Nouvelles données du mapping
   * @returns Observable contenant le mapping mis à jour
   */
  updateMapping(id: string, mapping: Partial<RiskComplianceMapping>): Observable<RiskComplianceMapping> {
    return this.apiService.put<RiskComplianceMapping>(`${this.basePath}/${id}`, mapping)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du mapping ${id}`, error);
          return throwError(() => new Error('Impossible de mettre à jour le mapping. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Supprime un mapping
   * @param id Identifiant du mapping à supprimer
   * @returns Observable
   */
  deleteMapping(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression du mapping ${id}`, error);
          return throwError(() => new Error('Impossible de supprimer le mapping. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère l'analyse d'écarts pour un framework donné
   * Si riskId est fourni, l'analyse sera spécifique à ce risque
   * @param frameworkId Identifiant du référentiel
   * @param riskId Identifiant du risque (optionnel)
   * @returns Observable contenant les résultats de l'analyse d'écarts
   */
  getGapAnalysis(frameworkId: string, riskId?: string): Observable<GapAnalysisResult> {
    // Construction de l'URL avec les paramètres
    let url = `${this.gapAnalysisPath}?frameworkId=${frameworkId}`;
    if (riskId) {
      url += `&riskId=${riskId}`;
    }
    
    return this.apiService.get<GapAnalysisResult>(url)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération de l'analyse d'écarts. Framework: ${frameworkId}, Risque: ${riskId || 'non spécifié'}`, error);
          return throwError(() => new Error('Impossible de récupérer l\'analyse d\'écarts. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère le pourcentage de conformité d'un risque par rapport à un framework
   * @param riskId Identifiant du risque
   * @param frameworkId Identifiant du framework
   * @returns Observable contenant le pourcentage de conformité
   */
  getCompliancePercentage(riskId: string, frameworkId: string): Observable<number> {
    return this.apiService.get<{percentage: number}>(`${this.basePath}/compliance-percentage?riskId=${riskId}&frameworkId=${frameworkId}`)
      .pipe(
        map(response => response.percentage),
        catchError(error => {
          console.error(`Erreur lors du calcul du pourcentage de conformité pour le risque ${riskId} et le framework ${frameworkId}`, error);
          return throwError(() => new Error('Impossible de calculer le pourcentage de conformité. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère un mapping spécifique par risque et exigence
   * @param riskId Identifiant du risque
   * @param requirementId Identifiant de l'exigence
   * @returns Observable contenant le mapping s'il existe
   */
  getMappingByRiskAndRequirement(riskId: string, requirementId: string): Observable<RiskComplianceMapping[]> {
    return this.apiService.get<RiskComplianceMapping[]>(
      `${this.basePath}?riskId=${riskId}&requirementId=${requirementId}`
    ).pipe(
      catchError(error => {
        console.error(`Erreur lors de la récupération du mapping pour le risque ${riskId} et l'exigence ${requirementId}`, error);
        return throwError(() => new Error('Impossible de récupérer le mapping spécifique. Veuillez réessayer.'));
      })
    );
  }

  /**
   * Extrait un message d'erreur lisible de la réponse HTTP
   * @param error Erreur HTTP
   * @returns Message d'erreur lisible
   */
  private getErrorMessage(error: any): string {
    if (error.error) {
      if (typeof error.error === 'string') {
        return error.error;
      }
      if (error.error.message) {
        return error.error.message;
      }
      if (typeof error.error === 'object') {
        // Si c'est un objet d'erreurs de validation (champ -> message)
        const validationErrors = Object.entries(error.error)
          .map(([field, message]) => `${field}: ${message}`)
          .join(', ');
        
        if (validationErrors) {
          return `Erreurs de validation: ${validationErrors}`;
        }
      }
    }
    return error.statusText || 'Une erreur est survenue';
  }
} 