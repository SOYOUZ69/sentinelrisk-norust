import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

// Interface simple pour les risques
export interface Risk {
  id: string;
  name: string;
  description?: string;
  severity?: string;
  probability?: string;
  status?: string;
}

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
    return this.apiService.get<Risk[]>(this.basePath)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des risques', error);
          return throwError(() => new Error('Impossible de récupérer la liste des risques. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère un risque par son identifiant
   * @param id Identifiant du risque
   * @returns Observable contenant le risque
   */
  getRisk(id: string): Observable<Risk> {
    return this.apiService.get<Risk>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération du risque ${id}`, error);
          return throwError(() => new Error('Impossible de récupérer les détails du risque. Veuillez réessayer.'));
        })
      );
  }
}
