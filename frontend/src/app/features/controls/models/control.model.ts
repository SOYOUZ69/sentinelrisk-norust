export enum ControlType {
  PREVENTIVE = 'PREVENTIVE',
  DETECTIVE = 'DETECTIVE',
  CORRECTIVE = 'CORRECTIVE',
  DIRECTIVE = 'DIRECTIVE'
}

export enum ControlStatus {
  PLANNED = 'PLANNED',
  IMPLEMENTED = 'IMPLEMENTED',
  TESTED = 'TESTED',
  INEFFECTIVE = 'INEFFECTIVE',
  EFFECTIVE = 'EFFECTIVE',
  DEPRECATED = 'DEPRECATED'
}

export enum ControlFrequency {
  CONTINUOUS = 'CONTINUOUS',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUALLY = 'ANNUALLY',
  ON_DEMAND = 'ON_DEMAND'
}

export interface Control {
  id: string;
  name: string;
  description: string;
  type: ControlType;
  status: ControlStatus;
  frequency?: ControlFrequency;
  owner?: string;
  implementationDate?: Date;
  lastTestedDate?: Date;
  effectivenessScore?: number;
  documentation?: string;
  riskIds?: string[];
  createdAt: Date;
  updatedAt: Date;
} 