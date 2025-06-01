import { Asset } from './asset.model';

export interface SnmpScanConfig {
  id?: number;
  name: string;
  asset: Asset;
  assetId?: number;
  cronExpression?: string;
  intervalMinutes?: number;
  oids: string[];
  severityThresholds: SeverityThreshold[];
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SeverityThreshold {
  oid: string;
  operator: ThresholdOperator;
  value: number;
  severity: SeverityLevel;
}

export enum ThresholdOperator {
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS'
}

export enum SeverityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface ScanConfigCreateRequest {
  name: string;
  assetId: number;
  cronExpression?: string;
  intervalMinutes?: number;
  oids: string[];
  severityThresholds: SeverityThreshold[];
  active?: boolean;
} 