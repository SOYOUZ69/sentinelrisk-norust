import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-PKA5PYFO.js";
import {
  MatButton
} from "./chunk-SOQ7WNQA.js";
import {
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-N6MSFXF2.js";

// src/app/features/admin/shared/confirm-dialog/confirm-dialog.component.ts
var ConfirmDialogComponent = class _ConfirmDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  static {
    this.\u0275fac = function ConfirmDialogComponent_Factory(t) {
      return new (t || _ConfirmDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmDialogComponent, selectors: [["app-confirm-dialog"]], decls: 10, vars: 5, consts: [["mat-dialog-title", ""], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", 3, "click", "color"]], template: function ConfirmDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h2", 0);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "mat-dialog-content")(3, "p");
        \u0275\u0275text(4);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "mat-dialog-actions", 1)(6, "button", 2);
        \u0275\u0275listener("click", function ConfirmDialogComponent_Template_button_click_6_listener() {
          return ctx.onCancel();
        });
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "button", 3);
        \u0275\u0275listener("click", function ConfirmDialogComponent_Template_button_click_8_listener() {
          return ctx.onConfirm();
        });
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.data.title);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.data.message);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.data.cancelText);
        \u0275\u0275advance();
        \u0275\u0275property("color", ctx.data.color || "primary");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.data.confirmText, " ");
      }
    }, dependencies: [MatDialogTitle, MatDialogActions, MatDialogContent, MatButton], styles: ["\n\nmat-dialog-content[_ngcontent-%COMP%] {\n  min-width: 300px;\n}\n/*# sourceMappingURL=confirm-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmDialogComponent, { className: "ConfirmDialogComponent" });
})();

export {
  ConfirmDialogComponent
};
//# sourceMappingURL=chunk-3A2JNQVP.js.map
