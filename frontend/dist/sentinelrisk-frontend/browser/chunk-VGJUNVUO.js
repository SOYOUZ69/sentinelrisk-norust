import {
  RiskComplianceMappingService
} from "./chunk-T72NNIHB.js";
import {
  LayoutModule,
  MatToolbar,
  MatToolbarModule,
  SidebarComponent
} from "./chunk-RFMK7TTT.js";
import "./chunk-COXUJSGP.js";
import {
  AuthGuard
} from "./chunk-PTF3ZGHN.js";
import "./chunk-I6ULFAVE.js";
import "./chunk-YZOLHLAY.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-3PN52UW6.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-WTZCJFYH.js";
import {
  MatPaginator,
  MatPaginatorModule,
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-2ESS6S3M.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-R2B4LHFC.js";
import "./chunk-PMRQPNHV.js";
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
  FormGroup,
  FormGroupDirective,
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
  MatIconButton,
  environment
} from "./chunk-SOQ7WNQA.js";
import {
  ActivatedRoute,
  CommonModule,
  DatePipe,
  HttpClient,
  HttpParams,
  MatNativeDateModule,
  MatOption,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  RouterModule,
  catchError,
  forkJoin,
  of,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-N6MSFXF2.js";

// src/app/core/models/remediation-plan.model.ts
var RemediationPlanStatus;
(function(RemediationPlanStatus2) {
  RemediationPlanStatus2["TODO"] = "TODO";
  RemediationPlanStatus2["IN_PROGRESS"] = "IN_PROGRESS";
  RemediationPlanStatus2["DONE"] = "DONE";
})(RemediationPlanStatus || (RemediationPlanStatus = {}));

// src/app/features/remediation-plan/services/remediation-plan.service.ts
var RemediationPlanService = class _RemediationPlanService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/api/remediation-plans`;
  }
  /**
   * Récupère tous les plans de remédiation
   * @returns Observable contenant un tableau de plans
   */
  getPlans() {
    return this.http.get(this.apiUrl).pipe(catchError((error) => {
      console.error("Erreur lors de la r\xE9cup\xE9ration des plans de rem\xE9diation", error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer la liste des plans. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère les plans pour un mapping donné
   * @param mappingId ID du mapping
   * @returns Observable contenant un tableau de plans
   */
  getPlansByMapping(mappingId) {
    const params = new HttpParams().set("mappingId", mappingId);
    return this.http.get(this.apiUrl, { params }).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration des plans pour le mapping ${mappingId}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les plans pour ce mapping. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère les plans assignés à un utilisateur
   * @param ownerId ID de l'utilisateur
   * @returns Observable contenant un tableau de plans
   */
  getPlansByOwner(ownerId) {
    const params = new HttpParams().set("ownerId", ownerId);
    return this.http.get(this.apiUrl, { params }).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration des plans pour l'utilisateur ${ownerId}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les plans pour cet utilisateur. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère un plan par son ID
   * @param id ID du plan
   * @returns Observable contenant le plan
   */
  getPlan(id) {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration du plan ${id}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les d\xE9tails du plan. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Crée un nouveau plan
   * @param plan DTO du plan à créer
   * @returns Observable contenant le plan créé
   */
  createPlan(plan) {
    return this.http.post(this.apiUrl, plan).pipe(catchError((error) => {
      console.error("Erreur lors de la cr\xE9ation du plan", error);
      return throwError(() => new Error("Impossible de cr\xE9er le plan. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Met à jour un plan existant
   * @param id ID du plan
   * @param plan DTO du plan modifié
   * @returns Observable contenant le plan mis à jour
   */
  updatePlan(id, plan) {
    return this.http.put(`${this.apiUrl}/${id}`, plan).pipe(catchError((error) => {
      console.error(`Erreur lors de la mise \xE0 jour du plan ${id}`, error);
      return throwError(() => new Error("Impossible de mettre \xE0 jour le plan. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Supprime un plan
   * @param id ID du plan à supprimer
   * @returns Observable vide
   */
  deletePlan(id) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la suppression du plan ${id}`, error);
      return throwError(() => new Error("Impossible de supprimer le plan. Veuillez r\xE9essayer."));
    }));
  }
  static {
    this.\u0275fac = function RemediationPlanService_Factory(t) {
      return new (t || _RemediationPlanService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RemediationPlanService, factory: _RemediationPlanService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/remediation-plan/components/plan-list/plan-list.component.ts
var _c0 = () => [5, 10, 25, 100];
var _c1 = (a0, a1, a2) => ({ "status-todo": a0, "status-in-progress": a1, "status-done": a2 });
function PlanListComponent_div_18_mat_progress_spinner_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 16);
  }
}
function PlanListComponent_div_18_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function PlanListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275template(1, PlanListComponent_div_18_mat_progress_spinner_1_Template, 1, 0, "mat-progress-spinner", 14)(2, PlanListComponent_div_18_div_2_Template, 5, 1, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.error);
  }
}
function PlanListComponent_div_19_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, " Titre ");
    \u0275\u0275elementEnd();
  }
}
function PlanListComponent_div_19_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plan_r2.title, " ");
  }
}
function PlanListComponent_div_19_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, " \xC9cart ");
    \u0275\u0275elementEnd();
  }
}
function PlanListComponent_div_19_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plan_r3.mappingSummary || "Non sp\xE9cifi\xE9", " ");
  }
}
function PlanListComponent_div_19_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, " Responsable ");
    \u0275\u0275elementEnd();
  }
}
function PlanListComponent_div_19_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plan_r4.ownerName || "Non assign\xE9", " ");
  }
}
function PlanListComponent_div_19_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, " \xC9ch\xE9ance ");
    \u0275\u0275elementEnd();
  }
}
function PlanListComponent_div_19_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, plan_r5.dueDate, "dd/MM/yyyy"), " ");
  }
}
function PlanListComponent_div_19_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, " Statut ");
    \u0275\u0275elementEnd();
  }
}
function PlanListComponent_div_19_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "span", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const plan_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(2, _c1, plan_r6.status === "TODO", plan_r6.status === "IN_PROGRESS", plan_r6.status === "DONE"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plan_r6.status === "TODO" ? "\xC0 faire" : plan_r6.status === "IN_PROGRESS" ? "En cours" : "Termin\xE9", " ");
  }
}
function PlanListComponent_div_19_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, " Actions ");
    \u0275\u0275elementEnd();
  }
}
function PlanListComponent_div_19_td_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 35)(1, "button", 38);
    \u0275\u0275listener("click", function PlanListComponent_div_19_td_22_Template_button_click_1_listener() {
      const plan_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.viewPlanDetails(plan_r8));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 39);
    \u0275\u0275listener("click", function PlanListComponent_div_19_td_22_Template_button_click_4_listener() {
      const plan_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.editPlan(plan_r8));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 40);
    \u0275\u0275listener("click", function PlanListComponent_div_19_td_22_Template_button_click_7_listener() {
      const plan_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deletePlan(plan_r8));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function PlanListComponent_div_19_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 41);
  }
}
function PlanListComponent_div_19_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 42);
  }
}
function PlanListComponent_div_19_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 43)(1, "td", 44)(2, "div", 45)(3, "mat-icon");
    \u0275\u0275text(4, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Aucun plan d'action trouv\xE9");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r0.displayedColumns.length);
  }
}
function PlanListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "mat-card", 18)(2, "mat-card-content")(3, "div", 19)(4, "table", 20);
    \u0275\u0275elementContainerStart(5, 21);
    \u0275\u0275template(6, PlanListComponent_div_19_th_6_Template, 2, 0, "th", 22)(7, PlanListComponent_div_19_td_7_Template, 2, 1, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 24);
    \u0275\u0275template(9, PlanListComponent_div_19_th_9_Template, 2, 0, "th", 25)(10, PlanListComponent_div_19_td_10_Template, 2, 1, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 26);
    \u0275\u0275template(12, PlanListComponent_div_19_th_12_Template, 2, 0, "th", 22)(13, PlanListComponent_div_19_td_13_Template, 2, 1, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 27);
    \u0275\u0275template(15, PlanListComponent_div_19_th_15_Template, 2, 0, "th", 22)(16, PlanListComponent_div_19_td_16_Template, 3, 4, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 28);
    \u0275\u0275template(18, PlanListComponent_div_19_th_18_Template, 2, 0, "th", 22)(19, PlanListComponent_div_19_td_19_Template, 3, 6, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 29);
    \u0275\u0275template(21, PlanListComponent_div_19_th_21_Template, 2, 0, "th", 25)(22, PlanListComponent_div_19_td_22_Template, 10, 0, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(23, PlanListComponent_div_19_tr_23_Template, 1, 0, "tr", 30)(24, PlanListComponent_div_19_tr_24_Template, 1, 0, "tr", 31)(25, PlanListComponent_div_19_tr_25_Template, 7, 1, "tr", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "mat-paginator", 33);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("dataSource", ctx_r0.dataSource);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r0.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r0.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(4, _c0));
  }
}
var PlanListComponent = class _PlanListComponent {
  constructor(planService, route, router, snackBar, dialog) {
    this.planService = planService;
    this.route = route;
    this.router = router;
    this.snackBar = snackBar;
    this.dialog = dialog;
    this.displayedColumns = ["title", "mappingSummary", "ownerName", "dueDate", "status", "actions"];
    this.dataSource = new MatTableDataSource([]);
    this.isLoading = false;
    this.error = null;
    this.mappingId = null;
  }
  ngOnInit() {
    console.debug("PlanList: Initialisation du composant");
    console.debug("PlanList: URL actuelle:", window.location.href);
    this.route.paramMap.subscribe((params) => {
      console.debug("PlanList: Param\xE8tres re\xE7us:", params);
      this.mappingId = params.get("mappingId");
      console.debug("PlanList: MappingId extrait:", this.mappingId);
      this.loadPlans();
    });
    this.router.events.subscribe((event) => {
      console.debug("PlanList: \xC9v\xE9nement de routage:", event);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  loadPlans() {
    console.debug("PlanList: Chargement des plans, mappingId:", this.mappingId);
    this.isLoading = true;
    this.error = null;
    const request = this.mappingId ? this.planService.getPlansByMapping(this.mappingId) : this.planService.getPlans();
    request.subscribe({
      next: (plans) => {
        console.debug("PlanList: Plans r\xE9cup\xE9r\xE9s:", plans.length);
        console.debug("PlanList: Donn\xE9es des plans:", plans);
        this.dataSource.data = plans;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("PlanList: Erreur lors du chargement des plans", error);
        this.error = "Impossible de charger les plans de rem\xE9diation. Veuillez r\xE9essayer.";
        this.isLoading = false;
        this.showErrorSnackbar(this.error);
      }
    });
  }
  createPlan() {
    console.debug("PlanList: Cr\xE9ation d'un nouveau plan pour mappingId:", this.mappingId);
    if (this.mappingId) {
      const url = ["/remediation-plans/new", this.mappingId];
      console.debug("PlanList: Navigation vers", url.join("/"));
      this.router.navigate(url).then((success) => console.debug("PlanList: Navigation r\xE9ussie:", success), (error) => console.error("PlanList: Erreur de navigation:", error));
    } else {
      this.showErrorSnackbar("Veuillez d'abord s\xE9lectionner un mapping");
    }
  }
  editPlan(plan) {
    console.debug("PlanList: \xC9dition du plan:", plan.id);
    const url = ["/remediation-plans/edit", plan.id];
    console.debug("PlanList: Navigation vers", url.join("/"));
    this.router.navigate(url).then((success) => console.debug("PlanList: Navigation r\xE9ussie:", success), (error) => console.error("PlanList: Erreur de navigation:", error));
  }
  viewPlanDetails(plan) {
    console.debug("PlanList: Affichage des d\xE9tails du plan:", plan.id);
    const url = ["/remediation-plans/detail", plan.id];
    console.debug("PlanList: Navigation vers", url.join("/"));
    this.router.navigate(url).then((success) => console.debug("PlanList: Navigation r\xE9ussie:", success), (error) => console.error("PlanList: Erreur de navigation:", error));
  }
  deletePlan(plan) {
    if (confirm(`\xCAtes-vous s\xFBr de vouloir supprimer le plan "${plan.title}" ?`)) {
      this.planService.deletePlan(plan.id).subscribe({
        next: () => {
          this.loadPlans();
          this.showSuccessSnackbar("Plan supprim\xE9 avec succ\xE8s");
        },
        error: (error) => {
          console.error(`Erreur lors de la suppression du plan ${plan.id}`, error);
          this.showErrorSnackbar("Impossible de supprimer le plan. Veuillez r\xE9essayer.");
        }
      });
    }
  }
  getStatusClass(status) {
    switch (status) {
      case RemediationPlanStatus.TODO:
        return "status-todo";
      case RemediationPlanStatus.IN_PROGRESS:
        return "status-in-progress";
      case RemediationPlanStatus.DONE:
        return "status-done";
      default:
        return "";
    }
  }
  getStatusLabel(status) {
    switch (status) {
      case RemediationPlanStatus.TODO:
        return "\xC0 faire";
      case RemediationPlanStatus.IN_PROGRESS:
        return "En cours";
      case RemediationPlanStatus.DONE:
        return "Termin\xE9";
      default:
        return status;
    }
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showSuccessSnackbar(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 3e3,
      panelClass: ["success-snackbar"]
    });
  }
  showErrorSnackbar(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 5e3,
      panelClass: ["error-snackbar"]
    });
  }
  static {
    this.\u0275fac = function PlanListComponent_Factory(t) {
      return new (t || _PlanListComponent)(\u0275\u0275directiveInject(RemediationPlanService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanListComponent, selectors: [["app-plan-list"]], viewQuery: function PlanListComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatPaginator, 5);
        \u0275\u0275viewQuery(MatSort, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      }
    }, decls: 20, vars: 2, consts: [[1, "layout"], [1, "sidebar"], [1, "content"], ["color", "primary"], [1, "spacer"], ["mat-icon-button", "", "matTooltip", "Cr\xE9er un nouveau plan", 3, "click"], [1, "page-content"], [1, "filter-card"], ["appearance", "outline", 1, "filter-field"], ["matInput", "", "placeholder", "Titre, responsable...", 3, "keyup"], ["matSuffix", ""], ["class", "loading-error-container", 4, "ngIf"], [4, "ngIf"], [1, "loading-error-container"], ["mode", "indeterminate", "diameter", "40", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["mode", "indeterminate", "diameter", "40"], [1, "error-message"], [1, "table-card"], [1, "table-container"], ["mat-table", "", "matSort", "", 3, "dataSource"], ["matColumnDef", "title"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "mappingSummary"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["matColumnDef", "ownerName"], ["matColumnDef", "dueDate"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["showFirstLastButtons", "", 3, "pageSizeOptions"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", ""], [1, "status-chip", 3, "ngClass"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Voir les d\xE9tails", 3, "click"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Modifier", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Supprimer", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], [1, "no-data-cell"], [1, "no-data-message"]], template: function PlanListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-sidebar", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "mat-toolbar", 3)(4, "span");
        \u0275\u0275text(5, "Plans d'Action de Rem\xE9diation");
        \u0275\u0275elementEnd();
        \u0275\u0275element(6, "span", 4);
        \u0275\u0275elementStart(7, "button", 5);
        \u0275\u0275listener("click", function PlanListComponent_Template_button_click_7_listener() {
          return ctx.createPlan();
        });
        \u0275\u0275elementStart(8, "mat-icon");
        \u0275\u0275text(9, "add");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 6)(11, "mat-card", 7)(12, "mat-form-field", 8)(13, "mat-label");
        \u0275\u0275text(14, "Rechercher");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "input", 9);
        \u0275\u0275listener("keyup", function PlanListComponent_Template_input_keyup_15_listener($event) {
          return ctx.applyFilter($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "mat-icon", 10);
        \u0275\u0275text(17, "search");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(18, PlanListComponent_div_18_Template, 3, 2, "div", 11)(19, PlanListComponent_div_19_Template, 27, 5, "div", 12);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(18);
        \u0275\u0275property("ngIf", ctx.isLoading || ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.error);
      }
    }, dependencies: [NgClass, NgIf, SidebarComponent, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatNoDataRow, MatSort, MatSortHeader, MatPaginator, MatCard, MatCardContent, MatFormField, MatLabel, MatSuffix, MatInput, MatIconButton, MatIcon, MatProgressSpinner, MatTooltip, MatToolbar, DatePipe], styles: ["\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  flex-shrink: 0;\n}\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background-color: #f5f5f5;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  flex: 1;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n.filter-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.filter-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.table-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.loading-error-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n.error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: #f44336;\n  gap: 8px;\n}\n.status-chip[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 16px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.status-todo[_ngcontent-%COMP%] {\n  background-color: #ffd740;\n  color: rgba(0, 0, 0, 0.87);\n}\n.status-in-progress[_ngcontent-%COMP%] {\n  background-color: #69f0ae;\n  color: rgba(0, 0, 0, 0.87);\n}\n.status-done[_ngcontent-%COMP%] {\n  background-color: #b2dfdb;\n  color: rgba(0, 0, 0, 0.87);\n}\n.no-data-cell[_ngcontent-%COMP%] {\n  padding: 24px !important;\n}\n.no-data-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  color: rgba(0, 0, 0, 0.54);\n}\n.mat-column-actions[_ngcontent-%COMP%] {\n  width: 120px;\n  text-align: center;\n}\n.mat-column-status[_ngcontent-%COMP%] {\n  width: 120px;\n}\n.mat-column-dueDate[_ngcontent-%COMP%] {\n  width: 120px;\n}\n@media (max-width: 768px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .filter-card[_ngcontent-%COMP%], .table-card[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n}\n/*# sourceMappingURL=plan-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanListComponent, { className: "PlanListComponent" });
})();

// src/app/core/services/user.service.ts
var UserService = class _UserService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/api/users`;
  }
  getAllUsers() {
    return this.http.get(this.apiUrl);
  }
  getUserById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createUser(user) {
    return this.http.post(this.apiUrl, user);
  }
  updateUser(id, user) {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static {
    this.\u0275fac = function UserService_Factory(t) {
      return new (t || _UserService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/remediation-plan/components/plan-form/plan-form.component.ts
function PlanFormComponent_div_11_mat_progress_spinner_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 13);
  }
}
function PlanFormComponent_div_11_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function PlanFormComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275template(1, PlanFormComponent_div_11_mat_progress_spinner_1_Template, 1, 0, "mat-progress-spinner", 11)(2, PlanFormComponent_div_11_div_2_Template, 5, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.error);
  }
}
function PlanFormComponent_form_12_mat_error_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le titre est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function PlanFormComponent_form_12_mat_error_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le titre ne doit pas d\xE9passer 100 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function PlanFormComponent_form_12_mat_error_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La description ne doit pas d\xE9passer 2000 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function PlanFormComponent_form_12_mat_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    \u0275\u0275property("value", user_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", user_r3.firstName, " ", user_r3.lastName, " ");
  }
}
function PlanFormComponent_form_12_mat_form_field_30_mat_error_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " L'ID du mapping est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function PlanFormComponent_form_12_mat_form_field_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 22)(1, "mat-label");
    \u0275\u0275text(2, "ID du mapping");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 34);
    \u0275\u0275template(4, PlanFormComponent_form_12_mat_form_field_30_mat_error_4_Template, 2, 0, "mat-error", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r0.planForm.get("mappingId")) == null ? null : tmp_3_0.hasError("required"));
  }
}
function PlanFormComponent_form_12_mat_option_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", status_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStatusLabel(status_r4), " ");
  }
}
function PlanFormComponent_form_12_mat_error_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le statut est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function PlanFormComponent_form_12_mat_spinner_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 35);
  }
}
function PlanFormComponent_form_12_span_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.isEditMode ? "Mettre \xE0 jour" : "Cr\xE9er");
  }
}
function PlanFormComponent_form_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 15);
    \u0275\u0275listener("ngSubmit", function PlanFormComponent_form_12_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(1, "mat-card", 16)(2, "mat-card-content")(3, "mat-form-field", 17)(4, "mat-label");
    \u0275\u0275text(5, "Titre du plan");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "input", 18);
    \u0275\u0275template(7, PlanFormComponent_form_12_mat_error_7_Template, 2, 0, "mat-error", 19)(8, PlanFormComponent_form_12_mat_error_8_Template, 2, 0, "mat-error", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 17)(10, "mat-label");
    \u0275\u0275text(11, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "textarea", 20);
    \u0275\u0275template(13, PlanFormComponent_form_12_mat_error_13_Template, 2, 0, "mat-error", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 21)(15, "mat-form-field", 22)(16, "mat-label");
    \u0275\u0275text(17, "Responsable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-select", 23)(19, "mat-option", 24);
    \u0275\u0275text(20, "Non assign\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, PlanFormComponent_form_12_mat_option_21_Template, 2, 3, "mat-option", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "mat-form-field", 22)(23, "mat-label");
    \u0275\u0275text(24, "Date d'\xE9ch\xE9ance");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 26)(26, "mat-datepicker-toggle", 27)(27, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 21);
    \u0275\u0275template(30, PlanFormComponent_form_12_mat_form_field_30_Template, 5, 1, "mat-form-field", 28);
    \u0275\u0275elementStart(31, "mat-form-field", 22)(32, "mat-label");
    \u0275\u0275text(33, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "mat-select", 29);
    \u0275\u0275template(35, PlanFormComponent_form_12_mat_option_35_Template, 2, 2, "mat-option", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275template(36, PlanFormComponent_form_12_mat_error_36_Template, 2, 0, "mat-error", 19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "mat-card-actions", 30)(38, "button", 31);
    \u0275\u0275listener("click", function PlanFormComponent_form_12_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancel());
    });
    \u0275\u0275text(39, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 32);
    \u0275\u0275template(41, PlanFormComponent_form_12_mat_spinner_41_Template, 1, 0, "mat-spinner", 33)(42, PlanFormComponent_form_12_span_42_Template, 2, 1, "span", 19);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_12_0;
    const picker_r5 = \u0275\u0275reference(28);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.planForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r0.planForm.get("title")) == null ? null : tmp_3_0.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r0.planForm.get("title")) == null ? null : tmp_4_0.hasError("maxlength"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", (tmp_5_0 = ctx_r0.planForm.get("description")) == null ? null : tmp_5_0.hasError("maxlength"));
    \u0275\u0275advance(6);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.users);
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", picker_r5);
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r5);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r0.mappingId);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r0.statuses);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_12_0 = ctx_r0.planForm.get("status")) == null ? null : tmp_12_0.hasError("required"));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.submitting);
  }
}
var PlanFormComponent = class _PlanFormComponent {
  constructor(fb, planService, userService, mappingService, route, router, snackBar) {
    this.fb = fb;
    this.planService = planService;
    this.userService = userService;
    this.mappingService = mappingService;
    this.route = route;
    this.router = router;
    this.snackBar = snackBar;
    this.isEditMode = false;
    this.planId = null;
    this.mappingId = null;
    this.users = [];
    this.isLoading = false;
    this.error = null;
    this.submitting = false;
    this.statuses = Object.values(RemediationPlanStatus);
  }
  ngOnInit() {
    console.debug("PlanFormComponent: Initialisation");
    this.initForm();
    this.loadFormData();
  }
  initForm() {
    this.planForm = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", Validators.maxLength(2e3)],
      ownerId: [null],
      dueDate: [null],
      status: [RemediationPlanStatus.TODO, Validators.required],
      mappingId: ["", Validators.required]
    });
  }
  loadFormData() {
    this.isLoading = true;
    this.error = null;
    console.debug("PlanFormComponent: Initialisation du chargement des donn\xE9es du formulaire");
    this.route.paramMap.subscribe((params) => {
      console.debug("PlanFormComponent: Params re\xE7us:", params);
      this.planId = params.get("id");
      const mappingIdParam = params.get("mappingId");
      console.debug("PlanFormComponent: Param\xE8tres extraits:", { id: this.planId, mappingId: mappingIdParam });
      this.mappingId = mappingIdParam ? +mappingIdParam : null;
      console.debug("PlanFormComponent: MappingId converti en nombre:", this.mappingId);
      this.isEditMode = !!this.planId;
      console.debug("PlanFormComponent: Mode \xE9dition:", this.isEditMode);
      const usersRequest = this.userService.getAllUsers();
      let planRequest = of(null);
      if (this.isEditMode && this.planId) {
        console.debug("PlanFormComponent: Chargement du plan existant:", this.planId);
        planRequest = this.planService.getPlan(this.planId);
      }
      if (this.mappingId) {
        console.debug("PlanFormComponent: MappingId extrait de l'URL:", this.mappingId);
        this.planForm.patchValue({ mappingId: this.mappingId });
        this.mappingService.getMapping(this.mappingId.toString()).subscribe({
          next: (mapping) => {
            console.debug("PlanFormComponent: Mapping trouv\xE9:", mapping);
          },
          error: (err) => {
            console.error("PlanFormComponent: Erreur lors de la v\xE9rification du mapping:", err);
            this.showErrorSnackbar(`Le mapping #${this.mappingId} n'existe pas. Assurez-vous de venir d'une analyse d'\xE9carts valide.`);
          }
        });
      } else {
        console.debug("PlanFormComponent: Aucun mappingId trouv\xE9 dans l'URL");
      }
      forkJoin({
        users: usersRequest,
        plan: planRequest
      }).subscribe({
        next: (result) => {
          this.users = result.users;
          if (result.plan && this.isEditMode) {
            const plan = result.plan;
            if (plan.dueDate) {
              plan.dueDate = new Date(plan.dueDate);
            }
            this.planForm.patchValue(plan);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Erreur lors du chargement des donn\xE9es", error);
          this.error = "Impossible de charger les donn\xE9es. Veuillez r\xE9essayer.";
          this.isLoading = false;
          this.showErrorSnackbar(this.error);
        }
      });
    });
  }
  onSubmit() {
    if (this.planForm.invalid) {
      this.markFormGroupTouched(this.planForm);
      return;
    }
    const formData = this.planForm.value;
    if (formData.dueDate) {
      formData.dueDate = formData.dueDate.toISOString().split("T")[0];
    }
    if (formData.mappingId && typeof formData.mappingId === "string") {
      formData.mappingId = parseInt(formData.mappingId, 10);
    } else if (this.mappingId) {
      formData.mappingId = this.mappingId;
    }
    if (!formData.mappingId) {
      this.showErrorSnackbar("ID de mapping manquant. Veuillez vous assurer de venir d'une analyse d'\xE9carts valide.");
      return;
    }
    const planDTO = formData;
    console.debug("Envoi DTO RemediationPlan", planDTO);
    this.submitting = true;
    const request = this.isEditMode && this.planId ? this.planService.updatePlan(this.planId, planDTO) : this.planService.createPlan(planDTO);
    request.subscribe({
      next: (result) => {
        this.submitting = false;
        const message = this.isEditMode ? "Plan mis \xE0 jour avec succ\xE8s" : "Plan cr\xE9\xE9 avec succ\xE8s";
        this.showSuccessSnackbar(message);
        this.router.navigate(["/remediation-plans", planDTO.mappingId]);
      },
      error: (error) => {
        console.error("Erreur lors de la soumission du formulaire", error);
        this.submitting = false;
        if (error.status === 404 && error.error && error.error.message && error.error.message.includes("Mapping non trouv\xE9")) {
          this.showErrorSnackbar("Mapping non trouv\xE9. V\xE9rifiez que vous venez bien d'une analyse d'\xE9carts valide.");
        } else {
          this.showErrorSnackbar("Impossible de sauvegarder le plan. Veuillez r\xE9essayer.");
        }
      }
    });
  }
  cancel() {
    if (this.mappingId) {
      this.router.navigate(["/remediation-plans", this.mappingId]);
    } else {
      this.router.navigate(["/remediation-plans"]);
    }
  }
  // Helper pour marquer tous les contrôles comme touchés
  markFormGroupTouched(formGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  // Helper pour traduire le statut
  getStatusLabel(status) {
    switch (status) {
      case RemediationPlanStatus.TODO:
        return "\xC0 faire";
      case RemediationPlanStatus.IN_PROGRESS:
        return "En cours";
      case RemediationPlanStatus.DONE:
        return "Termin\xE9";
      default:
        return status;
    }
  }
  showSuccessSnackbar(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 3e3,
      panelClass: ["success-snackbar"]
    });
  }
  showErrorSnackbar(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 5e3,
      panelClass: ["error-snackbar"]
    });
  }
  static {
    this.\u0275fac = function PlanFormComponent_Factory(t) {
      return new (t || _PlanFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(RemediationPlanService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(RiskComplianceMappingService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanFormComponent, selectors: [["app-plan-form"]], decls: 13, vars: 3, consts: [["picker", ""], [1, "layout"], [1, "sidebar"], [1, "content"], ["color", "primary"], [1, "spacer"], ["mat-icon-button", "", "matTooltip", "Retour", 3, "click"], [1, "page-content"], ["class", "loading-error-container", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "loading-error-container"], ["mode", "indeterminate", "diameter", "40", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["mode", "indeterminate", "diameter", "40"], [1, "error-message"], [3, "ngSubmit", "formGroup"], [1, "form-card"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "title", "placeholder", "Ex: Mise \xE0 jour de la politique de s\xE9curit\xE9", "required", ""], [4, "ngIf"], ["matInput", "", "formControlName", "description", "rows", "4", "placeholder", "D\xE9crivez les actions \xE0 entreprendre..."], [1, "form-row"], ["appearance", "outline", 1, "form-field"], ["formControlName", "ownerId"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "dueDate", 3, "matDatepicker"], ["matSuffix", "", 3, "for"], ["appearance", "outline", "class", "form-field", 4, "ngIf"], ["formControlName", "status", "required", ""], [1, "form-actions"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], ["matInput", "", "formControlName", "mappingId", "required", ""], ["diameter", "20"]], template: function PlanFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275element(1, "app-sidebar", 2);
        \u0275\u0275elementStart(2, "div", 3)(3, "mat-toolbar", 4)(4, "span");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275element(6, "span", 5);
        \u0275\u0275elementStart(7, "button", 6);
        \u0275\u0275listener("click", function PlanFormComponent_Template_button_click_7_listener() {
          return ctx.cancel();
        });
        \u0275\u0275elementStart(8, "mat-icon");
        \u0275\u0275text(9, "arrow_back");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 7);
        \u0275\u0275template(11, PlanFormComponent_div_11_Template, 3, 2, "div", 8)(12, PlanFormComponent_form_12_Template, 43, 14, "form", 9);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.isEditMode ? "Modifier le Plan de Rem\xE9diation" : "Nouveau Plan de Rem\xE9diation");
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.isLoading || ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.error);
      }
    }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, SidebarComponent, MatCard, MatCardActions, MatCardContent, MatFormField, MatLabel, MatError, MatSuffix, MatInput, MatSelect, MatOption, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatButton, MatIconButton, MatIcon, MatProgressSpinner, MatTooltip, MatToolbar], styles: ["\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  flex-shrink: 0;\n}\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background-color: #f5f5f5;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  flex: 1;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n.form-card[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  margin-bottom: 16px;\n}\n.form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 16px;\n  padding: 16px;\n}\n.loading-error-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n.error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: #f44336;\n  gap: 8px;\n}\n@media (max-width: 768px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .form-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=plan-form.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanFormComponent, { className: "PlanFormComponent" });
})();

// src/app/features/remediation-plan/components/plan-detail/plan-detail.component.ts
function PlanDetailComponent_div_0_div_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "h3");
    \u0275\u0275text(2, "Description d\xE9taill\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.plan.description);
  }
}
function PlanDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 3);
    \u0275\u0275element(2, "app-sidebar", 4);
    \u0275\u0275elementStart(3, "div", 5)(4, "mat-card", 6)(5, "mat-card-header")(6, "mat-card-title")(7, "h1");
    \u0275\u0275text(8, "D\xE9tails du Plan d'Action");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-card-subtitle")(10, "mat-chip", 7);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "mat-card-content")(13, "div", 8)(14, "div", 9)(15, "h2");
    \u0275\u0275text(16, "Informations g\xE9n\xE9rales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 10)(18, "mat-icon");
    \u0275\u0275text(19, "title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 11)(21, "span", 12);
    \u0275\u0275text(22, "Titre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 13);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 10)(26, "mat-icon");
    \u0275\u0275text(27, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 11)(29, "span", 12);
    \u0275\u0275text(30, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 13);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 9)(34, "h2");
    \u0275\u0275text(35, "M\xE9tadonn\xE9es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 10)(37, "mat-icon");
    \u0275\u0275text(38, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 11)(40, "span", 12);
    \u0275\u0275text(41, "Responsable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 13);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 10)(45, "mat-icon");
    \u0275\u0275text(46, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 11)(48, "span", 12);
    \u0275\u0275text(49, "Date d'\xE9ch\xE9ance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 13);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 10)(54, "mat-icon");
    \u0275\u0275text(55, "update");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div", 11)(57, "span", 12);
    \u0275\u0275text(58, "Derni\xE8re mise \xE0 jour");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "span", 13);
    \u0275\u0275text(60);
    \u0275\u0275pipe(61, "date");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(62, PlanDetailComponent_div_0_div_62_Template, 5, 1, "div", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "mat-card-actions", 15)(64, "button", 16);
    \u0275\u0275listener("click", function PlanDetailComponent_div_0_Template_button_click_64_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275elementStart(65, "mat-icon");
    \u0275\u0275text(66, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(67, " Retour \xE0 la liste ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 17);
    \u0275\u0275listener("click", function PlanDetailComponent_div_0_Template_button_click_68_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editPlan());
    });
    \u0275\u0275elementStart(69, "mat-icon");
    \u0275\u0275text(70, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(71, " Modifier ");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("color", ctx_r1.getStatusColor(ctx_r1.plan.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(ctx_r1.plan.status), " ");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(ctx_r1.plan.title);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.plan.description || "Non sp\xE9cifi\xE9e");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.plan.ownerName || "Non assign\xE9");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(52, 8, ctx_r1.plan.dueDate, "longDate"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(61, 11, ctx_r1.plan.updatedAt, "medium"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.plan.description);
  }
}
function PlanDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "mat-spinner", 20);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement du plan d'action...");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("diameter", 40);
  }
}
function PlanDetailComponent_mat_card_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 21)(1, "mat-card-content")(2, "div", 22)(3, "mat-icon");
    \u0275\u0275text(4, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Impossible de charger les d\xE9tails du plan d'action. Veuillez r\xE9essayer plus tard.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "mat-card-actions", 15)(8, "button", 23);
    \u0275\u0275listener("click", function PlanDetailComponent_mat_card_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(9, "Retour");
    \u0275\u0275elementEnd()()();
  }
}
var PlanDetailComponent = class _PlanDetailComponent {
  constructor(route, router, planService, snackBar) {
    this.route = route;
    this.router = router;
    this.planService = planService;
    this.snackBar = snackBar;
    this.plan = null;
    this.loading = true;
    this.error = null;
  }
  ngOnInit() {
    this.loadPlan();
  }
  loadPlan() {
    const planId = this.route.snapshot.paramMap.get("id");
    if (!planId) {
      this.error = "ID du plan non sp\xE9cifi\xE9";
      this.loading = false;
      return;
    }
    this.planService.getPlan(planId).subscribe({
      next: (plan) => {
        this.plan = plan;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement du plan", error);
        this.error = "Impossible de charger les d\xE9tails du plan";
        this.loading = false;
        this.showErrorSnackbar(this.error);
      }
    });
  }
  getStatusLabel(status) {
    if (!status)
      return "Inconnu";
    switch (status) {
      case RemediationPlanStatus.TODO:
        return "\xC0 faire";
      case RemediationPlanStatus.IN_PROGRESS:
        return "En cours";
      case RemediationPlanStatus.DONE:
        return "Termin\xE9";
      default:
        return status;
    }
  }
  getStatusColor(status) {
    if (!status)
      return "default";
    switch (status) {
      case RemediationPlanStatus.TODO:
        return "warn";
      case RemediationPlanStatus.IN_PROGRESS:
        return "accent";
      case RemediationPlanStatus.DONE:
        return "primary";
      default:
        return "default";
    }
  }
  editPlan() {
    if (this.plan?.id) {
      this.router.navigate(["/remediation-plans/edit", this.plan.id]);
    }
  }
  goBack() {
    if (this.plan?.mappingId) {
      this.router.navigate(["/remediation-plans", this.plan.mappingId]);
    } else {
      this.router.navigate(["/remediation-plans"]);
    }
  }
  showErrorSnackbar(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 5e3,
      panelClass: ["error-snackbar"]
    });
  }
  static {
    this.\u0275fac = function PlanDetailComponent_Factory(t) {
      return new (t || _PlanDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(RemediationPlanService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanDetailComponent, selectors: [["app-plan-detail"]], decls: 3, vars: 3, consts: [[4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "error-card", 4, "ngIf"], [1, "layout"], [1, "sidebar"], [1, "content"], [1, "plan-detail-card"], ["selected", "", 3, "color"], [1, "plan-info-grid"], [1, "info-section"], [1, "info-row"], [1, "info-content"], [1, "label"], [1, "value"], ["class", "description-section", 4, "ngIf"], ["align", "end"], ["mat-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "description-section"], [1, "loading-container"], [3, "diameter"], [1, "error-card"], [1, "error-message"], ["mat-button", "", 3, "click"]], template: function PlanDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, PlanDetailComponent_div_0_Template, 72, 14, "div", 0)(1, PlanDetailComponent_div_1_Template, 4, 1, "div", 1)(2, PlanDetailComponent_mat_card_2_Template, 10, 0, "mat-card", 2);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.plan);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.error);
      }
    }, dependencies: [NgIf, SidebarComponent, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButton, MatIcon, MatChip, MatProgressSpinner, DatePipe], styles: ["\n\n.status-todo[_ngcontent-%COMP%] {\n  background-color: #f8d7da !important;\n  color: #721c24 !important;\n}\n.status-in-progress[_ngcontent-%COMP%] {\n  background-color: #fff3cd !important;\n  color: #856404 !important;\n}\n.status-done[_ngcontent-%COMP%] {\n  background-color: #d4edda !important;\n  color: #155724 !important;\n}\n.mat-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.mat-card-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\nmat-spinner[_ngcontent-%COMP%] {\n  margin: 0 auto;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-top: 16px;\n  margin-bottom: 24px;\n}\n.description-section[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  padding-top: 16px;\n}\n.description-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  color: #3f51b5;\n  font-weight: 500;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: rgba(0, 0, 0, 0.54);\n}\n.error-card[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: #f44336;\n}\n.error-message[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  flex-shrink: 0;\n}\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px;\n  background-color: #f5f5f5;\n}\n.plan-detail-card[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.plan-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 24px;\n  margin-top: 16px;\n}\n.info-section[_ngcontent-%COMP%] {\n  background: white;\n  padding: 16px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.info-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: #333;\n  font-size: 1.2em;\n  font-weight: 500;\n}\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  margin-bottom: 16px;\n  padding: 8px;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n}\n.info-row[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.info-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 16px;\n  color: #666;\n}\n.info-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.info-content[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.9em;\n  color: #666;\n  margin-bottom: 4px;\n}\n.info-content[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 1.1em;\n  color: #333;\n  word-break: break-word;\n}\nmat-card-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\nmat-card-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.8em;\n  font-weight: 500;\n}\nmat-card-subtitle[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\nmat-card-actions[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-top: 1px solid #eee;\n  margin-top: 24px;\n}\nmat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\nmat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n@media (max-width: 768px) {\n  .plan-info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .plan-detail-card[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n}\n/*# sourceMappingURL=plan-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanDetailComponent, { className: "PlanDetailComponent" });
})();

// src/app/features/remediation-plan/remediation-plan-routing.module.ts
var routes = [
  {
    path: "",
    component: PlanListComponent,
    canActivate: [AuthGuard],
    data: { title: "Liste des plans" }
  },
  {
    path: "new/:mappingId",
    component: PlanFormComponent,
    canActivate: [AuthGuard],
    data: { title: "Nouveau plan" }
  },
  {
    path: "edit/:id",
    component: PlanFormComponent,
    canActivate: [AuthGuard],
    data: { title: "Modifier le plan" }
  },
  {
    path: "detail/:id",
    component: PlanDetailComponent,
    canActivate: [AuthGuard],
    data: { title: "D\xE9tails du plan" }
  },
  {
    path: ":mappingId",
    component: PlanListComponent,
    canActivate: [AuthGuard],
    data: { title: "Plans par mapping" }
  }
];
var RemediationPlanRoutingModule = class _RemediationPlanRoutingModule {
  constructor() {
    console.debug("RemediationPlanRoutingModule: Module de routage initialis\xE9");
  }
  static {
    this.\u0275fac = function RemediationPlanRoutingModule_Factory(t) {
      return new (t || _RemediationPlanRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _RemediationPlanRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/features/remediation-plan/remediation-plan.module.ts
var RemediationPlanModule = class _RemediationPlanModule {
  static {
    this.\u0275fac = function RemediationPlanModule_Factory(t) {
      return new (t || _RemediationPlanModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _RemediationPlanModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      ReactiveFormsModule,
      RemediationPlanRoutingModule,
      LayoutModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatButtonModule,
      MatIconModule,
      MatChipsModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      MatDialogModule,
      MatToolbarModule
    ] });
  }
};
export {
  RemediationPlanModule
};
//# sourceMappingURL=chunk-VGJUNVUO.js.map
