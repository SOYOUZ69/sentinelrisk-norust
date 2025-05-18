import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ComplianceFramework, ComplianceRequirement } from '../../../../core/models/compliance.model';
import { ComplianceFrameworkService } from '../../services/compliance-framework.service';
import { ComplianceRequirementService } from '../../services/compliance-requirement.service';
import { FrameworkFormDialogComponent } from '../framework-form-dialog/framework-form-dialog.component';
import { RequirementFormDialogComponent } from '../../requirements/requirement-form-dialog/requirement-form-dialog.component';

@Component({
  selector: 'app-framework-detail',
  templateUrl: './framework-detail.component.html',
  styleUrls: ['./framework-detail.component.scss']
})
export class FrameworkDetailComponent implements OnInit {
  framework: ComplianceFramework | null = null;
  requirementsDataSource = new MatTableDataSource<ComplianceRequirement>([]);
  displayedColumns: string[] = ['code', 'description', 'type', 'actions'];
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private frameworkService: ComplianceFrameworkService,
    private requirementService: ComplianceRequirementService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadFramework(id);
      } else {
        this.error = 'Identifiant du framework manquant';
        this.isLoading = false;
      }
    });
  }

  loadFramework(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.frameworkService.getFramework(id).subscribe({
      next: (framework) => {
        this.framework = framework;
        this.loadRequirements(id);
      },
      error: (error) => {
        console.error(`Erreur lors du chargement du framework ${id}`, error);
        this.error = 'Impossible de charger les détails du framework. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  loadRequirements(frameworkId: string): void {
    this.requirementService.getRequirementsByFramework(frameworkId).subscribe({
      next: (requirements) => {
        this.requirementsDataSource.data = requirements;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(`Erreur lors du chargement des exigences du framework ${frameworkId}`, error);
        this.error = 'Impossible de charger les exigences du framework. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  openFrameworkDialog(): void {
    if (!this.framework) return;

    const dialogRef = this.dialog.open(FrameworkFormDialogComponent, {
      width: '500px',
      data: this.framework
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateFramework(result);
      }
    });
  }

  updateFramework(framework: ComplianceFramework): void {
    if (!this.framework) return;

    this.frameworkService.updateFramework(framework.id, framework).subscribe({
      next: (updatedFramework) => {
        this.framework = updatedFramework;
      },
      error: (error) => {
        console.error(`Erreur lors de la mise à jour du framework ${framework.id}`, error);
        // Gérer l'erreur (notification, etc.)
      }
    });
  }

  openRequirementDialog(requirement?: ComplianceRequirement): void {
    if (!this.framework) return;

    // Préparer les données pour le dialogue
    const data: Partial<ComplianceRequirement> = requirement ? { ...requirement } : { 
      framework: this.framework
    };

    const dialogRef = this.dialog.open(RequirementFormDialogComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Mise à jour
          this.updateRequirement(result);
        } else {
          // Création
          this.createRequirement(result);
        }
      }
    });
  }

  createRequirement(requirement: Partial<ComplianceRequirement>): void {
    this.requirementService.createRequirement(requirement).subscribe({
      next: (newRequirement) => {
        this.requirementsDataSource.data = [...this.requirementsDataSource.data, newRequirement];
      },
      error: (error) => {
        console.error('Erreur lors de la création de l\'exigence', error);
        // Gérer l'erreur (notification, etc.)
      }
    });
  }

  updateRequirement(requirement: ComplianceRequirement): void {
    this.requirementService.updateRequirement(requirement.id, requirement).subscribe({
      next: (updatedRequirement) => {
        const index = this.requirementsDataSource.data.findIndex(r => r.id === updatedRequirement.id);
        if (index !== -1) {
          const updatedData = [...this.requirementsDataSource.data];
          updatedData[index] = updatedRequirement;
          this.requirementsDataSource.data = updatedData;
        }
      },
      error: (error) => {
        console.error(`Erreur lors de la mise à jour de l'exigence ${requirement.id}`, error);
        // Gérer l'erreur (notification, etc.)
      }
    });
  }

  deleteRequirement(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette exigence? Cette action est irréversible.')) {
      this.requirementService.deleteRequirement(id).subscribe({
        next: () => {
          this.requirementsDataSource.data = this.requirementsDataSource.data.filter(r => r.id !== id);
        },
        error: (error) => {
          console.error(`Erreur lors de la suppression de l'exigence ${id}`, error);
          // Gérer l'erreur (notification, etc.)
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/compliance/frameworks']);
  }
} 