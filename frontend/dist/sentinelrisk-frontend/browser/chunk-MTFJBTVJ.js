import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-DUOP6AJ7.js";
import {
  ControlService
} from "./chunk-YS3YDMK3.js";
import {
  MatChip,
  MatChipSet,
  MatChipsModule
} from "./chunk-3PN52UW6.js";
import {
  AdminSharedModule
} from "./chunk-OWWRPOMU.js";
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
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-R2B4LHFC.js";
import {
  ConfirmDialogComponent
} from "./chunk-3A2JNQVP.js";
import "./chunk-PMRQPNHV.js";
import {
  MAT_DIALOG_DATA,
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatHint,
  MatInput,
  MatInputModule,
  MatLabel,
  MatRow,
  MatRowDef,
  MatSelect,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule,
  MatSuffix,
  MatTable,
  MatTableModule
} from "./chunk-PKA5PYFO.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatIcon,
  MatIconModule,
  MatTooltip,
  MatTooltipModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
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
  NgForOf,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  finalize,
  forkJoin,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-N6MSFXF2.js";

// src/app/features/controls/models/control.model.ts
var ControlType;
(function(ControlType2) {
  ControlType2["PREVENTIVE"] = "PREVENTIVE";
  ControlType2["DETECTIVE"] = "DETECTIVE";
  ControlType2["CORRECTIVE"] = "CORRECTIVE";
  ControlType2["DIRECTIVE"] = "DIRECTIVE";
})(ControlType || (ControlType = {}));
var ControlStatus;
(function(ControlStatus2) {
  ControlStatus2["PLANNED"] = "PLANNED";
  ControlStatus2["IMPLEMENTED"] = "IMPLEMENTED";
  ControlStatus2["TESTED"] = "TESTED";
  ControlStatus2["INEFFECTIVE"] = "INEFFECTIVE";
  ControlStatus2["EFFECTIVE"] = "EFFECTIVE";
  ControlStatus2["DEPRECATED"] = "DEPRECATED";
})(ControlStatus || (ControlStatus = {}));
var ControlFrequency;
(function(ControlFrequency2) {
  ControlFrequency2["CONTINUOUS"] = "CONTINUOUS";
  ControlFrequency2["DAILY"] = "DAILY";
  ControlFrequency2["WEEKLY"] = "WEEKLY";
  ControlFrequency2["MONTHLY"] = "MONTHLY";
  ControlFrequency2["QUARTERLY"] = "QUARTERLY";
  ControlFrequency2["ANNUALLY"] = "ANNUALLY";
  ControlFrequency2["ON_DEMAND"] = "ON_DEMAND";
})(ControlFrequency || (ControlFrequency = {}));

// src/app/features/controls/control-form-dialog/control-form-dialog.component.ts
function ControlFormDialogComponent_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le nom est requis ");
    \u0275\u0275elementEnd();
  }
}
function ControlFormDialogComponent_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le nom ne doit pas d\xE9passer 100 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function ControlFormDialogComponent_mat_error_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La description ne doit pas d\xE9passer 1000 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function ControlFormDialogComponent_mat_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", type_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.typeTranslations[type_r2], " ");
  }
}
function ControlFormDialogComponent_mat_error_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le type est requis ");
    \u0275\u0275elementEnd();
  }
}
function ControlFormDialogComponent_mat_option_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", status_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.statusTranslations[status_r4], " ");
  }
}
function ControlFormDialogComponent_mat_error_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le statut est requis ");
    \u0275\u0275elementEnd();
  }
}
function ControlFormDialogComponent_mat_option_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const frequency_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", frequency_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.frequencyTranslations[frequency_r5], " ");
  }
}
function ControlFormDialogComponent_mat_error_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le score doit \xEAtre sup\xE9rieur ou \xE9gal \xE0 0 ");
    \u0275\u0275elementEnd();
  }
}
function ControlFormDialogComponent_mat_error_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le score doit \xEAtre inf\xE9rieur ou \xE9gal \xE0 100 ");
    \u0275\u0275elementEnd();
  }
}
function ControlFormDialogComponent_mat_option_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 27);
    \u0275\u0275text(1, "Chargement des risques...");
    \u0275\u0275elementEnd();
  }
}
function ControlFormDialogComponent_mat_option_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const risk_r6 = ctx.$implicit;
    \u0275\u0275property("value", risk_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", risk_r6.name, " ");
  }
}
function ControlFormDialogComponent_span_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "mat-spinner", 28);
    \u0275\u0275elementEnd();
  }
}
var ControlFormDialogComponent = class _ControlFormDialogComponent {
  constructor(fb, controlService, riskService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.controlService = controlService;
    this.riskService = riskService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isSubmitting = false;
    this.isLoadingRisks = false;
    this.risks = [];
    this.controlTypes = Object.values(ControlType);
    this.controlStatuses = Object.values(ControlStatus);
    this.controlFrequencies = Object.values(ControlFrequency);
    this.typeTranslations = {
      [ControlType.PREVENTIVE]: "Pr\xE9ventif",
      [ControlType.DETECTIVE]: "D\xE9tectif",
      [ControlType.CORRECTIVE]: "Correctif",
      [ControlType.DIRECTIVE]: "Directif"
    };
    this.statusTranslations = {
      [ControlStatus.PLANNED]: "Planifi\xE9",
      [ControlStatus.IMPLEMENTED]: "Impl\xE9ment\xE9",
      [ControlStatus.TESTED]: "Test\xE9",
      [ControlStatus.INEFFECTIVE]: "Inefficace",
      [ControlStatus.EFFECTIVE]: "Efficace",
      [ControlStatus.DEPRECATED]: "Obsol\xE8te"
    };
    this.frequencyTranslations = {
      [ControlFrequency.CONTINUOUS]: "Continu",
      [ControlFrequency.DAILY]: "Quotidien",
      [ControlFrequency.WEEKLY]: "Hebdomadaire",
      [ControlFrequency.MONTHLY]: "Mensuel",
      [ControlFrequency.QUARTERLY]: "Trimestriel",
      [ControlFrequency.ANNUALLY]: "Annuel",
      [ControlFrequency.ON_DEMAND]: "Sur demande"
    };
    this.isEditing = !!data.control;
    this.controlForm = this.createForm();
  }
  ngOnInit() {
    this.loadRisks();
    if (this.isEditing && this.data.control) {
      this.controlForm.patchValue(this.data.control);
    }
  }
  loadRisks() {
    this.isLoadingRisks = true;
    this.riskService.getRisks().pipe(finalize(() => this.isLoadingRisks = false)).subscribe({
      next: (risks) => {
        this.risks = risks;
        console.log("Risques charg\xE9s:", risks);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des risques:", error);
        this.snackBar.open("Erreur lors du chargement des risques", "Fermer", { duration: 5e3 });
      }
    });
  }
  createForm() {
    return this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", Validators.maxLength(1e3)],
      type: [ControlType.PREVENTIVE, Validators.required],
      status: [ControlStatus.PLANNED, Validators.required],
      frequency: [null],
      owner: [""],
      implementationDate: [null],
      lastTestedDate: [null],
      effectivenessScore: [null, [Validators.min(0), Validators.max(100)]],
      documentation: [""],
      riskIds: [[]]
    });
  }
  onSubmit() {
    if (this.controlForm.invalid) {
      this.markFormGroupTouched(this.controlForm);
      return;
    }
    this.isSubmitting = true;
    const controlData = this.controlForm.value;
    if (this.isEditing && this.data.control) {
      this.controlService.updateControl(this.data.control.id, controlData).subscribe({
        next: (updatedControl) => {
          this.snackBar.open("Contr\xF4le mis \xE0 jour avec succ\xE8s", "Fermer", { duration: 3e3 });
          this.dialogRef.close(updatedControl);
        },
        error: (error) => {
          console.error("Erreur lors de la mise \xE0 jour du contr\xF4le:", error);
          this.snackBar.open("Erreur lors de la mise \xE0 jour du contr\xF4le", "Fermer", { duration: 5e3 });
          this.isSubmitting = false;
        }
      });
    } else {
      this.controlService.createControl(controlData).subscribe({
        next: (newControl) => {
          this.snackBar.open("Contr\xF4le cr\xE9\xE9 avec succ\xE8s", "Fermer", { duration: 3e3 });
          this.dialogRef.close(newControl);
        },
        error: (error) => {
          console.error("Erreur lors de la cr\xE9ation du contr\xF4le:", error);
          this.snackBar.open("Erreur lors de la cr\xE9ation du contr\xF4le", "Fermer", { duration: 5e3 });
          this.isSubmitting = false;
        }
      });
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
  // Fonction pour marquer tous les champs comme touchés
  markFormGroupTouched(formGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  static {
    this.\u0275fac = function ControlFormDialogComponent_Factory(t) {
      return new (t || _ControlFormDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ControlService), \u0275\u0275directiveInject(RiskService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlFormDialogComponent, selectors: [["app-control-form-dialog"]], decls: 80, vars: 23, consts: [["implementationPicker", ""], ["testPicker", ""], ["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], [1, "form-container"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "name", "placeholder", "Nom du contr\xF4le", "required", ""], [4, "ngIf"], ["matInput", "", "formControlName", "description", "placeholder", "Description du contr\xF4le", "rows", "3"], [1, "form-row"], ["appearance", "outline"], ["formControlName", "type", "required", ""], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "status", "required", ""], ["formControlName", "frequency"], [3, "value"], ["matInput", "", "formControlName", "owner", "placeholder", "Responsable du contr\xF4le"], ["matInput", "", "formControlName", "implementationDate", 3, "matDatepicker"], ["matSuffix", "", 3, "for"], ["matInput", "", "formControlName", "lastTestedDate", 3, "matDatepicker"], ["matInput", "", "type", "number", "formControlName", "effectivenessScore", "min", "0", "max", "100", "placeholder", "Score entre 0 et 100"], ["matInput", "", "formControlName", "documentation", "placeholder", "Lien ou r\xE9f\xE9rence vers la documentation", "rows", "2"], ["formControlName", "riskIds", "multiple", ""], ["disabled", "", 4, "ngIf"], ["align", "end"], ["mat-button", "", "type", "button", 3, "click", "disabled"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["disabled", ""], ["diameter", "20", 2, "display", "inline-block", "margin-right", "8px"]], template: function ControlFormDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "h2", 2);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "form", 3);
        \u0275\u0275listener("ngSubmit", function ControlFormDialogComponent_Template_form_ngSubmit_2_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275elementStart(3, "mat-dialog-content")(4, "div", 4)(5, "mat-form-field", 5)(6, "mat-label");
        \u0275\u0275text(7, "Nom");
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "input", 6);
        \u0275\u0275template(9, ControlFormDialogComponent_mat_error_9_Template, 2, 0, "mat-error", 7)(10, ControlFormDialogComponent_mat_error_10_Template, 2, 0, "mat-error", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "mat-form-field", 5)(12, "mat-label");
        \u0275\u0275text(13, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "textarea", 8);
        \u0275\u0275template(15, ControlFormDialogComponent_mat_error_15_Template, 2, 0, "mat-error", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 9)(17, "mat-form-field", 10)(18, "mat-label");
        \u0275\u0275text(19, "Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "mat-select", 11);
        \u0275\u0275template(21, ControlFormDialogComponent_mat_option_21_Template, 2, 2, "mat-option", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(22, ControlFormDialogComponent_mat_error_22_Template, 2, 0, "mat-error", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "mat-form-field", 10)(24, "mat-label");
        \u0275\u0275text(25, "Statut");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-select", 13);
        \u0275\u0275template(27, ControlFormDialogComponent_mat_option_27_Template, 2, 2, "mat-option", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(28, ControlFormDialogComponent_mat_error_28_Template, 2, 0, "mat-error", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 9)(30, "mat-form-field", 10)(31, "mat-label");
        \u0275\u0275text(32, "Fr\xE9quence");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "mat-select", 14)(34, "mat-option", 15);
        \u0275\u0275text(35, "Non applicable");
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, ControlFormDialogComponent_mat_option_36_Template, 2, 2, "mat-option", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "mat-form-field", 10)(38, "mat-label");
        \u0275\u0275text(39, "Propri\xE9taire");
        \u0275\u0275elementEnd();
        \u0275\u0275element(40, "input", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "div", 9)(42, "mat-form-field", 10)(43, "mat-label");
        \u0275\u0275text(44, "Date d'impl\xE9mentation");
        \u0275\u0275elementEnd();
        \u0275\u0275element(45, "input", 17)(46, "mat-datepicker-toggle", 18)(47, "mat-datepicker", null, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "mat-form-field", 10)(50, "mat-label");
        \u0275\u0275text(51, "Date du dernier test");
        \u0275\u0275elementEnd();
        \u0275\u0275element(52, "input", 19)(53, "mat-datepicker-toggle", 18)(54, "mat-datepicker", null, 1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "mat-form-field", 5)(57, "mat-label");
        \u0275\u0275text(58, "Score d'efficacit\xE9 (%)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(59, "input", 20);
        \u0275\u0275template(60, ControlFormDialogComponent_mat_error_60_Template, 2, 0, "mat-error", 7)(61, ControlFormDialogComponent_mat_error_61_Template, 2, 0, "mat-error", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "mat-form-field", 5)(63, "mat-label");
        \u0275\u0275text(64, "Documentation");
        \u0275\u0275elementEnd();
        \u0275\u0275element(65, "textarea", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "mat-form-field", 5)(67, "mat-label");
        \u0275\u0275text(68, "Risques associ\xE9s");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "mat-select", 22);
        \u0275\u0275template(70, ControlFormDialogComponent_mat_option_70_Template, 2, 0, "mat-option", 23)(71, ControlFormDialogComponent_mat_option_71_Template, 2, 2, "mat-option", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "mat-hint");
        \u0275\u0275text(73, "S\xE9lectionnez les risques g\xE9r\xE9s par ce contr\xF4le");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(74, "mat-dialog-actions", 24)(75, "button", 25);
        \u0275\u0275listener("click", function ControlFormDialogComponent_Template_button_click_75_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onCancel());
        });
        \u0275\u0275text(76, "Annuler");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "button", 26);
        \u0275\u0275template(78, ControlFormDialogComponent_span_78_Template, 2, 0, "span", 7);
        \u0275\u0275text(79);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_4_0;
        let tmp_5_0;
        let tmp_6_0;
        let tmp_8_0;
        let tmp_10_0;
        let tmp_17_0;
        let tmp_18_0;
        const implementationPicker_r7 = \u0275\u0275reference(48);
        const testPicker_r8 = \u0275\u0275reference(55);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.isEditing ? "Modifier le contr\xF4le" : "Nouveau contr\xF4le");
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.controlForm);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", (tmp_4_0 = ctx.controlForm.get("name")) == null ? null : tmp_4_0.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_5_0 = ctx.controlForm.get("name")) == null ? null : tmp_5_0.hasError("maxlength"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", (tmp_6_0 = ctx.controlForm.get("description")) == null ? null : tmp_6_0.hasError("maxlength"));
        \u0275\u0275advance(6);
        \u0275\u0275property("ngForOf", ctx.controlTypes);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_8_0 = ctx.controlForm.get("type")) == null ? null : tmp_8_0.hasError("required"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.controlStatuses);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_10_0 = ctx.controlForm.get("status")) == null ? null : tmp_10_0.hasError("required"));
        \u0275\u0275advance(6);
        \u0275\u0275property("value", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.controlFrequencies);
        \u0275\u0275advance(9);
        \u0275\u0275property("matDatepicker", implementationPicker_r7);
        \u0275\u0275advance();
        \u0275\u0275property("for", implementationPicker_r7);
        \u0275\u0275advance(6);
        \u0275\u0275property("matDatepicker", testPicker_r8);
        \u0275\u0275advance();
        \u0275\u0275property("for", testPicker_r8);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", (tmp_17_0 = ctx.controlForm.get("effectivenessScore")) == null ? null : tmp_17_0.hasError("min"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_18_0 = ctx.controlForm.get("effectivenessScore")) == null ? null : tmp_18_0.hasError("max"));
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.isLoadingRisks);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.risks);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.isSubmitting);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.isSubmitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isSubmitting);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Mettre \xE0 jour" : "Cr\xE9er", " ");
      }
    }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, FormGroupDirective, FormControlName, MatButton, MatFormField, MatLabel, MatHint, MatError, MatSuffix, MatInput, MatSelect, MatOption, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatProgressSpinner, MatDialogTitle, MatDialogActions, MatDialogContent], styles: ["\n\n.form-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 500px;\n  max-width: 800px;\n  padding: 0 10px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n}\n.form-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\nmat-dialog-content[_ngcontent-%COMP%] {\n  max-height: 70vh;\n  padding-top: 10px;\n}\n/*# sourceMappingURL=control-form-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlFormDialogComponent, { className: "ControlFormDialogComponent" });
})();

// src/app/features/controls/controls.component.ts
var _c0 = (a0) => ["/controls", a0];
function ControlsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "mat-progress-spinner", 19);
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Nom");
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(control_r1.name);
  }
}
function ControlsComponent_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Type");
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21)(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const control_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getTypeClass(control_r2.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.typeTranslations[control_r2.type], " ");
  }
}
function ControlsComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21)(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const control_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getStatusClass(control_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.statusTranslations[control_r4.status], " ");
  }
}
function ControlsComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Fr\xE9quence");
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", control_r5.frequency ? ctx_r2.frequencyTranslations[control_r5.frequency] : "N/A", " ");
  }
}
function ControlsComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Efficacit\xE9");
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_td_25_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.getEffectivenessClass(control_r6.effectivenessScore));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", control_r6.effectivenessScore, " % ");
  }
}
function ControlsComponent_td_25_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Non \xE9valu\xE9");
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275template(1, ControlsComponent_td_25_span_1_Template, 2, 3, "span", 24)(2, ControlsComponent_td_25_span_2_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", control_r6.effectivenessScore !== void 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", control_r6.effectivenessScore === void 0);
  }
}
function ControlsComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Date de cr\xE9ation");
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, control_r7.createdAt, "dd/MM/yyyy"));
  }
}
function ControlsComponent_th_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function ControlsComponent_td_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 21)(1, "button", 27)(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 28);
    \u0275\u0275listener("click", function ControlsComponent_td_31_Template_button_click_4_listener() {
      const control_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openControlForm(control_r9));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 29);
    \u0275\u0275listener("click", function ControlsComponent_td_31_Template_button_click_7_listener() {
      const control_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteControl(control_r9));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const control_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, control_r9.id));
  }
}
function ControlsComponent_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 30);
  }
}
function ControlsComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 31);
  }
}
function ControlsComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "p");
    \u0275\u0275text(2, "Aucun contr\xF4le trouv\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 2);
    \u0275\u0275listener("click", function ControlsComponent_div_34_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openControlForm());
    });
    \u0275\u0275text(4, " Ajouter un contr\xF4le ");
    \u0275\u0275elementEnd()();
  }
}
var ControlsComponent = class _ControlsComponent {
  constructor(controlService, dialog, snackBar) {
    this.controlService = controlService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.controls = [];
    this.displayedColumns = ["name", "type", "status", "frequency", "effectivenessScore", "createdAt", "actions"];
    this.isLoading = false;
    this.typeTranslations = {
      [ControlType.PREVENTIVE]: "Pr\xE9ventif",
      [ControlType.DETECTIVE]: "D\xE9tectif",
      [ControlType.CORRECTIVE]: "Correctif",
      [ControlType.DIRECTIVE]: "Directif"
    };
    this.statusTranslations = {
      [ControlStatus.PLANNED]: "Planifi\xE9",
      [ControlStatus.IMPLEMENTED]: "Impl\xE9ment\xE9",
      [ControlStatus.TESTED]: "Test\xE9",
      [ControlStatus.INEFFECTIVE]: "Inefficace",
      [ControlStatus.EFFECTIVE]: "Efficace",
      [ControlStatus.DEPRECATED]: "Obsol\xE8te"
    };
    this.frequencyTranslations = {
      [ControlFrequency.CONTINUOUS]: "Continu",
      [ControlFrequency.DAILY]: "Quotidien",
      [ControlFrequency.WEEKLY]: "Hebdomadaire",
      [ControlFrequency.MONTHLY]: "Mensuel",
      [ControlFrequency.QUARTERLY]: "Trimestriel",
      [ControlFrequency.ANNUALLY]: "Annuel",
      [ControlFrequency.ON_DEMAND]: "Sur demande"
    };
  }
  ngOnInit() {
    this.loadControls();
  }
  loadControls() {
    this.isLoading = true;
    this.controlService.getControls().subscribe({
      next: (controls) => {
        console.log("Contr\xF4les r\xE9cup\xE9r\xE9s:", controls);
        this.controls = controls;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des contr\xF4les:", error);
        this.showError("Erreur lors du chargement des contr\xF4les");
        this.isLoading = false;
      }
    });
  }
  openControlForm(control) {
    const dialogRef = this.dialog.open(ControlFormDialogComponent, {
      width: "600px",
      data: { control }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadControls();
      }
    });
  }
  deleteControl(control) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Supprimer le contr\xF4le",
        message: `\xCAtes-vous s\xFBr de vouloir supprimer le contr\xF4le "${control.name}" ?`,
        confirmText: "Supprimer",
        cancelText: "Annuler"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.controlService.deleteControl(control.id).subscribe({
          next: () => {
            this.snackBar.open("Contr\xF4le supprim\xE9 avec succ\xE8s", "Fermer", { duration: 3e3 });
            this.loadControls();
          },
          error: (error) => {
            console.error("Erreur lors de la suppression du contr\xF4le:", error);
            this.showError("Erreur lors de la suppression du contr\xF4le");
            this.isLoading = false;
          }
        });
      }
    });
  }
  getTypeClass(type) {
    return type.toLowerCase();
  }
  getStatusClass(status) {
    return status.toLowerCase();
  }
  getEffectivenessClass(score) {
    if (!score && score !== 0)
      return "";
    if (score >= 80)
      return "high";
    if (score >= 50)
      return "medium";
    return "low";
  }
  showError(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 5e3,
      panelClass: ["error-snackbar"]
    });
  }
  static {
    this.\u0275fac = function ControlsComponent_Factory(t) {
      return new (t || _ControlsComponent)(\u0275\u0275directiveInject(ControlService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlsComponent, selectors: [["app-controls"]], decls: 35, vars: 5, consts: [[1, "controls-container"], [1, "header"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "table-container"], ["class", "loading-shade", 4, "ngIf"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "type"], ["matColumnDef", "status"], ["matColumnDef", "frequency"], ["matColumnDef", "effectivenessScore"], ["matColumnDef", "createdAt"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data", 4, "ngIf"], [1, "loading-shade"], ["mode", "indeterminate", "diameter", "50"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "type-badge"], [1, "status-badge"], ["class", "effectiveness-badge", 3, "class", 4, "ngIf"], [4, "ngIf"], [1, "effectiveness-badge"], ["mat-icon-button", "", "color", "primary", "matTooltip", "D\xE9tails", 3, "routerLink"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Modifier", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Supprimer", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"]], template: function ControlsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Gestion des contr\xF4les");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function ControlsComponent_Template_button_click_4_listener() {
          return ctx.openControlForm();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Nouveau contr\xF4le ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 3);
        \u0275\u0275template(9, ControlsComponent_div_9_Template, 2, 0, "div", 4);
        \u0275\u0275elementStart(10, "table", 5);
        \u0275\u0275elementContainerStart(11, 6);
        \u0275\u0275template(12, ControlsComponent_th_12_Template, 2, 0, "th", 7)(13, ControlsComponent_td_13_Template, 2, 1, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(14, 9);
        \u0275\u0275template(15, ControlsComponent_th_15_Template, 2, 0, "th", 7)(16, ControlsComponent_td_16_Template, 3, 3, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(17, 10);
        \u0275\u0275template(18, ControlsComponent_th_18_Template, 2, 0, "th", 7)(19, ControlsComponent_td_19_Template, 3, 3, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(20, 11);
        \u0275\u0275template(21, ControlsComponent_th_21_Template, 2, 0, "th", 7)(22, ControlsComponent_td_22_Template, 2, 1, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(23, 12);
        \u0275\u0275template(24, ControlsComponent_th_24_Template, 2, 0, "th", 7)(25, ControlsComponent_td_25_Template, 3, 2, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(26, 13);
        \u0275\u0275template(27, ControlsComponent_th_27_Template, 2, 0, "th", 7)(28, ControlsComponent_td_28_Template, 3, 4, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(29, 14);
        \u0275\u0275template(30, ControlsComponent_th_30_Template, 2, 0, "th", 7)(31, ControlsComponent_td_31_Template, 10, 3, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(32, ControlsComponent_tr_32_Template, 1, 0, "tr", 15)(33, ControlsComponent_tr_33_Template, 1, 0, "tr", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275template(34, ControlsComponent_div_34_Template, 5, 0, "div", 17);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("dataSource", ctx.controls);
        \u0275\u0275advance(22);
        \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && ctx.controls.length === 0);
      }
    }, dependencies: [NgIf, RouterLink, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButton, MatIconButton, MatIcon, MatProgressSpinner, MatTooltip, DatePipe], styles: ["\n\n.controls-container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.controls-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.controls-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 500;\n}\n.controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 200px;\n}\n.controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .loading-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.1);\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .mat-column-actions[_ngcontent-%COMP%] {\n  width: 120px;\n  text-align: center;\n}\n.controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .mat-column-type[_ngcontent-%COMP%], .controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .mat-column-status[_ngcontent-%COMP%], .controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .mat-column-frequency[_ngcontent-%COMP%], .controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .mat-column-effectivenessScore[_ngcontent-%COMP%] {\n  width: 150px;\n}\n.controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  text-align: center;\n}\n.controls-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  color: #666;\n  font-size: 16px;\n}\n.controls-container[_ngcontent-%COMP%]   .type-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.controls-container[_ngcontent-%COMP%]   .type-badge.preventive[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.controls-container[_ngcontent-%COMP%]   .type-badge.detective[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #388e3c;\n}\n.controls-container[_ngcontent-%COMP%]   .type-badge.corrective[_ngcontent-%COMP%] {\n  background-color: #fff8e1;\n  color: #ffa000;\n}\n.controls-container[_ngcontent-%COMP%]   .type-badge.directive[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.controls-container[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.controls-container[_ngcontent-%COMP%]   .status-badge.planned[_ngcontent-%COMP%] {\n  background-color: #e0f7fa;\n  color: #0097a7;\n}\n.controls-container[_ngcontent-%COMP%]   .status-badge.implemented[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #388e3c;\n}\n.controls-container[_ngcontent-%COMP%]   .status-badge.tested[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.controls-container[_ngcontent-%COMP%]   .status-badge.ineffective[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.controls-container[_ngcontent-%COMP%]   .status-badge.effective[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #388e3c;\n}\n.controls-container[_ngcontent-%COMP%]   .status-badge.deprecated[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  color: #616161;\n}\n.controls-container[_ngcontent-%COMP%]   .effectiveness-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.controls-container[_ngcontent-%COMP%]   .effectiveness-badge.high[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #388e3c;\n}\n.controls-container[_ngcontent-%COMP%]   .effectiveness-badge.medium[_ngcontent-%COMP%] {\n  background-color: #fff8e1;\n  color: #ffa000;\n}\n.controls-container[_ngcontent-%COMP%]   .effectiveness-badge.low[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n/*# sourceMappingURL=controls.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlsComponent, { className: "ControlsComponent" });
})();

// src/app/features/controls/control-detail/control-detail.component.ts
var _c02 = () => ["/controls"];
var _c1 = (a0) => ["/risks", a0];
function ControlDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "mat-progress-spinner", 11);
    \u0275\u0275elementEnd();
  }
}
function ControlDetailComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "button", 13);
    \u0275\u0275listener("click", function ControlDetailComponent_div_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editControl());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Modifier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 14);
    \u0275\u0275listener("click", function ControlDetailComponent_div_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteControl());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Supprimer ");
    \u0275\u0275elementEnd()();
  }
}
function ControlDetailComponent_mat_card_10_div_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29);
    \u0275\u0275element(2, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getEffectivenessClass(ctx_r1.control.effectivenessScore));
    \u0275\u0275styleProp("width", ctx_r1.control.effectivenessScore, "%");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEffectivenessClass(ctx_r1.control.effectivenessScore));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.control.effectivenessScore, "% ");
  }
}
function ControlDetailComponent_mat_card_10_ng_template_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "L'efficacit\xE9 de ce contr\xF4le n'a pas encore \xE9t\xE9 \xE9valu\xE9e.");
    \u0275\u0275elementEnd();
  }
}
function ControlDetailComponent_mat_card_10_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "h2");
    \u0275\u0275text(2, "Documentation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.control.documentation);
  }
}
function ControlDetailComponent_mat_card_10_div_72_mat_chip_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const risk_r3 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c1, risk_r3.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", risk_r3.name, " ");
  }
}
function ControlDetailComponent_mat_card_10_div_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "h2");
    \u0275\u0275text(2, "Risques g\xE9r\xE9s par ce contr\xF4le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip-set");
    \u0275\u0275template(4, ControlDetailComponent_mat_card_10_div_72_mat_chip_4_Template, 2, 4, "mat-chip", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.associatedRisks);
  }
}
function ControlDetailComponent_mat_card_10_ng_template_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Ce contr\xF4le n'est associ\xE9 \xE0 aucun risque pour le moment.");
    \u0275\u0275elementEnd();
  }
}
function ControlDetailComponent_mat_card_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 15)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-subtitle")(5, "span", 16);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 17);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "mat-card-content")(10, "mat-tab-group")(11, "mat-tab", 18)(12, "div", 19)(13, "div", 20)(14, "h2");
    \u0275\u0275text(15, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 21)(19, "div", 22)(20, "h3");
    \u0275\u0275text(21, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 22)(25, "h3");
    \u0275\u0275text(26, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "p");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 22)(30, "h3");
    \u0275\u0275text(31, "Fr\xE9quence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 21)(35, "div", 22)(36, "h3");
    \u0275\u0275text(37, "Responsable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "p");
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 22)(41, "h3");
    \u0275\u0275text(42, "Date d'impl\xE9mentation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p");
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 22)(47, "h3");
    \u0275\u0275text(48, "Dernier test");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p");
    \u0275\u0275text(50);
    \u0275\u0275pipe(51, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 20)(53, "h2");
    \u0275\u0275text(54, "Efficacit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275template(55, ControlDetailComponent_mat_card_10_div_55_Template, 5, 7, "div", 23)(56, ControlDetailComponent_mat_card_10_ng_template_56_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(58, ControlDetailComponent_mat_card_10_div_58_Template, 5, 1, "div", 24);
    \u0275\u0275elementStart(59, "div", 25)(60, "p")(61, "strong");
    \u0275\u0275text(62, "Cr\xE9\xE9 le:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(63);
    \u0275\u0275pipe(64, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "p")(66, "strong");
    \u0275\u0275text(67, "Derni\xE8re mise \xE0 jour:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(70, "mat-tab", 26)(71, "div", 19);
    \u0275\u0275template(72, ControlDetailComponent_mat_card_10_div_72_Template, 5, 1, "div", 27)(73, ControlDetailComponent_mat_card_10_ng_template_73_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const noScore_r4 = \u0275\u0275reference(57);
    const noRisks_r5 = \u0275\u0275reference(74);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.control.name);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getTypeClass(ctx_r1.control.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.typeTranslations[ctx_r1.control.type], " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(ctx_r1.control.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusTranslations[ctx_r1.control.status], " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.control.description || "Aucune description fournie");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.typeTranslations[ctx_r1.control.type]);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.statusTranslations[ctx_r1.control.status]);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.control.frequency ? ctx_r1.frequencyTranslations[ctx_r1.control.frequency] : "Non applicable");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.control.owner || "Non assign\xE9");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.control.implementationDate ? \u0275\u0275pipeBind2(45, 21, ctx_r1.control.implementationDate, "dd/MM/yyyy") : "Non d\xE9finie");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.control.lastTestedDate ? \u0275\u0275pipeBind2(51, 24, ctx_r1.control.lastTestedDate, "dd/MM/yyyy") : "Non test\xE9");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.control.effectivenessScore !== void 0)("ngIfElse", noScore_r4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.control.documentation);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(64, 27, ctx_r1.control.createdAt, "dd/MM/yyyy HH:mm"), "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(69, 30, ctx_r1.control.updatedAt, "dd/MM/yyyy HH:mm"), "");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.associatedRisks && ctx_r1.associatedRisks.length > 0)("ngIfElse", noRisks_r5);
  }
}
function ControlDetailComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Contr\xF4le non trouv\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Le contr\xF4le demand\xE9 n'existe pas ou a \xE9t\xE9 supprim\xE9.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 36);
    \u0275\u0275text(8, " Retour \xE0 la liste ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(1, _c02));
  }
}
var ControlDetailComponent = class _ControlDetailComponent {
  constructor(route, router, controlService, riskService, dialog, snackBar) {
    this.route = route;
    this.router = router;
    this.controlService = controlService;
    this.riskService = riskService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.control = null;
    this.isLoading = false;
    this.associatedRisks = [];
    this.typeTranslations = {
      [ControlType.PREVENTIVE]: "Pr\xE9ventif",
      [ControlType.DETECTIVE]: "D\xE9tectif",
      [ControlType.CORRECTIVE]: "Correctif",
      [ControlType.DIRECTIVE]: "Directif"
    };
    this.statusTranslations = {
      [ControlStatus.PLANNED]: "Planifi\xE9",
      [ControlStatus.IMPLEMENTED]: "Impl\xE9ment\xE9",
      [ControlStatus.TESTED]: "Test\xE9",
      [ControlStatus.INEFFECTIVE]: "Inefficace",
      [ControlStatus.EFFECTIVE]: "Efficace",
      [ControlStatus.DEPRECATED]: "Obsol\xE8te"
    };
    this.frequencyTranslations = {
      [ControlFrequency.CONTINUOUS]: "Continu",
      [ControlFrequency.DAILY]: "Quotidien",
      [ControlFrequency.WEEKLY]: "Hebdomadaire",
      [ControlFrequency.MONTHLY]: "Mensuel",
      [ControlFrequency.QUARTERLY]: "Trimestriel",
      [ControlFrequency.ANNUALLY]: "Annuel",
      [ControlFrequency.ON_DEMAND]: "Sur demande"
    };
  }
  ngOnInit() {
    this.loadControlDetails();
  }
  loadControlDetails() {
    this.isLoading = true;
    const controlId = this.route.snapshot.paramMap.get("id");
    if (!controlId) {
      this.showError("Identifiant de contr\xF4le non valide");
      this.router.navigate(["/controls"]);
      return;
    }
    this.controlService.getControl(controlId).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (control) => {
        this.control = control;
        if (control.riskIds && control.riskIds.length > 0) {
          this.loadAssociatedRisks(control.riskIds);
        }
      },
      error: (error) => {
        console.error(`Erreur lors du chargement du contr\xF4le ${controlId}:`, error);
        this.showError("Impossible de charger les d\xE9tails du contr\xF4le");
        this.router.navigate(["/controls"]);
      }
    });
  }
  loadAssociatedRisks(riskIds) {
    this.isLoading = true;
    const observables = riskIds.map((id) => this.riskService.getRisk(id));
    if (observables.length === 0) {
      this.isLoading = false;
      return;
    }
    forkJoin(observables).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (risks) => {
        this.associatedRisks = risks;
        console.log("Risques associ\xE9s charg\xE9s:", risks);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des risques associ\xE9s:", error);
        this.showError("Impossible de charger les d\xE9tails des risques associ\xE9s");
      }
    });
  }
  editControl() {
    if (!this.control)
      return;
    const dialogRef = this.dialog.open(ControlFormDialogComponent, {
      width: "600px",
      data: { control: this.control }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.control = result;
        if (result.riskIds && result.riskIds.length > 0) {
          this.loadAssociatedRisks(result.riskIds);
        } else {
          this.associatedRisks = [];
        }
      }
    });
  }
  deleteControl() {
    if (!this.control)
      return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Supprimer le contr\xF4le",
        message: `\xCAtes-vous s\xFBr de vouloir supprimer le contr\xF4le "${this.control.name}" ?`,
        confirmText: "Supprimer",
        cancelText: "Annuler"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.control) {
        this.isLoading = true;
        this.controlService.deleteControl(this.control.id).pipe(finalize(() => this.isLoading = false)).subscribe({
          next: () => {
            this.snackBar.open("Contr\xF4le supprim\xE9 avec succ\xE8s", "Fermer", { duration: 3e3 });
            this.router.navigate(["/controls"]);
          },
          error: (error) => {
            console.error("Erreur lors de la suppression du contr\xF4le:", error);
            this.showError("Erreur lors de la suppression du contr\xF4le");
          }
        });
      }
    });
  }
  getTypeClass(type) {
    return type.toLowerCase();
  }
  getStatusClass(status) {
    return status.toLowerCase();
  }
  getEffectivenessClass(score) {
    if (!score && score !== 0)
      return "";
    if (score >= 80)
      return "high";
    if (score >= 50)
      return "medium";
    return "low";
  }
  showError(message) {
    this.snackBar.open(message, "Fermer", {
      duration: 5e3,
      panelClass: ["error-snackbar"]
    });
  }
  static {
    this.\u0275fac = function ControlDetailComponent_Factory(t) {
      return new (t || _ControlDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ControlService), \u0275\u0275directiveInject(RiskService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlDetailComponent, selectors: [["app-control-detail"]], decls: 12, vars: 6, consts: [["noScore", ""], ["noRisks", ""], [1, "control-detail-container"], ["class", "loading-shade", 4, "ngIf"], [1, "header"], [1, "header-title"], ["mat-icon-button", "", "matTooltip", "Retour \xE0 la liste", 3, "routerLink"], ["class", "header-actions", 4, "ngIf"], ["class", "control-card", 4, "ngIf"], ["class", "not-found", 4, "ngIf"], [1, "loading-shade"], ["mode", "indeterminate", "diameter", "50"], [1, "header-actions"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["mat-raised-button", "", "color", "warn", 3, "click"], [1, "control-card"], [1, "type-badge"], [1, "status-badge"], ["label", "Informations g\xE9n\xE9rales"], [1, "tab-content"], [1, "info-section"], [1, "info-row"], [1, "info-group"], ["class", "effectiveness-container", 4, "ngIf", "ngIfElse"], ["class", "info-section", 4, "ngIf"], [1, "info-section", "dates"], ["label", "Risques associ\xE9s"], ["class", "risks-section", 4, "ngIf", "ngIfElse"], [1, "effectiveness-container"], [1, "effectiveness-gauge"], [1, "gauge-value"], [1, "effectiveness-score"], [1, "risks-section"], ["color", "primary", "selected", "", 3, "routerLink", 4, "ngFor", "ngForOf"], ["color", "primary", "selected", "", 3, "routerLink"], [1, "not-found"], ["mat-raised-button", "", "color", "primary", 3, "routerLink"]], template: function ControlDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2);
        \u0275\u0275template(1, ControlDetailComponent_div_1_Template, 2, 0, "div", 3);
        \u0275\u0275elementStart(2, "div", 4)(3, "div", 5)(4, "button", 6)(5, "mat-icon");
        \u0275\u0275text(6, "arrow_back");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "h1");
        \u0275\u0275text(8, "D\xE9tails du contr\xF4le");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, ControlDetailComponent_div_9_Template, 9, 0, "div", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, ControlDetailComponent_mat_card_10_Template, 75, 33, "mat-card", 8)(11, ControlDetailComponent_div_11_Template, 9, 2, "div", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance(3);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(5, _c02));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.control);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.control);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.control && !ctx.isLoading);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButton, MatIconButton, MatIcon, MatProgressSpinner, MatTooltip, MatChip, MatChipSet, MatTab, MatTabGroup, DatePipe], styles: ["\n\n.control-detail-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  position: relative;\n  min-height: 400px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .loading-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.1);\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.control-detail-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.control-detail-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 0 10px;\n  font-size: 24px;\n  font-weight: 500;\n}\n.control-detail-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  margin-bottom: 10px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-subtitle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%] {\n  padding: 20px 0;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%] {\n  margin-bottom: 25px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 10px;\n  color: #333;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.5;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-section.dates[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  font-size: 14px;\n  color: #666;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-section.dates[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 30px;\n  margin-bottom: 25px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  margin-bottom: 5px;\n  color: #555;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-top: 10px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-gauge[_ngcontent-%COMP%] {\n  width: 70%;\n  height: 20px;\n  background-color: #eee;\n  border-radius: 10px;\n  overflow: hidden;\n  margin-right: 15px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-gauge[_ngcontent-%COMP%]   .gauge-value[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 10px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-gauge[_ngcontent-%COMP%]   .gauge-value.high[_ngcontent-%COMP%] {\n  background-color: #4CAF50;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-gauge[_ngcontent-%COMP%]   .gauge-value.medium[_ngcontent-%COMP%] {\n  background-color: #FFC107;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-gauge[_ngcontent-%COMP%]   .gauge-value.low[_ngcontent-%COMP%] {\n  background-color: #F44336;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-score[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 16px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-score.high[_ngcontent-%COMP%] {\n  color: #388e3c;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-score.medium[_ngcontent-%COMP%] {\n  color: #ffa000;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .effectiveness-container[_ngcontent-%COMP%]   .effectiveness-score.low[_ngcontent-%COMP%] {\n  color: #d32f2f;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .risks-section[_ngcontent-%COMP%]   mat-chip-list[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .control-card[_ngcontent-%COMP%]   .risks-section[_ngcontent-%COMP%]   mat-chip-list[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.control-detail-container[_ngcontent-%COMP%]   .not-found[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  text-align: center;\n}\n.control-detail-container[_ngcontent-%COMP%]   .not-found[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  height: 64px;\n  width: 64px;\n  color: #f44336;\n  margin-bottom: 20px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .not-found[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 10px;\n}\n.control-detail-container[_ngcontent-%COMP%]   .not-found[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 20px;\n}\n.type-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.type-badge.preventive[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.type-badge.detective[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #388e3c;\n}\n.type-badge.corrective[_ngcontent-%COMP%] {\n  background-color: #fff8e1;\n  color: #ffa000;\n}\n.type-badge.directive[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.status-badge.planned[_ngcontent-%COMP%] {\n  background-color: #e0f7fa;\n  color: #0097a7;\n}\n.status-badge.implemented[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #388e3c;\n}\n.status-badge.tested[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.status-badge.ineffective[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.status-badge.effective[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #388e3c;\n}\n.status-badge.deprecated[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  color: #616161;\n}\n@media (max-width: 768px) {\n  .control-detail-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .control-detail-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    margin-top: 15px;\n  }\n  .control-detail-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    margin-left: 0;\n    margin-right: 10px;\n  }\n  .control-detail-container[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n  }\n  .control-detail-container[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n}\n/*# sourceMappingURL=control-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlDetailComponent, { className: "ControlDetailComponent" });
})();

// src/app/features/controls/controls.module.ts
var routes = [
  {
    path: "",
    component: ControlsComponent
  },
  {
    path: ":id",
    component: ControlDetailComponent
  }
];
var ControlsModule = class _ControlsModule {
  static {
    this.\u0275fac = function ControlsModule_Factory(t) {
      return new (t || _ControlsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ControlsModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      MatTableModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      MatSnackBarModule,
      MatTooltipModule,
      MatChipsModule,
      MatTabsModule,
      AdminSharedModule
    ] });
  }
};
export {
  ControlsModule
};
//# sourceMappingURL=chunk-MTFJBTVJ.js.map
