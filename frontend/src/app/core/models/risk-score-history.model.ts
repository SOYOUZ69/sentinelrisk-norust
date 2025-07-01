export interface RiskScoreHistory {
  id: number;
  riskId: number;
  riskName: string;
  assessmentId?: number;
  assessmentTitle?: string;
  oldScore?: number;
  newScore?: number;
  changedByUserId?: string;
  changedByUserName?: string;
  changedAt: string;
} 