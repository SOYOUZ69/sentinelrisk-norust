import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Risk, RiskStatus, ImpactLevel, ProbabilityLevel } from '../../../core/models/risk.model';
import { CategoryService } from '../../categories/services/category.service';
import { Category } from '../../../core/models/risk.model';

export interface RiskFormDialogData {
  risk?: Risk;
  isEdit: boolean;
}

@Component({
  selector: 'app-risk-form-dialog',
  templateUrl: './risk-form-dialog.component.html',
  styleUrls: ['./risk-form-dialog.component.scss']
})
export class RiskFormDialogComponent implements OnInit {
  riskForm: FormGroup;
  isEdit = false;
  dialogTitle: string;
  categories: Category[] = [];
  isLoadingCategories = false;
  
  // Options pour les selects
  statuses = Object.values(RiskStatus);
  impactLevels = Object.values(ImpactLevel);
  probabilityLevels = Object.values(ProbabilityLevel);
  
  // Mappage pour les traductions des statuts et niveaux
  statusTranslations = {
    [RiskStatus.IDENTIFIED]: 'Identifié',
    [RiskStatus.IN_ASSESSMENT]: 'En évaluation',
    [RiskStatus.MITIGATED]: 'Atténué',
    [RiskStatus.ACCEPTED]: 'Accepté',
    [RiskStatus.CLOSED]: 'Clôturé'
  };
  
  impactTranslations = {
    [ImpactLevel.NEGLIGIBLE]: 'Négligeable',
    [ImpactLevel.LOW]: 'Faible',
    [ImpactLevel.MEDIUM]: 'Moyen',
    [ImpactLevel.HIGH]: 'Élevé',
    [ImpactLevel.SEVERE]: 'Sévère'
  };
  
  probabilityTranslations = {
    [ProbabilityLevel.RARE]: 'Rare',
    [ProbabilityLevel.UNLIKELY]: 'Peu probable',
    [ProbabilityLevel.POSSIBLE]: 'Possible',
    [ProbabilityLevel.LIKELY]: 'Probable',
    [ProbabilityLevel.ALMOST_CERTAIN]: 'Quasi-certain'
  };
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RiskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RiskFormDialogData,
    private categoryService: CategoryService
  ) {
    this.isEdit = data.isEdit;
    this.dialogTitle = this.isEdit ? 'Modifier le risque' : 'Ajouter un risque';
    
    this.riskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      impactLevel: [ImpactLevel.MEDIUM, Validators.required],
      probabilityLevel: [ProbabilityLevel.POSSIBLE, Validators.required],
      status: [RiskStatus.IDENTIFIED, Validators.required],
      mitigationPlan: ['']
    });
    
    if (this.isEdit && data.risk) {
      this.riskForm.patchValue({
        name: data.risk.name,
        description: data.risk.description,
        categoryId: data.risk.category.id,
        impactLevel: data.risk.impactLevel,
        probabilityLevel: data.risk.probabilityLevel,
        status: data.risk.status,
        mitigationPlan: data.risk.mitigationPlan || ''
      });
    }
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoadingCategories = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
        this.isLoadingCategories = false;
      }
    });
  }

  onSubmit(): void {
    if (this.riskForm.valid) {
      // Récupérer les valeurs brutes du formulaire
      const formValues = this.riskForm.getRawValue();
      
      // Trouver la catégorie sélectionnée pour avoir son nom
      const selectedCategory = this.categories.find(cat => cat.id === formValues.categoryId);
      
      // Construire l'objet correctement formaté
      const riskData: Partial<Risk> = {
        name: formValues.name,
        description: formValues.description,
        category: { 
          id: formValues.categoryId,
          name: selectedCategory?.name || '' // Ajouter le nom requis pour Category
        },
        impactLevel: formValues.impactLevel,
        probabilityLevel: formValues.probabilityLevel,
        status: formValues.status,
        mitigationPlan: formValues.mitigationPlan
        // Note: Si ownerId est nécessaire, il faudrait l'ajouter ici
        // ownerId: this.authService.getCurrentUserId()
      };
      
      this.dialogRef.close(riskData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.riskForm.get(controlName);
    
    if (!control) return '';
    
    if (control.hasError('required')) {
      return 'Ce champ est requis';
    }
    
    if (control.hasError('minlength')) {
      return `Minimum ${control.getError('minlength').requiredLength} caractères`;
    }
    
    return '';
  }
} 