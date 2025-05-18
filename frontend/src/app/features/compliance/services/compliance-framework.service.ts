import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ComplianceFramework } from '../../../core/models/compliance.model';

@Injectable({
  providedIn: 'root'
})
export class ComplianceFrameworkService {
  private readonly basePath = '/compliance-frameworks';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère la liste de tous les frameworks de conformité
   * @returns Observable contenant un tableau de frameworks
   */
  getFrameworks(): Observable<ComplianceFramework[]> {
    return this.apiService.get<ComplianceFramework[]>(this.basePath)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des frameworks de conformité', error);
          return throwError(() => new Error('Impossible de récupérer la liste des frameworks de conformité. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère un framework de conformité par son identifiant
   * @param id Identifiant du framework
   * @returns Observable contenant le framework
   */
  getFramework(id: string): Observable<ComplianceFramework> {
    return this.apiService.get<ComplianceFramework>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération du framework ${id}`, error);
          return throwError(() => new Error('Impossible de récupérer les détails du framework. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Crée un nouveau framework de conformité
   * @param framework Données du framework à créer
   * @returns Observable contenant le framework créé
   */
  createFramework(framework: Partial<ComplianceFramework>): Observable<ComplianceFramework> {
    return this.apiService.post<ComplianceFramework>(this.basePath, framework)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création du framework', error);
          const message = this.getErrorMessage(error) || 'Impossible de créer le framework. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Met à jour un framework de conformité existant
   * @param id Identifiant du framework
   * @param framework Nouvelles données du framework
   * @returns Observable contenant le framework mis à jour
   */
  updateFramework(id: string, framework: Partial<ComplianceFramework>): Observable<ComplianceFramework> {
    return this.apiService.put<ComplianceFramework>(`${this.basePath}/${id}`, framework)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du framework ${id}`, error);
          const message = this.getErrorMessage(error) || 'Impossible de mettre à jour le framework. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Supprime un framework de conformité
   * @param id Identifiant du framework à supprimer
   * @returns Observable
   */
  deleteFramework(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression du framework ${id}`, error);
          return throwError(() => new Error('Impossible de supprimer le framework. Veuillez réessayer.'));
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