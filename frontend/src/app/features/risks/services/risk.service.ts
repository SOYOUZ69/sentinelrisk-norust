import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Risk, Category } from '../../../core/models/risk.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  private readonly basePath = '/risks';

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  /**
   * Récupère la liste de tous les risques
   * @returns Observable contenant un tableau de risques
   */
  getRisks(): Observable<Risk[]> {
    return this.apiService.get<any[]>(this.basePath)
      .pipe(
        map(risksData => risksData.map(risk => this.mapRiskResponse(risk))),
        catchError(error => {
          console.error('Erreur lors de la récupération des risques', error);
          return throwError(() => new Error('Impossible de récupérer la liste des risques. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère un risque par son identifiant
   * @param id Identifiant du risque
   * @returns Observable contenant le risque
   */
  getRisk(id: string): Observable<Risk> {
    return this.apiService.get<any>(`${this.basePath}/${id}`)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error(`Erreur lors de la récupération du risque ${id}`, error);
          return throwError(() => new Error('Impossible de récupérer les détails du risque. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Crée un nouveau risque
   * @param risk Données du risque à créer
   * @returns Observable contenant le risque créé
   */
  createRisk(risk: Partial<Risk>): Observable<Risk> {
    // Adapter le format pour le backend
    const riskRequest = this.formatRiskRequest(risk);
    
    return this.apiService.post<any>(this.basePath, riskRequest)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error('Erreur lors de la création du risque', error);
          const message = this.getErrorMessage(error) || 'Impossible de créer le risque. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Met à jour un risque existant
   * @param id Identifiant du risque
   * @param risk Nouvelles données du risque
   * @returns Observable contenant le risque mis à jour
   */
  updateRisk(id: string, risk: Partial<Risk>): Observable<Risk> {
    // Adapter le format pour le backend
    const riskRequest = this.formatRiskRequest(risk);
    
    return this.apiService.put<any>(`${this.basePath}/${id}`, riskRequest)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du risque ${id}`, error);
          const message = this.getErrorMessage(error) || 'Impossible de mettre à jour le risque. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Met à jour uniquement les contrôles associés à un risque
   * @param id Identifiant du risque
   * @param controlIds IDs des contrôles à associer
   * @returns Observable contenant le risque mis à jour
   */
  updateRiskControls(id: string, controlIds: number[]): Observable<Risk> {
    // Convertir tous les IDs en nombre pour assurer la compatibilité avec le backend
    const numericControlIds = controlIds.map(id => typeof id === 'string' ? +id : id);
    
    // Utiliser le service ApiService qui gère l'authentification et les headers correctement
    return this.apiService.put<any>(`${this.basePath}/${id}/controls`, numericControlIds)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour des contrôles du risque ${id}`, error);
          const message = this.getErrorMessage(error) || 'Impossible de mettre à jour les contrôles associés au risque. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Supprime un risque
   * @param id Identifiant du risque à supprimer
   * @returns Observable
   */
  deleteRisk(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression du risque ${id}`, error);
          return throwError(() => new Error('Impossible de supprimer le risque. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère les risques par catégorie
   * @param categoryId Identifiant de la catégorie
   * @returns Observable contenant un tableau de risques
   */
  getRisksByCategory(categoryId: string): Observable<Risk[]> {
    return this.apiService.get<Risk[]>(`${this.basePath}/category/${categoryId}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération des risques de la catégorie ${categoryId}`, error);
          return throwError(() => new Error('Impossible de récupérer les risques de cette catégorie. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère les risques avec un score élevé
   * @returns Observable contenant un tableau de risques
   */
  getHighScoreRisks(): Observable<Risk[]> {
    return this.apiService.get<Risk[]>(`${this.basePath}/high-score`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des risques à score élevé', error);
          return throwError(() => new Error('Impossible de récupérer les risques à score élevé. Veuillez réessayer.'));
        })
      );
  }
  
  /**
   * Formate les données du risque pour correspondre au format attendu par le backend
   * @param risk Données du risque
   * @returns Objet formaté pour le backend
   */
  private formatRiskRequest(risk: Partial<Risk>): any {
    return {
      name: risk.name,
      description: risk.description,
      categoryId: risk.category?.id,
      impactLevel: risk.impactLevel,
      probabilityLevel: risk.probabilityLevel,
      status: risk.status,
      mitigationPlan: risk.mitigationPlan
    };
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

  /**
   * Mappe la réponse du backend vers le modèle frontend
   * @param riskData Données du risque provenant du backend
   * @returns Objet Risk pour le frontend
   */
  private mapRiskResponse(riskData: any): Risk {
    // Mapper le score du backend vers le frontend
    return {
      ...riskData,
      // Conversion de l'ID numérique en string si nécessaire
      id: riskData.id?.toString(),
      // Utiliser riskScore du backend comme score dans le frontend
      score: riskData.riskScore,
      // S'assurer que les dates sont correctement converties
      createdAt: riskData.createdAt ? new Date(riskData.createdAt) : undefined,
      updatedAt: riskData.updatedAt ? new Date(riskData.updatedAt) : undefined
    } as Risk;
  }
} 