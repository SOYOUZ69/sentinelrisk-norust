import { Asset } from './asset.model';
import { SnmpScanConfig } from './scan-config.model';

export interface SnmpScanResult {
  id?: number;
  config: SnmpScanConfig;
  asset: Asset;
  timestamp: Date;
  retrievedValues: { [key: string]: any };
  overallScore: number;
  status: ScanStatus;
  errorMessage?: string;
  executionTimeMs: number;
  createdAt?: Date;
}

export enum ScanStatus {
  SUCCESS = 'SUCCESS',
  PARTIAL_SUCCESS = 'PARTIAL_SUCCESS',
  FAILURE = 'FAILURE',
  TIMEOUT = 'TIMEOUT',
  CONNECTION_ERROR = 'CONNECTION_ERROR'
}

export interface ScanResultSummary {
  totalScans: number;
  successfulScans: number;
  failedScans: number;
  successRate: number;
  averageExecutionTime: number;
}

export interface ScanResultFilter {
  assetId?: number;
  configId?: number;
  status?: ScanStatus;
  startDate?: Date;
  endDate?: Date;
} 