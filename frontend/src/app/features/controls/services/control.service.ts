import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Control, ControlType, ControlStatus, ControlFrequency } from '../models/control.model';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private readonly basePath = '/controls';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère la liste de tous les contrôles
   * @returns Observable contenant un tableau de contrôles
   */
  getControls(): Observable<Control[]> {
    return this.apiService.get<Control[]>(this.basePath);
  }

  /**
   * Récupère un contrôle par son identifiant
   * @param id Identifiant du contrôle
   * @returns Observable contenant le contrôle
   */
  getControl(id: string): Observable<Control> {
    return this.apiService.get<Control>(`${this.basePath}/${id}`);
  }

  /**
   * Crée un nouveau contrôle
   * @param control Données du contrôle à créer
   * @returns Observable contenant le contrôle créé
   */
  createControl(control: Partial<Control>): Observable<Control> {
    return this.apiService.post<Control>(this.basePath, control);
  }

  /**
   * Met à jour un contrôle existant
   * @param id Identifiant du contrôle
   * @param control Nouvelles données du contrôle
   * @returns Observable contenant le contrôle mis à jour
   */
  updateControl(id: string, control: Partial<Control>): Observable<Control> {
    return this.apiService.put<Control>(`${this.basePath}/${id}`, control);
  }

  /**
   * Supprime un contrôle
   * @param id Identifiant du contrôle à supprimer
   * @returns Observable
   */
  deleteControl(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Récupère les contrôles par type
   * @param type Type de contrôle
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByType(type: ControlType): Observable<Control[]> {
    return this.apiService.get<Control[]>(`${this.basePath}/type/${type}`);
  }

  /**
   * Récupère les contrôles par statut
   * @param status Statut du contrôle
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByStatus(status: ControlStatus): Observable<Control[]> {
    return this.apiService.get<Control[]>(`${this.basePath}/status/${status}`);
  }

  /**
   * Récupère les contrôles par fréquence
   * @param frequency Fréquence du contrôle
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByFrequency(frequency: ControlFrequency): Observable<Control[]> {
    return this.apiService.get<Control[]>(`${this.basePath}/frequency/${frequency}`);
  }

  /**
   * Récupère les contrôles associés à un risque
   * @param riskId Identifiant du risque
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByRisk(riskId: string): Observable<Control[]> {
    return this.apiService.get<Control[]>(`${this.basePath}/by-risk/${riskId}`);
  }
} 