import { User } from '../../../core/models/user.model';
import { Risk } from '../../risks/models/risk.model';

export enum AssessmentStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Assessment {
  id: string;
  risk: Risk;
  status: AssessmentStatus;
  assessmentDate: Date;
  conclusions?: string;
  recommendations?: string;
  nextReviewDate?: Date;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
} 