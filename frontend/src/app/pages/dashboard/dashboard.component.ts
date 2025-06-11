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
  
  // Données du dashboard - DONNÉES STATIQUES TEMPORAIRES
  riskSummary: RiskSummary = {
    totalRisks: 36,
    risksByLevel: {
      'FAIBLE': 10,
      'MOYEN': 15,
      'ÉLEVÉ': 8,
      'CRITIQUE': 3
    },
    risksByCategory: {
      'OPÉRATIONNEL': 18,
      'FINANCIER': 12,
      'TECHNIQUE': 6
    },
    openRisks: 30,
    closedRisks: 6
  };

  complianceSummary: ComplianceSummary = {
    totalControls: 60,
    compliantControls: 40,
    nonCompliantControls: 15,
    complianceRate: 66.7,
    controlsByFramework: {
      'ISO 27001': 25,
      'NIST': 20,
      'SOC 2': 15
    },
    controlsByStatus: {
      'CONFORME': 40,
      'NON CONFORME': 15,
      'EN COURS': 5
    }
  };

  snmpSummary: SnmpSummary = {
    totalAssets: 55,
    activeAssets: 45,
    inactiveAssets: 10,
    assetsByType: {
      'SERVEUR': 20,
      'COMMUTATEUR': 15,
      'ROUTEUR': 8,
      'IMPRIMANTE': 12
    },
    assetsByStatus: {
      'ACTIF': 45,
      'INACTIF': 10
    },
    recentScans: 25,
    failedScans: 3,
    successRate: 88.0
  };

  actionPlansSummary: ActionPlansSummary = {
    totalPlans: 23,
    activePlans: 8,
    completedPlans: 12,
    overduePlans: 3,
    plansByStatus: {
      'ACTIF': 8,
      'TERMINÉ': 12,
      'EN RETARD': 3
    },
    completionRate: 52.2
  };
  
  // État du chargement - désactivé en mode statique
  isLoading = false;
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
    this.setupFormSubscription();
    // Charger les données statiques au lieu des appels HTTP
    this.loadStaticDashboardData();
  }

  ngAfterViewInit(): void {
    // Calculer les dimensions des graphiques après que la vue soit initialisée
    setTimeout(() => {
      const hasChanged = this.calculateChartDimensions();
      this.setupResizeObserver();
      
      // Ne déclencher la détection que si nécessaire
      if (hasChanged) {
        this.cdr.markForCheck();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Nettoyer le ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    // Nettoyer le cache des dimensions
    this.lastDimensions.clear();
    this.isResizing = false;
  }

  private initializeForm(): void {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null],
      framework: [''],
      role: ['']
    });
  }

  private setupFormSubscription(): void {
    // Désactiver temporairement la réactivité des filtres en mode statique
    // this.filterForm.valueChanges
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     debounceTime(500),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(() => {
    //     this.loadDashboardData();
    //   });
  }

  // NOUVELLE MÉTHODE : Chargement des données statiques
  private loadStaticDashboardData(): void {
    this.isLoading = false;
    this.error = null;
    
    // Les données sont déjà définies dans les propriétés de classe
    // Il suffit de mettre à jour les graphiques
    this.updateChartData();
    
    console.log('Dashboard en mode statique - données chargées');
  }

  // NOUVELLE MÉTHODE : Calcul des dimensions des graphiques avec vérification des changements
  private calculateChartDimensions(): boolean {
    if (this.isResizing) {
      return false; // Éviter les cycles infinis
    }

    const containers = [
      { ref: this.riskLevelChartContainer, view: 'riskLevelChartView' },
      { ref: this.riskCategoryChartContainer, view: 'riskCategoryChartView' },
      { ref: this.complianceStatusChartContainer, view: 'complianceStatusChartView' },
      { ref: this.complianceFrameworkChartContainer, view: 'complianceFrameworkChartView' },
      { ref: this.snmpTypeChartContainer, view: 'snmpTypeChartView' },
      { ref: this.snmpStatusChartContainer, view: 'snmpStatusChartView' },
      { ref: this.planStatusChartContainer, view: 'planStatusChartView' }
    ];

    let hasChanged = false;

    containers.forEach(container => {
      if (container.ref?.nativeElement) {
        const rect = container.ref.nativeElement.getBoundingClientRect();
        const width = Math.max(rect.width - 40, 300); // Minimum 300px, avec padding
        const height = Math.max(rect.height - 40, 250); // Minimum 250px, avec padding
        
        const newDimensions: [number, number] = [width, height];
        const lastDimensions = this.lastDimensions.get(container.view);
        
        // Vérifier si les dimensions ont réellement changé (avec une tolérance de 5px)
        if (!lastDimensions || 
            Math.abs(lastDimensions[0] - width) > 5 || 
            Math.abs(lastDimensions[1] - height) > 5) {
          
          (this as any)[container.view] = newDimensions;
          this.lastDimensions.set(container.view, newDimensions);
          hasChanged = true;
          
          console.log(`Dimensions mises à jour pour ${container.view}:`, newDimensions);
        }
      }
    });

    if (hasChanged) {
      console.log('Dimensions des graphiques calculées et mises à jour');
    }

    return hasChanged;
  }

  // NOUVELLE MÉTHODE : Configuration du ResizeObserver avec protection contre les cycles infinis
  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      let resizeTimeout: any;
      
      this.resizeObserver = new ResizeObserver((entries) => {
        // Éviter les cycles infinis
        if (this.isResizing) {
          return;
        }

        // Throttling pour éviter les re-calculs excessifs
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.isResizing = true;
          
          try {
            const hasChanged = this.calculateChartDimensions();
            
            // Ne déclencher la détection de changements que si les dimensions ont vraiment changé
            if (hasChanged) {
              this.cdr.markForCheck(); // Utiliser markForCheck au lieu de detectChanges
            }
          } finally {
            // Réactiver l'observation après un délai
            setTimeout(() => {
              this.isResizing = false;
            }, 100);
          }
        }, 300);
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
          this.resizeObserver!.observe(container.nativeElement);
        }
      });
      
      console.log('ResizeObserver configuré pour', containers.length, 'containers');
    }
  }

  // ANCIENNE MÉTHODE : Commentée pour le mode statique
  private loadDashboardData(): void {
    // MODE STATIQUE : Cette méthode est temporairement désactivée
    console.log('Mode statique activé - pas d\'appel HTTP');
    return;
    
    /* APPELS HTTP COMMENTÉS TEMPORAIREMENT
    this.isLoading = true;
    this.error = null;
    
    const filter: DashboardFilter = this.filterForm.value;
    
    forkJoin({
      risks: this.dashboardService.getRiskSummary(filter),
      compliance: this.dashboardService.getComplianceSummary(filter),
      snmp: this.dashboardService.getSnmpSummary(filter),
      plans: this.dashboardService.getActionPlansSummary(filter)
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.riskSummary = data.risks;
        this.complianceSummary = data.compliance;
        this.snmpSummary = data.snmp;
        this.actionPlansSummary = data.plans;
        this.updateChartData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données du dashboard:', error);
        this.error = 'Erreur lors du chargement des données. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
    */
  }

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

  private objectToChartData(obj: { [key: string]: number }): ChartData[] {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
  }

  onRefresh(): void {
    // En mode statique, simuler un rafraîchissement
    console.log('Rafraîchissement en mode statique');
    this.loadStaticDashboardData();
  }

  onResetFilters(): void {
    this.filterForm.reset();
    // En mode statique, pas de rechargement des données
    console.log('Filtres réinitialisés (mode statique)');
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