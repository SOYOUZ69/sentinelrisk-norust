export enum ControlType {
  PREVENTIVE = 'PREVENTIVE',
  DETECTIVE = 'DETECTIVE',
  CORRECTIVE = 'CORRECTIVE',
  COMPENSATING = 'COMPENSATING'
}

export enum ControlFrequency {
  CONTINUOUS = 'CONTINUOUS',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUALLY = 'ANNUALLY',
  AD_HOC = 'AD_HOC'
}

export enum ControlStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  IMPLEMENTED = 'IMPLEMENTED',
  VERIFIED = 'VERIFIED',
  INEFFECTIVE = 'INEFFECTIVE',
  OBSOLETE = 'OBSOLETE'
}

export interface Control {
  id: string;
  name: string;
  description: string;
  type: ControlType;
  frequency: ControlFrequency;
  status: ControlStatus;
  implementationDetails?: string;
  riskIds?: string[];
  createdAt: Date;
  updatedAt: Date;
} 