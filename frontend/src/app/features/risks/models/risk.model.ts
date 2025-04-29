import { Category } from '../../categories/models/category.model';
import { Control } from '../../controls/models/control.model';

export enum ImpactLevel {
  NEGLIGIBLE = 'NEGLIGIBLE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  SEVERE = 'SEVERE'
}

export enum ProbabilityLevel {
  RARE = 'RARE',
  UNLIKELY = 'UNLIKELY',
  POSSIBLE = 'POSSIBLE',
  LIKELY = 'LIKELY',
  ALMOST_CERTAIN = 'ALMOST_CERTAIN'
}

export enum RiskStatus {
  IDENTIFIED = 'IDENTIFIED',
  IN_ASSESSMENT = 'IN_ASSESSMENT',
  MITIGATED = 'MITIGATED',
  ACCEPTED = 'ACCEPTED',
  CLOSED = 'CLOSED'
}

export interface Risk {
  id: string;
  name: string;
  description: string;
  category: Category;
  impactLevel: ImpactLevel;
  probabilityLevel: ProbabilityLevel;
  score: number;
  status: RiskStatus;
  mitigationPlan?: string;
  controls?: Control[];
  createdAt: Date;
  updatedAt: Date;
} 