export enum RiskStatus {
  IDENTIFIED = 'IDENTIFIED',
  IN_ASSESSMENT = 'IN_ASSESSMENT',
  MITIGATED = 'MITIGATED',
  ACCEPTED = 'ACCEPTED',
  CLOSED = 'CLOSED'
}

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

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Control {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: string;
  frequency?: string;
}

export interface Risk {
  id: string;
  name: string;
  description: string;
  
  // Nouveaux champs remplaçant category
  categoryId: string;
  categoryName: string;
  
  // Pour la rétrocompatibilité, on ajoute une propriété calculée
  category?: {
    id: string;
    name: string;
  };
  
  impactLevel: ImpactLevel;
  probabilityLevel: ProbabilityLevel;
  score: number;
  status: RiskStatus;
  mitigationPlan?: string;
  controls?: Control[];
  controlIds?: string[];
  createdAt: Date;
  updatedAt: Date;
} 