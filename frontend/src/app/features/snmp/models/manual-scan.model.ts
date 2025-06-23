/**
 * Modèles pour l'API SNMP manuelle
 */

export interface SnmpManualScanRequest {
  ip: string;
  port: number;
  community: string;
  version: string;
  oids: string[];
  timeout: number;
  retries: number;
}

export interface SnmpResult {
  oid: string;
  value: string;
  type: string;
  success: boolean;
  error?: string;
}

export interface SnmpManualScanResponse {
  success: boolean;
  ip: string;
  port: number;
  results?: SnmpResult[];
  error?: string;
  timestamp: string;
  duration: number;
}

export interface ConnectivityTestRequest {
  ip: string;
  port?: number;
  community?: string;
  version?: string;
}

export interface ConnectivityTestResponse {
  success: boolean;
  ip: string;
  port: number;
  error?: string;
  timestamp: string;
  duration: number;
}

export const SNMP_VERSIONS = ['1', '2c', '3'] as const;
export type SnmpVersion = typeof SNMP_VERSIONS[number];

export const DEFAULT_OIDS = [
  '1.3.6.1.2.1.1.1.0',  // sysDescr
  '1.3.6.1.2.1.1.3.0',  // sysUpTime
  '1.3.6.1.2.1.1.5.0',  // sysName
  '1.3.6.1.2.1.1.6.0',  // sysLocation
  '1.3.6.1.2.1.1.4.0',  // sysContact
];

export const COMMON_OIDS = [
  { oid: '1.3.6.1.2.1.1.1.0', label: 'System Description', category: 'System' },
  { oid: '1.3.6.1.2.1.1.3.0', label: 'System Uptime', category: 'System' },
  { oid: '1.3.6.1.2.1.1.5.0', label: 'System Name', category: 'System' },
  { oid: '1.3.6.1.2.1.1.6.0', label: 'System Location', category: 'System' },
  { oid: '1.3.6.1.2.1.1.4.0', label: 'System Contact', category: 'System' },
  { oid: '1.3.6.1.2.1.2.1.0', label: 'Interface Number', category: 'Interface' },
  { oid: '1.3.6.1.2.1.25.1.1.0', label: 'Host Resources Uptime', category: 'Host' },
]; 