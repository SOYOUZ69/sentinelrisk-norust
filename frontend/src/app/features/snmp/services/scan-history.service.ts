import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { 
  SnmpScanHistoryDto, 
  ScanStatistics, 
  ScanHistoryFilter 
} from '../models/scan-history.model';

/**
 * Service pour la gestion de l'historique des scans SNMP
 */
@Injectable({
  providedIn: 'root'
})
export class ScanHistoryService {
  private readonly baseUrl = `${environment.apiUrl}/snmp/history`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les scans avec pagination
   */
  getAllScans(page: number = 0, size: number = 20): Observable<{
    content: SnmpScanHistoryDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    console.log('📋 Récupération de l\'historique des scans - page:', page, 'taille:', size);
    
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  /**
   * Récupère les détails complets d'un scan spécifique
   */
  getScanDetails(scanId: number): Observable<SnmpScanHistoryDto> {
    console.log('🔍 Récupération des détails du scan ID:', scanId);
    return this.http.get<SnmpScanHistoryDto>(`${this.baseUrl}/${scanId}`);
  }

  /**
   * Récupère tous les scans pour une IP spécifique
   */
  getScansByIp(ip: string): Observable<SnmpScanHistoryDto[]> {
    console.log('🔍 Récupération des scans pour IP:', ip);
    return this.http.get<SnmpScanHistoryDto[]>(`${this.baseUrl}/by-ip/${ip}`);
  }

  /**
   * Recherche dans l'historique
   */
  searchScans(searchTerm: string): Observable<SnmpScanHistoryDto[]> {
    console.log('🔍 Recherche dans l\'historique:', searchTerm);
    
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<SnmpScanHistoryDto[]>(`${this.baseUrl}/search`, { params });
  }

  /**
   * Récupère les scans récents
   */
  getRecentScans(hours: number = 24): Observable<SnmpScanHistoryDto[]> {
    console.log('📅 Récupération des scans récents - dernières', hours, 'heures');
    
    const params = new HttpParams().set('hours', hours.toString());
    return this.http.get<SnmpScanHistoryDto[]>(`${this.baseUrl}/recent`, { params });
  }

  /**
   * Récupère les statistiques globales
   */
  getStatistics(): Observable<ScanStatistics> {
    console.log('📊 Récupération des statistiques globales');
    return this.http.get<ScanStatistics>(`${this.baseUrl}/statistics`);
  }

  /**
   * Supprime un scan de l'historique
   */
  deleteScan(scanId: number): Observable<void> {
    console.log('🗑️ Suppression du scan ID:', scanId);
    return this.http.delete<void>(`${this.baseUrl}/${scanId}`);
  }

  /**
   * Nettoyage automatique des anciens scans
   */
  cleanupOldScans(daysToKeep: number = 30): Observable<void> {
    console.log('🧹 Nettoyage des scans antérieurs à', daysToKeep, 'jours');
    
    const params = new HttpParams().set('daysToKeep', daysToKeep.toString());
    return this.http.post<void>(`${this.baseUrl}/cleanup`, null, { params });
  }

  /**
   * Récupère les scans avec filtres avancés
   */
  getScansWithFilter(filter: ScanHistoryFilter): Observable<SnmpScanHistoryDto[]> {
    console.log('🔍 Récupération des scans avec filtres:', filter);
    
    let params = new HttpParams();
    
    if (filter.targetIp) {
      return this.getScansByIp(filter.targetIp);
    }
    
    if (filter.searchTerm) {
      return this.searchScans(filter.searchTerm);
    }
    
    if (filter.hoursBack) {
      return this.getRecentScans(filter.hoursBack);
    }
    
    // Par défaut, récupérer tous les scans avec pagination
    return this.getAllScans(filter.page || 0, filter.size || 20)
      .pipe(
        // Extraire seulement le contenu de la réponse paginée
        map((response: any) => response.content)
      );
  }

  // === MÉTHODES UTILITAIRES ===

  /**
   * Formate la durée en millisecondes en texte lisible
   */
  formatDuration(durationMs: number): string {
    if (durationMs < 1000) {
      return `${durationMs}ms`;
    } else if (durationMs < 60000) {
      return `${(durationMs / 1000).toFixed(1)}s`;
    } else {
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);
      return `${minutes}min ${seconds}s`;
    }
  }

  /**
   * Formate la date de création
   */
  formatCreatedAt(createdAt: string): string {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // Si c'est aujourd'hui
    if (diffMs < 24 * 60 * 60 * 1000) {
      if (diffMs < 60 * 60 * 1000) {
        const minutes = Math.floor(diffMs / (60 * 1000));
        return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
      } else {
        const hours = Math.floor(diffMs / (60 * 60 * 1000));
        return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
      }
    }
    
    // Sinon format complet
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Calcule la couleur de statut pour un scan
   */
  getScanStatusColor(scan: SnmpScanHistoryDto): string {
    if (!scan.success) return '#F44336'; // Rouge pour échec
    if (scan.successRate < 50) return '#FF9800'; // Orange pour succès partiel
    if (scan.successRate < 100) return '#FFC107'; // Jaune pour succès incomplet  
    return '#4CAF50'; // Vert pour succès complet
  }

  /**
   * Obtient l'icône de statut pour un scan
   */
  getScanStatusIcon(scan: SnmpScanHistoryDto): string {
    if (!scan.success) return 'error';
    if (scan.successRate < 50) return 'warning';
    if (scan.successRate < 100) return 'info';
    return 'check_circle';
  }

  /**
   * Obtient le texte de statut pour un scan
   */
  getScanStatusText(scan: SnmpScanHistoryDto): string {
    if (!scan.success) return 'Échec';
    if (scan.successRate < 50) return 'Succès partiel';
    if (scan.successRate < 100) return 'Succès incomplet';
    return 'Succès';
  }
} 