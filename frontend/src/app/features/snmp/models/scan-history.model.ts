/**
 * Modèles pour l'historique des scans SNMP manuels
 */

export interface SnmpScanHistoryDto {
  id: number;
  targetIp: string;
  targetPort: number;
  target: string;
  community: string;
  snmpVersion: string;
  success: boolean;
  errorMessage?: string;
  durationMs: number;
  timeoutMs: number;
  retries: number;
  oidsCount: number;
  successfulOidsCount: number;
  successRate: number;
  createdAt: string;
  results?: SnmpScanHistoryResultDto[];
}

export interface SnmpScanHistoryResultDto {
  id: number;
  oid: string;
  value: string;
  snmpType: string;
  success: boolean;
  errorMessage?: string;
  oidName?: string;
  oidDescription?: string;
  oidCategory?: string;
  formattedValue?: string;
  interpretation?: string;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'ERROR';
}

export interface ScanStatistics {
  totalScans: number;
  successfulScans: number;
  failedScans: number;
  averageDurationMs: number;
  scansLast24h: number;
  successfulLast24h: number;
  successRate: number;
  successRateLast24h: number;
}

export interface ScanHistoryFilter {
  page?: number;
  size?: number;
  targetIp?: string;
  searchTerm?: string;
  successOnly?: boolean;
  hoursBack?: number;
}

// Constantes pour l'interface
export const SCAN_STATUS_COLORS = {
  NORMAL: '#4CAF50',    // Vert
  WARNING: '#FF9800',   // Orange
  CRITICAL: '#F44336',  // Rouge
  ERROR: '#9E9E9E'      // Gris
} as const;

export const SCAN_STATUS_ICONS = {
  NORMAL: 'check_circle',
  WARNING: 'warning',
  CRITICAL: 'error',
  ERROR: 'cancel'
} as const;

export const SNMP_VERSION_LABELS = {
  '1': 'SNMP v1',
  '2c': 'SNMP v2c', 
  '3': 'SNMP v3'
} as const;

// Types utilitaires
export type ScanResultStatus = keyof typeof SCAN_STATUS_COLORS;
export type SnmpVersionKey = keyof typeof SNMP_VERSION_LABELS; 