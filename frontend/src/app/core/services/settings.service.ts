import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface RiskAcceptanceThreshold {
  threshold: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly basePath = '/settings';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère le seuil d'acceptation des risques
   * @returns Observable contenant le seuil d'acceptation
   */
  getRiskAcceptanceThreshold(): Observable<number> {
    return this.apiService.get<any>(`${this.basePath}/risk-acceptance-threshold`)
      .pipe(
        map(response => response.threshold),
        catchError(error => {
          console.error('Erreur lors de la récupération du seuil d\'acceptation', error);
          return throwError(() => new Error('Impossible de récupérer le seuil d\'acceptation. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Met à jour le seuil d'acceptation des risques
   * @param threshold Le nouveau seuil
   * @returns Observable contenant la confirmation
   */
  updateRiskAcceptanceThreshold(threshold: number): Observable<RiskAcceptanceThreshold> {
    return this.apiService.put<any>(`${this.basePath}/risk-acceptance-threshold`, { threshold })
      .pipe(
        map(response => ({
          threshold: response.threshold,
          message: response.message
        })),
        catchError(error => {
          console.error('Erreur lors de la mise à jour du seuil d\'acceptation', error);
          const message = this.getErrorMessage(error) || 'Impossible de mettre à jour le seuil d\'acceptation. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Extrait un message d'erreur lisible de la réponse HTTP
   * @param error Erreur HTTP
   * @returns Message d'erreur lisible
   */
  private getErrorMessage(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    return error.statusText || 'Une erreur est survenue';
  }
} 