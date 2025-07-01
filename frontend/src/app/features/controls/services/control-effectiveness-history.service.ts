import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ControlEffectivenessHistory } from '../../../core/models/control-effectiveness-history.model';

@Injectable({
  providedIn: 'root'
})
export class ControlEffectivenessHistoryService {
  private readonly basePath = '/control-effectiveness-history';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère l'historique des changements d'efficacité pour un contrôle spécifique
   * @param controlId ID du contrôle
   * @returns Observable contenant la liste de l'historique
   */
  getControlEffectivenessHistory(controlId: number): Observable<ControlEffectivenessHistory[]> {
    return this.apiService.get<ControlEffectivenessHistory[]>(`${this.basePath}/control/${controlId}`);
  }

  /**
   * Récupère l'historique des changements d'efficacité pour un risque spécifique
   * @param riskId ID du risque
   * @returns Observable contenant la liste de l'historique
   */
  getRiskEffectivenessHistory(riskId: number): Observable<ControlEffectivenessHistory[]> {
    return this.apiService.get<ControlEffectivenessHistory[]>(`${this.basePath}/risk/${riskId}`);
  }
} 