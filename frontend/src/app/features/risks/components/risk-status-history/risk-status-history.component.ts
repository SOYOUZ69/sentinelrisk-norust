import { Component, Input, OnInit } from '@angular/core';
import { RiskStatusService, RiskStatusHistory } from '../../../../core/services/risk-status.service';

@Component({
  selector: 'app-risk-status-history',
  templateUrl: './risk-status-history.component.html',
  styleUrls: ['./risk-status-history.component.scss']
})
export class RiskStatusHistoryComponent implements OnInit {

  @Input() riskId!: number;
  
  statusHistory: RiskStatusHistory[] = [];
  loading = false;
  error: string | null = null;

  constructor(private riskStatusService: RiskStatusService) { }

  ngOnInit(): void {
    this.loadStatusHistory();
  }

  loadStatusHistory(): void {
    this.loading = true;
    this.error = null;

    this.riskStatusService.getStatusHistory(this.riskId).subscribe({
      next: (history) => {
        this.statusHistory = history;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement de l\'historique des statuts';
        this.loading = false;
        console.error('Erreur lors du chargement de l\'historique:', error);
      }
    });
  }

  getStatusLabel(status: string): string {
    return this.riskStatusService.getStatusLabel(status);
  }

  getStatusBadgeClass(status: string): string {
    return this.riskStatusService.getStatusBadgeClass(status);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
} 