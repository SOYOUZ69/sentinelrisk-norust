import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-R2B4LHFC.js";
import {
  CommonModule,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-N6MSFXF2.js";

// src/app/pages/dashboard/dashboard.component.ts
var DashboardComponent = class _DashboardComponent {
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 10, vars: 0, consts: [[1, "dashboard-container"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
        \u0275\u0275text(4, "Tableau de bord");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "mat-card-content")(6, "p");
        \u0275\u0275text(7, "Bienvenue sur le tableau de bord de SentinelRisk.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "Cette page affichera bient\xF4t les m\xE9triques et statistiques importantes.");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [MatCard, MatCardContent, MatCardHeader, MatCardTitle], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\nmat-card[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent" });
})();

// src/app/pages/dashboard/dashboard.module.ts
var routes = [
  { path: "", component: DashboardComponent }
];
var DashboardModule = class _DashboardModule {
  static {
    this.\u0275fac = function DashboardModule_Factory(t) {
      return new (t || _DashboardModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MatCardModule
    ] });
  }
};
export {
  DashboardModule
};
//# sourceMappingURL=chunk-E34ZY66G.js.map
