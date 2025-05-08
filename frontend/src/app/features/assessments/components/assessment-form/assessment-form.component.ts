import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentService } from '../../services/assessment.service';
import { RiskService } from '../../../risks/services/risk.service';
import { UserService } from '../../../admin/users/services/user.service';
import { Assessment, AssessmentStatus, AssessmentRequest } from '../../models/assessment.model';
import { User } from '../../../../core/models/user.model';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css']
})
export class AssessmentFormComponent implements OnInit {
  assessmentForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  assessmentId: string | null = null;
  statusOptions = Object.values(AssessmentStatus);
  risks: any[] = [];
  users: User[] = [];
  pageTitle = 'Nouvelle évaluation';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private assessmentService: AssessmentService,
    private riskService: RiskService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDependencies();

    // Déterminer si nous sommes en mode édition
    this.assessmentId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.assessmentId;
    this.pageTitle = this.isEditMode ? 'Modifier l\'évaluation' : 'Nouvelle évaluation';

    if (this.isEditMode && this.assessmentId) {
      this.loadAssessment(this.assessmentId);
    }
  }

  private initForm(): void {
    this.assessmentForm = this.fb.group({
      riskId: ['', Validators.required],
      userId: [''],
      status: [AssessmentStatus.PLANNED, Validators.required],
      assessmentDate: [new Date(), Validators.required],
      findings: [''],
      recommendations: [''],
      nextReviewDate: [null]
    });
  }

  private loadDependencies(): void {
    this.isLoading = true;
    
    forkJoin({
      risks: this.riskService.getRisks().pipe(catchError(() => of([]))),
      users: this.userService.getUsers().pipe(catchError(() => of([])))
    }).subscribe({
      next: (result) => {
        this.risks = result.risks;
        this.users = result.users;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données', error);
        this.showError('Erreur lors du chargement des données');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private loadAssessment(id: string): void {
    this.isLoading = true;
    this.assessmentService.getAssessment(id).subscribe({
      next: (assessment) => {
        this.patchForm(assessment);
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

  private patchForm(assessment: Assessment): void {
    this.assessmentForm.patchValue({
      riskId: assessment.risk?.id,
      userId: assessment.user?.id,
      status: assessment.status,
      assessmentDate: assessment.assessmentDate ? new Date(assessment.assessmentDate) : null,
      findings: assessment.conclusions,
      recommendations: assessment.recommendations,
      nextReviewDate: assessment.nextReviewDate ? new Date(assessment.nextReviewDate) : null
    });
  }

  onSubmit(): void {
    if (this.assessmentForm.invalid) {
      return;
    }

    const formValue = this.assessmentForm.value;
    const assessmentRequest: AssessmentRequest = {
      riskId: formValue.riskId,
      userId: formValue.userId,
      status: formValue.status,
      assessmentDate: formValue.assessmentDate,
      conclusions: formValue.findings,
      recommendations: formValue.recommendations,
      nextReviewDate: formValue.nextReviewDate
    };

    this.isLoading = true;

    if (this.isEditMode && this.assessmentId) {
      this.updateAssessment(this.assessmentId, assessmentRequest);
    } else {
      this.createAssessment(assessmentRequest);
    }
  }

  private createAssessment(request: AssessmentRequest): void {
    this.assessmentService.createAssessment(request)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (assessment) => {
          this.showSuccess('Évaluation créée avec succès');
          this.router.navigate(['/assessments', assessment.id]);
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'évaluation', error);
          this.showError('Erreur lors de la création de l\'évaluation');
        }
      });
  }

  private updateAssessment(id: string, request: AssessmentRequest): void {
    this.assessmentService.updateAssessment(id, request)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (assessment) => {
          this.showSuccess('Évaluation mise à jour avec succès');
          this.router.navigate(['/assessments', assessment.id]);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'évaluation', error);
          this.showError('Erreur lors de la mise à jour de l\'évaluation');
        }
      });
  }

  cancel(): void {
    if (this.isEditMode && this.assessmentId) {
      this.router.navigate(['/assessments', this.assessmentId]);
    } else {
      this.router.navigate(['/assessments']);
    }
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
