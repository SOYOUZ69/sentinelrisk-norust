import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SnmpAsset, SnmpScanConfig, SnmpScanResult, SnmpScanHistory } from '../models/snmp.model';

@Injectable({
  providedIn: 'root'
})
export class SnmpService {
  private modeDemo = false; // Flag pour basculer entre mode démo et réel

  constructor(private http: HttpClient) {}

  // Getters et setters pour le mode démo
  get isDemoMode(): boolean {
    return this.modeDemo;
  }

  set isDemoMode(value: boolean) {
    this.modeDemo = value;
  }

  // Méthodes pour les assets SNMP
  getAssets(): Observable<SnmpAsset[]> {
    if (this.modeDemo) {
      return this.getAssetsDemo();
    }
    return this.http.get<SnmpAsset[]>('/api/snmp/assets');
  }

  // Méthodes pour les configurations de scan
  getConfigs(): Observable<SnmpScanConfig[]> {
    if (this.modeDemo) {
      return this.getConfigsDemo();
    }
    return this.http.get<SnmpScanConfig[]>('/api/snmp/configs');
  }

  createConfig(config: SnmpScanConfig): Observable<SnmpScanConfig> {
    if (this.modeDemo) {
      return of({ ...config, id: Math.floor(Math.random() * 1000) });
    }
    return this.http.post<SnmpScanConfig>('/api/snmp/configs', config);
  }

  updateConfig(id: number, config: SnmpScanConfig): Observable<SnmpScanConfig> {
    if (this.modeDemo) {
      return of(config);
    }
    return this.http.put<SnmpScanConfig>(`/api/snmp/configs/${id}`, config);
  }

  deleteConfig(id: number): Observable<void> {
    if (this.modeDemo) {
      return of(void 0);
    }
    return this.http.delete<void>(`/api/snmp/configs/${id}`);
  }

  // Méthodes pour les scans
  runScan(configId: number, hostId: string): Observable<SnmpScanResult> {
    if (this.modeDemo) {
      return this.runScanDemo(configId, hostId);
    }
    return this.http.post<SnmpScanResult>(`/api/snmp/configs/${configId}/run?hostId=${hostId}`, {});
  }

  // Méthodes pour l'historique
  getHistory(hostId: string, start?: number, end?: number): Observable<SnmpScanHistory[]> {
    if (this.modeDemo) {
      return this.getHistoryDemo(hostId);
    }
    let url = `/api/snmp/history/${hostId}`;
    if (start && end) {
      url += `?start=${start}&end=${end}`;
    }
    return this.http.get<SnmpScanHistory[]>(url);
  }

  // Méthodes de démo
  private getAssetsDemo(): Observable<SnmpAsset[]> {
    return of([
      { hostid: '1', host: 'demo-host-1', ip: '192.168.1.1', version: 'SNMPv2', status: 'active' },
      { hostid: '2', host: 'demo-host-2', ip: '192.168.1.2', version: 'SNMPv3', status: 'inactive' }
    ]);
  }

  private getConfigsDemo(): Observable<SnmpScanConfig[]> {
    return of([
      { id: 1, name: 'CPU Usage', oid: '1.3.6.1.4.1.2021.11.9.0', interval: 60, status: 'active' },
      { id: 2, name: 'Memory Usage', oid: '1.3.6.1.4.1.2021.4.6.0', interval: 300, status: 'active' }
    ]);
  }

  private runScanDemo(configId: number, hostId: string): Observable<SnmpScanResult> {
    return of({
      id: Math.floor(Math.random() * 1000),
      configId,
      hostId,
      timestamp: new Date().toISOString(),
      value: Math.random() * 100,
      status: 'success'
    });
  }

  private getHistoryDemo(hostId: string): Observable<SnmpScanHistory[]> {
    const history: SnmpScanHistory[] = [];
    for (let i = 0; i < 10; i++) {
      history.push({
        id: i,
        hostId,
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        value: Math.random() * 100,
        status: 'success'
      });
    }
    return of(history);
  }
} 