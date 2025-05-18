import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ComplianceRequirement, ComplianceRequirementType } from '../../../core/models/compliance.model';

@Injectable({
  providedIn: 'root'
})
export class ComplianceRequirementService {
  private readonly basePath = '/compliance-requirements';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère la liste de toutes les exigences de conformité
   * @returns Observable contenant un tableau d'exigences
   */
  getRequirements(): Observable<ComplianceRequirement[]> {
    return this.apiService.get<ComplianceRequirement[]>(this.basePath)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des exigences de conformité', error);
          return throwError(() => new Error('Impossible de récupérer la liste des exigences de conformité. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère la liste des exigences de conformité filtrées par framework
   * @param frameworkId Identifiant du framework
   * @returns Observable contenant un tableau d'exigences
   */
  getRequirementsByFramework(frameworkId: string): Observable<ComplianceRequirement[]> {
    return this.apiService.get<ComplianceRequirement[]>(`${this.basePath}?frameworkId=${frameworkId}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération des exigences du framework ${frameworkId}`, error);
          return throwError(() => new Error('Impossible de récupérer les exigences de ce framework. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère la liste des exigences de conformité filtrées par type
   * @param type Type d'exigence
   * @returns Observable contenant un tableau d'exigences
   */
  getRequirementsByType(type: ComplianceRequirementType): Observable<ComplianceRequirement[]> {
    return this.apiService.get<ComplianceRequirement[]>(`${this.basePath}?type=${type}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération des exigences de type ${type}`, error);
          return throwError(() => new Error(`Impossible de récupérer les exigences de type ${type}. Veuillez réessayer.`));
        })
      );
  }

  /**
   * Récupère une exigence de conformité par son identifiant
   * @param id Identifiant de l'exigence
   * @returns Observable contenant l'exigence
   */
  getRequirement(id: string): Observable<ComplianceRequirement> {
    return this.apiService.get<ComplianceRequirement>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération de l'exigence ${id}`, error);
          return throwError(() => new Error('Impossible de récupérer les détails de l\'exigence. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Crée une nouvelle exigence de conformité
   * @param requirement Données de l'exigence à créer
   * @returns Observable contenant l'exigence créée
   */
  createRequirement(requirement: Partial<ComplianceRequirement>): Observable<ComplianceRequirement> {
    return this.apiService.post<ComplianceRequirement>(this.basePath, requirement)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création de l\'exigence', error);
          const message = this.getErrorMessage(error) || 'Impossible de créer l\'exigence. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Met à jour une exigence de conformité existante
   * @param id Identifiant de l'exigence
   * @param requirement Nouvelles données de l'exigence
   * @returns Observable contenant l'exigence mise à jour
   */
  updateRequirement(id: string, requirement: Partial<ComplianceRequirement>): Observable<ComplianceRequirement> {
    return this.apiService.put<ComplianceRequirement>(`${this.basePath}/${id}`, requirement)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la mise à jour de l'exigence ${id}`, error);
          const message = this.getErrorMessage(error) || 'Impossible de mettre à jour l\'exigence. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Supprime une exigence de conformité
   * @param id Identifiant de l'exigence à supprimer
   * @returns Observable
   */
  deleteRequirement(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression de l'exigence ${id}`, error);
          return throwError(() => new Error('Impossible de supprimer l\'exigence. Veuillez réessayer.'));
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