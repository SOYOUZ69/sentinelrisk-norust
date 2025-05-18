import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'src/app/core/auth/keycloak.service';
import { ComplianceFramework } from 'src/app/core/models/compliance.model';
import { ComplianceFrameworkService } from '../../services/compliance-framework.service';

@Component({
  selector: 'app-framework-edit',
  templateUrl: './framework-edit.component.html',
  styleUrls: ['./framework-edit.component.css']
})
export class FrameworkEditComponent implements OnInit {
  frameworkForm!: FormGroup;
  framework!: ComplianceFramework;
  frameworkId!: string;
  isLoading = true;
  error: string | null = null;
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private frameworkService: ComplianceFrameworkService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est admin
    this.isAdmin = this.keycloakService.hasRole('admin');
    
    if (!this.isAdmin) {
      console.warn('Utilisateur non autorisé à éditer les frameworks');
      this.router.navigate(['/compliance/frameworks']);
      return;
    }

    this.initForm();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.frameworkId = id;
        this.loadFramework(id);
      } else {
        this.error = 'Identifiant du framework manquant';
        this.isLoading = false;
      }
    });
  }

  initForm(): void {
    this.frameworkForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      version: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.maxLength(500)]
    });
  }

  loadFramework(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.frameworkService.getFramework(id).subscribe({
      next: (framework) => {
        this.framework = framework;
        this.frameworkForm.patchValue({
          id: framework.id,
          name: framework.name,
          version: framework.version,
          description: framework.description || ''
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error(`Erreur lors du chargement du framework ${id}`, error);
        this.error = 'Impossible de charger les détails du framework. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.frameworkForm.invalid) {
      return;
    }

    const updatedFramework: ComplianceFramework = this.frameworkForm.value;
    
    this.isLoading = true;
    this.frameworkService.updateFramework(this.frameworkId, updatedFramework).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/compliance/frameworks', this.frameworkId]);
      },
      error: (error) => {
        console.error(`Erreur lors de la mise à jour du framework ${this.frameworkId}`, error);
        this.error = 'Impossible de mettre à jour le framework. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/compliance/frameworks', this.frameworkId]);
  }
}
