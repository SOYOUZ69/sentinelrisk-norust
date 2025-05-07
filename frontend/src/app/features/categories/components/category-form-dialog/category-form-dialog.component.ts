import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.scss']
})
export class CategoryFormDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id?: number;
  isLoading = false;
  isDialogMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    @Optional() private dialogRef?: MatDialogRef<CategoryFormDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(1000)]
    });

    // Déterminer si on est en mode dialogue ou en mode route
    this.isDialogMode = !!this.dialogRef;
    
    // Si on est en mode dialog et qu'on a des données, initialiser l'édition
    if (this.isDialogMode && this.data?.id) {
      this.id = this.data.id;
      this.isEdit = true;
    }
  }

  ngOnInit() {
    // Si on est en mode dialogue et qu'on a un ID, on est en mode édition
    if (this.isDialogMode && this.id) {
      this.loadCategory();
    }
    // Sinon, en mode route, on vérifie si on a un ID dans les paramètres de route
    else if (!this.isDialogMode && this.route.snapshot.paramMap.has('id')) {
      this.id = +this.route.snapshot.paramMap.get('id')!;
      this.isEdit = this.router.url.includes('/edit');
      
      if (this.isEdit) {
        this.loadCategory();
      }
    }
  }

  loadCategory() {
    if (!this.id) return;
    
    this.isLoading = true;
    this.categoryService.getCategory(this.id).subscribe({
      next: (category) => {
        this.form.patchValue({
          name: category.name,
          description: category.description
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.showError('Erreur lors du chargement de la catégorie');
        this.isLoading = false;
        console.error('Erreur lors du chargement de la catégorie:', error);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const request = this.form.value;

    const operation = this.isEdit
      ? this.categoryService.updateCategory(this.id!, request)
      : this.categoryService.createCategory(request);

    operation.subscribe({
      next: (result) => {
        this.isLoading = false;
        this.showSuccess(this.isEdit ? 'Catégorie mise à jour avec succès' : 'Catégorie créée avec succès');
        
        // Si on est en mode dialogue, on ferme le dialogue
        if (this.isDialogMode && this.dialogRef) {
          this.dialogRef.close(result);
        } 
        // Sinon, on navigue vers la liste des catégories
        else {
          this.router.navigate(['/categories']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.showError('Erreur lors de l\'enregistrement de la catégorie');
        console.error('Erreur lors de l\'enregistrement:', error);
      }
    });
  }

  onCancel() {
    if (this.isDialogMode && this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['/categories']);
    }
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