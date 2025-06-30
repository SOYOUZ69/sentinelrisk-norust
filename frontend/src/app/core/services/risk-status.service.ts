import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Risk } from '../models/risk.model';

export interface RiskStatusHistory {
  id: number;
  riskId: number;
  previousStatus: string | null;
  newStatus: string;
  transitionReason: string;
  changedByUser: string;
  changedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class RiskStatusService {

  private apiUrl = `${environment.apiUrl}/risks`;

  constructor(private http: HttpClient) { }

  /**
   * Déclenche l'évaluation d'un risque (IDENTIFIED → IN_ASSESSMENT)
   */
  triggerAssessment(riskId: number): Observable<Risk> {
    return this.http.post<Risk>(`${this.apiUrl}/${riskId}/trigger-assessment`, {});
  }

  /**
   * Marque un risque comme évalué (IN_ASSESSMENT → MITIGATED)
   */
  markAsAssessed(riskId: number): Observable<Risk> {
    return this.http.post<Risk>(`${this.apiUrl}/${riskId}/mark-assessed`, {});
  }

  /**
   * Marque un risque comme accepté (MITIGATED → ACCEPTED)
   */
  markAsAccepted(riskId: number): Observable<Risk> {
    return this.http.post<Risk>(`${this.apiUrl}/${riskId}/mark-accepted`, {});
  }

  /**
   * Ferme un risque (ACCEPTED → CLOSED)
   */
  closeRisk(riskId: number): Observable<Risk> {
    return this.http.post<Risk>(`${this.apiUrl}/${riskId}/close`, {});
  }

  /**
   * Récupère l'historique des statuts d'un risque
   */
  getStatusHistory(riskId: number): Observable<RiskStatusHistory[]> {
    return this.http.get<RiskStatusHistory[]>(`${this.apiUrl}/${riskId}/status-history`);
  }

  /**
   * Retourne les actions disponibles selon le statut actuel
   */
  getAvailableActions(currentStatus: string): string[] {
    switch (currentStatus) {
      case 'IDENTIFIED':
        return ['trigger-assessment'];
      case 'IN_ASSESSMENT':
        return ['mark-assessed'];
      case 'MITIGATED':
        return ['mark-accepted', 'close'];
      case 'ACCEPTED':
        return ['close'];
      case 'CLOSED':
        return [];
      default:
        return [];
    }
  }

  /**
   * Retourne le libellé d'une action
   */
  getActionLabel(action: string): string {
    switch (action) {
      case 'trigger-assessment':
        return 'Déclencher l\'évaluation';
      case 'mark-assessed':
        return 'Marquer comme évalué';
      case 'mark-accepted':
        return 'Marquer comme accepté';
      case 'close':
        return 'Fermer le risque';
      default:
        return action;
    }
  }

  /**
   * Retourne la classe CSS pour le badge de statut
   */
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'IDENTIFIED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_ASSESSMENT':
        return 'bg-yellow-100 text-yellow-800';
      case 'MITIGATED':
        return 'bg-green-100 text-green-800';
      case 'ACCEPTED':
        return 'bg-purple-100 text-purple-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * Retourne le libellé traduit d'un statut
   */
  getStatusLabel(status: string): string {
    switch (status) {
      case 'IDENTIFIED':
        return 'Identifié';
      case 'IN_ASSESSMENT':
        return 'En évaluation';
      case 'MITIGATED':
        return 'Atténué';
      case 'ACCEPTED':
        return 'Accepté';
      case 'CLOSED':
        return 'Fermé';
      default:
        return status;
    }
  }
} 