import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComplianceFramework, ComplianceRequirement, ComplianceStatus, GapAnalysisResult, RiskComplianceMapping } from '../../../../core/models/compliance.model';
import { Risk, RiskService } from '../../../../core/services/risk.service';
import { ComplianceFrameworkService } from '../../services/compliance-framework.service';
import { RiskComplianceMappingService } from '../../services/risk-compliance-mapping.service';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gap-analysis',
  templateUrl: './gap-analysis.component.html',
  styleUrls: ['./gap-analysis.component.css']
})
export class GapAnalysisComponent implements OnInit {
  displayedColumns: string[] = ['code', 'description', 'actions'];
  dataSource = new MatTableDataSource<ComplianceRequirement>([]);
  frameworks: ComplianceFramework[] = [];
  risks: Risk[] = [];
  selectedFramework: string = '';
  selectedRisk: string = '';
  isLoading = false;
  error: string | null = null;
  gapAnalysisResult: GapAnalysisResult | null = null;
  
  // Compteurs
  compliantCount = 0;
  nonCompliantCount = 0;
  partiallyCompliantCount = 0;
  notApplicableCount = 0;
  compliancePercentage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private frameworkService: ComplianceFrameworkService,
    private mappingService: RiskComplianceMappingService,
    private riskService: RiskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadInitialData() {
    this.isLoading = true;
    this.error = null;
    
    // Chargement en parallèle des frameworks et des risques
    forkJoin({
      frameworks: this.frameworkService.getFrameworks(),
      risks: this.riskService.getRisks()
    }).subscribe({
      next: (result) => {
        this.frameworks = result.frameworks;
        this.risks = result.risks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données initiales', error);
        this.error = 'Impossible de charger les données. Veuillez réessayer.';
        this.isLoading = false;
        this.showErrorSnackbar('Impossible de charger les données');
      }
    });
  }

  loadGapAnalysis() {
    if (!this.selectedFramework) {
      this.resetGapAnalysis();
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.mappingService.getGapAnalysis(this.selectedFramework, this.selectedRisk || undefined).subscribe({
      next: (result) => {
        this.gapAnalysisResult = result;
        
        // Mettre à jour les compteurs à partir de la nouvelle structure
        this.compliantCount = result.counts[ComplianceStatus.COMPLIANT] || 0;
        this.nonCompliantCount = result.counts[ComplianceStatus.NON_COMPLIANT] || 0;
        this.partiallyCompliantCount = result.counts[ComplianceStatus.PARTIALLY_COMPLIANT] || 0;
        this.notApplicableCount = result.counts[ComplianceStatus.NOT_APPLICABLE] || 0;
        this.compliancePercentage = result.compliancePercentage || 0;
        
        // Mettre à jour le tableau avec les exigences non couvertes
        this.dataSource.data = result.gaps || [];
        this.isLoading = false;
        
        // Affichage d'un message de succès
        const message = this.selectedRisk 
          ? `Analyse d'écarts chargée pour le référentiel et le risque sélectionnés` 
          : `Analyse d'écarts chargée pour le référentiel`;
        this.showSuccessSnackbar(message);
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'analyse d\'écarts', error);
        this.error = 'Impossible de charger l\'analyse d\'écarts. Veuillez réessayer.';
        this.isLoading = false;
        this.showErrorSnackbar('Impossible de charger l\'analyse d\'écarts');
      }
    });
  }
  
  resetGapAnalysis() {
    this.gapAnalysisResult = null;
    this.dataSource.data = [];
    this.compliantCount = 0;
    this.nonCompliantCount = 0;
    this.partiallyCompliantCount = 0;
    this.notApplicableCount = 0;
    this.compliancePercentage = 0;
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

  /**
   * Crée ou récupère un mapping pour une exigence, puis redirige vers la création d'un plan d'action
   * @param requirement L'exigence pour laquelle créer un plan d'action
   */
  createActionPlan(requirement: ComplianceRequirement): void {
    if (!this.selectedRisk) {
      this.showErrorSnackbar('Veuillez sélectionner un risque avant de créer un plan d\'action');
      return;
    }

    this.isLoading = true;
    this.showInfoSnackbar('Vérification du mapping risque-conformité...');
    
    // Vérifier si un mapping existe déjà pour cette combinaison risque/exigence
    this.mappingService.getMappingByRiskAndRequirement(this.selectedRisk, requirement.id)
      .pipe(
        switchMap(mappings => {
          if (mappings && mappings.length > 0) {
            // Un mapping existe déjà, on utilise le premier trouvé
            console.debug('GapAnalysis: Mapping existant trouvé:', mappings[0]);
            return of(mappings[0]);
          } else {
            // Aucun mapping n'existe, on en crée un nouveau
            console.debug('GapAnalysis: Aucun mapping trouvé, création d\'un nouveau mapping');
            this.showInfoSnackbar('Création d\'un nouveau mapping risque-conformité...');
            
            const newMapping: Partial<RiskComplianceMapping> = {
              riskId: this.selectedRisk,
              requirementId: requirement.id,
              status: ComplianceStatus.NON_COMPLIANT,
              evidence: ''
            };
            
            return this.mappingService.createMapping(newMapping);
          }
        }),
        catchError(error => {
          console.error('GapAnalysis: Erreur lors de la vérification ou création du mapping', error);
          this.isLoading = false;
          this.showErrorSnackbar('Impossible de créer le mapping. Veuillez réessayer.');
          return of(null);
        })
      )
      .subscribe({
        next: (mapping) => {
          this.isLoading = false;
          
          if (mapping) {
            // Redirection vers la création d'un plan de remédiation avec l'ID du mapping
            console.debug('GapAnalysis: Mapping obtenu avec succès:', mapping);
            
            // Construction de l'URL de navigation
            const navigationPath = ['/remediation-plans', 'new', mapping.id];
            console.debug('GapAnalysis: Tentative de navigation vers:', navigationPath.join('/'));
            
            // Essayer d'abord avec navigate
            this.router.navigate(navigationPath).then(
              success => {
                console.debug('GapAnalysis: Navigation réussie avec navigate:', success);
                if (!success) {
                  // Si navigate échoue, essayer avec navigateByUrl
                  console.debug('GapAnalysis: Tentative avec navigateByUrl');
                  this.router.navigateByUrl(navigationPath.join('/')).then(
                    success => {
                      console.debug('GapAnalysis: Navigation réussie avec navigateByUrl:', success);
                      if (!success) {
                        console.error('GapAnalysis: Échec de la navigation');
                        this.showErrorSnackbar('Impossible d\'accéder au formulaire de création de plan');
                      }
                    },
                    error => {
                      console.error('GapAnalysis: Erreur de navigation avec navigateByUrl:', error);
                      this.showErrorSnackbar('Erreur lors de la navigation vers le formulaire de création');
                    }
                  );
                }
              },
              error => {
                console.error('GapAnalysis: Erreur de navigation avec navigate:', error);
                this.showErrorSnackbar('Erreur lors de la navigation vers le formulaire de création');
              }
            );
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('GapAnalysis: Erreur lors de la création du plan d\'action', error);
          this.showErrorSnackbar('Impossible de créer le plan d\'action. Veuillez réessayer.');
        }
      });
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

  private showInfoSnackbar(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 4000,
      panelClass: ['info-snackbar']
    });
  }
}
