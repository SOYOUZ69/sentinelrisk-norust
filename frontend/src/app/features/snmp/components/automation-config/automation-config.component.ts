import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr'; // Temporairement commenté
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { 
  SnmpAutomationConfigService, 
  SnmpScanTarget, 
  TargetStatistics,
  BatchConfigRequest 
} from '../../services/snmp-automation-config.service';

@Component({
  selector: 'app-automation-config',
  templateUrl: './automation-config.component.html',
  styleUrls: ['./automation-config.component.scss']
})
export class AutomationConfigComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private destroy$ = new Subject<void>();

  // State
  targets: SnmpScanTarget[] = [];
  filteredTargets: SnmpScanTarget[] = [];
  statistics: TargetStatistics | null = null;
  loading = false;
  syncing = false;

  // Filters and search
  searchQuery = '';
  statusFilter: 'all' | 'enabled' | 'disabled' = 'all';
  priorityFilter: 'all' | '1' | '2' | '3' | '4' | '5' = 'all';
  sortBy: 'hostname' | 'displayName' | 'priority' | 'enabled' = 'hostname';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Selection
  selectedTargets: Set<string> = new Set();
  selectAll = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 20;
  totalPages = 1;

  // UI State
  showBatchActions = false;
  showImportExport = false;

  constructor(
    private configService: SnmpAutomationConfigService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeData();
    this.setupFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialise les données
   */
  private initializeData(): void {
    // Charger les données initiales
    this.loadTargets();

    // S'abonner aux changements
    this.configService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.loading = loading);

    this.configService.targets$
      .pipe(takeUntil(this.destroy$))
      .subscribe(targets => {
        this.targets = targets;
        this.applyFilters();
      });

    this.configService.statistics$
      .pipe(takeUntil(this.destroy$))
      .subscribe(stats => this.statistics = stats);
  }

  /**
   * Configure les filtres réactifs
   */
  private setupFilters(): void {
    // Recherche avec debounce
    const searchSubject = new Subject<string>();
    searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => this.applyFilters());

    // Observer les changements de recherche
    this.onSearchChange = (query: string) => {
      this.searchQuery = query;
      searchSubject.next(query);
    };
  }

  /**
   * Charge les targets depuis l'API
   */
  loadTargets(): void {
    this.configService.getAvailableTargets()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.showMessage(`${response.targets.length} assets chargés`, 'Configuration');
        },
        error: (error) => {
          console.error('Erreur lors du chargement des targets:', error);
          this.showMessage('Erreur lors du chargement des assets', 'Erreur');
        }
      });
  }

  /**
   * Applique les filtres et le tri
   */
  applyFilters(): void {
    let filtered = [...this.targets];

    // Filtre par recherche
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(target =>
        target.hostname.toLowerCase().includes(query) ||
        (target.displayName && target.displayName.toLowerCase().includes(query)) ||
        (target.ipAddress && target.ipAddress.toLowerCase().includes(query)) ||
        (target.description && target.description.toLowerCase().includes(query))
      );
    }

    // Filtre par statut
    if (this.statusFilter !== 'all') {
      const enabled = this.statusFilter === 'enabled';
      filtered = filtered.filter(target => target.enabled === enabled);
    }

    // Filtre par priorité
    if (this.priorityFilter !== 'all') {
      const priority = parseInt(this.priorityFilter);
      filtered = filtered.filter(target => (target.priority || 3) === priority);
    }

    // Tri
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (this.sortBy) {
        case 'hostname':
          aValue = a.hostname.toLowerCase();
          bValue = b.hostname.toLowerCase();
          break;
        case 'displayName':
          aValue = (a.displayName || a.hostname).toLowerCase();
          bValue = (b.displayName || b.hostname).toLowerCase();
          break;
        case 'priority':
          aValue = a.priority || 3;
          bValue = b.priority || 3;
          break;
        case 'enabled':
          aValue = a.enabled ? 1 : 0;
          bValue = b.enabled ? 1 : 0;
          break;
        default:
          aValue = a.hostname.toLowerCase();
          bValue = b.hostname.toLowerCase();
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredTargets = filtered;
    this.updatePagination();
  }

  /**
   * Met à jour la pagination
   */
  private updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTargets.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
  }

  /**
   * Obtient les targets pour la page courante
   */
  getPaginatedTargets(): SnmpScanTarget[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredTargets.slice(start, end);
  }

  /**
   * Change de page
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /**
   * Change le tri
   */
  changeSort(field: 'hostname' | 'displayName' | 'priority' | 'enabled'): void {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  /**
   * Basculer l'activation d'un target
   */
  toggleTarget(target: SnmpScanTarget): void {
    const newStatus = !target.enabled;
    
    this.configService.updateTargetStatus(target.zabbixHostId, newStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const action = newStatus ? 'activé' : 'désactivé';
          this.showMessage(`Asset ${this.getEffectiveDisplayName(target)} ${action}`, 'Configuration');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.showMessage('Erreur lors de la mise à jour du statut', 'Erreur');
        }
      });
  }

  /**
   * Configure un target avec priorité
   */
  configureTarget(target: SnmpScanTarget, enabled: boolean, priority: number): void {
    this.configService.configureTarget(target.zabbixHostId, enabled, priority)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const action = enabled ? 'activé' : 'désactivé';
          this.showMessage(`Asset ${this.getEffectiveDisplayName(target)} ${action}`, 'Configuration');
        },
        error: (error) => {
          console.error('Erreur lors de la configuration:', error);
          this.showMessage('Erreur lors de la configuration', 'Erreur');
        }
      });
  }

  /**
   * Bascule la sélection d'un target
   */
  toggleSelection(target: SnmpScanTarget, event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedTargets.add(target.zabbixHostId);
    } else {
      this.selectedTargets.delete(target.zabbixHostId);
    }
    
    this.updateSelectAllState();
    this.showBatchActions = this.selectedTargets.size > 0;
  }

  /**
   * Sélectionner/désélectionner tous
   */
  toggleSelectAll(): void {
    if (this.selectAll) {
      this.selectedTargets.clear();
    } else {
      this.getPaginatedTargets().forEach(target => {
        this.selectedTargets.add(target.zabbixHostId);
      });
    }
    this.updateSelectAllState();
  }

  /**
   * Met à jour l'état "tout sélectionner"
   */
  private updateSelectAllState(): void {
    const paginatedTargets = this.getPaginatedTargets();
    this.selectAll = paginatedTargets.length > 0 && 
                    paginatedTargets.every(target => this.selectedTargets.has(target.zabbixHostId));
    this.showBatchActions = this.selectedTargets.size > 0;
  }

  /**
   * Actions en lot
   */
  batchEnable(): void {
    this.executeBatchAction(true);
  }

  batchDisable(): void {
    this.executeBatchAction(false);
  }

  batchSetPriority(priority: number): void {
    this.executeBatchAction(null, priority);
  }

  private executeBatchAction(enabled?: boolean | null, priority?: number): void {
    const hostIds = Array.from(this.selectedTargets);
    
    if (hostIds.length === 0) {
      this.showMessage('Aucun asset sélectionné', 'Action en lot');
      return;
    }

    const request: BatchConfigRequest = {
      hostIds: hostIds,
      enabled: enabled !== null ? enabled! : true,
      priority: priority
    };

    this.configService.configureBatchTargets(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const message = `${response.successful || hostIds.length} assets configurés`;
          this.showMessage(message, 'Action en lot');
          this.selectedTargets.clear();
          this.updateSelectAllState();
        },
        error: (error) => {
          console.error('Erreur lors de l\'action en lot:', error);
          this.showMessage('Erreur lors de l\'action en lot', 'Erreur');
        }
      });
  }

  /**
   * Synchroniser avec Zabbix
   */
  synchronizeWithZabbix(): void {
    this.syncing = true;
    
    this.configService.synchronizeTargets()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.syncing = false;
          this.showMessage(`${response.updated || 0} assets synchronisés`, 'Synchronisation');
        },
        error: (error) => {
          this.syncing = false;
          console.error('Erreur lors de la synchronisation:', error);
          this.showMessage('Erreur lors de la synchronisation', 'Erreur');
        }
      });
  }

  /**
   * Exporter la configuration
   */
  exportConfiguration(): void {
    this.configService.exportConfiguration()
      .pipe(takeUntil(this.destroy$))
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `snmp-automation-config-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.showMessage('Configuration exportée', 'Export');
      });
  }

  /**
   * Importer la configuration
   */
  importConfiguration(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      this.configService.importConfiguration(file)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result) => {
            this.showMessage(`${result.imported} assets importés`, 'Import');
            input.value = ''; // Reset input
          },
          error: (error) => {
            console.error('Erreur lors de l\'import:', error);
            this.showMessage('Erreur lors de l\'import', 'Erreur');
            input.value = ''; // Reset input
          }
        });
    }
  }

  /**
   * Affiche un message à l'utilisateur
   */
  private showMessage(message: string, title: string): void {
    this.snackBar.open(`${title}: ${message}`, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  /**
   * Utilitaires
   */
  getEffectiveDisplayName(target: SnmpScanTarget): string {
    return this.configService.getEffectiveDisplayName(target);
  }

  getFormattedPriority(priority?: number): string {
    return this.configService.getFormattedPriority(priority);
  }

  getPriorityColor(priority?: number): string {
    return this.configService.getPriorityColor(priority);
  }

  isValidForScan(target: SnmpScanTarget): boolean {
    return this.configService.isValidForScan(target);
  }

  /**
   * Gère le changement de recherche
   */
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onSearchChange(target?.value || '');
  }

  /**
   * Met à jour la recherche
   */
  onSearchChange: (query: string) => void = () => {};

  /**
   * Obtient les pages pour la pagination
   */
  getPages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  /**
   * Rafraîchir les données
   */
  refresh(): void {
    this.loadTargets();
  }

  /**
   * Réinitialiser les filtres
   */
  resetFilters(): void {
    this.searchQuery = '';
    this.statusFilter = 'all';
    this.priorityFilter = 'all';
    this.sortBy = 'hostname';
    this.sortDirection = 'asc';
    this.currentPage = 1;
    this.applyFilters();
  }
} 