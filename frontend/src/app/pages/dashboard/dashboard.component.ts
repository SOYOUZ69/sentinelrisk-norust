import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DashboardService } from './services/dashboard.service';
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
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Charger les données initiales
    this.loadDashboardData();
    
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

    const filter = this.buildFilterFromForm();
    
    this.dashboardService.getGlobalSummary(filter).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.riskSummary = data.risks;
        this.complianceSummary = data.compliance;
        this.snmpSummary = data.snmp;
        this.actionPlansSummary = data.plans;
        
        this.updateChartData();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Erreur lors du chargement du dashboard:', error);
        this.error = 'Erreur lors du chargement des données du dashboard';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
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
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
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