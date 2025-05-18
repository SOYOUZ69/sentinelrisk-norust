import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplianceFramework, ComplianceRequirement, ComplianceStatus, GapAnalysisResult } from '../../../../core/models/compliance.model';
import { Risk, RiskService } from '../../../../core/services/risk.service';
import { ComplianceFrameworkService } from '../../services/compliance-framework.service';
import { RiskComplianceMappingService } from '../../services/risk-compliance-mapping.service';
import { forkJoin } from 'rxjs';

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

  createActionPlan(requirement: ComplianceRequirement) {
    // Cette fonctionnalité sera implémentée dans le futur
    this.showInfoSnackbar('La création de plans d\'action sera bientôt disponible');
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
