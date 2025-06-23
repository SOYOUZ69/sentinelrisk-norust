import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { 
  SnmpManualScanRequest, 
  SnmpManualScanResponse, 
  ConnectivityTestRequest, 
  ConnectivityTestResponse 
} from '../models/manual-scan.model';

@Injectable({
  providedIn: 'root'
})
export class ManualScanService {
  private readonly baseUrl = `${environment.apiUrl}/snmp/manual`;

  constructor(private http: HttpClient) {}

  /**
   * Effectue un scan SNMP manuel
   */
  performManualScan(request: SnmpManualScanRequest): Observable<SnmpManualScanResponse> {
    console.log('🔍 Lancement du scan SNMP manuel:', request);
    return this.http.post<SnmpManualScanResponse>(`${this.baseUrl}/scan`, request);
  }

  /**
   * Teste la connectivité SNMP avec un équipement
   */
  testConnectivity(request: ConnectivityTestRequest): Observable<ConnectivityTestResponse> {
    console.log('🔗 Test de connectivité SNMP:', request);
    
    let params = new HttpParams()
      .set('ip', request.ip)
      .set('port', request.port?.toString() || '161')
      .set('community', request.community || 'public')
      .set('version', request.version || '2c');

    return this.http.get<ConnectivityTestResponse>(`${this.baseUrl}/test-connectivity`, { params });
  }

  /**
   * Endpoint de test simple
   */
  testHello(): Observable<string> {
    return this.http.get(`${this.baseUrl}/hello`, { responseType: 'text' });
  }
} 