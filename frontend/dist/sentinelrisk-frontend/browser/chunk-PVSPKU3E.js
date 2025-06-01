import {
  UserService
} from "./chunk-ZNN45TJ3.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-WTZCJFYH.js";
import {
  RiskService
} from "./chunk-BKWXZJTP.js";
import {
  MatPaginator,
  MatPaginatorModule,
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-2ESS6S3M.js";
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-R2B4LHFC.js";
import {
  ConfirmDialogComponent
} from "./chunk-3A2JNQVP.js";
import {
  ApiService
} from "./chunk-PMRQPNHV.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatDialog,
  MatDialogModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatInput,
  MatInputModule,
  MatLabel,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatSelect,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule,
  MatSuffix,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-PKA5PYFO.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatIcon,
  MatIconModule,
  MatTooltip,
  MatTooltipModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-X5WSOYDN.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-N47WCMZ2.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-SOQ7WNQA.js";
import {
  ActivatedRoute,
  CommonModule,
  DatePipe,
  MatNativeDateModule,
  MatOption,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  RouterModule,
  catchError,
  finalize,
  forkJoin,
  of,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-N6MSFXF2.js";

// src/app/features/assessments/models/assessment.model.ts
var AssessmentStatus;
(function(AssessmentStatus2) {
  AssessmentStatus2["PLANNED"] = "PLANNED";
  AssessmentStatus2["IN_PROGRESS"] = "IN_PROGRESS";
  AssessmentStatus2["COMPLETED"] = "COMPLETED";
  AssessmentStatus2["CANCELLED"] = "CANCELLED";
})(AssessmentStatus || (AssessmentStatus = {}));

// src/app/features/assessments/services/assessment.service.ts
var AssessmentService = class _AssessmentService {
  constructor(apiService) {
    this.apiService = apiService;
    this.basePath = "/assessments";
  }
  /**
   * Récupère la liste de toutes les évaluations
   * @returns Observable contenant un tableau d'évaluations
   */
  getAssessments() {
    return this.apiService.get(this.basePath);
  }
  /**
   * Récupère une évaluation par son identifiant
   * @param id Identifiant de l'évaluation
   * @returns Observable contenant l'évaluation
   */
  getAssessment(id) {
    return this.apiService.get(`${this.basePath}/${id}`);
  }
  /**
   * Crée une nouvelle évaluation
   * @param assessmentRequest Données de l'évaluation à créer
   * @returns Observable contenant l'évaluation créée
   */
  createAssessment(assessmentRequest) {
    const payload = {
      risk: { id: assessmentRequest.riskId },
      status: assessmentRequest.status,
      assessmentDate: assessmentRequest.assessmentDate,
      findings: assessmentRequest.conclusions,
      recommendations: assessmentRequest.recommendations,
      nextReviewDate: assessmentRequest.nextReviewDate
    };
    if (assessmentRequest.userId) {
      payload.assignedTo = { id: assessmentRequest.userId };
    }
    return this.apiService.post(this.basePath, payload);
  }
  /**
   * Met à jour une évaluation existante
   * @param id Identifiant de l'évaluation
   * @param assessmentRequest Nouvelles données de l'évaluation
   * @returns Observable contenant l'évaluation mise à jour
   */
  updateAssessment(id, assessmentRequest) {
    const payload = {
      risk: { id: assessmentRequest.riskId },
      status: assessmentRequest.status,
      assessmentDate: assessmentRequest.assessmentDate,
      findings: assessmentRequest.conclusions,
      recommendations: assessmentRequest.recommendations,
      nextReviewDate: assessmentRequest.nextReviewDate
    };
    if (assessmentRequest.userId) {
      payload.assignedTo = { id: assessmentRequest.userId };
    }
    return this.apiService.put(`${this.basePath}/${id}`, payload);
  }
  /**
   * Supprime une évaluation
   * @param id Identifiant de l'évaluation à supprimer
   * @returns Observable
   */
  deleteAssessment(id) {
    return this.apiService.delete(`${this.basePath}/${id}`);
  }
  /**
   * Récupère les évaluations par statut
   * @param status Statut de l'évaluation
   * @returns Observable contenant un tableau d'évaluations
   */
  getAssessmentsByStatus(status) {
    return this.apiService.get(`${this.basePath}/status/${status}`);
  }
  /**
   * Récupère les évaluations en attente de revue
   * @returns Observable contenant un tableau d'évaluations
   */
  getPendingReviewAssessments() {
    return this.apiService.get(`${this.basePath}/pending-review`);
  }
  /**
   * Récupère les évaluations assignées à un utilisateur
   * @param userId Identifiant de l'utilisateur
   * @returns Observable contenant un tableau d'évaluations
   */
  getAssessmentsByUser(userId) {
    return this.apiService.get(`${this.basePath}/user/${userId}`);
  }
  /**
   * Récupère les évaluations pour un risque spécifique
   * @param riskId Identifiant du risque
   * @returns Observable contenant un tableau d'évaluations
   */
  getAssessmentsByRisk(riskId) {
    return this.apiService.get(`${this.basePath}/risk/${riskId}`);
  }
  static {
    this.\u0275fac = function AssessmentService_Factory(t) {
      return new (t || _AssessmentService)(\u0275\u0275inject(ApiService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AssessmentService, factory: _AssessmentService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/assessments/components/assessment-list/assessment-list.component.ts
var _c0 = () => [5, 10, 25, 100];
function AssessmentListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "mat-spinner", 23);
    \u0275\u0275elementEnd();
  }
}
function AssessmentListComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, " ID ");
    \u0275\u0275elementEnd();
  }
}
function AssessmentListComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assessment_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", assessment_r1.id, " ");
  }
}
function AssessmentListComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, " Risque ");
    \u0275\u0275elementEnd();
  }
}
function AssessmentListComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assessment_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (assessment_r2.risk == null ? null : assessment_r2.risk.name) || "Non d\xE9fini", " ");
  }
}
function AssessmentListComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, " Statut ");
    \u0275\u0275elementEnd();
  }
}
function AssessmentListComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25)(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const assessment_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "status-badge " + (assessment_r3.status == null ? null : assessment_r3.status.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", assessment_r3.status, " ");
  }
}
function AssessmentListComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, " Date d'\xE9valuation ");
    \u0275\u0275elementEnd();
  }
}
function AssessmentListComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assessment_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, assessment_r4.assessmentDate, "dd/MM/yyyy"), " ");
  }
}
function AssessmentListComponent_th_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, " Prochaine revue ");
    \u0275\u0275elementEnd();
  }
}
function AssessmentListComponent_td_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assessment_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, assessment_r5.nextReviewDate, "dd/MM/yyyy"), " ");
  }
}
function AssessmentListComponent_th_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, " Actions ");
    \u0275\u0275elementEnd();
  }
}
function AssessmentListComponent_td_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 25)(1, "button", 28);
    \u0275\u0275listener("click", function AssessmentListComponent_td_34_Template_button_click_1_listener() {
      const assessment_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.viewAssessment(assessment_r7.id));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 29);
    \u0275\u0275listener("click", function AssessmentListComponent_td_34_Template_button_click_4_listener() {
      const assessment_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.editAssessment(assessment_r7.id));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 30);
    \u0275\u0275listener("click", function AssessmentListComponent_td_34_Template_button_click_7_listener() {
      const assessment_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.deleteAssessment(assessment_r7.id));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function AssessmentListComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 31);
  }
}
function AssessmentListComponent_tr_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 32);
  }
}
function AssessmentListComponent_tr_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 33)(1, "td", 34)(2, "div", 35)(3, "mat-icon");
    \u0275\u0275text(4, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Aucune \xE9valuation trouv\xE9e");
    \u0275\u0275elementEnd()()()();
  }
}
var AssessmentListComponent = class _AssessmentListComponent {
  constructor(assessmentService, router, dialog, snackBar) {
    this.assessmentService = assessmentService;
    this.router = router;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.displayedColumns = ["id", "risk", "status", "assessmentDate", "nextReviewDate", "actions"];
    this.dataSource = new MatTableDataSource([]);
    this.isLoading = false;
    this.statusTypes = AssessmentStatus;
  }
  ngOnInit() {
    this.loadAssessments();
  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  loadAssessments() {
    this.isLoading = true;
    this.assessmentService.getAssessments().subscribe({
      next: (assessments) => {
        this.dataSource.data = assessments;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des \xE9valuations", error);
        this.isLoading = false;
        this.showError("Erreur lors du chargement des \xE9valuations");
      }
    });
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewAssessment(id) {
    this.router.navigate(["/assessments", id]);
  }
  editAssessment(id) {
    this.router.navigate(["/assessments", id, "edit"]);
  }
  createAssessment() {
    this.router.navigate(["/assessments/new"]);
  }
  deleteAssessment(id) {
    const dialogData = {
      title: "Confirmation de suppression",
      message: `\xCAtes-vous s\xFBr de vouloir supprimer cette \xE9valuation ?`,
      confirmText: "Supprimer",
      cancelText: "Annuler",
      color: "warn"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.performDeleteAssessment(id);
      }
    });
  }
  performDeleteAssessment(id) {
    this.isLoading = true;
    this.assessmentService.deleteAssessment(id).subscribe({
      next: () => {
        this.loadAssessments();
        this.showSuccess("\xC9valuation supprim\xE9e avec succ\xE8s");
      },
      error: (error) => {
        console.error("Erreur lors de la suppression de l'\xE9valuation", error);
        this.isLoading = false;
        this.showError("Erreur lors de la suppression de l'\xE9valuation");
      }
    });
  }
  showSuccess(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 3e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["success-snackbar"]
    });
  }
  showError(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 5e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["error-snackbar"]
    });
  }
  static {
    this.\u0275fac = function AssessmentListComponent_Factory(t) {
      return new (t || _AssessmentListComponent)(\u0275\u0275directiveInject(AssessmentService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssessmentListComponent, selectors: [["app-assessment-list"]], viewQuery: function AssessmentListComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatPaginator, 5);
        \u0275\u0275viewQuery(MatSort, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      }
    }, decls: 39, vars: 6, consts: [[1, "container"], [1, "header-section"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["appearance", "outline", 1, "filter-field"], ["matInput", "", "placeholder", "Saisir un terme de recherche", 3, "keyup"], ["matSuffix", ""], [1, "mat-elevation-z8", "table-container"], ["class", "loading-container", 4, "ngIf"], ["mat-table", "", "matSort", "", 1, "assessment-table", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "risk"], ["matColumnDef", "status"], ["matColumnDef", "assessmentDate"], ["matColumnDef", "nextReviewDate"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["showFirstLastButtons", "", 3, "pageSizeOptions"], [1, "loading-container"], ["diameter", "40"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], [3, "ngClass"], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "primary", "matTooltip", "Voir les d\xE9tails", 3, "click"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Modifier", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Supprimer", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "6", 1, "mat-cell"], [1, "no-data-message"]], template: function AssessmentListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Liste des \xE9valuations");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function AssessmentListComponent_Template_button_click_4_listener() {
          return ctx.createAssessment();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Nouvelle \xE9valuation ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "mat-form-field", 3)(9, "mat-label");
        \u0275\u0275text(10, "Filtrer");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "input", 4);
        \u0275\u0275listener("keyup", function AssessmentListComponent_Template_input_keyup_11_listener($event) {
          return ctx.applyFilter($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "mat-icon", 5);
        \u0275\u0275text(13, "search");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 6);
        \u0275\u0275template(15, AssessmentListComponent_div_15_Template, 2, 0, "div", 7);
        \u0275\u0275elementStart(16, "table", 8);
        \u0275\u0275elementContainerStart(17, 9);
        \u0275\u0275template(18, AssessmentListComponent_th_18_Template, 2, 0, "th", 10)(19, AssessmentListComponent_td_19_Template, 2, 1, "td", 11);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(20, 12);
        \u0275\u0275template(21, AssessmentListComponent_th_21_Template, 2, 0, "th", 10)(22, AssessmentListComponent_td_22_Template, 2, 1, "td", 11);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(23, 13);
        \u0275\u0275template(24, AssessmentListComponent_th_24_Template, 2, 0, "th", 10)(25, AssessmentListComponent_td_25_Template, 3, 2, "td", 11);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(26, 14);
        \u0275\u0275template(27, AssessmentListComponent_th_27_Template, 2, 0, "th", 10)(28, AssessmentListComponent_td_28_Template, 3, 4, "td", 11);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(29, 15);
        \u0275\u0275template(30, AssessmentListComponent_th_30_Template, 2, 0, "th", 10)(31, AssessmentListComponent_td_31_Template, 3, 4, "td", 11);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(32, 16);
        \u0275\u0275template(33, AssessmentListComponent_th_33_Template, 2, 0, "th", 17)(34, AssessmentListComponent_td_34_Template, 10, 0, "td", 11);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(35, AssessmentListComponent_tr_35_Template, 1, 0, "tr", 18)(36, AssessmentListComponent_tr_36_Template, 1, 0, "tr", 19)(37, AssessmentListComponent_tr_37_Template, 7, 0, "tr", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275element(38, "mat-paginator", 21);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("dataSource", ctx.dataSource);
        \u0275\u0275advance(19);
        \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
        \u0275\u0275advance(2);
        \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(5, _c0));
      }
    }, dependencies: [NgClass, NgIf, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatNoDataRow, MatPaginator, MatSort, MatSortHeader, MatFormField, MatLabel, MatSuffix, MatInput, MatButton, MatIconButton, MatIcon, MatProgressSpinner, MatTooltip, DatePipe], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.filter-field[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 20px;\n}\n.table-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 200px;\n}\n.assessment-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.loading-container[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.7);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 16px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n  display: inline-block;\n}\n.status-badge.planned[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #0d47a1;\n}\n.status-badge.in_progress[_ngcontent-%COMP%] {\n  background-color: #fff8e1;\n  color: #ff8f00;\n}\n.status-badge.completed[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.status-badge.cancelled[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.no-data-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  color: rgba(0, 0, 0, 0.54);\n}\n.no-data-message[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 10px;\n}\n@media (max-width: 959px) {\n  .header-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .header-section[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    margin-top: 10px;\n  }\n  .mat-column-id[_ngcontent-%COMP%], .mat-column-nextReviewDate[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=assessment-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssessmentListComponent, { className: "AssessmentListComponent" });
})();

// src/app/features/assessments/components/assessment-detail/assessment-detail.component.ts
function AssessmentDetailComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "mat-spinner", 9);
    \u0275\u0275elementEnd();
  }
}
function AssessmentDetailComponent_mat_card_18_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "h3");
    \u0275\u0275text(2, "Conclusions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.assessment.conclusions);
  }
}
function AssessmentDetailComponent_mat_card_18_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "h3");
    \u0275\u0275text(2, "Recommandations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.assessment.recommendations);
  }
}
function AssessmentDetailComponent_mat_card_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 10)(1, "mat-card-header")(2, "div", 11)(3, "mat-icon");
    \u0275\u0275text(4, "assessment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-card-title");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-card-subtitle")(8, "span", 12);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "mat-card-content")(11, "div", 13)(12, "h3");
    \u0275\u0275text(13, "Informations g\xE9n\xE9rales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 14)(15, "span", 15);
    \u0275\u0275text(16, "Risque:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 16);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 14)(20, "span", 15);
    \u0275\u0275text(21, "Date d'\xE9valuation:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 16);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 14)(26, "span", 15);
    \u0275\u0275text(27, "Prochaine revue:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 16);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 14)(32, "span", 15);
    \u0275\u0275text(33, "Assign\xE9 \xE0:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 16);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(36, AssessmentDetailComponent_mat_card_18_div_36_Template, 5, 1, "div", 17)(37, AssessmentDetailComponent_mat_card_18_div_37_Template, 5, 1, "div", 17);
    \u0275\u0275elementStart(38, "div", 13)(39, "h3");
    \u0275\u0275text(40, "Informations suppl\xE9mentaires");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 14)(42, "span", 15);
    \u0275\u0275text(43, "Date de cr\xE9ation:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 16);
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 14)(48, "span", 15);
    \u0275\u0275text(49, "Derni\xE8re mise \xE0 jour:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 16);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "date");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "status-badge " + (ctx_r0.assessment.status == null ? null : ctx_r0.assessment.status.toLowerCase()));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\xC9valuation #", ctx_r0.assessment.id, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "status-pill " + (ctx_r0.assessment.status == null ? null : ctx_r0.assessment.status.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.assessment.status, " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate((ctx_r0.assessment.risk == null ? null : ctx_r0.assessment.risk.name) || "Non d\xE9fini");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(24, 12, ctx_r0.assessment.assessmentDate, "dd/MM/yyyy"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(30, 15, ctx_r0.assessment.nextReviewDate, "dd/MM/yyyy"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((ctx_r0.assessment.user == null ? null : ctx_r0.assessment.user.firstName) && (ctx_r0.assessment.user == null ? null : ctx_r0.assessment.user.lastName) ? (ctx_r0.assessment.user == null ? null : ctx_r0.assessment.user.firstName) + " " + (ctx_r0.assessment.user == null ? null : ctx_r0.assessment.user.lastName) : (ctx_r0.assessment.user == null ? null : ctx_r0.assessment.user.username) || "Non assign\xE9");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.assessment.conclusions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.assessment.recommendations);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(46, 18, ctx_r0.assessment.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(52, 21, ctx_r0.assessment.updatedAt, "dd/MM/yyyy HH:mm"));
  }
}
var AssessmentDetailComponent = class _AssessmentDetailComponent {
  constructor(route, router, assessmentService, dialog, snackBar) {
    this.route = route;
    this.router = router;
    this.assessmentService = assessmentService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.isLoading = false;
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "";
    if (!this.id) {
      this.showError("ID d'\xE9valuation invalide");
      this.router.navigate(["/assessments"]);
      return;
    }
    this.loadAssessment();
  }
  loadAssessment() {
    this.isLoading = true;
    this.assessmentService.getAssessment(this.id).subscribe({
      next: (assessment) => {
        this.assessment = assessment;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement de l'\xE9valuation", error);
        this.isLoading = false;
        this.showError("Erreur lors du chargement de l'\xE9valuation");
        this.router.navigate(["/assessments"]);
      }
    });
  }
  editAssessment() {
    this.router.navigate(["/assessments", this.id, "edit"]);
  }
  deleteAssessment() {
    if (!this.assessment)
      return;
    const dialogData = {
      title: "Confirmation de suppression",
      message: `\xCAtes-vous s\xFBr de vouloir supprimer cette \xE9valuation ?`,
      confirmText: "Supprimer",
      cancelText: "Annuler",
      color: "warn"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.performDeleteAssessment();
      }
    });
  }
  performDeleteAssessment() {
    this.isLoading = true;
    this.assessmentService.deleteAssessment(this.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.showSuccess("\xC9valuation supprim\xE9e avec succ\xE8s");
        this.router.navigate(["/assessments"]);
      },
      error: (error) => {
        console.error("Erreur lors de la suppression de l'\xE9valuation", error);
        this.isLoading = false;
        this.showError("Erreur lors de la suppression de l'\xE9valuation");
      }
    });
  }
  navigateToList() {
    this.router.navigate(["/assessments"]);
  }
  showSuccess(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 3e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["success-snackbar"]
    });
  }
  showError(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 5e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["error-snackbar"]
    });
  }
  static {
    this.\u0275fac = function AssessmentDetailComponent_Factory(t) {
      return new (t || _AssessmentDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AssessmentService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssessmentDetailComponent, selectors: [["app-assessment-detail"]], decls: 19, vars: 2, consts: [[1, "container"], [1, "header-section"], [1, "actions"], ["mat-raised-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "warn", 3, "click"], ["class", "loading-container", 4, "ngIf"], ["class", "assessment-card", 4, "ngIf"], [1, "loading-container"], ["diameter", "40"], [1, "assessment-card"], ["mat-card-avatar", "", 3, "ngClass"], [3, "ngClass"], [1, "detail-section"], [1, "detail-item"], [1, "label"], [1, "value"], ["class", "detail-section", 4, "ngIf"]], template: function AssessmentDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "D\xE9tails de l'\xE9valuation");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275listener("click", function AssessmentDetailComponent_Template_button_click_5_listener() {
          return ctx.navigateToList();
        });
        \u0275\u0275elementStart(6, "mat-icon");
        \u0275\u0275text(7, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(8, " Retour ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 4);
        \u0275\u0275listener("click", function AssessmentDetailComponent_Template_button_click_9_listener() {
          return ctx.editAssessment();
        });
        \u0275\u0275elementStart(10, "mat-icon");
        \u0275\u0275text(11, "edit");
        \u0275\u0275elementEnd();
        \u0275\u0275text(12, " Modifier ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "button", 5);
        \u0275\u0275listener("click", function AssessmentDetailComponent_Template_button_click_13_listener() {
          return ctx.deleteAssessment();
        });
        \u0275\u0275elementStart(14, "mat-icon");
        \u0275\u0275text(15, "delete");
        \u0275\u0275elementEnd();
        \u0275\u0275text(16, " Supprimer ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(17, AssessmentDetailComponent_div_17_Template, 2, 0, "div", 6)(18, AssessmentDetailComponent_mat_card_18_Template, 53, 24, "mat-card", 7);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(17);
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.assessment && !ctx.isLoading);
      }
    }, dependencies: [NgClass, NgIf, MatButton, MatIcon, MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatProgressSpinner, DatePipe], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 50px 0;\n}\n.assessment-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.detail-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #3f51b5;\n  border-bottom: 1px solid #e0e0e0;\n  padding-bottom: 8px;\n  margin-bottom: 16px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 8px;\n}\n.label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  width: 180px;\n  color: rgba(0, 0, 0, 0.7);\n}\n.value[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.status-pill[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.status-pill.planned[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #0d47a1;\n}\n.status-pill.in_progress[_ngcontent-%COMP%] {\n  background-color: #fff8e1;\n  color: #ff8f00;\n}\n.status-pill.completed[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.status-pill.cancelled[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n[mat-card-avatar].status-badge[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #f5f5f5;\n}\n[mat-card-avatar].status-badge.planned[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #0d47a1;\n}\n[mat-card-avatar].status-badge.in_progress[_ngcontent-%COMP%] {\n  background-color: #fff8e1;\n  color: #ff8f00;\n}\n[mat-card-avatar].status-badge.completed[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n[mat-card-avatar].status-badge.cancelled[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n@media (max-width: 768px) {\n  .header-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .actions[_ngcontent-%COMP%] {\n    margin-top: 10px;\n  }\n  .detail-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .label[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 4px;\n  }\n}\n/*# sourceMappingURL=assessment-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssessmentDetailComponent, { className: "AssessmentDetailComponent" });
})();

// src/app/features/assessments/components/assessment-form/assessment-form.component.ts
function AssessmentFormComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275element(1, "mat-spinner", 24);
    \u0275\u0275elementEnd();
  }
}
function AssessmentFormComponent_mat_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const risk_r2 = ctx.$implicit;
    \u0275\u0275property("value", risk_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", risk_r2.name, " ");
  }
}
function AssessmentFormComponent_mat_error_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le risque est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function AssessmentFormComponent_mat_option_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r3 = ctx.$implicit;
    \u0275\u0275property("value", status_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", status_r3, " ");
  }
}
function AssessmentFormComponent_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le statut est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function AssessmentFormComponent_mat_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    \u0275\u0275property("value", user_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r4.firstName && user_r4.lastName ? user_r4.firstName + " " + user_r4.lastName : user_r4.username, " ");
  }
}
function AssessmentFormComponent_mat_error_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La date d'\xE9valuation est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
var AssessmentFormComponent = class _AssessmentFormComponent {
  constructor(fb, route, router, assessmentService, riskService, userService, snackBar) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.assessmentService = assessmentService;
    this.riskService = riskService;
    this.userService = userService;
    this.snackBar = snackBar;
    this.isEditMode = false;
    this.isLoading = false;
    this.assessmentId = null;
    this.statusOptions = Object.values(AssessmentStatus);
    this.risks = [];
    this.users = [];
    this.pageTitle = "Nouvelle \xE9valuation";
  }
  ngOnInit() {
    this.initForm();
    this.loadDependencies();
    this.assessmentId = this.route.snapshot.paramMap.get("id");
    this.isEditMode = !!this.assessmentId;
    this.pageTitle = this.isEditMode ? "Modifier l'\xE9valuation" : "Nouvelle \xE9valuation";
    if (this.isEditMode && this.assessmentId) {
      this.loadAssessment(this.assessmentId);
    }
  }
  initForm() {
    this.assessmentForm = this.fb.group({
      riskId: ["", Validators.required],
      userId: [""],
      status: [AssessmentStatus.PLANNED, Validators.required],
      assessmentDate: [/* @__PURE__ */ new Date(), Validators.required],
      findings: [""],
      recommendations: [""],
      nextReviewDate: [null]
    });
  }
  loadDependencies() {
    this.isLoading = true;
    forkJoin({
      risks: this.riskService.getRisks().pipe(catchError(() => of([]))),
      users: this.userService.getUsers().pipe(catchError(() => of([])))
    }).subscribe({
      next: (result) => {
        this.risks = result.risks;
        this.users = result.users;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des donn\xE9es", error);
        this.showError("Erreur lors du chargement des donn\xE9es");
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  loadAssessment(id) {
    this.isLoading = true;
    this.assessmentService.getAssessment(id).subscribe({
      next: (assessment) => {
        this.patchForm(assessment);
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement de l'\xE9valuation", error);
        this.isLoading = false;
        this.showError("Erreur lors du chargement de l'\xE9valuation");
        this.router.navigate(["/assessments"]);
      }
    });
  }
  patchForm(assessment) {
    this.assessmentForm.patchValue({
      riskId: assessment.risk?.id,
      userId: assessment.user?.id,
      status: assessment.status,
      assessmentDate: assessment.assessmentDate ? new Date(assessment.assessmentDate) : null,
      findings: assessment.conclusions,
      recommendations: assessment.recommendations,
      nextReviewDate: assessment.nextReviewDate ? new Date(assessment.nextReviewDate) : null
    });
  }
  onSubmit() {
    if (this.assessmentForm.invalid) {
      return;
    }
    const formValue = this.assessmentForm.value;
    const assessmentRequest = {
      riskId: formValue.riskId,
      userId: formValue.userId,
      status: formValue.status,
      assessmentDate: formValue.assessmentDate,
      conclusions: formValue.findings,
      recommendations: formValue.recommendations,
      nextReviewDate: formValue.nextReviewDate
    };
    this.isLoading = true;
    if (this.isEditMode && this.assessmentId) {
      this.updateAssessment(this.assessmentId, assessmentRequest);
    } else {
      this.createAssessment(assessmentRequest);
    }
  }
  createAssessment(request) {
    this.assessmentService.createAssessment(request).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (assessment) => {
        this.showSuccess("\xC9valuation cr\xE9\xE9e avec succ\xE8s");
        this.router.navigate(["/assessments", assessment.id]);
      },
      error: (error) => {
        console.error("Erreur lors de la cr\xE9ation de l'\xE9valuation", error);
        this.showError("Erreur lors de la cr\xE9ation de l'\xE9valuation");
      }
    });
  }
  updateAssessment(id, request) {
    this.assessmentService.updateAssessment(id, request).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (assessment) => {
        this.showSuccess("\xC9valuation mise \xE0 jour avec succ\xE8s");
        this.router.navigate(["/assessments", assessment.id]);
      },
      error: (error) => {
        console.error("Erreur lors de la mise \xE0 jour de l'\xE9valuation", error);
        this.showError("Erreur lors de la mise \xE0 jour de l'\xE9valuation");
      }
    });
  }
  cancel() {
    if (this.isEditMode && this.assessmentId) {
      this.router.navigate(["/assessments", this.assessmentId]);
    } else {
      this.router.navigate(["/assessments"]);
    }
  }
  showSuccess(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 3e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["success-snackbar"]
    });
  }
  showError(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 5e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["error-snackbar"]
    });
  }
  static {
    this.\u0275fac = function AssessmentFormComponent_Factory(t) {
      return new (t || _AssessmentFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AssessmentService), \u0275\u0275directiveInject(RiskService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssessmentFormComponent, selectors: [["app-assessment-form"]], decls: 67, vars: 15, consts: [["assessmentPicker", ""], ["reviewPicker", ""], [1, "container"], [1, "header-section"], ["class", "loading-overlay", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "row"], [1, "col"], ["appearance", "outline", 1, "full-width"], ["formControlName", "riskId", "required", ""], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["formControlName", "status", "required", ""], ["formControlName", "userId"], [3, "value"], ["matInput", "", "formControlName", "assessmentDate", "required", "", 3, "matDatepicker"], ["matSuffix", "", 3, "for"], ["matInput", "", "formControlName", "nextReviewDate", 3, "matDatepicker"], ["matInput", "", "formControlName", "findings", "rows", "3"], ["matInput", "", "formControlName", "recommendations", "rows", "3"], [1, "button-row"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [1, "loading-overlay"], ["diameter", "40"]], template: function AssessmentFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1");
        \u0275\u0275text(3);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "mat-card")(5, "mat-card-content");
        \u0275\u0275template(6, AssessmentFormComponent_div_6_Template, 2, 0, "div", 4);
        \u0275\u0275elementStart(7, "form", 5);
        \u0275\u0275listener("ngSubmit", function AssessmentFormComponent_Template_form_ngSubmit_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "mat-form-field", 8)(11, "mat-label");
        \u0275\u0275text(12, "Risque");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "mat-select", 9);
        \u0275\u0275template(14, AssessmentFormComponent_mat_option_14_Template, 2, 2, "mat-option", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, AssessmentFormComponent_mat_error_15_Template, 2, 0, "mat-error", 11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "div", 6)(17, "div", 7)(18, "mat-form-field", 8)(19, "mat-label");
        \u0275\u0275text(20, "Statut");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-select", 12);
        \u0275\u0275template(22, AssessmentFormComponent_mat_option_22_Template, 2, 2, "mat-option", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275template(23, AssessmentFormComponent_mat_error_23_Template, 2, 0, "mat-error", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 7)(25, "mat-form-field", 8)(26, "mat-label");
        \u0275\u0275text(27, "Assign\xE9 \xE0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "mat-select", 13)(29, "mat-option", 14);
        \u0275\u0275text(30, "-- Non assign\xE9 --");
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, AssessmentFormComponent_mat_option_31_Template, 2, 2, "mat-option", 10);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(32, "div", 6)(33, "div", 7)(34, "mat-form-field", 8)(35, "mat-label");
        \u0275\u0275text(36, "Date d'\xE9valuation");
        \u0275\u0275elementEnd();
        \u0275\u0275element(37, "input", 15)(38, "mat-datepicker-toggle", 16)(39, "mat-datepicker", null, 0);
        \u0275\u0275template(41, AssessmentFormComponent_mat_error_41_Template, 2, 0, "mat-error", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 7)(43, "mat-form-field", 8)(44, "mat-label");
        \u0275\u0275text(45, "Date de prochaine revue");
        \u0275\u0275elementEnd();
        \u0275\u0275element(46, "input", 17)(47, "mat-datepicker-toggle", 16)(48, "mat-datepicker", null, 1);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(50, "div", 6)(51, "div", 7)(52, "mat-form-field", 8)(53, "mat-label");
        \u0275\u0275text(54, "Conclusions");
        \u0275\u0275elementEnd();
        \u0275\u0275element(55, "textarea", 18);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(56, "div", 6)(57, "div", 7)(58, "mat-form-field", 8)(59, "mat-label");
        \u0275\u0275text(60, "Recommandations");
        \u0275\u0275elementEnd();
        \u0275\u0275element(61, "textarea", 19);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(62, "div", 20)(63, "button", 21);
        \u0275\u0275listener("click", function AssessmentFormComponent_Template_button_click_63_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.cancel());
        });
        \u0275\u0275text(64, "Annuler");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "button", 22);
        \u0275\u0275text(66);
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        let tmp_6_0;
        let tmp_8_0;
        let tmp_12_0;
        const assessmentPicker_r5 = \u0275\u0275reference(40);
        const reviewPicker_r6 = \u0275\u0275reference(49);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.pageTitle);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.assessmentForm);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngForOf", ctx.risks);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_6_0 = ctx.assessmentForm.get("riskId")) == null ? null : tmp_6_0.hasError("required"));
        \u0275\u0275advance(7);
        \u0275\u0275property("ngForOf", ctx.statusOptions);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_8_0 = ctx.assessmentForm.get("status")) == null ? null : tmp_8_0.hasError("required"));
        \u0275\u0275advance(8);
        \u0275\u0275property("ngForOf", ctx.users);
        \u0275\u0275advance(6);
        \u0275\u0275property("matDatepicker", assessmentPicker_r5);
        \u0275\u0275advance();
        \u0275\u0275property("for", assessmentPicker_r5);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", (tmp_12_0 = ctx.assessmentForm.get("assessmentDate")) == null ? null : tmp_12_0.hasError("required"));
        \u0275\u0275advance(5);
        \u0275\u0275property("matDatepicker", reviewPicker_r6);
        \u0275\u0275advance();
        \u0275\u0275property("for", reviewPicker_r6);
        \u0275\u0275advance(18);
        \u0275\u0275property("disabled", ctx.assessmentForm.invalid);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Mettre \xE0 jour" : "Cr\xE9er", " ");
      }
    }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, MatFormField, MatLabel, MatError, MatSuffix, MatInput, MatSelect, MatOption, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatButton, MatCard, MatCardContent, MatProgressSpinner], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.header-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\nmat-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  position: relative;\n}\n.loading-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.7);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 -10px;\n  margin-bottom: 10px;\n}\n.col[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0 10px;\n  min-width: 200px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.button-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 20px;\n  gap: 10px;\n}\n@media (max-width: 768px) {\n  .row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .col[_ngcontent-%COMP%] {\n    margin-bottom: 10px;\n  }\n}\n/*# sourceMappingURL=assessment-form.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssessmentFormComponent, { className: "AssessmentFormComponent" });
})();

// src/app/features/assessments/assessments-routing.module.ts
var routes = [
  {
    path: "",
    component: AssessmentListComponent,
    data: { roles: ["admin", "compliance_officer", "risk_manager", "auditor", "user"] }
  },
  {
    path: "new",
    component: AssessmentFormComponent,
    data: { title: "Nouvelle \xE9valuation", isEdit: false, roles: ["admin", "compliance_officer"] }
  },
  {
    path: ":id",
    component: AssessmentDetailComponent,
    data: { roles: ["admin", "compliance_officer", "risk_manager", "auditor", "user"] }
  },
  {
    path: ":id/edit",
    component: AssessmentFormComponent,
    data: { title: "Modifier l'\xE9valuation", isEdit: true, roles: ["admin", "compliance_officer"] }
  }
];
var AssessmentsRoutingModule = class _AssessmentsRoutingModule {
  static {
    this.\u0275fac = function AssessmentsRoutingModule_Factory(t) {
      return new (t || _AssessmentsRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AssessmentsRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/features/assessments/assessments.module.ts
var AssessmentsModule = class _AssessmentsModule {
  static {
    this.\u0275fac = function AssessmentsModule_Factory(t) {
      return new (t || _AssessmentsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AssessmentsModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      AssessmentsRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatCardModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatTooltipModule
    ] });
  }
};
export {
  AssessmentsModule
};
//# sourceMappingURL=chunk-PVSPKU3E.js.map
