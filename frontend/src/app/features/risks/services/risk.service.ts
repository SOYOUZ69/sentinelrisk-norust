import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Risk, Category, Control } from '../../../core/models/risk.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ImportResult } from '../../../core/models/import-result.model';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  private readonly basePath = '/risks';

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  /**
   * Récupère la liste de tous les risques
   * @returns Observable contenant un tableau de risques
   */
  getRisks(): Observable<Risk[]> {
    return this.apiService.get<any[]>(this.basePath)
      .pipe(
        map(risksData => risksData.map(risk => this.mapRiskResponse(risk))),
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
    return this.apiService.get<any>(`${this.basePath}/${id}`)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error(`Erreur lors de la récupération du risque ${id}`, error);
          return throwError(() => new Error('Impossible de récupérer les détails du risque. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Crée un nouveau risque
   * @param risk Données du risque à créer
   * @returns Observable contenant le risque créé
   */
  createRisk(risk: Partial<Risk>): Observable<Risk> {
    // Adapter le format pour le backend
    const riskRequest = this.formatRiskRequest(risk);
    
    return this.apiService.post<any>(this.basePath, riskRequest)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error('Erreur lors de la création du risque', error);
          
          // Pour les erreurs de doublon (409), on retourne le message exact du backend
          if (error.status === 409) {
            let message = 'Un risque similaire existe déjà.';
            if (error.error && error.error.message) {
              message = error.error.message;
            }
            return throwError(() => new Error(message));
          }
          
          // Pour les erreurs de seuil d'acceptation (422)
          if (error.status === 422 && error.error && error.error.error === 'risk_above_threshold') {
            let message = 'Le score de ce risque dépasse le seuil d\'acceptation.';
            if (error.error && error.error.message) {
              message = error.error.message;
            }
            return throwError(() => new Error(message));
          }
          
          // Pour les autres erreurs, on utilise le message générique
          const message = this.getErrorMessage(error) || 'Impossible de créer le risque. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Met à jour un risque existant
   * @param id Identifiant du risque
   * @param risk Nouvelles données du risque
   * @returns Observable contenant le risque mis à jour
   */
  updateRisk(id: string, risk: Partial<Risk>): Observable<Risk> {
    // Adapter le format pour le backend
    const riskRequest = this.formatRiskRequest(risk);
    
    return this.apiService.put<any>(`${this.basePath}/${id}`, riskRequest)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du risque ${id}`, error);
          const message = this.getErrorMessage(error) || 'Impossible de mettre à jour le risque. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Met à jour uniquement les contrôles associés à un risque
   * @param id Identifiant du risque
   * @param controlIds IDs des contrôles à associer
   * @returns Observable contenant le risque mis à jour
   */
  updateRiskControls(id: string, controlIds: number[]): Observable<Risk> {
    // Convertir tous les IDs en nombre pour assurer la compatibilité avec le backend
    const numericControlIds = controlIds.map(id => typeof id === 'string' ? +id : id);
    
    // Utiliser le service ApiService qui gère l'authentification et les headers correctement
    return this.apiService.put<any>(`${this.basePath}/${id}/controls`, numericControlIds)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour des contrôles du risque ${id}`, error);
          const message = this.getErrorMessage(error) || 'Impossible de mettre à jour les contrôles associés au risque. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Supprime un risque
   * @param id Identifiant du risque à supprimer
   * @returns Observable
   */
  deleteRisk(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression du risque ${id}`, error);
          return throwError(() => new Error('Impossible de supprimer le risque. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère les risques par catégorie
   * @param categoryId Identifiant de la catégorie
   * @returns Observable contenant un tableau de risques
   */
  getRisksByCategory(categoryId: string): Observable<Risk[]> {
    return this.apiService.get<Risk[]>(`${this.basePath}/category/${categoryId}`)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération des risques de la catégorie ${categoryId}`, error);
          return throwError(() => new Error('Impossible de récupérer les risques de cette catégorie. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère un risque par son identifiant DID
   * @param did Identifiant DID du risque
   * @returns Observable contenant le risque
   */
  getRiskByDid(did: string): Observable<Risk> {
    return this.apiService.get<any>(`${this.basePath}/did/${did}`)
      .pipe(
        map(riskData => this.mapRiskResponse(riskData)),
        catchError(error => {
          console.error(`Erreur lors de la récupération du risque avec DID ${did}`, error);
          return throwError(() => new Error('Impossible de récupérer le risque avec cet identifiant DID. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Vérifie si un identifiant DID existe
   * @param did Identifiant DID à vérifier
   * @returns Observable contenant un booléen
   */
  checkDidExists(did: string): Observable<boolean> {
    return this.apiService.get<any>(`${this.basePath}/did/${did}/exists`)
      .pipe(
        map(response => response.exists),
        catchError(error => {
          console.error(`Erreur lors de la vérification du DID ${did}`, error);
          return throwError(() => new Error('Impossible de vérifier l\'existence de cet identifiant DID.'));
        })
      );
  }

  /**
   * Attribue des identifiants DID aux risques qui n'en ont pas encore
   * @returns Observable contenant le nombre de risques mis à jour
   */
  assignMissingDids(): Observable<number> {
    return this.apiService.post<any>(`${this.basePath}/did/assign-missing`, {})
      .pipe(
        map(response => response.updatedCount),
        catchError(error => {
          console.error('Erreur lors de l\'attribution des identifiants DID', error);
          return throwError(() => new Error('Impossible d\'attribuer les identifiants DID manquants. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Récupère les risques avec un score élevé
   * @returns Observable contenant un tableau de risques
   */
  getHighScoreRisks(): Observable<Risk[]> {
    return this.apiService.get<Risk[]>(`${this.basePath}/high-score`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des risques à score élevé', error);
          return throwError(() => new Error('Impossible de récupérer les risques à score élevé. Veuillez réessayer.'));
        })
      );
  }
  
  /**
   * Formate les données du risque pour correspondre au format attendu par le backend
   * @param risk Données du risque
   * @returns Objet formaté pour le backend
   */
  private formatRiskRequest(risk: Partial<Risk>): any {
    // Utiliser categoryId si disponible, sinon prendre de category.id
    const categoryId = risk.categoryId || risk.category?.id;
    
    return {
      name: risk.name,
      description: risk.description,
      categoryId: categoryId,  // Utilise directement categoryId pour le backend
      riskOwnerId: risk.riskOwnerId,  // Ajouter le Risk Owner ID
      impactLevel: risk.impactLevel,
      probabilityLevel: risk.probabilityLevel,
      status: risk.status,
      mitigationPlan: risk.mitigationPlan
    };
  }
  
  /**
   * Extrait un message d'erreur lisible de la réponse HTTP
   * @param error Erreur HTTP
   * @returns Message d'erreur lisible
   */
  private getErrorMessage(error: any): string {
    console.log('Analyse de l\'erreur:', error);
    
    // Gestion spécifique de l'erreur de doublon (409)
    if (error.status === 409) {
      if (error.error && error.error.message) {
        return error.error.message;
      }
      if (error.error && error.error.error === 'duplicate_risk') {
        return 'Un risque avec ce titre et cette catégorie existe déjà.';
      }
      return 'Un risque similaire existe déjà.';
    }
    
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

  /**
   * Mappe la réponse du backend vers le modèle frontend
   * @param riskData Données du risque provenant du backend
   * @returns Objet Risk pour le frontend
   */
  private mapRiskResponse(riskData: any): Risk {
    console.log('Mapping risk response:', riskData);
    
    // Création d'un objet category à partir de categoryId et categoryName
    // pour la rétrocompatibilité
    const categoryObject = riskData.categoryId ? {
      id: riskData.categoryId.toString(),
      name: riskData.categoryName || 'Sans catégorie'
    } : undefined;
    
    // Utiliser directement les objets controls complets fournis par le backend s'ils existent
    let controls: Control[] = [];
    
    // Priorité aux contrôles complets fournis par le backend
    if (riskData.controls && Array.isArray(riskData.controls)) {
      controls = riskData.controls.map((ctrl: any) => ({
        id: ctrl.id?.toString(),
        name: ctrl.name || `Contrôle ${ctrl.id}`,
        description: ctrl.description,
        type: ctrl.type || 'UNKNOWN',
        status: ctrl.status || 'UNKNOWN',
        frequency: ctrl.frequency
      }));
      console.log('Mapped controls from complete objects:', controls);
    } 
    // Utiliser les controlIds uniquement si les contrôles complets ne sont pas disponibles
    else if (riskData.controlIds && Array.isArray(riskData.controlIds)) {
      controls = riskData.controlIds.map((id: number | string) => ({
        id: id.toString(),
        name: `Contrôle ${id}`,
        type: 'UNKNOWN',
        status: 'UNKNOWN'
      }));
      console.log('Mapped controls from IDs:', controls);
    }
    
    // Mapper le score du backend vers le frontend
    return {
      // Propriétés de base
      ...riskData,
      // Conversion de l'ID numérique en string si nécessaire
      id: riskData.id?.toString(),
      
      // Inclure l'identifiant DID
      did: riskData.did,
      
      // Pour la rétrocompatibilité avec l'interface actuelle
      category: categoryObject,
      
      // Ajouter les contrôles mappés
      controls: controls,
      
      // Utiliser riskScore du backend comme score dans le frontend
      score: riskData.riskScore || 0,
      
      // Gérer les informations du Risk Owner
      riskOwnerId: riskData.riskOwnerId,
      riskOwner: riskData.riskOwnerId ? {
        id: riskData.riskOwnerId,
        firstName: riskData.riskOwnerName ? riskData.riskOwnerName.split(' ')[0] : '',
        lastName: riskData.riskOwnerName ? riskData.riskOwnerName.split(' ').slice(1).join(' ') : '',
        email: riskData.riskOwnerEmail || '',
        username: riskData.riskOwnerId
      } : undefined,
      
      // S'assurer que les dates sont correctement converties
      createdAt: riskData.createdAt ? new Date(riskData.createdAt) : new Date(),
      updatedAt: riskData.updatedAt ? new Date(riskData.updatedAt) : new Date()
    } as Risk;
  }

  /**
   * Crée plusieurs risques en une seule opération
   * @param risks Tableau d'objets risques à créer
   * @returns Observable contenant les risques créés
   */
  bulkCreate(risks: any[]): Observable<any[]> {
    // Transformer les données pour correspondre au format attendu par le backend
    const riskRequests = risks.map(risk => {
      // Préparer la requête avec le format attendu par le backend
      return {
        name: risk.name,
        description: risk.description,
        categoryName: risk.categoryName, // Utilisé pour rechercher la catégorie par nom
        impactLevel: risk.impactLevel,
        probabilityLevel: risk.probabilityLevel,
        mitigationPlan: risk.mitigationPlan
      };
    });
    
    // Appel au backend pour création massive
    return this.apiService.post<any[]>(`${this.basePath}/bulk`, riskRequests)
      .pipe(
        map(responseData => responseData.map(risk => this.mapRiskResponse(risk))),
        catchError(error => {
          console.error('Erreur lors de la création massive de risques', error);
          const message = this.getErrorMessage(error) || 'Impossible de créer les risques. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }
  
  /**
   * Importe des risques à partir d'un fichier CSV
   * @param file Fichier CSV à importer
   * @returns Observable contenant le résultat de l'import
   */
  importRisksFromFile(file: File): Observable<ImportResult> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Utiliser la méthode spécialisée pour les FormData
    return this.apiService.postFormData<ImportResult>(`${this.basePath}/bulk`, formData)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de l\'import du fichier CSV', error);
          const message = this.getErrorMessage(error) || 'Impossible d\'importer le fichier CSV. Veuillez réessayer.';
          return throwError(() => new Error(message));
        })
      );
  }
} 