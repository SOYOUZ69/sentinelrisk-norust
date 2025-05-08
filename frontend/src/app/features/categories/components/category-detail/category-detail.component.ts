import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../admin/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  category?: Category;
  isLoading = false;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadCategory();
  }

  loadCategory() {
    this.isLoading = true;
    this.categoryService.getCategory(this.id).subscribe({
      next: (category) => {
        this.category = category;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.showError('Erreur lors du chargement de la catégorie');
        console.error('Erreur lors du chargement de la catégorie:', error);
        this.router.navigate(['/categories']);
      }
    });
  }

  editCategory() {
    this.router.navigate(['/categories', this.id, 'edit']);
  }

  deleteCategory() {
    if (!this.category) return;

    const dialogData: ConfirmDialogData = {
      title: 'Confirmation de suppression',
      message: `Êtes-vous sûr de vouloir supprimer la catégorie "${this.category.name}" ?`,
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
        this.performDeleteCategory();
      }
    });
  }

  private performDeleteCategory() {
    this.isLoading = true;
    this.categoryService.deleteCategory(this.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.showSuccess('Catégorie supprimée avec succès');
        this.router.navigate(['/categories']);
      },
      error: (error) => {
        this.isLoading = false;
        this.showError('Erreur lors de la suppression de la catégorie');
        console.error('Erreur lors de la suppression:', error);
      }
    });
  }

  navigateToList() {
    this.router.navigate(['/categories']);
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
} 