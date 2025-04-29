import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Risk } from '../../../core/models/risk.model';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  private readonly basePath = '/risks';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère la liste de tous les risques
   * @returns Observable contenant un tableau de risques
   */
  getRisks(): Observable<Risk[]> {
    return this.apiService.get<Risk[]>(this.basePath);
  }

  /**
   * Récupère un risque par son identifiant
   * @param id Identifiant du risque
   * @returns Observable contenant le risque
   */
  getRisk(id: string): Observable<Risk> {
    return this.apiService.get<Risk>(`${this.basePath}/${id}`);
  }

  /**
   * Crée un nouveau risque
   * @param risk Données du risque à créer
   * @returns Observable contenant le risque créé
   */
  createRisk(risk: Partial<Risk>): Observable<Risk> {
    return this.apiService.post<Risk>(this.basePath, risk);
  }

  /**
   * Met à jour un risque existant
   * @param id Identifiant du risque
   * @param risk Nouvelles données du risque
   * @returns Observable contenant le risque mis à jour
   */
  updateRisk(id: string, risk: Partial<Risk>): Observable<Risk> {
    return this.apiService.put<Risk>(`${this.basePath}/${id}`, risk);
  }

  /**
   * Supprime un risque
   * @param id Identifiant du risque à supprimer
   * @returns Observable
   */
  deleteRisk(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Récupère les risques par catégorie
   * @param categoryId Identifiant de la catégorie
   * @returns Observable contenant un tableau de risques
   */
  getRisksByCategory(categoryId: string): Observable<Risk[]> {
    return this.apiService.get<Risk[]>(`${this.basePath}/category/${categoryId}`);
  }

  /**
   * Récupère les risques avec un score élevé
   * @returns Observable contenant un tableau de risques
   */
  getHighScoreRisks(): Observable<Risk[]> {
    return this.apiService.get<Risk[]>(`${this.basePath}/high-score`);
  }
} 