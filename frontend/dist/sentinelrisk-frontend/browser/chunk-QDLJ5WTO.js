import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-QHGPCEHR.js";
import {
  AdminSharedModule
} from "./chunk-OWWRPOMU.js";
import {
  UserService
} from "./chunk-ZNN45TJ3.js";
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
  MatInput,
  MatInputModule,
  MatLabel,
  MatRow,
  MatRowDef,
  MatSelect,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule,
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
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
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
  CommonModule,
  DatePipe,
  MatOption,
  NgForOf,
  NgIf,
  RouterModule,
  __spreadValues,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-N6MSFXF2.js";

// src/app/features/admin/users/user-form-dialog/user-form-dialog.component.ts
function UserFormDialogComponent_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getErrorMessage("username"));
  }
}
function UserFormDialogComponent_mat_error_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getErrorMessage("email"));
  }
}
function UserFormDialogComponent_mat_error_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getErrorMessage("firstName"));
  }
}
function UserFormDialogComponent_mat_error_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getErrorMessage("lastName"));
  }
}
function UserFormDialogComponent_mat_option_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    \u0275\u0275property("value", role_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r2, " ");
  }
}
function UserFormDialogComponent_mat_error_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getErrorMessage("role"));
  }
}
var UserFormDialogComponent = class _UserFormDialogComponent {
  constructor(fb, dialogRef, data) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isEdit = false;
    this.roles = ["admin", "user", "risk_manager", "compliance_officer", "auditor"];
    this.isEdit = data.isEdit;
    this.dialogTitle = this.isEdit ? "Modifier l'utilisateur" : "Ajouter un utilisateur";
    this.userForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      department: [""],
      role: ["user", Validators.required],
      active: [true]
    });
    if (this.isEdit && data.user) {
      this.userForm.patchValue({
        username: data.user.username,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        department: data.user.department || "",
        role: data.user.role,
        active: data.user.active
      });
      this.userForm.get("username")?.disable();
    }
  }
  ngOnInit() {
  }
  onSubmit() {
    if (this.userForm.valid) {
      const userData = __spreadValues({}, this.userForm.getRawValue());
      this.dialogRef.close(userData);
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
  getErrorMessage(controlName) {
    const control = this.userForm.get(controlName);
    if (!control)
      return "";
    if (control.hasError("required")) {
      return "Ce champ est requis";
    }
    if (control.hasError("email")) {
      return "Email invalide";
    }
    if (control.hasError("minlength")) {
      return `Minimum ${control.getError("minlength").requiredLength} caract\xE8res`;
    }
    return "";
  }
  static {
    this.\u0275fac = function UserFormDialogComponent_Factory(t) {
      return new (t || _UserFormDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserFormDialogComponent, selectors: [["app-user-form-dialog"]], decls: 45, vars: 10, consts: [["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], [1, "form-row"], ["appearance", "outline"], ["matInput", "", "formControlName", "username", "placeholder", "john.doe"], [4, "ngIf"], ["matInput", "", "formControlName", "email", "placeholder", "john.doe@example.com", "type", "email"], ["matInput", "", "formControlName", "firstName", "placeholder", "John"], ["matInput", "", "formControlName", "lastName", "placeholder", "Doe"], ["matInput", "", "formControlName", "department", "placeholder", "IT"], ["formControlName", "role"], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-row", "active-row"], ["formControlName", "active"], ["align", "end"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [3, "value"]], template: function UserFormDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h2", 0);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "form", 1);
        \u0275\u0275listener("ngSubmit", function UserFormDialogComponent_Template_form_ngSubmit_2_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(3, "mat-dialog-content")(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
        \u0275\u0275text(7, "Nom d'utilisateur");
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "input", 4);
        \u0275\u0275template(9, UserFormDialogComponent_mat_error_9_Template, 2, 1, "mat-error", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "mat-form-field", 3)(11, "mat-label");
        \u0275\u0275text(12, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(13, "input", 6);
        \u0275\u0275template(14, UserFormDialogComponent_mat_error_14_Template, 2, 1, "mat-error", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 2)(16, "mat-form-field", 3)(17, "mat-label");
        \u0275\u0275text(18, "Pr\xE9nom");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 7);
        \u0275\u0275template(20, UserFormDialogComponent_mat_error_20_Template, 2, 1, "mat-error", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-form-field", 3)(22, "mat-label");
        \u0275\u0275text(23, "Nom");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 8);
        \u0275\u0275template(25, UserFormDialogComponent_mat_error_25_Template, 2, 1, "mat-error", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 2)(27, "mat-form-field", 3)(28, "mat-label");
        \u0275\u0275text(29, "D\xE9partement");
        \u0275\u0275elementEnd();
        \u0275\u0275element(30, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "mat-form-field", 3)(32, "mat-label");
        \u0275\u0275text(33, "R\xF4le");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "mat-select", 10);
        \u0275\u0275template(35, UserFormDialogComponent_mat_option_35_Template, 2, 2, "mat-option", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, UserFormDialogComponent_mat_error_36_Template, 2, 1, "mat-error", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 12)(38, "mat-slide-toggle", 13);
        \u0275\u0275text(39, " Utilisateur actif ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(40, "mat-dialog-actions", 14)(41, "button", 15);
        \u0275\u0275listener("click", function UserFormDialogComponent_Template_button_click_41_listener() {
          return ctx.onCancel();
        });
        \u0275\u0275text(42, "Annuler");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "button", 16);
        \u0275\u0275text(44);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        let tmp_7_0;
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.dialogTitle);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.userForm);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", (tmp_2_0 = ctx.userForm.get("username")) == null ? null : tmp_2_0.invalid);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", (tmp_3_0 = ctx.userForm.get("email")) == null ? null : tmp_3_0.invalid);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", (tmp_4_0 = ctx.userForm.get("firstName")) == null ? null : tmp_4_0.invalid);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", (tmp_5_0 = ctx.userForm.get("lastName")) == null ? null : tmp_5_0.invalid);
        \u0275\u0275advance(10);
        \u0275\u0275property("ngForOf", ctx.roles);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_7_0 = ctx.userForm.get("role")) == null ? null : tmp_7_0.invalid);
        \u0275\u0275advance(7);
        \u0275\u0275property("disabled", ctx.userForm.invalid);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isEdit ? "Mettre \xE0 jour" : "Cr\xE9er", " ");
      }
    }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButton, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormField, MatLabel, MatError, MatInput, MatSelect, MatOption, MatSlideToggle], styles: ["\n\nmat-dialog-content[_ngcontent-%COMP%] {\n  min-width: 450px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.form-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.active-row[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n}\n@media (max-width: 600px) {\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0;\n  }\n  mat-dialog-content[_ngcontent-%COMP%] {\n    min-width: 320px;\n  }\n}\n/*# sourceMappingURL=user-form-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserFormDialogComponent, { className: "UserFormDialogComponent" });
})();

// src/app/features/admin/users/users.component.ts
function UsersComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "mat-progress-spinner", 20);
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Nom d'utilisateur");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r1.username);
  }
}
function UsersComponent_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Email");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r2.email);
  }
}
function UsersComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Nom complet");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", user_r3.firstName, " ", user_r3.lastName, "");
  }
}
function UsersComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "D\xE9partement");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r4.department);
  }
}
function UsersComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "R\xF4le");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(user_r5.role.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r5.role, " ");
  }
}
function UsersComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(user_r6.active ? "active" : "inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r6.active ? "Actif" : "Inactif", " ");
  }
}
function UsersComponent_th_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Date de cr\xE9ation");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_td_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, user_r7.createdAt, "dd/MM/yyyy"));
  }
}
function UsersComponent_th_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function UsersComponent_td_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 22)(1, "button", 25);
    \u0275\u0275listener("click", function UsersComponent_td_34_Template_button_click_1_listener() {
      const user_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r9 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r9.openUserForm(user_r9));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 26);
    \u0275\u0275listener("click", function UsersComponent_td_34_Template_button_click_4_listener() {
      const user_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r9 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r9.deleteUser(user_r9));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function UsersComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 27);
  }
}
function UsersComponent_tr_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 28);
  }
}
function UsersComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "p");
    \u0275\u0275text(2, "Aucun utilisateur trouv\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 2);
    \u0275\u0275listener("click", function UsersComponent_div_37_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r9 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r9.openUserForm());
    });
    \u0275\u0275text(4, " Ajouter un utilisateur ");
    \u0275\u0275elementEnd()();
  }
}
var UsersComponent = class _UsersComponent {
  constructor(userService, dialog, snackBar) {
    this.userService = userService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.users = [];
    this.displayedColumns = ["username", "email", "fullName", "department", "role", "active", "createdAt", "actions"];
    this.isLoading = false;
  }
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log("Utilisateurs r\xE9cup\xE9r\xE9s:", users);
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        this.showError("Erreur lors du chargement des utilisateurs");
        this.isLoading = false;
      }
    });
  }
  openUserForm(user) {
    const dialogData = {
      user,
      isEdit: !!user
    };
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (dialogData.isEdit) {
          this.updateUser(user.id, result);
        } else {
          this.createUser(result);
        }
      }
    });
  }
  deleteUser(user) {
    const dialogData = {
      title: "Confirmation de suppression",
      message: `\xCAtes-vous s\xFBr de vouloir supprimer l'utilisateur ${user.username} ?`,
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
        this.performDeleteUser(user.id);
      }
    });
  }
  performDeleteUser(id) {
    this.isLoading = true;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
        this.showSuccess("Utilisateur supprim\xE9 avec succ\xE8s");
      },
      error: (error) => {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        this.showError("Erreur lors de la suppression de l'utilisateur");
        this.isLoading = false;
      }
    });
  }
  createUser(userData) {
    this.isLoading = true;
    this.userService.createUser(userData).subscribe({
      next: () => {
        this.loadUsers();
        this.showSuccess("Utilisateur cr\xE9\xE9 avec succ\xE8s");
      },
      error: (error) => {
        console.error("Erreur lors de la cr\xE9ation de l'utilisateur:", error);
        this.showError("Erreur lors de la cr\xE9ation de l'utilisateur");
        this.isLoading = false;
      }
    });
  }
  updateUser(id, userData) {
    this.isLoading = true;
    this.userService.updateUser(id, userData).subscribe({
      next: () => {
        this.loadUsers();
        this.showSuccess("Utilisateur mis \xE0 jour avec succ\xE8s");
      },
      error: (error) => {
        console.error("Erreur lors de la mise \xE0 jour de l'utilisateur:", error);
        this.showError("Erreur lors de la mise \xE0 jour de l'utilisateur");
        this.isLoading = false;
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
    this.\u0275fac = function UsersComponent_Factory(t) {
      return new (t || _UsersComponent)(\u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersComponent, selectors: [["app-users"]], decls: 38, vars: 5, consts: [[1, "users-container"], [1, "header"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "table-container"], ["class", "loading-shade", 4, "ngIf"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "username"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "email"], ["matColumnDef", "fullName"], ["matColumnDef", "department"], ["matColumnDef", "role"], ["matColumnDef", "active"], ["matColumnDef", "createdAt"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data", 4, "ngIf"], [1, "loading-shade"], ["mode", "indeterminate", "diameter", "50"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "role-badge"], [1, "status-badge"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Modifier", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Supprimer", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"]], template: function UsersComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Gestion des utilisateurs");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function UsersComponent_Template_button_click_4_listener() {
          return ctx.openUserForm();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Nouvel utilisateur ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 3);
        \u0275\u0275template(9, UsersComponent_div_9_Template, 2, 0, "div", 4);
        \u0275\u0275elementStart(10, "table", 5);
        \u0275\u0275elementContainerStart(11, 6);
        \u0275\u0275template(12, UsersComponent_th_12_Template, 2, 0, "th", 7)(13, UsersComponent_td_13_Template, 2, 1, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(14, 9);
        \u0275\u0275template(15, UsersComponent_th_15_Template, 2, 0, "th", 7)(16, UsersComponent_td_16_Template, 2, 1, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(17, 10);
        \u0275\u0275template(18, UsersComponent_th_18_Template, 2, 0, "th", 7)(19, UsersComponent_td_19_Template, 2, 2, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(20, 11);
        \u0275\u0275template(21, UsersComponent_th_21_Template, 2, 0, "th", 7)(22, UsersComponent_td_22_Template, 2, 1, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(23, 12);
        \u0275\u0275template(24, UsersComponent_th_24_Template, 2, 0, "th", 7)(25, UsersComponent_td_25_Template, 3, 3, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(26, 13);
        \u0275\u0275template(27, UsersComponent_th_27_Template, 2, 0, "th", 7)(28, UsersComponent_td_28_Template, 3, 3, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(29, 14);
        \u0275\u0275template(30, UsersComponent_th_30_Template, 2, 0, "th", 7)(31, UsersComponent_td_31_Template, 3, 4, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(32, 15);
        \u0275\u0275template(33, UsersComponent_th_33_Template, 2, 0, "th", 7)(34, UsersComponent_td_34_Template, 7, 0, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(35, UsersComponent_tr_35_Template, 1, 0, "tr", 16)(36, UsersComponent_tr_36_Template, 1, 0, "tr", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275template(37, UsersComponent_div_37_Template, 5, 0, "div", 18);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("dataSource", ctx.users);
        \u0275\u0275advance(25);
        \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && ctx.users.length === 0);
      }
    }, dependencies: [NgIf, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButton, MatIconButton, MatIcon, MatProgressSpinner, MatTooltip, DatePipe], styles: ["\n\n.users-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.users-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.users-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 500;\n}\n.users-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  position: relative;\n  min-height: 200px;\n}\n.users-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .loading-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.05);\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n}\n.users-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.users-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.87);\n}\n.users-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.87);\n}\n.users-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .mat-column-actions[_ngcontent-%COMP%] {\n  width: 120px;\n  text-align: center;\n}\n.users-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  text-align: center;\n}\n.users-container[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  font-size: 16px;\n  color: rgba(0, 0, 0, 0.54);\n}\n.users-container[_ngcontent-%COMP%]   .role-badge[_ngcontent-%COMP%], .users-container[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.users-container[_ngcontent-%COMP%]   .role-badge.admin[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.users-container[_ngcontent-%COMP%]   .role-badge.risk_manager[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.users-container[_ngcontent-%COMP%]   .role-badge.compliance_officer[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #f57c00;\n}\n.users-container[_ngcontent-%COMP%]   .role-badge.auditor[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.users-container[_ngcontent-%COMP%]   .role-badge.user[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  color: #616161;\n}\n.users-container[_ngcontent-%COMP%]   .status-badge.active[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.users-container[_ngcontent-%COMP%]   .status-badge.inactive[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n/*# sourceMappingURL=users.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersComponent, { className: "UsersComponent" });
})();

// src/app/features/admin/users/users.module.ts
var routes = [
  { path: "", component: UsersComponent }
];
var UsersModule = class _UsersModule {
  static {
    this.\u0275fac = function UsersModule_Factory(t) {
      return new (t || _UsersModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UsersModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      AdminSharedModule,
      // Material modules
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatSnackBarModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatProgressSpinnerModule,
      MatTooltipModule
    ] });
  }
};
export {
  UsersModule
};
//# sourceMappingURL=chunk-QDLJ5WTO.js.map
