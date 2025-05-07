import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    return this.apiService.get<any[]>(this.basePath)
      .pipe(
        map(controlsData => controlsData.map(control => this.mapControlResponse(control))),
        catchError(error => {
          console.error('Erreur lors de la récupération des contrôles', error);
          return throwError(() => new Error('Impossible de récupérer la liste des contrôles. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère un contrôle par son identifiant
   * @param id Identifiant du contrôle
   * @returns Observable contenant le contrôle
   */
  getControl(id: string): Observable<Control> {
    return this.apiService.get<any>(`${this.basePath}/${id}`)
      .pipe(
        map(controlData => this.mapControlResponse(controlData)),
        catchError(error => {
          console.error(`Erreur lors de la récupération du contrôle ${id}`, error);
          return throwError(() => new Error('Impossible de récupérer les détails du contrôle. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Crée un nouveau contrôle
   * @param control Données du contrôle à créer
   * @returns Observable contenant le contrôle créé
   */
  createControl(control: Partial<Control>): Observable<Control> {
    const controlRequest = this.formatControlRequest(control);
    
    return this.apiService.post<any>(this.basePath, controlRequest)
      .pipe(
        map(controlData => this.mapControlResponse(controlData)),
        catchError(error => {
          console.error('Erreur lors de la création du contrôle', error);
          const message = this.getErrorMessage(error) || 'Impossible de créer le contrôle. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Met à jour un contrôle existant
   * @param id Identifiant du contrôle
   * @param control Nouvelles données du contrôle
   * @returns Observable contenant le contrôle mis à jour
   */
  updateControl(id: string, control: Partial<Control>): Observable<Control> {
    const controlRequest = this.formatControlRequest(control);
    
    return this.apiService.put<any>(`${this.basePath}/${id}`, controlRequest)
      .pipe(
        map(controlData => this.mapControlResponse(controlData)),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du contrôle ${id}`, error);
          const message = this.getErrorMessage(error) || 'Impossible de mettre à jour le contrôle. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Supprime un contrôle
   * @param id Identifiant du contrôle à supprimer
   * @returns Observable
   */
  deleteControl(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression du contrôle ${id}`, error);
          return throwError(() => new Error('Impossible de supprimer le contrôle. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère les contrôles par type
   * @param type Type de contrôle
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByType(type: string): Observable<Control[]> {
    return this.apiService.get<any[]>(`${this.basePath}/type/${type}`)
      .pipe(
        map(controlsData => controlsData.map(control => this.mapControlResponse(control))),
        catchError(error => {
          console.error(`Erreur lors de la récupération des contrôles de type ${type}`, error);
          return throwError(() => new Error('Impossible de récupérer les contrôles de ce type. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère les contrôles par statut
   * @param status Statut des contrôles
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByStatus(status: string): Observable<Control[]> {
    return this.apiService.get<any[]>(`${this.basePath}/status/${status}`)
      .pipe(
        map(controlsData => controlsData.map(control => this.mapControlResponse(control))),
        catchError(error => {
          console.error(`Erreur lors de la récupération des contrôles avec le statut ${status}`, error);
          return throwError(() => new Error('Impossible de récupérer les contrôles avec ce statut. Veuillez réessayer.'));
        })
      );
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
    return this.apiService.get<any[]>(`${this.basePath}/risk/${riskId}`)
      .pipe(
        map(controlsData => controlsData.map(control => this.mapControlResponse(control))),
        catchError(error => {
          console.error(`Erreur lors de la récupération des contrôles associés au risque ${riskId}`, error);
          return throwError(() => new Error('Impossible de récupérer les contrôles associés à ce risque. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Mappe la réponse du backend vers le modèle frontend
   * @param controlData Données du contrôle provenant du backend
   * @returns Objet Control pour le frontend
   */
  private mapControlResponse(controlData: any): Control {
    return {
      ...controlData,
      // Conversion de l'ID numérique en string si nécessaire
      id: controlData.id?.toString(),
      // Conversion des dates si elles existent
      implementationDate: controlData.implementationDate ? new Date(controlData.implementationDate) : undefined,
      lastTestedDate: controlData.lastTestedDate ? new Date(controlData.lastTestedDate) : undefined,
      createdAt: controlData.createdAt ? new Date(controlData.createdAt) : undefined,
      updatedAt: controlData.updatedAt ? new Date(controlData.updatedAt) : undefined,
      // Extraire les IDs des risques depuis la propriété risks[]
      riskIds: controlData.risks ? controlData.risks.map((risk: any) => risk.id.toString()) : []
    } as Control;
  }

  /**
   * Formate les données du contrôle pour correspondre au format attendu par le backend
   * @param control Données du contrôle
   * @returns Objet formaté pour le backend
   */
  private formatControlRequest(control: Partial<Control>): any {
    return {
      name: control.name,
      description: control.description,
      type: control.type,
      status: control.status,
      frequency: control.frequency,
      owner: control.owner,
      implementationDate: control.implementationDate,
      lastTestedDate: control.lastTestedDate,
      effectivenessScore: control.effectivenessScore,
      documentation: control.documentation,
      riskIds: control.riskIds
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
} 