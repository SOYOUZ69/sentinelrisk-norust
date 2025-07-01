import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RemediationPlan, RemediationPlanDTO } from '../../../core/models/remediation-plan.model';

@Injectable({
  providedIn: 'root'
})
export class RemediationPlanService {
  private apiUrl = `${environment.apiUrl}/api/remediation-plans`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les plans de remédiation
   * @returns Observable contenant un tableau de plans
   */
  getPlans(): Observable<RemediationPlan[]> {
    return this.http.get<RemediationPlan[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des plans de remédiation', error);
          return throwError(() => new Error('Impossible de récupérer la liste des plans. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère les plans pour un mapping donné
   * @param mappingId ID du mapping
   * @returns Observable contenant un tableau de plans
   */
  getPlansByMapping(mappingId: string): Observable<RemediationPlan[]> {
    const params = new HttpParams().set('mappingId', mappingId);
    return this.http.get<RemediationPlan[]>(this.apiUrl, { params })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération des plans pour le mapping ${mappingId}`, error);
          return throwError(() => new Error('Impossible de récupérer les plans pour ce mapping. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère les plans assignés à un utilisateur
   * @param ownerId ID de l'utilisateur
   * @returns Observable contenant un tableau de plans
   */
  getPlansByOwner(ownerId: string): Observable<RemediationPlan[]> {
    const params = new HttpParams().set('ownerId', ownerId);
    return this.http.get<RemediationPlan[]>(this.apiUrl, { params })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération des plans pour l'utilisateur ${ownerId}`, error);
          return throwError(() => new Error('Impossible de récupérer les plans pour cet utilisateur. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère un plan par son ID
   * @param id ID du plan
   * @returns Observable contenant le plan
   */
  getPlan(id: string): Observable<RemediationPlan> {
    return this.http.get<RemediationPlan>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération du plan ${id}`, error);
          return throwError(() => new Error('Impossible de récupérer les détails du plan. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Crée un nouveau plan
   * @param plan DTO du plan à créer
   * @returns Observable contenant le plan créé
   */
  createPlan(plan: RemediationPlanDTO): Observable<RemediationPlan> {
    return this.http.post<RemediationPlan>(this.apiUrl, plan)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création du plan', error);
          return throwError(() => new Error('Impossible de créer le plan. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Met à jour un plan existant
   * @param id ID du plan
   * @param plan DTO du plan modifié
   * @returns Observable contenant le plan mis à jour
   */
  updatePlan(id: string, plan: RemediationPlanDTO): Observable<RemediationPlan> {
    return this.http.put<RemediationPlan>(`${this.apiUrl}/${id}`, plan)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du plan ${id}`, error);
          return throwError(() => new Error('Impossible de mettre à jour le plan. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Met à jour l'efficacité d'un plan avec automatisation
   * @param id ID du plan
   * @param efficacite Nouvelle efficacité (0-100)
   * @param changeReason Raison du changement
   * @returns Observable contenant le plan mis à jour
   */
  updatePlanEfficacite(id: string, efficacite: number, changeReason: string): Observable<RemediationPlan> {
    const automationUrl = `${environment.apiUrl}/api/remediation-plans/automation/${id}/efficacite`;
    const payload = { efficacite, changeReason };
    
    console.log('AUTOMATISATION: Mise à jour efficacité via endpoint automation', { id, efficacite, changeReason });
    
    return this.http.put<RemediationPlan>(automationUrl, payload)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la mise à jour de l'efficacité du plan ${id}`, error);
          return throwError(() => new Error('Impossible de mettre à jour l\'efficacité du plan. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Met à jour le statut d'un plan avec automatisation
   * @param id ID du plan
   * @param status Nouveau statut
   * @param changeReason Raison du changement
   * @returns Observable contenant le plan mis à jour
   */
  updatePlanStatus(id: string, status: string, changeReason: string): Observable<RemediationPlan> {
    const automationUrl = `${environment.apiUrl}/api/remediation-plans/automation/${id}/status`;
    const payload = { status, changeReason };
    
    console.log('AUTOMATISATION: Mise à jour statut via endpoint automation', { id, status, changeReason });
    
    return this.http.put<RemediationPlan>(automationUrl, payload)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du statut du plan ${id}`, error);
          return throwError(() => new Error('Impossible de mettre à jour le statut du plan. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Termine un plan avec une efficacité donnée et automatisation
   * @param id ID du plan
   * @param efficacite Efficacité finale (0-100)
   * @param changeReason Raison du changement
   * @returns Observable contenant le plan mis à jour
   */
  completePlan(id: string, efficacite: number, changeReason: string): Observable<RemediationPlan> {
    const automationUrl = `${environment.apiUrl}/api/remediation-plans/automation/${id}/complete`;
    const payload = { efficacite, changeReason };
    
    console.log('AUTOMATISATION: Finalisation du plan via endpoint automation', { id, efficacite, changeReason });
    
    return this.http.post<RemediationPlan>(automationUrl, payload)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la finalisation du plan ${id}`, error);
          return throwError(() => new Error('Impossible de finaliser le plan. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Supprime un plan
   * @param id ID du plan à supprimer
   * @returns Observable vide
   */
  deletePlan(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression du plan ${id}`, error);
          return throwError(() => new Error('Impossible de supprimer le plan. Veuillez réessayer.'));
        })
      );
  }
} 