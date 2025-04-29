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
  ON_DEMAND = 'ON_DEMAND'
}

export enum ControlStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  IMPLEMENTED = 'IMPLEMENTED',
  VERIFIED = 'VERIFIED',
  INEFFECTIVE = 'INEFFECTIVE',
  RETIRED = 'RETIRED'
}

export interface Control {
  id?: number;
  name: string;
  description: string;
  type: ControlType;
  frequency: ControlFrequency;
  status: ControlStatus;
  implementationDetails?: string;
  riskIds?: number[];
  createdAt?: Date;
  updatedAt?: Date;
} 