import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplianceFramework, ComplianceStatus, RiskComplianceMapping } from '../../../../core/models/compliance.model';
import { ComplianceFrameworkService } from '../../services/compliance-framework.service';
import { RiskComplianceMappingService } from '../../services/risk-compliance-mapping.service';
import { MappingFormDialogComponent } from '../mapping-form-dialog/mapping-form-dialog.component';

@Component({
  selector: 'app-mappings',
  templateUrl: './mappings.component.html',
  styleUrls: ['./mappings.component.css']
})
export class MappingsComponent implements OnInit {
  displayedColumns: string[] = ['requirement', 'risk', 'status', 'comment', 'actions'];
  dataSource = new MatTableDataSource<RiskComplianceMapping>([]);
  frameworks: ComplianceFramework[] = [];
  selectedFramework: string = '';
  selectedStatus: string = '';
  isLoading = true;
  error: string | null = null;
  originalData: RiskComplianceMapping[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private mappingService: RiskComplianceMappingService,
    private frameworkService: ComplianceFrameworkService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadFrameworks();
    this.loadMappings();
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
        this.frameworks = frameworks;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des frameworks', error);
        this.showErrorSnackbar('Impossible de charger les référentiels');
      }
    });
  }

  loadMappings() {
    this.isLoading = true;
    this.error = null;
    
    this.mappingService.getMappings().subscribe({
      next: (mappings) => {
        console.log('Mappings reçus du backend :', mappings);
        this.originalData = mappings;
        this.dataSource.data = mappings;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des mappings', error);
        this.error = 'Impossible de charger les mappings. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  filterData() {
    this.isLoading = true;
    this.error = null;
    
    if (this.selectedFramework) {
      // Utiliser le service pour charger les mappings filtrés par framework
      this.mappingService.getMappingsByFramework(this.selectedFramework).subscribe({
        next: (mappings) => {
          this.originalData = mappings;
          
          // Appliquer également le filtre par statut si nécessaire
          let filteredData = [...mappings];
          if (this.selectedStatus) {
            filteredData = filteredData.filter(mapping => mapping.status === this.selectedStatus);
          }
          
          this.dataSource.data = filteredData;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(`Erreur lors du filtrage par framework (${this.selectedFramework})`, error);
          this.error = 'Impossible de filtrer les mappings. Veuillez réessayer.';
          this.isLoading = false;
        }
      });
    } else {
      // Si aucun framework n'est sélectionné, charger tous les mappings
      if (this.selectedStatus) {
        // Filtre local par statut uniquement
        const filteredData = this.originalData.filter(
          mapping => mapping.status === this.selectedStatus
        );
        this.dataSource.data = filteredData;
      } else {
        // Aucun filtre, afficher toutes les données
        this.dataSource.data = this.originalData;
      }
      this.isLoading = false;
    }
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusLabel(status: ComplianceStatus): string {
    switch (status) {
      case ComplianceStatus.COMPLIANT:
        return 'Conforme';
      case ComplianceStatus.NON_COMPLIANT:
        return 'Non conforme';
      case ComplianceStatus.PARTIALLY_COMPLIANT:
        return 'Partiellement conforme';
      case ComplianceStatus.NOT_APPLICABLE:
        return 'Non applicable';
      default:
        return status;
    }
  }

  getStatusClass(status: ComplianceStatus): string {
    switch (status) {
      case ComplianceStatus.COMPLIANT:
        return 'status-compliant';
      case ComplianceStatus.NON_COMPLIANT:
        return 'status-non-compliant';
      case ComplianceStatus.PARTIALLY_COMPLIANT:
        return 'status-partially-compliant';
      case ComplianceStatus.NOT_APPLICABLE:
        return 'status-not-applicable';
      default:
        return '';
    }
  }

  openMappingDialog(mapping?: RiskComplianceMapping) {
    const dialogRef = this.dialog.open(MappingFormDialogComponent, {
      width: '600px',
      data: {
        mapping: mapping || {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Mise à jour
          this.updateMapping(result);
        } else {
          // Création
          this.createMapping(result);
        }
      }
    });
  }

  createMapping(mapping: Partial<RiskComplianceMapping>) {
    this.isLoading = true;
    
    this.mappingService.createMapping(mapping).subscribe({
      next: (newMapping) => {
        this.originalData = [...this.originalData, newMapping];
        this.filterData();
        this.isLoading = false;
        this.showSuccessSnackbar('Mapping créé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la création du mapping', error);
        this.isLoading = false;
        this.showErrorSnackbar('Impossible de créer le mapping');
      }
    });
  }

  updateMapping(mapping: RiskComplianceMapping) {
    this.isLoading = true;
    
    this.mappingService.updateMapping(mapping.id, mapping).subscribe({
      next: (updatedMapping) => {
        const index = this.originalData.findIndex(m => m.id === updatedMapping.id);
        if (index !== -1) {
          const updatedData = [...this.originalData];
          updatedData[index] = updatedMapping;
          this.originalData = updatedData;
          this.filterData();
        }
        this.isLoading = false;
        this.showSuccessSnackbar('Mapping mis à jour avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du mapping', error);
        this.isLoading = false;
        this.showErrorSnackbar('Impossible de mettre à jour le mapping');
      }
    });
  }

  deleteMapping(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce mapping? Cette action est irréversible.')) {
      this.isLoading = true;
      
      this.mappingService.deleteMapping(id).subscribe({
        next: () => {
          this.originalData = this.originalData.filter(m => m.id !== id);
          this.filterData();
          this.isLoading = false;
          this.showSuccessSnackbar('Mapping supprimé avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du mapping', error);
          this.isLoading = false;
          this.showErrorSnackbar('Impossible de supprimer le mapping');
        }
      });
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

