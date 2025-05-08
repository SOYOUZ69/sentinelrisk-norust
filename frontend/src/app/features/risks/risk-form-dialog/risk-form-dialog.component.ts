import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Risk, RiskStatus, ImpactLevel, ProbabilityLevel } from '../../../core/models/risk.model';
import { CategoryService } from '../../categories/services/category.service';
import { Category as CoreCategory } from '../../../core/models/risk.model';
import { Category as FeatureCategory } from '../../categories/models/category.model';

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
  categories: CoreCategory[] = [];
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
      // Déterminer l'ID de la catégorie à partir de categoryId ou category.id
      const categoryId = data.risk.categoryId || (data.risk.category?.id || '');
      
      this.riskForm.patchValue({
        name: data.risk.name,
        description: data.risk.description,
        categoryId: categoryId,
        impactLevel: data.risk.impactLevel,
        probabilityLevel: data.risk.probabilityLevel,
        status: data.risk.status,
        mitigationPlan: data.risk.mitigationPlan || ''
      });
    }
  }

  ngOnInit(): void {
    this.categories = [];
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    console.log('Chargement des catégories pour le formulaire de risque...');
    
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log('Catégories reçues pour le formulaire de risque:', categories);
        
        // Garde pour éviter les erreurs si la réponse n'est pas un tableau
        if (!Array.isArray(categories)) {
          console.error('La réponse API n\'est pas un tableau valide:', categories);
          this.isLoadingCategories = false;
          this.categories = []; // Initialiser à un tableau vide pour éviter les erreurs
          return;
        }
        
        try {
          // Conversion du type FeatureCategory[] vers CoreCategory[]
          this.categories = categories.map(cat => {
            if (!cat) return null; // Garde supplémentaire
            return {
              id: String(cat.id),
              name: cat.name || '(Sans nom)',
              description: cat.description
            };
          }).filter(cat => cat !== null) as CoreCategory[]; // Filtrer les valeurs null
          
          console.log('Catégories converties et prêtes pour le select:', this.categories);
        } catch (err) {
          console.error('Erreur lors de la conversion des catégories:', err);
          this.categories = []; // Fallback à un tableau vide en cas d'erreur
        }
        
        this.isLoadingCategories = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
        this.isLoadingCategories = false;
        this.categories = []; // Fallback à un tableau vide en cas d'erreur
      }
    });
  }

  onSubmit(): void {
    if (this.riskForm.valid) {
      const formValues = this.riskForm.getRawValue();
      
      const selectedCategory = this.categories ? 
        this.categories.find(cat => cat && cat.id === formValues.categoryId) : undefined;
      
      const riskData: Partial<Risk> = {
        name: formValues.name,
        description: formValues.description,
        // Utiliser les deux approches pour la compatibilité
        categoryId: formValues.categoryId,
        categoryName: selectedCategory?.name || '(Catégorie inconnue)',
        // Ajouter category pour la rétrocompatibilité
        category: { 
          id: formValues.categoryId,
          name: selectedCategory?.name || '(Catégorie inconnue)'
        },
        impactLevel: formValues.impactLevel,
        probabilityLevel: formValues.probabilityLevel,
        status: formValues.status,
        mitigationPlan: formValues.mitigationPlan
      };
      
      console.log('Données du risque à soumettre:', riskData);
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