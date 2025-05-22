import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemediationPlanService } from '../../services/remediation-plan.service';
import { RemediationPlan, RemediationPlanStatus } from '../../../../core/models/remediation-plan.model';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  plan: RemediationPlan | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planService: RemediationPlanService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadPlan();
  }

  loadPlan(): void {
    const planId = this.route.snapshot.paramMap.get('id');
    if (!planId) {
      this.error = 'ID du plan non spécifié';
      this.loading = false;
      return;
    }

    this.planService.getPlan(planId).subscribe({
      next: (plan) => {
        this.plan = plan;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du plan', error);
        this.error = 'Impossible de charger les détails du plan';
        this.loading = false;
        this.showErrorSnackbar(this.error);
      }
    });
  }

  getStatusLabel(status: RemediationPlanStatus | undefined): string {
    if (!status) return 'Inconnu';
    
    switch (status) {
      case RemediationPlanStatus.TODO:
        return 'À faire';
      case RemediationPlanStatus.IN_PROGRESS:
        return 'En cours';
      case RemediationPlanStatus.DONE:
        return 'Terminé';
      default:
        return status;
    }
  }

  getStatusColor(status: RemediationPlanStatus | undefined): string {
    if (!status) return 'default';
    
    switch (status) {
      case RemediationPlanStatus.TODO:
        return 'warn';
      case RemediationPlanStatus.IN_PROGRESS:
        return 'accent';
      case RemediationPlanStatus.DONE:
        return 'primary';
      default:
        return 'default';
    }
  }

  editPlan(): void {
    if (this.plan?.id) {
      this.router.navigate(['/remediation-plans/edit', this.plan.id]);
    }
  }

  goBack(): void {
    if (this.plan?.mappingId) {
      this.router.navigate(['/remediation-plans', this.plan.mappingId]);
    } else {
      this.router.navigate(['/remediation-plans']);
    }
  }

  private showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
} 