import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentService } from '../../services/assessment.service';
import { Assessment, AssessmentStatus } from '../../models/assessment.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../admin/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'risk', 'status', 'assessmentDate', 'nextReviewDate', 'actions'];
  dataSource: MatTableDataSource<Assessment> = new MatTableDataSource<Assessment>([]);
  isLoading = false;
  statusTypes = AssessmentStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private assessmentService: AssessmentService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAssessments();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  loadAssessments(): void {
    this.isLoading = true;
    this.assessmentService.getAssessments().subscribe({
      next: (assessments) => {
        this.dataSource.data = assessments;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des évaluations', error);
        this.isLoading = false;
        this.showError('Erreur lors du chargement des évaluations');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewAssessment(id: string): void {
    this.router.navigate(['/assessments', id]);
  }

  editAssessment(id: string): void {
    this.router.navigate(['/assessments', id, 'edit']);
  }

  createAssessment(): void {
    this.router.navigate(['/assessments/new']);
  }

  deleteAssessment(id: string): void {
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
        this.performDeleteAssessment(id);
      }
    });
  }

  private performDeleteAssessment(id: string): void {
    this.isLoading = true;
    this.assessmentService.deleteAssessment(id).subscribe({
      next: () => {
        this.loadAssessments();
        this.showSuccess('Évaluation supprimée avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'évaluation', error);
        this.isLoading = false;
        this.showError('Erreur lors de la suppression de l\'évaluation');
      }
    });
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
