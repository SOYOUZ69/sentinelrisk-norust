import { User } from './user.model';

/**
 * Enum pour les statuts possibles d'un plan de remédiation
 */
export enum RemediationPlanStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

/**
 * Interface pour un plan de remédiation
 */
export interface RemediationPlan {
  id?: string;
  mappingId: number; // Important: doit être un number pour correspondre au Long du backend
  mappingSummary?: string;
  title: string;
  description?: string;
  ownerId?: string;
  ownerName?: string;
  dueDate?: Date;
  status: RemediationPlanStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * DTO pour la création ou la mise à jour d'un plan de remédiation
 */
export interface RemediationPlanDTO {
  id?: string;
  mappingId: number; // Important: doit être un number pour correspondre au Long du backend
  title: string; 
  description?: string;
  ownerId?: string;
  dueDate?: string; // Format ISO pour les dates
  status: RemediationPlanStatus;
} 