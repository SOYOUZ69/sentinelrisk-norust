export enum ComplianceRequirementType {
  PREVENTIVE = 'PREVENTIVE',
  DETECTIVE = 'DETECTIVE',
  CORRECTIVE = 'CORRECTIVE'
}

export enum ComplianceStatus {
  COMPLIANT = 'COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  PARTIALLY_COMPLIANT = 'PARTIALLY_COMPLIANT',
  NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  description?: string;
  requirements?: ComplianceRequirement[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ComplianceRequirement {
  id: string;
  framework: ComplianceFramework;
  frameworkId?: string;
  code: string;
  description: string;
  type: ComplianceRequirementType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RiskComplianceMapping {
  id: string;
  requirement: ComplianceRequirement;
  requirementId: string;
  risk: any; // Risk type from risk module
  riskId: string;
  status: ComplianceStatus;
  comment?: string;
  evidence?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GapAnalysisItem {
  requirement: ComplianceRequirement;
  status: ComplianceStatus;
  gaps?: string;
  actionPlanExists?: boolean;
}

export interface GapAnalysisStats {
  compliantCount: number;
  nonCompliantCount: number;
  partiallyCompliantCount: number;
  notApplicableCount: number;
  compliancePercentage: number;
}

export interface GapAnalysisResult {
  // Comptage par statut de conformité
  counts: Record<ComplianceStatus, number>;
  // Liste des exigences non mappées
  gaps: ComplianceRequirement[];
  // Pourcentage global de conformité
  compliancePercentage: number;
} 