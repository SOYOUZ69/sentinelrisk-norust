import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComplianceRequirement, ComplianceRequirementType, ComplianceFramework } from '../../../../core/models/compliance.model';
import { ComplianceRequirementService } from '../../services/compliance-requirement.service';
import { ComplianceFrameworkService } from '../../services/compliance-framework.service';
import { RequirementFormDialogComponent } from '../requirement-form-dialog/requirement-form-dialog.component';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {
  displayedColumns: string[] = ['code', 'framework', 'description', 'type', 'actions'];
  dataSource = new MatTableDataSource<ComplianceRequirement>([]);
  frameworks: ComplianceFramework[] = [];
  selectedFramework: string = '';
  selectedType: string = '';
  isLoading = true;
  error: string | null = null;
  originalData: ComplianceRequirement[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private requirementService: ComplianceRequirementService,
    private frameworkService: ComplianceFrameworkService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadFrameworks();
    this.loadRequirements();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadFrameworks() {
    this.frameworkService.getFrameworks().subscribe({
      next: (frameworks) => {
        console.log('Frameworks chargés :', frameworks);
        this.frameworks = frameworks;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des frameworks', error);
      }
    });
  }

  loadRequirements(frameworkId?: string) {
    this.isLoading = true;
    this.error = null;
    
    if (frameworkId) {
      // Utiliser le service pour filtrer côté serveur
      this.requirementService.getRequirementsByFramework(frameworkId).subscribe({
        next: (requirements) => {
          this.originalData = requirements;
          this.dataSource.data = requirements;
          // Réappliquer le filtre de type si nécessaire
          if (this.selectedType) {
            this.filterByType();
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error(`Erreur lors du chargement des exigences pour le framework ${frameworkId}`, error);
          this.error = 'Impossible de charger les exigences. Veuillez réessayer.';
          this.isLoading = false;
        }
      });
    } else {
      // Charger toutes les exigences
      this.requirementService.getRequirements().subscribe({
        next: (requirements) => {
          this.originalData = requirements;
          this.dataSource.data = requirements;
          // Réappliquer le filtre de type si nécessaire
          if (this.selectedType) {
            this.filterByType();
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des exigences', error);
          this.error = 'Impossible de charger les exigences. Veuillez réessayer.';
          this.isLoading = false;
        }
      });
    }
  }

  filterByFramework() {
    // Utiliser l'API pour filtrer par framework
    if (this.selectedFramework) {
      this.loadRequirements(this.selectedFramework);
    } else {
      this.loadRequirements();
    }
  }

  filterByType() {
    if (this.selectedType) {
      // Appliquer le filtre de type localement car le backend ne supporte pas encore le filtrage par type
      const filtered = this.originalData.filter(req => req.type === this.selectedType);
      this.dataSource.data = filtered;
    } else {
      // Si pas de filtre de type, utiliser les données originales
      this.dataSource.data = this.originalData;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTypeLabel(type: ComplianceRequirementType): string {
    switch (type) {
      case ComplianceRequirementType.PREVENTIVE:
        return 'Préventif';
      case ComplianceRequirementType.DETECTIVE:
        return 'Détectif';
      case ComplianceRequirementType.CORRECTIVE:
        return 'Correctif';
      default:
        return type;
    }
  }

  getTypeClass(type: ComplianceRequirementType): string {
    switch (type) {
      case ComplianceRequirementType.PREVENTIVE:
        return 'preventive-type';
      case ComplianceRequirementType.DETECTIVE:
        return 'detective-type';
      case ComplianceRequirementType.CORRECTIVE:
        return 'corrective-type';
      default:
        return '';
    }
  }

  openRequirementDialog(requirement?: ComplianceRequirement) {
    const dialogRef = this.dialog.open(RequirementFormDialogComponent, {
      width: '600px',
      data: {
        requirement: requirement || {},
        frameworks: this.frameworks
      }
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

  createRequirement(requirement: Partial<ComplianceRequirement>) {
    this.requirementService.createRequirement(requirement).subscribe({
      next: (newRequirement) => {
        this.originalData = [...this.originalData, newRequirement];
        // Réappliquer les filtres actuels
        this.filterByFramework();
        this.filterByType();
      },
      error: (error) => {
        console.error('Erreur lors de la création de l\'exigence', error);
        // Gérer l'erreur (notification, etc.)
      }
    });
  }

  updateRequirement(requirement: ComplianceRequirement) {
    this.requirementService.updateRequirement(requirement.id, requirement).subscribe({
      next: (updatedRequirement) => {
        const index = this.originalData.findIndex(r => r.id === updatedRequirement.id);
        if (index !== -1) {
          const updatedData = [...this.originalData];
          updatedData[index] = updatedRequirement;
          this.originalData = updatedData;
          // Réappliquer les filtres actuels
          this.filterByFramework();
          this.filterByType();
        }
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'exigence', error);
        // Gérer l'erreur (notification, etc.)
      }
    });
  }

  deleteRequirement(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette exigence? Cette action est irréversible.')) {
      this.requirementService.deleteRequirement(id).subscribe({
        next: () => {
          this.originalData = this.originalData.filter(r => r.id !== id);
          // Réappliquer les filtres actuels
          this.filterByFramework();
          this.filterByType();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'exigence', error);
          // Gérer l'erreur (notification, etc.)
        }
      });
    }
  }
}
