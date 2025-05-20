import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { RemediationPlanService } from '../../services/remediation-plan.service';
import { RemediationPlanStatus, RemediationPlanDTO } from '../../../../core/models/remediation-plan.model';
import { UserService } from '../../../../core/services/user.service';
import { RiskComplianceMappingService } from '../../../compliance/services/risk-compliance-mapping.service';
import { User } from '../../../../core/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {
  planForm!: FormGroup;
  isEditMode = false;
  planId: string | null = null;
  mappingId: number | null = null;
  users: User[] = [];
  isLoading = false;
  error: string | null = null;
  submitting = false;
  statuses = Object.values(RemediationPlanStatus);

  constructor(
    private fb: FormBuilder,
    private planService: RemediationPlanService,
    private userService: UserService,
    private mappingService: RiskComplianceMappingService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.debug('PlanFormComponent: Initialisation');
    this.initForm();
    this.loadFormData();
  }

  initForm(): void {
    this.planForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(2000)],
      ownerId: [null],
      dueDate: [null],
      status: [RemediationPlanStatus.TODO, Validators.required],
      mappingId: ['', Validators.required]
    });
  }

  loadFormData(): void {
    this.isLoading = true;
    this.error = null;

    console.debug('PlanFormComponent: Initialisation du chargement des données du formulaire');

    // Récupérer paramètres d'URL
    this.route.paramMap.subscribe(params => {
      console.debug('PlanFormComponent: Params reçus:', params);
      this.planId = params.get('id');
      const mappingIdParam = params.get('mappingId');
      console.debug('PlanFormComponent: Paramètres extraits:', { id: this.planId, mappingId: mappingIdParam });
      
      this.mappingId = mappingIdParam ? +mappingIdParam : null;
      console.debug('PlanFormComponent: MappingId converti en nombre:', this.mappingId);
      
      this.isEditMode = !!this.planId;
      console.debug('PlanFormComponent: Mode édition:', this.isEditMode);

      // Chargement des utilisateurs
      const usersRequest = this.userService.getAllUsers();

      // Si mode édition, charger les données du plan
      let planRequest: Observable<any> = of(null);
      if (this.isEditMode && this.planId) {
        console.debug('PlanFormComponent: Chargement du plan existant:', this.planId);
        planRequest = this.planService.getPlan(this.planId);
      }

      // Si mappingId fourni, pré-remplir le champ et vérifier son existence
      if (this.mappingId) {
        console.debug('PlanFormComponent: MappingId extrait de l\'URL:', this.mappingId);
        this.planForm.patchValue({ mappingId: this.mappingId });
        
        // Vérifier si le mapping existe avant de soumettre
        this.mappingService.getMapping(this.mappingId.toString()).subscribe({
          next: (mapping) => {
            console.debug('PlanFormComponent: Mapping trouvé:', mapping);
          },
          error: (err: any) => {
            console.error('PlanFormComponent: Erreur lors de la vérification du mapping:', err);
            this.showErrorSnackbar(`Le mapping #${this.mappingId} n'existe pas. Assurez-vous de venir d'une analyse d'écarts valide.`);
          }
        });
      } else {
        console.debug('PlanFormComponent: Aucun mappingId trouvé dans l\'URL');
      }

      // Exécuter les requêtes en parallèle
      forkJoin({
        users: usersRequest,
        plan: planRequest
      }).subscribe({
        next: (result) => {
          this.users = result.users;
          
          if (result.plan && this.isEditMode) {
            // Formater la date avant de l'injecter dans le formulaire
            const plan = result.plan;
            if (plan.dueDate) {
              plan.dueDate = new Date(plan.dueDate);
            }
            
            this.planForm.patchValue(plan);
          }
          
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des données', error);
          this.error = 'Impossible de charger les données. Veuillez réessayer.';
          this.isLoading = false;
          this.showErrorSnackbar(this.error);
        }
      });
    });
  }

  onSubmit(): void {
    if (this.planForm.invalid) {
      this.markFormGroupTouched(this.planForm);
      return;
    }

    const formData = this.planForm.value;
    
    // Convertir la date en format ISO
    if (formData.dueDate) {
      formData.dueDate = formData.dueDate.toISOString().split('T')[0];
    }
    
    // S'assurer que mappingId est un nombre
    if (formData.mappingId && typeof formData.mappingId === 'string') {
      formData.mappingId = parseInt(formData.mappingId, 10);
    } else if (this.mappingId) {
      // Utiliser le mappingId de l'URL si disponible
      formData.mappingId = this.mappingId;
    }
    
    if (!formData.mappingId) {
      this.showErrorSnackbar('ID de mapping manquant. Veuillez vous assurer de venir d\'une analyse d\'écarts valide.');
      return;
    }
    
    const planDTO: RemediationPlanDTO = formData;
    console.debug('Envoi DTO RemediationPlan', planDTO);
    
    this.submitting = true;
    
    const request = this.isEditMode && this.planId
      ? this.planService.updatePlan(this.planId, planDTO)
      : this.planService.createPlan(planDTO);
    
    request.subscribe({
      next: (result) => {
        this.submitting = false;
        const message = this.isEditMode ? 'Plan mis à jour avec succès' : 'Plan créé avec succès';
        this.showSuccessSnackbar(message);
        
        // Rediriger vers la liste des plans pour ce mapping
        this.router.navigate(['/remediation-plans', planDTO.mappingId]);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur lors de la soumission du formulaire', error);
        this.submitting = false;
        
        // Gestion spécifique pour l'erreur "Mapping non trouvé"
        if (error.status === 404 && error.error && error.error.message && error.error.message.includes('Mapping non trouvé')) {
          this.showErrorSnackbar('Mapping non trouvé. Vérifiez que vous venez bien d\'une analyse d\'écarts valide.');
        } else {
          this.showErrorSnackbar('Impossible de sauvegarder le plan. Veuillez réessayer.');
        }
      }
    });
  }

  cancel(): void {
    if (this.mappingId) {
      this.router.navigate(['/remediation-plans', this.mappingId]);
    } else {
      this.router.navigate(['/remediation-plans']);
    }
  }

  // Helper pour marquer tous les contrôles comme touchés
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper pour traduire le statut
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

  private showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
} 