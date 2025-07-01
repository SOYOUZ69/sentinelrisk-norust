import { RiskStatus } from './risk.model';

export interface RiskStatusHistory {
  id: number;
  riskId: number;
  riskName: string;
  previousStatus: RiskStatus | null;
  newStatus: RiskStatus;
  changedByUserId: string;
  changedByUserName: string;
  changeReason: string;
  changeDate: string;
} 