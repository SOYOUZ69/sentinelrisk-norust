import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DashboardService } from './services/dashboard.service';
import { DashboardRealDataService, DashboardRealData } from './services/dashboard-real-data.service';
import { DashboardExportService, ExportOptions } from './services/dashboard-export.service';
import { 
  RiskSummary, 
  ComplianceSummary, 
  SnmpSummary, 
  ActionPlansSummary,
  DashboardFilter,
  ChartData,
  DEFAULT_COLOR_SCHEME,
  RISK_LEVEL_COLORS,
  COMPLIANCE_COLORS,
  SNMP_STATUS_COLORS 
} from '../../core/models/dashboard.model';
import { RiskService } from '../../features/risks/services/risk.service';
import { Risk } from '../../core/models/risk.model';
import { ComplianceFrameworkService } from '../../features/compliance/services/compliance-framework.service';
import { ComplianceRequirementService } from '../../features/compliance/services/compliance-requirement.service';
import { RemediationPlanService } from '../../features/remediation-plan/services/remediation-plan.service';
import { SnmpService } from '../../features/snmp/services/snmp.service';
import { ComplianceFramework, ComplianceRequirement, ComplianceStatus } from '../../core/models/compliance.model';
import { RemediationPlan, RemediationPlanStatus } from '../../core/models/remediation-plan.model';
import { Asset } from '../../features/snmp/models/asset.model';
import { SnmpAutomationConfigService, ConfigurationResponse } from '../../features/snmp/services/snmp-automation-config.service';
import { ScanHistoryService } from '../../features/snmp/services/scan-history.service';
import { ScanStatistics } from '../../features/snmp/models/scan-history.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();
  private resizeObserver?: ResizeObserver;
  private isResizing = false; // Flag pour éviter les cycles infinis
  private lastDimensions = new Map<string, [number, number]>(); // Cache des dernières dimensions
  
  // ViewChild pour les containers de graphiques
  @ViewChild('riskLevelChartContainer') riskLevelChartContainer!: ElementRef;
  @ViewChild('riskCategoryChartContainer') riskCategoryChartContainer!: ElementRef;
  @ViewChild('complianceStatusChartContainer') complianceStatusChartContainer!: ElementRef;
  @ViewChild('complianceFrameworkChartContainer') complianceFrameworkChartContainer!: ElementRef;
  @ViewChild('snmpTypeChartContainer') snmpTypeChartContainer!: ElementRef;
  @ViewChild('snmpStatusChartContainer') snmpStatusChartContainer!: ElementRef;
  @ViewChild('planStatusChartContainer') planStatusChartContainer!: ElementRef;
  
  // Form pour les filtres
  filterForm!: FormGroup;
  
  // Données réelles du dashboard
  realData: DashboardRealData | null = null;
  
  // Données du dashboard - INITIALISÉES À VIDE
  riskSummary: RiskSummary = {
    totalRisks: 0,
    risksByLevel: {},
    risksByCategory: {},
    openRisks: 0,
    closedRisks: 0
  };

  complianceSummary: ComplianceSummary = {
    totalControls: 0,
    compliantControls: 0,
    nonCompliantControls: 0,
    complianceRate: 0,
    controlsByFramework: {},
    controlsByStatus: {}
  };

  snmpSummary: SnmpSummary = {
    totalAssets: 0,
    activeAssets: 0,
    inactiveAssets: 0,
    assetsByType: {},
    assetsByStatus: {},
    recentScans: 0,
    failedScans: 0,
    successRate: 0
  };

  actionPlansSummary: ActionPlansSummary = {
    totalPlans: 0,
    activePlans: 0,
    completedPlans: 0,
    overduePlans: 0,
    plansByStatus: {},
    completionRate: 0
  };
  
  // État du chargement - ACTIVÉ pour charger les vraies données
  isLoading = true;
  error: string | null = null;
  
  // Données formatées pour les graphiques
  riskLevelChart: ChartData[] = [];
  riskCategoryChart: ChartData[] = [];
  complianceStatusChart: ChartData[] = [];
  complianceFrameworkChart: ChartData[] = [];
  snmpTypeChart: ChartData[] = [];
  snmpStatusChart: ChartData[] = [];
  planStatusChart: ChartData[] = [];
  
  // Configuration des graphiques
  colorScheme = DEFAULT_COLOR_SCHEME;
  riskLevelColors = RISK_LEVEL_COLORS;
  complianceColors = COMPLIANCE_COLORS;
  snmpColors = SNMP_STATUS_COLORS;
  
  // Options des graphiques
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  animations = true;
  
  // Dimensions fixes pour les graphiques
  riskLevelChartView: [number, number] = [400, 300];
  riskCategoryChartView: [number, number] = [400, 300];
  complianceStatusChartView: [number, number] = [400, 300];
  complianceFrameworkChartView: [number, number] = [400, 300];
  snmpTypeChartView: [number, number] = [400, 300];
  snmpStatusChartView: [number, number] = [400, 300];
  planStatusChartView: [number, number] = [400, 300];
  
  // Options pour les filtres
  frameworkOptions = [
    { value: '', label: 'Tous les référentiels' },
    { value: 'ISO 27001', label: 'ISO 27001' },
    { value: 'NIST', label: 'NIST' },
    { value: 'SOC 2', label: 'SOC 2' },
    { value: 'GDPR', label: 'GDPR' }
  ];
  
  roleOptions = [
    { value: '', label: 'Tous les rôles' },
    { value: 'admin', label: 'Administrateur' },
    { value: 'risk_manager', label: 'Gestionnaire des risques' },
    { value: 'compliance_officer', label: 'Responsable conformité' },
    { value: 'auditor', label: 'Auditeur' },
    { value: 'user', label: 'Utilisateur' }
  ];

  constructor(
    private dashboardService: DashboardService,
    private dashboardRealDataService: DashboardRealDataService,
    private dashboardExportService: DashboardExportService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private riskService: RiskService,
    private complianceFrameworkService: ComplianceFrameworkService,
    private complianceRequirementService: ComplianceRequirementService,
    private remediationPlanService: RemediationPlanService,
    private snmpService: SnmpService,
    private snmpAutomationConfigService: SnmpAutomationConfigService,
    private scanHistoryService: ScanHistoryService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Charger les données initiales
    this.loadDashboardData();
    // Charger les historiques pour realData (évolution)
    this.dashboardRealDataService.getDashboardRealData().subscribe({
      next: (realData) => {
        this.realData = realData;
        this.cdr.markForCheck();
      },
      error: () => {
        this.realData = null;
        this.cdr.markForCheck();
      }
    });
    // Écouter les changements de filtres
    this.filterForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.loadDashboardData();
    });
  }

  ngAfterViewInit(): void {
      this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  /**
   * Charge toutes les données du dashboard depuis les APIs
   */
  loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;
    this.cdr.markForCheck();

    // --- RISQUES ---
    this.riskService.getRisks().subscribe({
      next: (risks: Risk[]) => {
        this.riskSummary = {
          totalRisks: risks.length,
          risksByLevel: risks.reduce((acc, risk) => {
            acc[risk.impactLevel] = (acc[risk.impactLevel] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number }),
          risksByCategory: risks.reduce((acc, risk) => {
            acc[risk.categoryName] = (acc[risk.categoryName] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number }),
          openRisks: risks.filter(r => ['IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED'].includes(r.status)).length,
          closedRisks: risks.filter(r => ['CLOSED', 'ACCEPTED'].includes(r.status)).length
        };
        this.updateChartData();
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des risques';
        this.updateChartData();
        this.cdr.markForCheck();
      }
    });

    // --- CONFORMITÉ ---
    this.complianceRequirementService.getRequirements().subscribe({
      next: (requirements: ComplianceRequirement[]) => {
        const totalControls = requirements.length;
        this.complianceSummary = {
          totalControls,
          compliantControls: 0, // TODO: à calculer si la donnée est disponible
          nonCompliantControls: 0, // TODO: à calculer si la donnée est disponible
          complianceRate: 0, // TODO: à calculer si la donnée est disponible
          controlsByFramework: requirements.reduce((acc, req) => {
            const fw = req.framework?.name || 'Inconnu';
            acc[fw] = (acc[fw] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number }),
          controlsByStatus: {} // TODO: à remplir si la donnée est disponible
        };
        this.updateChartData();
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des exigences de conformité';
        this.updateChartData();
        this.cdr.markForCheck();
      }
    });

    // --- PLANS D'ACTION ---
    this.remediationPlanService.getPlans().subscribe({
      next: (plans: RemediationPlan[]) => {
        this.actionPlansSummary = {
          totalPlans: plans.length,
          activePlans: plans.filter(p => p.status === RemediationPlanStatus.IN_PROGRESS).length,
          completedPlans: plans.filter(p => p.status === RemediationPlanStatus.DONE).length,
          overduePlans: 0, // À calculer si besoin
          plansByStatus: plans.reduce((acc, plan) => {
            acc[plan.status] = (acc[plan.status] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number }),
          completionRate: plans.length > 0 ? (plans.filter(p => p.status === RemediationPlanStatus.DONE).length / plans.length) * 100 : 0
        };
        this.updateChartData();
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des plans d\'action';
        this.updateChartData();
        this.cdr.markForCheck();
      }
    });

    // --- SNMP ---
    this.snmpAutomationConfigService.getAvailableTargets().subscribe({
      next: (response: ConfigurationResponse) => {
        const assets = response.targets;
        const stats = response.statistics;
        this.snmpSummary = {
          totalAssets: stats.totalTargets,
          activeAssets: stats.enabledTargets,
          inactiveAssets: stats.disabledTargets,
          assetsByType: assets.reduce((acc, asset) => {
            const type = asset.description || 'Inconnu';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number }),
          assetsByStatus: {
            ACTIVE: stats.enabledTargets,
            INACTIVE: stats.disabledTargets
          },
          recentScans: 0, // sera mis à jour ci-dessous
          failedScans: 0, // sera mis à jour ci-dessous
          successRate: 0, // sera mis à jour ci-dessous
          averageDurationMs: 0 // sera mis à jour ci-dessous
        };
        // Appel à l'API des statistiques de scans SNMP
        this.scanHistoryService.getStatistics().subscribe({
          next: (scanStats: ScanStatistics) => {
            this.snmpSummary.successRate = scanStats.successRate;
            this.snmpSummary.recentScans = scanStats.totalScans;
            this.snmpSummary.failedScans = scanStats.failedScans;
            this.snmpSummary.averageDurationMs = scanStats.averageDurationMs;
            // Remplir le camembert État des scans
            this.snmpStatusChart = [
              { name: 'Succès', value: scanStats.successfulScans },
              { name: 'Échecs', value: scanStats.failedScans }
            ];
            this.updateChartData();
            this.cdr.markForCheck();
          },
          error: () => {
            this.updateChartData();
            this.cdr.markForCheck();
          }
        });
        this.isLoading = false;
        this.updateChartData();
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des assets SNMP';
        this.isLoading = false;
        this.updateChartData();
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Met à jour les données du dashboard à partir des données réelles
   */
  private updateDashboardDataFromRealData(realData: DashboardRealData): void {
    // Mettre à jour les risques
    this.riskSummary = {
      totalRisks: realData.risks.totalRisks,
      risksByLevel: this.convertToObject(realData.risks.risksByLevel),
      risksByCategory: this.convertToObject(realData.risks.risksByCategory),
      openRisks: realData.risks.openRisks,
      closedRisks: realData.risks.closedRisks
    };

    // Mettre à jour la conformité
    this.complianceSummary = {
      totalControls: realData.controls.totalControls,
      compliantControls: Math.round(realData.controls.totalControls * (realData.controls.averageEffectiveness / 100)),
      nonCompliantControls: Math.round(realData.controls.totalControls * ((100 - realData.controls.averageEffectiveness) / 100)),
      complianceRate: realData.controls.averageEffectiveness,
      controlsByFramework: {},
      controlsByStatus: {}
    };

    // Mettre à jour les plans d'action
    this.actionPlansSummary = {
      totalPlans: realData.remediationPlans.totalPlans,
      activePlans: realData.remediationPlans.plansByStatus.find(p => p.status === 'IN_PROGRESS')?.count || 0,
      completedPlans: realData.remediationPlans.plansByStatus.find(p => p.status === 'DONE')?.count || 0,
      overduePlans: 0, // À calculer si nécessaire
      plansByStatus: this.convertToObject(realData.remediationPlans.plansByStatus),
      completionRate: realData.remediationPlans.completionRate
    };
  }

  /**
   * Convertit un tableau en objet pour la compatibilité
   */
  private convertToObject(array: any[]): { [key: string]: number } {
    const obj: { [key: string]: number } = {};
    array.forEach(item => {
      const key = Object.keys(item).find(k => k !== 'count');
      if (key) {
        obj[item[key]] = item.count;
      }
    });
    return obj;
  }

  /**
   * Exporte les données du dashboard
   */
  exportDashboard(format: 'pdf' | 'excel'): void {
    if (!this.realData) {
      console.error('Aucune donnée disponible pour l\'export');
      return;
    }

    const options: ExportOptions = {
      format,
      includeCharts: true,
      includeHistory: true,
      dateRange: {
        start: this.filterForm.get('startDate')?.value,
        end: this.filterForm.get('endDate')?.value
      }
    };

    this.dashboardExportService.exportDashboard(this.realData, options);
  }

  /**
   * Rafraîchit manuellement les données
   */
  refreshData(): void {
    this.loadDashboardData();
  }

  /**
   * Réinitialise les filtres
   */
  resetFilters(): void {
    this.filterForm.reset();
    this.loadDashboardData();
  }

  /**
   * Construit le filtre à partir du formulaire
   */
  private buildFilterFromForm(): DashboardFilter {
    const formValue = this.filterForm.value;
    return {
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      framework: formValue.framework,
      role: formValue.role,
      assetId: formValue.assetId
    };
  }

  /**
   * Initialise le formulaire de filtres
   */
  private initializeForm(): void {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null],
      framework: [''],
      role: [''],
      assetId: ['']
    });
  }

  /**
   * Configure l'observer de redimensionnement pour les graphiques
   */
  private setupResizeObserver(): void {
    if (!window.ResizeObserver) {
      console.warn('ResizeObserver non supporté, les graphiques ne se redimensionneront pas automatiquement');
          return;
        }

    this.resizeObserver = new ResizeObserver(entries => {
      if (this.isResizing) return;
      
          this.isResizing = true;
            setTimeout(() => {
        this.updateChartDimensions();
              this.isResizing = false;
            }, 100);
      });

      // Observer tous les containers de graphiques
      const containers = [
        this.riskLevelChartContainer,
        this.riskCategoryChartContainer,
        this.complianceStatusChartContainer,
        this.complianceFrameworkChartContainer,
        this.snmpTypeChartContainer,
        this.snmpStatusChartContainer,
        this.planStatusChartContainer
      ];

      containers.forEach(container => {
        if (container?.nativeElement) {
        this.resizeObserver?.observe(container.nativeElement);
        }
      });
  }

  /**
   * Met à jour les dimensions des graphiques
   */
  private updateChartDimensions(): void {
    const containers = [
      { ref: this.riskLevelChartContainer, view: 'riskLevelChartView' },
      { ref: this.riskCategoryChartContainer, view: 'riskCategoryChartView' },
      { ref: this.complianceStatusChartContainer, view: 'complianceStatusChartView' },
      { ref: this.complianceFrameworkChartContainer, view: 'complianceFrameworkChartView' },
      { ref: this.snmpTypeChartContainer, view: 'snmpTypeChartView' },
      { ref: this.snmpStatusChartContainer, view: 'snmpStatusChartView' },
      { ref: this.planStatusChartContainer, view: 'planStatusChartView' }
    ];

    containers.forEach(({ ref, view }) => {
      if (ref?.nativeElement) {
        const rect = ref.nativeElement.getBoundingClientRect();
        const width = Math.max(300, rect.width - 32); // 32px pour le padding
        const height = Math.max(250, rect.height - 64); // 64px pour le titre et padding
        
        const currentDimensions = this.lastDimensions.get(view);
        if (!currentDimensions || currentDimensions[0] !== width || currentDimensions[1] !== height) {
          this.lastDimensions.set(view, [width, height]);
          (this as any)[view] = [width, height];
        }
      }
    });

    this.cdr.markForCheck();
  }

  /**
   * Met à jour les données des graphiques
   */
  private updateChartData(): void {
    if (this.riskSummary) {
      this.riskLevelChart = this.objectToChartData(this.riskSummary.risksByLevel);
      this.riskCategoryChart = this.objectToChartData(this.riskSummary.risksByCategory);
    }
    
    if (this.complianceSummary) {
      this.complianceStatusChart = this.objectToChartData(this.complianceSummary.controlsByStatus);
      this.complianceFrameworkChart = this.objectToChartData(this.complianceSummary.controlsByFramework);
    }
    
    if (this.snmpSummary) {
      this.snmpTypeChart = this.objectToChartData(this.snmpSummary.assetsByType);
      this.snmpStatusChart = this.objectToChartData(this.snmpSummary.assetsByStatus);
    }
    
    if (this.actionPlansSummary) {
      this.planStatusChart = this.objectToChartData(this.actionPlansSummary.plansByStatus);
    }

    // Déclencher la détection de changements pour OnPush
    this.cdr.markForCheck();
  }

  /**
   * Convertit un objet en données de graphique
   */
  private objectToChartData(obj: { [key: string]: number }): ChartData[] {
    return Object.entries(obj)
      .filter(([name, value]) => name !== undefined && name !== null && name !== '' && typeof value === 'number' && !isNaN(value))
      .map(([name, value]) => ({ name, value }));
  }

  // Méthodes pour les événements des graphiques
  onChartSelect(event: any): void {
    console.log('Chart select:', event);
  }

  onChartActivate(event: any): void {
    console.log('Chart activate:', event);
  }

  onChartDeactivate(event: any): void {
    console.log('Chart deactivate:', event);
  }
} 