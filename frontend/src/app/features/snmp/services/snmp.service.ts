import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Asset, AssetCreateRequest, AssetType } from '../models/asset.model';
import { SnmpScanConfig, ScanConfigCreateRequest } from '../models/scan-config.model';
import { SnmpScanResult, ScanStatus, ScanResultFilter } from '../models/scan-result.model';

@Injectable({
  providedIn: 'root'
})
export class SnmpService {
  private readonly baseUrl = `${environment.apiUrl}/api/snmp`;

  constructor(private http: HttpClient) {}

  // ===== ASSETS =====

  /**
   * Récupère tous les assets
   */
  getAllAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.baseUrl}/assets`);
  }

  /**
   * Récupère un asset par son ID
   */
  getAssetById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.baseUrl}/assets/${id}`);
  }

  /**
   * Récupère les assets actifs
   */
  getActiveAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.baseUrl}/assets/active`);
  }

  /**
   * Récupère les assets par type
   */
  getAssetsByType(type: AssetType): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.baseUrl}/assets/type/${type}`);
  }

  /**
   * Crée un nouvel asset
   */
  createAsset(asset: AssetCreateRequest): Observable<Asset> {
    return this.http.post<Asset>(`${this.baseUrl}/assets`, asset);
  }

  /**
   * Met à jour un asset existant
   */
  updateAsset(id: number, asset: AssetCreateRequest): Observable<Asset> {
    return this.http.put<Asset>(`${this.baseUrl}/assets/${id}`, asset);
  }

  /**
   * Supprime un asset
   */
  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/assets/${id}`);
  }

  /**
   * Active/désactive un asset
   */
  toggleAssetStatus(id: number): Observable<Asset> {
    return this.http.patch<Asset>(`${this.baseUrl}/assets/${id}/toggle-status`, {});
  }

  /**
   * Récupère les statistiques des assets par type
   */
  getAssetStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/assets/statistics/by-type`);
  }

  // ===== CONFIGURATIONS =====

  /**
   * Récupère toutes les configurations
   */
  getAllConfigs(): Observable<SnmpScanConfig[]> {
    return this.http.get<SnmpScanConfig[]>(`${this.baseUrl}/configs`);
  }

  /**
   * Récupère une configuration par son ID
   */
  getConfigById(id: number): Observable<SnmpScanConfig> {
    return this.http.get<SnmpScanConfig>(`${this.baseUrl}/configs/${id}`);
  }

  /**
   * Récupère les configurations actives
   */
  getActiveConfigs(): Observable<SnmpScanConfig[]> {
    return this.http.get<SnmpScanConfig[]>(`${this.baseUrl}/configs/active`);
  }

  /**
   * Récupère les configurations par asset
   */
  getConfigsByAsset(assetId: number): Observable<SnmpScanConfig[]> {
    return this.http.get<SnmpScanConfig[]>(`${this.baseUrl}/configs/asset/${assetId}`);
  }

  /**
   * Crée une nouvelle configuration
   */
  createConfig(config: ScanConfigCreateRequest): Observable<SnmpScanConfig> {
    return this.http.post<SnmpScanConfig>(`${this.baseUrl}/configs`, config);
  }

  /**
   * Met à jour une configuration existante
   */
  updateConfig(id: number, config: ScanConfigCreateRequest): Observable<SnmpScanConfig> {
    return this.http.put<SnmpScanConfig>(`${this.baseUrl}/configs/${id}`, config);
  }

  /**
   * Supprime une configuration
   */
  deleteConfig(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/configs/${id}`);
  }

  /**
   * Lance un scan manuel
   */
  runManualScan(configId: number): Observable<SnmpScanResult> {
    return this.http.post<SnmpScanResult>(`${this.baseUrl}/configs/${configId}/run`, {});
  }

  /**
   * Active/désactive une configuration
   */
  toggleConfigStatus(id: number): Observable<SnmpScanConfig> {
    return this.http.patch<SnmpScanConfig>(`${this.baseUrl}/configs/${id}/toggle-status`, {});
  }

  // ===== RÉSULTATS =====

  /**
   * Récupère tous les résultats avec pagination
   */
  getAllResults(page: number = 0, size: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/results`, { params });
  }

  /**
   * Récupère un résultat par son ID
   */
  getResultById(id: number): Observable<SnmpScanResult> {
    return this.http.get<SnmpScanResult>(`${this.baseUrl}/results/${id}`);
  }

  /**
   * Récupère les résultats par asset
   */
  getResultsByAsset(assetId: number, page: number = 0, size: number = 20): Observable<SnmpScanResult[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<SnmpScanResult[]>(`${this.baseUrl}/results/asset/${assetId}`, { params });
  }

  /**
   * Récupère les résultats par configuration
   */
  getResultsByConfig(configId: number, page: number = 0, size: number = 20): Observable<SnmpScanResult[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<SnmpScanResult[]>(`${this.baseUrl}/results/config/${configId}`, { params });
  }

  /**
   * Récupère les résultats par statut
   */
  getResultsByStatus(status: ScanStatus, page: number = 0, size: number = 20): Observable<SnmpScanResult[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<SnmpScanResult[]>(`${this.baseUrl}/results/status/${status}`, { params });
  }

  /**
   * Récupère le dernier résultat pour un asset
   */
  getLatestResultByAsset(assetId: number): Observable<SnmpScanResult> {
    return this.http.get<SnmpScanResult>(`${this.baseUrl}/results/latest/asset/${assetId}`);
  }

  /**
   * Récupère le dernier résultat pour une configuration
   */
  getLatestResultByConfig(configId: number): Observable<SnmpScanResult> {
    return this.http.get<SnmpScanResult>(`${this.baseUrl}/results/latest/config/${configId}`);
  }

  /**
   * Récupère le taux de succès des scans
   */
  getSuccessRate(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/results/statistics/success-rate`);
  }

  /**
   * Récupère les statistiques par statut
   */
  getResultStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/results/statistics/by-status`);
  }

  /**
   * Test de connexion SNMP
   */
  testConnection(assetData: any): Observable<{success: boolean, error?: string}> {
    return this.http.post<{success: boolean, error?: string}>(`${this.baseUrl}/assets/test-connection`, assetData);
  }
}
