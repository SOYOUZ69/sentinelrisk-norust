import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RemediationPlanService } from '../../services/remediation-plan.service';
import { RemediationPlan, RemediationPlanStatus } from '../../../../core/models/remediation-plan.model';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'mappingSummary', 'ownerName', 'dueDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<RemediationPlan>([]);
  isLoading = false;
  error: string | null = null;
  mappingId: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private planService: RemediationPlanService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.debug('PlanList: Initialisation du composant');
    console.debug('PlanList: URL actuelle:', window.location.href);
    
    this.route.paramMap.subscribe(params => {
      console.debug('PlanList: Paramètres reçus:', params);
      this.mappingId = params.get('mappingId');
      console.debug('PlanList: MappingId extrait:', this.mappingId);
      this.loadPlans();
    });

    // S'abonner aux changements d'URL pour le débogage
    this.router.events.subscribe(event => {
      console.debug('PlanList: Événement de routage:', event);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPlans() {
    console.debug('PlanList: Chargement des plans, mappingId:', this.mappingId);
    this.isLoading = true;
    this.error = null;

    const request = this.mappingId 
      ? this.planService.getPlansByMapping(this.mappingId)
      : this.planService.getPlans();

    request.subscribe({
      next: (plans) => {
        console.debug('PlanList: Plans récupérés:', plans.length);
        console.debug('PlanList: Données des plans:', plans);
        this.dataSource.data = plans;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('PlanList: Erreur lors du chargement des plans', error);
        this.error = 'Impossible de charger les plans de remédiation. Veuillez réessayer.';
        this.isLoading = false;
        this.showErrorSnackbar(this.error);
      }
    });
  }

  createPlan() {
    console.debug('PlanList: Création d\'un nouveau plan pour mappingId:', this.mappingId);
    if (this.mappingId) {
      const url = ['/remediation-plans/new', this.mappingId];
      console.debug('PlanList: Navigation vers', url.join('/'));
      this.router.navigate(url).then(
        success => console.debug('PlanList: Navigation réussie:', success),
        error => console.error('PlanList: Erreur de navigation:', error)
      );
    } else {
      this.showErrorSnackbar('Veuillez d\'abord sélectionner un mapping');
    }
  }

  editPlan(plan: RemediationPlan) {
    console.debug('PlanList: Édition du plan:', plan.id);
    const url = ['/remediation-plans/edit', plan.id];
    console.debug('PlanList: Navigation vers', url.join('/'));
    this.router.navigate(url).then(
      success => console.debug('PlanList: Navigation réussie:', success),
      error => console.error('PlanList: Erreur de navigation:', error)
    );
  }

  viewPlanDetails(plan: RemediationPlan) {
    console.debug('PlanList: Affichage des détails du plan:', plan.id);
    const url = ['/remediation-plans/detail', plan.id];
    console.debug('PlanList: Navigation vers', url.join('/'));
    this.router.navigate(url).then(
      success => console.debug('PlanList: Navigation réussie:', success),
      error => console.error('PlanList: Erreur de navigation:', error)
    );
  }

  deletePlan(plan: RemediationPlan) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le plan "${plan.title}" ?`)) {
      this.planService.deletePlan(plan.id!).subscribe({
        next: () => {
          this.loadPlans();
          this.showSuccessSnackbar('Plan supprimé avec succès');
        },
        error: (error) => {
          console.error(`Erreur lors de la suppression du plan ${plan.id}`, error);
          this.showErrorSnackbar('Impossible de supprimer le plan. Veuillez réessayer.');
        }
      });
    }
  }

  getStatusClass(status: RemediationPlanStatus): string {
    switch (status) {
      case RemediationPlanStatus.TODO:
        return 'status-todo';
      case RemediationPlanStatus.IN_PROGRESS:
        return 'status-in-progress';
      case RemediationPlanStatus.DONE:
        return 'status-done';
      default:
        return '';
    }
  }

  getStatusLabel(status: RemediationPlanStatus): string {
    switch (status) {
      case RemediationPlanStatus.TODO:
        return 'À faire';
      case RemediationPlanStatus.IN_PROGRESS:
        return 'En cours';
      case RemediationPlanStatus.DONE:
        return 'Terminé';
      default:
        return status;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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