import { Risk } from './risk.model';
import { User } from './user.model';

export enum AssessmentStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Assessment {
  id?: number;
  risk: Risk;
  assignedUser?: User;
  status: AssessmentStatus;
  assessmentDate?: Date;
  conclusions?: string;
  recommendations?: string;
  nextReviewDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
} 