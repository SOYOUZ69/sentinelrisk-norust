export interface RiskImpactHistory {
  id: number;
  riskId: number;
  planId: number;
  planTitle?: string;
  oldImpactLevel?: string;
  newImpactLevel: string;
  planEfficacite?: number;
  planStatus?: string;
  changedByUserId?: string;
  changedByUserName?: string;
  changedAt: string;
  changeReason?: string;
} 