export interface ControlEffectivenessHistory {
  id: number;
  controlId: number;
  controlName: string;
  riskId: number;
  riskName: string;
  oldScore?: number;
  newScore?: number;
  oldProbabilityLevel?: string;
  newProbabilityLevel?: string;
  oldImpactLevel?: string;
  newImpactLevel?: string;
  controlType: string;
  changedByUserId?: string;
  changedByUserName?: string;
  changedAt: string;
} 