import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Assessment, AssessmentStatus } from '../models/assessment.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private readonly basePath = '/assessments';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère la liste de toutes les évaluations
   * @returns Observable contenant un tableau d'évaluations
   */
  getAssessments(): Observable<Assessment[]> {
    return this.apiService.get<Assessment[]>(this.basePath);
  }

  /**
   * Récupère une évaluation par son identifiant
   * @param id Identifiant de l'évaluation
   * @returns Observable contenant l'évaluation
   */
  getAssessment(id: string): Observable<Assessment> {
    return this.apiService.get<Assessment>(`${this.basePath}/${id}`);
  }

  /**
   * Crée une nouvelle évaluation
   * @param assessment Données de l'évaluation à créer
   * @returns Observable contenant l'évaluation créée
   */
  createAssessment(assessment: Partial<Assessment>): Observable<Assessment> {
    return this.apiService.post<Assessment>(this.basePath, assessment);
  }

  /**
   * Met à jour une évaluation existante
   * @param id Identifiant de l'évaluation
   * @param assessment Nouvelles données de l'évaluation
   * @returns Observable contenant l'évaluation mise à jour
   */
  updateAssessment(id: string, assessment: Partial<Assessment>): Observable<Assessment> {
    return this.apiService.put<Assessment>(`${this.basePath}/${id}`, assessment);
  }

  /**
   * Supprime une évaluation
   * @param id Identifiant de l'évaluation à supprimer
   * @returns Observable
   */
  deleteAssessment(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Récupère les évaluations par statut
   * @param status Statut de l'évaluation
   * @returns Observable contenant un tableau d'évaluations
   */
  getAssessmentsByStatus(status: AssessmentStatus): Observable<Assessment[]> {
    return this.apiService.get<Assessment[]>(`${this.basePath}/status/${status}`);
  }

  /**
   * Récupère les évaluations en attente de revue
   * @returns Observable contenant un tableau d'évaluations
   */
  getPendingReviewAssessments(): Observable<Assessment[]> {
    return this.apiService.get<Assessment[]>(`${this.basePath}/pending-review`);
  }

  /**
   * Récupère les évaluations assignées à un utilisateur
   * @param userId Identifiant de l'utilisateur
   * @returns Observable contenant un tableau d'évaluations
   */
  getAssessmentsByUser(userId: string): Observable<Assessment[]> {
    return this.apiService.get<Assessment[]>(`${this.basePath}/user/${userId}`);
  }

  /**
   * Récupère les évaluations pour un risque spécifique
   * @param riskId Identifiant du risque
   * @returns Observable contenant un tableau d'évaluations
   */
  getAssessmentsByRisk(riskId: string): Observable<Assessment[]> {
    return this.apiService.get<Assessment[]>(`${this.basePath}/risk/${riskId}`);
  }
} 