import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RiskStatusService } from '../../../../core/services/risk-status.service';

@Component({
  selector: 'app-risk-status-actions',
  templateUrl: './risk-status-actions.component.html',
  styleUrls: ['./risk-status-actions.component.scss']
})
export class RiskStatusActionsComponent {

  @Input() riskId!: number;
  @Input() currentStatus!: string;
  @Output() statusChanged = new EventEmitter<void>();

  loading = false;
  error: string | null = null;

  constructor(private riskStatusService: RiskStatusService) { }

  get availableActions(): string[] {
    return this.riskStatusService.getAvailableActions(this.currentStatus);
  }

  getActionLabel(action: string): string {
    return this.riskStatusService.getActionLabel(action);
  }

  getStatusLabel(status: string): string {
    return this.riskStatusService.getStatusLabel(status);
  }

  getStatusBadgeClass(status: string): string {
    return this.riskStatusService.getStatusBadgeClass(status);
  }

  async executeAction(action: string): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      let result;
      
      switch (action) {
        case 'trigger-assessment':
          result = await this.riskStatusService.triggerAssessment(this.riskId).toPromise();
          break;
        case 'mark-assessed':
          result = await this.riskStatusService.markAsAssessed(this.riskId).toPromise();
          break;
        case 'mark-accepted':
          result = await this.riskStatusService.markAsAccepted(this.riskId).toPromise();
          break;
        case 'close':
          result = await this.riskStatusService.closeRisk(this.riskId).toPromise();
          break;
        default:
          throw new Error(`Action non reconnue: ${action}`);
      }

      this.statusChanged.emit();
      this.loading = false;
    } catch (error) {
      this.error = `Erreur lors de l'exécution de l'action: ${error}`;
      this.loading = false;
      console.error('Erreur lors de l\'exécution de l\'action:', error);
    }
  }

  getActionIcon(action: string): string {
    switch (action) {
      case 'trigger-assessment':
        return 'fas fa-play';
      case 'mark-assessed':
        return 'fas fa-check-circle';
      case 'mark-accepted':
        return 'fas fa-thumbs-up';
      case 'close':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-cog';
    }
  }

  getActionButtonClass(action: string): string {
    switch (action) {
      case 'trigger-assessment':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'mark-assessed':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'mark-accepted':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'close':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  }
} 