import {
  CategoryService
} from "./chunk-UVZGNAD4.js";
import {
  AdminSharedModule
} from "./chunk-OWWRPOMU.js";
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
  MatInput,
  MatInputModule,
  MatLabel,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatSnackBar,
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
  NgModel,
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
  JsonPipe,
  NgClass,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-N6MSFXF2.js";

// src/app/features/categories/components/category-form-dialog/category-form-dialog.component.ts
var _c0 = (a0, a1) => ({ "dialog-content": a0, "page-content": a1 });
var _c1 = (a0) => ({ "mat-dialog-content": a0 });
var _c2 = (a0, a1) => ({ "mat-dialog-actions": a0, "form-actions": a1 });
function CategoryFormDialogComponent_h2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isEdit ? "Modifier la cat\xE9gorie" : "Cr\xE9er une nouvelle cat\xE9gorie", " ");
  }
}
function CategoryFormDialogComponent_h2_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isEdit ? "Modifier la cat\xE9gorie" : "Cr\xE9er une nouvelle cat\xE9gorie", " ");
  }
}
function CategoryFormDialogComponent_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le nom est requis");
    \u0275\u0275elementEnd();
  }
}
function CategoryFormDialogComponent_mat_error_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le nom ne peut pas d\xE9passer 100 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function CategoryFormDialogComponent_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La description ne peut pas d\xE9passer 1000 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function CategoryFormDialogComponent_mat_spinner_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 14);
  }
}
function CategoryFormDialogComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.isEdit ? "Mettre \xE0 jour" : "Cr\xE9er");
  }
}
var CategoryFormDialogComponent = class _CategoryFormDialogComponent {
  constructor(fb, route, router, categoryService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.categoryService = categoryService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isEdit = false;
    this.isLoading = false;
    this.isDialogMode = false;
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", Validators.maxLength(1e3)]
    });
    this.isDialogMode = !!this.dialogRef;
    if (this.isDialogMode && this.data?.id) {
      this.id = this.data.id;
      this.isEdit = true;
    }
  }
  ngOnInit() {
    if (this.isDialogMode && this.id) {
      this.loadCategory();
    } else if (!this.isDialogMode && this.route.snapshot.paramMap.has("id")) {
      this.id = +this.route.snapshot.paramMap.get("id");
      this.isEdit = this.router.url.includes("/edit");
      if (this.isEdit) {
        this.loadCategory();
      }
    }
  }
  loadCategory() {
    if (!this.id)
      return;
    this.isLoading = true;
    this.categoryService.getCategory(this.id).subscribe({
      next: (category) => {
        this.form.patchValue({
          name: category.name,
          description: category.description
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.showError("Erreur lors du chargement de la cat\xE9gorie");
        this.isLoading = false;
        console.error("Erreur lors du chargement de la cat\xE9gorie:", error);
      }
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    this.isLoading = true;
    const request = this.form.value;
    const operation = this.isEdit ? this.categoryService.updateCategory(this.id, request) : this.categoryService.createCategory(request);
    operation.subscribe({
      next: (result) => {
        this.isLoading = false;
        this.showSuccess(this.isEdit ? "Cat\xE9gorie mise \xE0 jour avec succ\xE8s" : "Cat\xE9gorie cr\xE9\xE9e avec succ\xE8s");
        if (this.isDialogMode && this.dialogRef) {
          this.dialogRef.close(result);
        } else {
          this.router.navigate(["/categories"]);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.showError("Erreur lors de l'enregistrement de la cat\xE9gorie");
        console.error("Erreur lors de l'enregistrement:", error);
      }
    });
  }
  onCancel() {
    if (this.isDialogMode && this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(["/categories"]);
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
    this.\u0275fac = function CategoryFormDialogComponent_Factory(t) {
      return new (t || _CategoryFormDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(CategoryService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef, 8), \u0275\u0275directiveInject(MAT_DIALOG_DATA, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryFormDialogComponent, selectors: [["app-category-form-dialog"]], decls: 23, vars: 20, consts: [[3, "ngClass"], ["class", "page-title", 4, "ngIf"], ["mat-dialog-title", "", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "form-content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "name", "placeholder", "Entrez le nom de la cat\xE9gorie", "required", ""], [4, "ngIf"], ["matInput", "", "formControlName", "description", "rows", "5", "placeholder", "Entrez une description de la cat\xE9gorie"], ["type", "button", "mat-button", "", 3, "click"], ["type", "submit", "mat-raised-button", "", "color", "primary", 3, "disabled"], ["diameter", "20", "class", "spinner", 4, "ngIf"], [1, "page-title"], ["mat-dialog-title", ""], ["diameter", "20", 1, "spinner"]], template: function CategoryFormDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, CategoryFormDialogComponent_h2_1_Template, 2, 1, "h2", 1)(2, CategoryFormDialogComponent_h2_2_Template, 2, 1, "h2", 2);
        \u0275\u0275elementStart(3, "div", 0)(4, "form", 3);
        \u0275\u0275listener("ngSubmit", function CategoryFormDialogComponent_Template_form_ngSubmit_4_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(5, "div", 4)(6, "mat-form-field", 5)(7, "mat-label");
        \u0275\u0275text(8, "Nom");
        \u0275\u0275elementEnd();
        \u0275\u0275element(9, "input", 6);
        \u0275\u0275template(10, CategoryFormDialogComponent_mat_error_10_Template, 2, 0, "mat-error", 7)(11, CategoryFormDialogComponent_mat_error_11_Template, 2, 0, "mat-error", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "mat-form-field", 5)(13, "mat-label");
        \u0275\u0275text(14, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "textarea", 8);
        \u0275\u0275template(16, CategoryFormDialogComponent_mat_error_16_Template, 2, 0, "mat-error", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 0)(18, "button", 9);
        \u0275\u0275listener("click", function CategoryFormDialogComponent_Template_button_click_18_listener() {
          return ctx.onCancel();
        });
        \u0275\u0275text(19, "Annuler");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "button", 10);
        \u0275\u0275template(21, CategoryFormDialogComponent_mat_spinner_21_Template, 1, 0, "mat-spinner", 11)(22, CategoryFormDialogComponent_span_22_Template, 2, 1, "span", 7);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_5_0;
        let tmp_6_0;
        let tmp_7_0;
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(12, _c0, ctx.isDialogMode, !ctx.isDialogMode));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isDialogMode);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isDialogMode);
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(15, _c1, ctx.isDialogMode));
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", (tmp_5_0 = ctx.form.get("name")) == null ? null : tmp_5_0.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_6_0 = ctx.form.get("name")) == null ? null : tmp_6_0.hasError("maxlength"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", (tmp_7_0 = ctx.form.get("description")) == null ? null : tmp_7_0.hasError("maxlength"));
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(17, _c2, ctx.isDialogMode, !ctx.isDialogMode));
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.form.invalid || ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading);
      }
    }, dependencies: [NgClass, NgIf, MatFormField, MatLabel, MatError, MatInput, MatButton, MatDialogTitle, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, MatProgressSpinner], styles: ["\n\n.page-content[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  padding: 0 10px;\n}\n.page-title[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  color: #3f51b5;\n  font-weight: 500;\n}\n.form-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 24px;\n  gap: 8px;\n}\n.spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-right: 8px;\n}\n/*# sourceMappingURL=category-form-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryFormDialogComponent, { className: "CategoryFormDialogComponent" });
})();

// src/app/features/categories/components/category-list/category-list.component.ts
var _c02 = () => [5, 10, 25, 50];
var _c12 = (a0) => [a0];
function CategoryListComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function CategoryListComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.filters.name = "";
      return \u0275\u0275resetView(ctx_r1.applyFilters());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function CategoryListComponent_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function CategoryListComponent_button_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.filters.description = "";
      return \u0275\u0275resetView(ctx_r1.applyFilters());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function CategoryListComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "strong");
    \u0275\u0275text(3, "Diagnostic:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Cat\xE9gories re\xE7ues (", ctx_r1.categories.length, ") mais dataSource vide. ");
  }
}
function CategoryListComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "mat-progress-spinner", 31);
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_div_31_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function CategoryListComponent_div_31_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " R\xE9initialiser les filtres ");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CategoryListComponent_div_31_button_3_Template, 4, 0, "button", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("R\xE9sultats filtr\xE9s: ", ctx_r1.total, " cat\xE9gorie(s)");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.total === 0);
  }
}
function CategoryListComponent_th_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Nom");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_td_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((category_r5 == null ? null : category_r5.name) || "(Sans nom)");
  }
}
function CategoryListComponent_th_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Description");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_td_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((category_r6 == null ? null : category_r6.description) || "-");
  }
}
function CategoryListComponent_th_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_td_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 36)(1, "button", 38)(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 39);
    \u0275\u0275listener("click", function CategoryListComponent_td_41_Template_button_click_4_listener() {
      const category_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCategoryFormDialog(category_r8));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 40);
    \u0275\u0275listener("click", function CategoryListComponent_td_41_Template_button_click_7_listener() {
      const category_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteCategory(category_r8.id));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c12, category_r8.id));
  }
}
function CategoryListComponent_tr_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 41);
  }
}
function CategoryListComponent_tr_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 42);
  }
}
function CategoryListComponent_tr_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 43)(1, "td", 44)(2, "div", 45);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isLoading ? "Chargement des donn\xE9es..." : "Aucune cat\xE9gorie ne correspond \xE0 votre recherche", " ");
  }
}
function CategoryListComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "pre");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "json");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Donn\xE9es brutes (", ctx_r1.categories.length, " cat\xE9gories):");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 2, ctx_r1.categories));
  }
}
var CategoryListComponent = class _CategoryListComponent {
  constructor(categoryService, router, dialog, snackBar) {
    this.categoryService = categoryService;
    this.router = router;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.displayedColumns = ["name", "description", "actions"];
    this.total = 0;
    this.pageSize = 10;
    this.pageIndex = 0;
    this.filters = { name: "", description: "" };
    this.isLoading = false;
    this.categories = [];
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit() {
    this.loadCategories();
  }
  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  loadCategories() {
    this.isLoading = true;
    console.log("Chargement des cat\xE9gories...");
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log("Cat\xE9gories re\xE7ues (brut):", categories);
        if (!Array.isArray(categories)) {
          console.error("La r\xE9ponse API n'est pas un tableau valide:", categories);
          this.isLoading = false;
          return;
        }
        try {
          this.categories = categories;
          console.log("Nombre de cat\xE9gories re\xE7ues:", this.categories.length);
          this.dataSource = new MatTableDataSource(this.categories);
          console.log("Nouveau dataSource cr\xE9\xE9 avec categories:", this.dataSource.data.length);
          this.setupFilter();
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
            console.log("Paginator attach\xE9 au dataSource");
          }
          if (this.sort) {
            this.dataSource.sort = this.sort;
            console.log("Sort attach\xE9 au dataSource");
          }
          this.total = this.categories.length;
          console.log("Total mis \xE0 jour:", this.total);
          if (this.filters.name || this.filters.description) {
            this.applyFilters();
          }
        } catch (err) {
          console.error("Erreur lors du traitement des cat\xE9gories:", err);
          this.dataSource = new MatTableDataSource([]);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des cat\xE9gories:", error);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource([]);
        this.showError("Erreur lors du chargement des cat\xE9gories");
      }
    });
  }
  setupFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filterObj = JSON.parse(filter);
      const nameLower = data.name?.toLowerCase() || "";
      const descLower = data.description?.toLowerCase() || "";
      const nameMatch = !filterObj.name || nameLower.includes(filterObj.name.toLowerCase());
      const descMatch = !filterObj.description || descLower.includes(filterObj.description.toLowerCase());
      return nameMatch && descMatch;
    };
  }
  applyFilters() {
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    console.log("Application des filtres:", this.filters);
    this.dataSource.filter = JSON.stringify(this.filters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.total = this.dataSource.filteredData.length;
    console.log("Nombre de r\xE9sultats apr\xE8s filtrage:", this.total);
  }
  clearFilters() {
    this.filters = { name: "", description: "" };
    this.applyFilters();
  }
  pageChanged(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  sortChanged(event) {
    console.log("Tri demand\xE9:", event);
  }
  deleteCategory(id) {
    const category = this.categories.find((c) => c.id === id);
    if (!category) {
      this.showError("Cat\xE9gorie introuvable");
      return;
    }
    const dialogData = {
      title: "Confirmation de suppression",
      message: `\xCAtes-vous s\xFBr de vouloir supprimer la cat\xE9gorie "${category.name}" ?`,
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
        this.performDeleteCategory(id);
      }
    });
  }
  performDeleteCategory(id) {
    this.isLoading = true;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        console.log("Cat\xE9gorie supprim\xE9e, rechargement...");
        this.loadCategories();
        this.showSuccess("Cat\xE9gorie supprim\xE9e avec succ\xE8s");
      },
      error: (error) => {
        console.error("Erreur lors de la suppression:", error);
        this.isLoading = false;
        this.showError("Erreur lors de la suppression de la cat\xE9gorie");
      }
    });
  }
  openCategoryFormDialog(category) {
    console.log("Ouverture du formulaire pour la cat\xE9gorie:", category);
    const dialogRef = this.dialog.open(CategoryFormDialogComponent, {
      width: "600px",
      data: category ? { id: category.id } : {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Formulaire valid\xE9, rechargement...");
        this.loadCategories();
      }
    });
  }
  showSuccess(message) {
    this.snackBar.open(message, "Fermer", { duration: 3e3 });
  }
  showError(message) {
    this.snackBar.open(message, "Fermer", { duration: 3e3, panelClass: ["error-snackbar"] });
  }
  static {
    this.\u0275fac = function CategoryListComponent_Factory(t) {
      return new (t || _CategoryListComponent)(\u0275\u0275directiveInject(CategoryService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryListComponent, selectors: [["app-category-list"]], viewQuery: function CategoryListComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatPaginator, 5);
        \u0275\u0275viewQuery(MatSort, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      }
    }, decls: 47, vars: 16, consts: [[1, "container"], [1, "filters", "mat-elevation-z1"], [1, "filter-controls"], ["appearance", "outline"], ["matInput", "", "placeholder", "Filtrer par nom", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "mat-icon-button", "", "aria-label", "Effacer", 3, "click", 4, "ngIf"], ["matInput", "", "placeholder", "Filtrer par description", 3, "ngModelChange", "ngModel"], [1, "buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "basic", 3, "click", "disabled"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["class", "debug-info", 4, "ngIf"], [1, "table-container", "mat-elevation-z2"], ["class", "loading-shade", 4, "ngIf"], ["class", "results-info", 4, "ngIf"], ["mat-table", "", "matSort", "", 3, "matSortChange", "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "description"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "page", "length", "pageSize", "pageSizeOptions"], ["class", "debug-data", 4, "ngIf"], ["matSuffix", "", "mat-icon-button", "", "aria-label", "Effacer", 3, "click"], [1, "debug-info"], [1, "alert", "alert-warning"], [1, "loading-shade"], ["mode", "indeterminate", "diameter", "50"], [1, "results-info"], ["mat-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-button", "", "color", "primary", 3, "click"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-icon-button", "", "matTooltip", "Voir les d\xE9tails", 3, "routerLink"], ["mat-icon-button", "", "matTooltip", "Modifier", 3, "click"], ["mat-icon-button", "", "matTooltip", "Supprimer", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "3", 1, "mat-cell"], [1, "no-data-message"], [1, "debug-data"], [1, "mat-elevation-z1", "debug-panel"]], template: function CategoryListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Gestion des cat\xE9gories");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
        \u0275\u0275text(7, "Nom");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function CategoryListComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filters.name, $event) || (ctx.filters.name = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, CategoryListComponent_button_9_Template, 3, 0, "button", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "mat-form-field", 3)(11, "mat-label");
        \u0275\u0275text(12, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function CategoryListComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filters.description, $event) || (ctx.filters.description = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, CategoryListComponent_button_14_Template, 3, 0, "button", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 7)(16, "button", 8);
        \u0275\u0275listener("click", function CategoryListComponent_Template_button_click_16_listener() {
          return ctx.applyFilters();
        });
        \u0275\u0275elementStart(17, "mat-icon");
        \u0275\u0275text(18, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275text(19, " Rechercher ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "button", 9);
        \u0275\u0275listener("click", function CategoryListComponent_Template_button_click_20_listener() {
          return ctx.clearFilters();
        });
        \u0275\u0275elementStart(21, "mat-icon");
        \u0275\u0275text(22, "clear");
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, " Effacer ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 10);
        \u0275\u0275listener("click", function CategoryListComponent_Template_button_click_24_listener() {
          return ctx.openCategoryFormDialog();
        });
        \u0275\u0275elementStart(25, "mat-icon");
        \u0275\u0275text(26, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(27, " Nouvelle cat\xE9gorie ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(28, CategoryListComponent_div_28_Template, 5, 1, "div", 11);
        \u0275\u0275elementStart(29, "div", 12);
        \u0275\u0275template(30, CategoryListComponent_div_30_Template, 2, 0, "div", 13)(31, CategoryListComponent_div_31_Template, 4, 2, "div", 14);
        \u0275\u0275elementStart(32, "table", 15);
        \u0275\u0275listener("matSortChange", function CategoryListComponent_Template_table_matSortChange_32_listener($event) {
          return ctx.sortChanged($event);
        });
        \u0275\u0275elementContainerStart(33, 16);
        \u0275\u0275template(34, CategoryListComponent_th_34_Template, 2, 0, "th", 17)(35, CategoryListComponent_td_35_Template, 2, 1, "td", 18);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(36, 19);
        \u0275\u0275template(37, CategoryListComponent_th_37_Template, 2, 0, "th", 17)(38, CategoryListComponent_td_38_Template, 2, 1, "td", 18);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(39, 20);
        \u0275\u0275template(40, CategoryListComponent_th_40_Template, 2, 0, "th", 21)(41, CategoryListComponent_td_41_Template, 10, 3, "td", 18);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(42, CategoryListComponent_tr_42_Template, 1, 0, "tr", 22)(43, CategoryListComponent_tr_43_Template, 1, 0, "tr", 23)(44, CategoryListComponent_tr_44_Template, 4, 1, "tr", 24);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "mat-paginator", 25);
        \u0275\u0275listener("page", function CategoryListComponent_Template_mat_paginator_page_45_listener($event) {
          return ctx.pageChanged($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(46, CategoryListComponent_div_46_Template, 7, 4, "div", 26);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.filters.name);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filters.name);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filters.description);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filters.description);
        \u0275\u0275advance(6);
        \u0275\u0275property("disabled", !ctx.filters.name && !ctx.filters.description);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.categories.length > 0 && ctx.dataSource && ctx.dataSource.data.length === 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (ctx.filters.name || ctx.filters.description) && !ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("dataSource", ctx.dataSource);
        \u0275\u0275advance(10);
        \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
        \u0275\u0275advance(2);
        \u0275\u0275property("length", ctx.total)("pageSize", ctx.pageSize)("pageSizeOptions", \u0275\u0275pureFunction0(15, _c02));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.categories && ctx.categories.length > 0);
      }
    }, dependencies: [NgIf, RouterLink, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatNoDataRow, MatPaginator, MatSort, MatSortHeader, MatFormField, MatLabel, MatSuffix, MatInput, MatButton, MatIconButton, MatIcon, DefaultValueAccessor, NgControlStatus, NgModel, MatTooltip, MatProgressSpinner, JsonPipe], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.filters[_ngcontent-%COMP%] {\n  padding: 16px;\n  margin-bottom: 20px;\n  border-radius: 8px;\n}\n.filters[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-top: 0;\n  color: #3f51b5;\n}\n.filter-controls[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 16px;\n  align-items: flex-start;\n}\n.filter-controls[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 8px;\n}\n.table-container[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: hidden;\n  position: relative;\n}\n.loading-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.15);\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\nth.mat-header-cell[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  color: rgba(0, 0, 0, 0.87);\n  font-weight: 500;\n}\n.mat-column-actions[_ngcontent-%COMP%] {\n  width: 140px;\n}\n.mat-column-name[_ngcontent-%COMP%] {\n  width: 30%;\n}\n.mat-column-description[_ngcontent-%COMP%] {\n  width: calc(70% - 140px);\n}\n.no-data-message[_ngcontent-%COMP%] {\n  padding: 32px 0;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.6);\n  font-style: italic;\n}\n.debug-info[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 4px;\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba;\n}\n.debug-data[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  max-height: 300px;\n  overflow-y: auto;\n}\n.debug-panel[_ngcontent-%COMP%] {\n  padding: 16px;\n  background-color: #f8f9fa;\n  border-radius: 4px;\n}\n.debug-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  color: #6c757d;\n  font-size: 14px;\n}\n.debug-panel[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n  font-size: 12px;\n  white-space: pre-wrap;\n  max-height: 200px;\n  overflow-y: auto;\n}\n@media (max-width: 768px) {\n  .filter-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .filter-controls[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.results-info[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background-color: #f5f5f5;\n  border-bottom: 1px solid #e0e0e0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n}\n/*# sourceMappingURL=category-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryListComponent, { className: "CategoryListComponent" });
})();

// src/app/features/categories/components/category-detail/category-detail.component.ts
function CategoryDetailComponent_mat_card_1_mat_card_subtitle_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card-subtitle");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.category.description);
  }
}
function CategoryDetailComponent_mat_card_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 3)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, CategoryDetailComponent_mat_card_1_mat_card_subtitle_4_Template, 2, 1, "mat-card-subtitle", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-card-content")(6, "div", 5)(7, "h3");
    \u0275\u0275text(8, "Informations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 6)(10, "span", 7);
    \u0275\u0275text(11, "Nom:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 8);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 6)(15, "span", 7);
    \u0275\u0275text(16, "Description:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 8);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 5)(20, "h3");
    \u0275\u0275text(21, "Dates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 6)(23, "span", 7);
    \u0275\u0275text(24, "Cr\xE9\xE9 le:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 8);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 6)(29, "span", 7);
    \u0275\u0275text(30, "Derni\xE8re mise \xE0 jour:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 8);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "mat-card-actions")(35, "button", 9);
    \u0275\u0275listener("click", function CategoryDetailComponent_mat_card_1_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToList());
    });
    \u0275\u0275elementStart(36, "mat-icon");
    \u0275\u0275text(37, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(38, " Retour \xE0 la liste ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 10);
    \u0275\u0275listener("click", function CategoryDetailComponent_mat_card_1_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editCategory());
    });
    \u0275\u0275elementStart(40, "mat-icon");
    \u0275\u0275text(41, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " \xC9diter ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 11);
    \u0275\u0275listener("click", function CategoryDetailComponent_mat_card_1_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteCategory());
    });
    \u0275\u0275elementStart(44, "mat-icon");
    \u0275\u0275text(45, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(46, " Supprimer ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.category.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.category.description);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.category.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.category.description || "Aucune description");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(27, 6, ctx_r1.category.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(33, 9, ctx_r1.category.updatedAt, "dd/MM/yyyy HH:mm"));
  }
}
function CategoryDetailComponent_mat_progress_spinner_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 12);
  }
}
var CategoryDetailComponent = class _CategoryDetailComponent {
  constructor(route, router, categoryService, dialog, snackBar) {
    this.route = route;
    this.router = router;
    this.categoryService = categoryService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.isLoading = false;
  }
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.loadCategory();
  }
  loadCategory() {
    this.isLoading = true;
    this.categoryService.getCategory(this.id).subscribe({
      next: (category) => {
        this.category = category;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.showError("Erreur lors du chargement de la cat\xE9gorie");
        console.error("Erreur lors du chargement de la cat\xE9gorie:", error);
        this.router.navigate(["/categories"]);
      }
    });
  }
  editCategory() {
    this.router.navigate(["/categories", this.id, "edit"]);
  }
  deleteCategory() {
    if (!this.category)
      return;
    const dialogData = {
      title: "Confirmation de suppression",
      message: `\xCAtes-vous s\xFBr de vouloir supprimer la cat\xE9gorie "${this.category.name}" ?`,
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
        this.performDeleteCategory();
      }
    });
  }
  performDeleteCategory() {
    this.isLoading = true;
    this.categoryService.deleteCategory(this.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.showSuccess("Cat\xE9gorie supprim\xE9e avec succ\xE8s");
        this.router.navigate(["/categories"]);
      },
      error: (error) => {
        this.isLoading = false;
        this.showError("Erreur lors de la suppression de la cat\xE9gorie");
        console.error("Erreur lors de la suppression:", error);
      }
    });
  }
  navigateToList() {
    this.router.navigate(["/categories"]);
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
    this.\u0275fac = function CategoryDetailComponent_Factory(t) {
      return new (t || _CategoryDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(CategoryService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryDetailComponent, selectors: [["app-category-detail"]], decls: 3, vars: 2, consts: [[1, "container"], ["class", "category-card mat-elevation-z2", 4, "ngIf"], ["mode", "indeterminate", "diameter", "50", "class", "loading-spinner", 4, "ngIf"], [1, "category-card", "mat-elevation-z2"], [4, "ngIf"], [1, "detail-section"], [1, "detail-item"], [1, "label"], [1, "value"], ["mat-button", "", 3, "click"], ["mat-button", "", "color", "primary", 3, "click"], ["mat-button", "", "color", "warn", 3, "click"], ["mode", "indeterminate", "diameter", "50", 1, "loading-spinner"]], template: function CategoryDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, CategoryDetailComponent_mat_card_1_Template, 47, 12, "mat-card", 1)(2, CategoryDetailComponent_mat_progress_spinner_2_Template, 1, 0, "mat-progress-spinner", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.category);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
      }
    }, dependencies: [NgIf, MatButton, MatIcon, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatProgressSpinner, DatePipe], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.category-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.detail-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #3f51b5;\n  border-bottom: 1px solid #e0e0e0;\n  padding-bottom: 8px;\n  margin-bottom: 16px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 8px;\n}\n.detail-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  width: 150px;\n  color: rgba(0, 0, 0, 0.7);\n}\n.detail-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  flex: 1;\n}\nmat-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding: 16px;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  margin: 48px auto;\n  display: block;\n}\n/*# sourceMappingURL=category-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryDetailComponent, { className: "CategoryDetailComponent" });
})();

// src/app/features/categories/categories-routing.module.ts
var routes = [
  { path: "", component: CategoryListComponent, data: { roles: ["admin", "risk_manager", "compliance_officer", "auditor", "user"] } },
  { path: ":id", component: CategoryDetailComponent, data: { roles: ["admin", "risk_manager", "compliance_officer", "auditor", "user"] } },
  { path: ":id/edit", component: CategoryFormDialogComponent, data: { roles: ["admin", "risk_manager"] } }
];
var CategoriesRoutingModule = class _CategoriesRoutingModule {
  static {
    this.\u0275fac = function CategoriesRoutingModule_Factory(t) {
      return new (t || _CategoriesRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CategoriesRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/features/categories/categories.module.ts
var CategoriesModule = class _CategoriesModule {
  static {
    this.\u0275fac = function CategoriesModule_Factory(t) {
      return new (t || _CategoriesModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CategoriesModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      CategoriesRoutingModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      ReactiveFormsModule,
      FormsModule,
      MatCardModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      AdminSharedModule
    ] });
  }
};
export {
  CategoriesModule
};
//# sourceMappingURL=chunk-VOZHUE7Y.js.map
