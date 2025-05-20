import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemediationPlanService } from '../../services/remediation-plan.service';
import { RemediationPlan, RemediationPlanStatus } from '../../../../core/models/remediation-plan.model';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  plan: RemediationPlan | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planService: RemediationPlanService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPlan(id);
    } else {
      this.error = true;
      this.loading = false;
      this.snackBar.open('ID du plan non spécifié', 'Fermer', { duration: 3000 });
    }
  }

  loadPlan(id: string): void {
    this.planService.getPlan(id).subscribe({
      next: (plan) => {
        this.plan = plan;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du plan:', err);
        this.error = true;
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement du plan', 'Fermer', { duration: 3000 });
      }
    });
  }

  getStatusLabel(status: RemediationPlanStatus): string {
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

  getChipColor(status: RemediationPlanStatus): ThemePalette {
    switch (status) {
      case RemediationPlanStatus.TODO:
        return 'warn';
      case RemediationPlanStatus.IN_PROGRESS:
        return 'primary';
      case RemediationPlanStatus.DONE:
        return 'accent';
      default:
        return undefined;
    }
  }

  goBack(): void {
    this.router.navigate(['/remediation-plans']);
  }

  editPlan(): void {
    if (this.plan) {
      this.router.navigate(['/remediation-plans/edit', this.plan.id]);
    }
  }
} 