import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Risk, RiskStatus, ImpactLevel, ProbabilityLevel } from '../../../core/models/risk.model';
import { CategoryService } from '../../categories/services/category.service';
import { Category as CoreCategory } from '../../../core/models/risk.model';
import { Category as FeatureCategory } from '../../categories/models/category.model';
import { SettingsService } from '../../../core/services/settings.service';
import { UserService } from '../../admin/users/services/user.service';
import { User } from '../../../core/models/user.model';

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
  acceptanceThreshold: number = 15;
  users: User[] = [];
  isLoadingUsers = false;
  private formPatched = false; // Pour éviter les appels multiples
  
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
    [ImpactLevel.MINOR]: 'Mineur',
    [ImpactLevel.MODERATE]: 'Modéré',
    [ImpactLevel.SEVERE]: 'Sévère',
    [ImpactLevel.MAJOR]: 'Majeur'
  };
  
  // Mapping des libellés utilisateur vers les valeurs de l'enum ImpactLevel
  impactLevelMapping: Record<string, string> = {
    'Négligeable': 'NEGLIGIBLE',
    'Mineur': 'MINOR',
    'Modéré': 'MODERATE',
    'Sévère': 'SEVERE',
    'Majeur': 'MAJOR'
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
    private categoryService: CategoryService,
    private settingsService: SettingsService,
    private userService: UserService
  ) {
    this.isEdit = data.isEdit;
    this.dialogTitle = this.isEdit ? 'Modifier le risque' : 'Ajouter un risque';
    
    this.riskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      impactLevel: [ImpactLevel.MODERATE, Validators.required],
      probabilityLevel: [ProbabilityLevel.POSSIBLE, Validators.required],
      status: [RiskStatus.IDENTIFIED, Validators.required],
      mitigationPlan: ['', Validators.required],
      riskOwnerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categories = [];
    this.loadCategories();
    this.loadAcceptanceThreshold();
    this.loadUsers();
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
          
          // Pré-remplir le formulaire après le chargement des catégories
          if (this.isEdit && this.data.risk && !this.formPatched) {
            this.patchFormValues();
          }
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

  loadAcceptanceThreshold(): void {
    this.settingsService.getRiskAcceptanceThreshold().subscribe({
      next: (threshold) => {
        this.acceptanceThreshold = threshold;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du seuil d\'acceptation:', error);
      }
    });
  }

  loadUsers(): void {
    this.isLoadingUsers = true;
    this.userService.getActiveUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoadingUsers = false;
        
        // Pré-remplir le formulaire après le chargement des utilisateurs
        if (this.isEdit && this.data.risk && !this.isLoadingCategories && !this.formPatched) {
          this.patchFormValues();
        }
      },
      error: (err) => {
        this.users = [];
        this.isLoadingUsers = false;
        console.error('Erreur lors du chargement des utilisateurs :', err);
      }
    });
  }

  private patchFormValues(): void {
    if (!this.data.risk || this.formPatched) return;
    
    // Déterminer l'ID de la catégorie à partir de categoryId ou category.id
    const categoryId = this.data.risk.categoryId || (this.data.risk.category?.id || '');
    
    console.log('=== DÉBOGAGE PRÉ-REMPLISSAGE ===');
    console.log('Risk data:', this.data.risk);
    console.log('CategoryId extrait:', categoryId, 'Type:', typeof categoryId);
    console.log('Catégories disponibles:', this.categories.map(c => ({ id: c.id, name: c.name, type: typeof c.id })));
    
    // Vérifier si la catégorie existe dans la liste
    const matchingCategory = this.categories.find(cat => cat.id === categoryId);
    console.log('Catégorie trouvée:', matchingCategory);
    
    // Vérifier aussi avec conversion de type
    const matchingCategoryString = this.categories.find(cat => String(cat.id) === String(categoryId));
    console.log('Catégorie trouvée (conversion string):', matchingCategoryString);
    
    // Utiliser l'ID de la catégorie trouvée dans la liste pour s'assurer de la correspondance
    let finalCategoryId = categoryId;
    if (matchingCategoryString && !matchingCategory) {
      finalCategoryId = matchingCategoryString.id;
      console.log('Utilisation de l\'ID converti:', finalCategoryId);
    }
    
    this.riskForm.patchValue({
      name: this.data.risk.name,
      description: this.data.risk.description,
      categoryId: finalCategoryId,
      impactLevel: this.data.risk.impactLevel,
      probabilityLevel: this.data.risk.probabilityLevel,
      status: this.data.risk.status,
      mitigationPlan: this.data.risk.mitigationPlan || '',
      riskOwnerId: this.data.risk.riskOwnerId || this.data.risk.riskOwner?.id || ''
    });
    
    console.log('Valeur du formulaire après patchValue:', this.riskForm.get('categoryId')?.value);
    console.log('=== FIN DÉBOGAGE ===');
    
    this.formPatched = true; // Marquer comme pré-rempli
  }

  onSubmit(): void {
    if (this.riskForm.valid) {
      const formValues = this.riskForm.getRawValue();
      
      const selectedCategory = this.categories ? 
        this.categories.find(cat => cat && cat.id === formValues.categoryId) : undefined;
      
      const selectedUser = this.users ?
        this.users.find(u => u.id === formValues.riskOwnerId) : undefined;
      
      const riskData: Partial<Risk> = {
        name: formValues.name,
        description: formValues.description,
        categoryId: formValues.categoryId,
        categoryName: selectedCategory?.name || '(Catégorie inconnue)',
        category: { id: formValues.categoryId, name: selectedCategory?.name || '(Catégorie inconnue)' },
        impactLevel: formValues.impactLevel,
        probabilityLevel: formValues.probabilityLevel,
        status: formValues.status,
        mitigationPlan: formValues.mitigationPlan,
        riskOwnerId: formValues.riskOwnerId,
        riskOwner: selectedUser
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