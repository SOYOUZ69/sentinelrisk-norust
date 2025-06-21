import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SnmpAsset, SnmpScanConfig, SnmpScanResult, SnmpScanHistory } from '../models/snmp.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnmpService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Méthodes pour les assets SNMP - utilise notre API CRUD locale
  getAssets(): Observable<SnmpAsset[]> {
    return this.http.get<SnmpAsset[]>(`${this.apiUrl}/snmp/local/assets`);
  }

  // Récupérer un asset par ID
  getAssetById(id: number): Observable<SnmpAsset> {
    return this.http.get<SnmpAsset>(`${this.apiUrl}/snmp/local/assets/${id}`);
  }

  // Créer un nouvel asset
  createAsset(asset: SnmpAssetRequest): Observable<SnmpAsset> {
    return this.http.post<SnmpAsset>(`${this.apiUrl}/snmp/local/assets`, asset);
  }

  // Modifier un asset existant
  updateAsset(id: number, asset: SnmpAssetRequest): Observable<SnmpAsset> {
    return this.http.put<SnmpAsset>(`${this.apiUrl}/snmp/local/assets/${id}`, asset);
  }

  // Supprimer un asset
  deleteAsset(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/snmp/local/assets/${id}`);
  }

  // Récupérer les assets par statut
  getAssetsByStatus(status: string): Observable<SnmpAsset[]> {
    return this.http.get<SnmpAsset[]>(`${this.apiUrl}/snmp/local/assets/status/${status}`);
  }

  // Méthodes pour les configurations de scan
  getConfigs(): Observable<SnmpScanConfig[]> {
    return this.http.get<SnmpScanConfig[]>(`${this.apiUrl}/snmp/configs`);
  }

  createConfig(config: SnmpScanConfig): Observable<SnmpScanConfig> {
    return this.http.post<SnmpScanConfig>(`${this.apiUrl}/snmp/configs`, config);
  }

  updateConfig(id: number, config: SnmpScanConfig): Observable<SnmpScanConfig> {
    return this.http.put<SnmpScanConfig>(`${this.apiUrl}/snmp/configs/${id}`, config);
  }

  deleteConfig(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/snmp/configs/${id}`);
  }

  // Méthodes pour les scans
  runScan(configId: number, hostId: string): Observable<SnmpScanResult> {
    return this.http.post<SnmpScanResult>(`${this.apiUrl}/snmp/configs/${configId}/run?hostId=${hostId}`, {});
  }

  // Méthodes pour l'historique
  getHistory(hostId: string, start?: number, end?: number): Observable<SnmpScanHistory[]> {
    let url = `${this.apiUrl}/snmp/history/${hostId}`;
    if (start && end) {
      url += `?start=${start}&end=${end}`;
    }
    return this.http.get<SnmpScanHistory[]>(url);
  }

  // Méthodes pour la synchronisation Zabbix
  checkSyncStatus(assetId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/snmp/zabbix/sync-status/${assetId}`);
  }

  syncAssetWithZabbix(assetId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/snmp/zabbix/sync/${assetId}`, {});
  }

  syncAllAssets(): Observable<any> {
    return this.http.post(`${this.apiUrl}/snmp/zabbix/sync-all`, {});
  }
}

// Interface pour les requêtes de création/modification d'assets
export interface SnmpAssetRequest {
  name: string;
  ipAddress: string;
  snmpPort: number;
  snmpCommunity: string;
  snmpVersion?: string;
  description?: string;
  location?: string;
  deviceType?: string;
  status?: string;
  snmpProperties?: { [key: string]: string };
} 