import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../services/assessment.service';
import { Assessment } from '../../models/assessment.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../admin/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.component.html',
  styleUrls: ['./assessment-detail.component.css']
})
export class AssessmentDetailComponent implements OnInit {
  assessment?: Assessment;
  isLoading = false;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assessmentService: AssessmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) {
      this.showError('ID d\'évaluation invalide');
      this.router.navigate(['/assessments']);
      return;
    }
    this.loadAssessment();
  }

  loadAssessment(): void {
    this.isLoading = true;
    this.assessmentService.getAssessment(this.id).subscribe({
      next: (assessment) => {
        this.assessment = assessment;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'évaluation', error);
        this.isLoading = false;
        this.showError('Erreur lors du chargement de l\'évaluation');
        this.router.navigate(['/assessments']);
      }
    });
  }

  editAssessment(): void {
    this.router.navigate(['/assessments', this.id, 'edit']);
  }

  deleteAssessment(): void {
    if (!this.assessment) return;

    const dialogData: ConfirmDialogData = {
      title: 'Confirmation de suppression',
      message: `Êtes-vous sûr de vouloir supprimer cette évaluation ?`,
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      color: 'warn'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDeleteAssessment();
      }
    });
  }

  private performDeleteAssessment(): void {
    this.isLoading = true;
    this.assessmentService.deleteAssessment(this.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.showSuccess('Évaluation supprimée avec succès');
        this.router.navigate(['/assessments']);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'évaluation', error);
        this.isLoading = false;
        this.showError('Erreur lors de la suppression de l\'évaluation');
      }
    });
  }

  navigateToList(): void {
    this.router.navigate(['/assessments']);
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
