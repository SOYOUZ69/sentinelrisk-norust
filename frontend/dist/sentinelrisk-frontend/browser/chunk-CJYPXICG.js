import {
  KeycloakService2 as KeycloakService
} from "./chunk-H7I66HTM.js";
import {
  CommonModule,
  MatButton,
  MatButtonModule,
  NgIf,
  Router,
  RouterModule,
  TemplateRef,
  ViewContainerRef,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-NDFIPPEC.js";

// src/app/shared/components/page-not-found/page-not-found.component.ts
var PageNotFoundComponent = class _PageNotFoundComponent {
  constructor(router) {
    this.router = router;
  }
  goToDashboard() {
    this.router.navigate(["/dashboard"]);
  }
  static {
    this.\u0275fac = function PageNotFoundComponent_Factory(t) {
      return new (t || _PageNotFoundComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PageNotFoundComponent, selectors: [["app-page-not-found"]], decls: 9, vars: 0, consts: [[1, "not-found-container"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function PageNotFoundComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "404");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "h2");
        \u0275\u0275text(4, "Page non trouv\xE9e");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "La page que vous recherchez n'existe pas ou a \xE9t\xE9 d\xE9plac\xE9e.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 1);
        \u0275\u0275listener("click", function PageNotFoundComponent_Template_button_click_7_listener() {
          return ctx.goToDashboard();
        });
        \u0275\u0275text(8, " Retour au tableau de bord ");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [MatButton], styles: ["\n\n.not-found-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  height: 100vh;\n  padding: 0 20px;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 120px;\n  font-weight: 700;\n  margin: 0;\n  color: #3f51b5;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 500;\n  margin: 0 0 20px;\n}\np[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 30px;\n  color: rgba(0, 0, 0, 0.6);\n}\n/*# sourceMappingURL=page-not-found.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PageNotFoundComponent, { className: "PageNotFoundComponent" });
})();

// src/app/shared/directives/has-role.directive.ts
var HasRoleDirective = class _HasRoleDirective {
  constructor(keycloakService, templateRef, viewContainer) {
    this.keycloakService = keycloakService;
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
    this.roles = [];
    this.isHidden = true;
  }
  set appHasRole(roles) {
    if (roles) {
      this.roles = Array.isArray(roles) ? roles.filter(Boolean) : [roles].filter(Boolean);
      console.debug(`[HasRoleDirective] R\xF4les requis: [${this.roles.join(", ")}]`);
    } else {
      this.roles = [];
      console.debug(`[HasRoleDirective] Aucun r\xF4le requis`);
    }
    this.updateView();
  }
  set appHasRoleElse(templateRef) {
    if (templateRef && this.isHidden) {
      this.viewContainer.createEmbeddedView(templateRef);
    }
  }
  ngOnInit() {
    this.updateView();
  }
  updateView() {
    this.viewContainer.clear();
    if (!this.roles || this.roles.length === 0) {
      console.debug("[HasRoleDirective] Aucun r\xF4le requis, affichage du contenu");
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isHidden = false;
      return;
    }
    const userRoles = this.keycloakService.getUserRoles();
    console.debug(`[HasRoleDirective] R\xF4les utilisateur: [${userRoles.join(", ")}]`);
    if (this.roles.includes("admin") && userRoles.includes("ADMIN")) {
      console.debug("[HasRoleDirective] Cas sp\xE9cial: 'admin' requis et 'ADMIN' trouv\xE9, autorisation accord\xE9e");
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isHidden = false;
      return;
    }
    const hasAnyRole = this.roles.some((role) => {
      const result = this.keycloakService.hasRole(role);
      console.debug(`[HasRoleDirective] V\xE9rification ${role}: ${result}`);
      return result;
    });
    if (hasAnyRole) {
      console.debug("[HasRoleDirective] Utilisateur autoris\xE9, affichage du contenu");
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isHidden = false;
    } else {
      console.debug("[HasRoleDirective] Utilisateur non autoris\xE9, contenu masqu\xE9");
      this.isHidden = true;
    }
  }
  static {
    this.\u0275fac = function HasRoleDirective_Factory(t) {
      return new (t || _HasRoleDirective)(\u0275\u0275directiveInject(KeycloakService), \u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(ViewContainerRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _HasRoleDirective, selectors: [["", "appHasRole", ""]], inputs: { appHasRole: "appHasRole", appHasRoleElse: "appHasRoleElse" } });
  }
};

// src/app/shared/components/unauthorized/unauthorized.component.ts
function UnauthorizedComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Utilisateur connect\xE9 :");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "strong");
    \u0275\u0275text(7, "R\xF4les :");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.username, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.userRoles.join(", ") || "Aucun r\xF4le", "");
  }
}
var UnauthorizedComponent = class _UnauthorizedComponent {
  constructor(router, keycloakService) {
    this.router = router;
    this.keycloakService = keycloakService;
    this.username = "";
    this.userRoles = [];
  }
  ngOnInit() {
    this.username = this.keycloakService.getUserDisplayName();
    this.userRoles = this.keycloakService.getUserRoles();
    console.log("\u{1F6AB} Page unauthorized charg\xE9e pour:", this.username, "R\xF4les:", this.userRoles);
  }
  goToDashboard() {
    this.router.navigate(["/dashboard"]);
  }
  logout() {
    this.keycloakService.logout();
  }
  static {
    this.\u0275fac = function UnauthorizedComponent_Factory(t) {
      return new (t || _UnauthorizedComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(KeycloakService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnauthorizedComponent, selectors: [["app-unauthorized"]], decls: 16, vars: 1, consts: [[1, "unauthorized-container"], [1, "unauthorized-content"], [1, "icon"], [1, "fas", "fa-shield-alt"], [1, "message"], ["class", "user-info", 4, "ngIf"], [1, "actions"], [1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-home"], [1, "btn", "btn-secondary", 3, "click"], [1, "fas", "fa-sign-out-alt"], [1, "user-info"]], template: function UnauthorizedComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "i", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Acc\xE8s non autoris\xE9");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, " Vous n'avez pas les permissions n\xE9cessaires pour acc\xE9der \xE0 cette page. ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, UnauthorizedComponent_div_8_Template, 9, 2, "div", 5);
        \u0275\u0275elementStart(9, "div", 6)(10, "button", 7);
        \u0275\u0275listener("click", function UnauthorizedComponent_Template_button_click_10_listener() {
          return ctx.goToDashboard();
        });
        \u0275\u0275element(11, "i", 8);
        \u0275\u0275text(12, " Retour au tableau de bord ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "button", 9);
        \u0275\u0275listener("click", function UnauthorizedComponent_Template_button_click_13_listener() {
          return ctx.logout();
        });
        \u0275\u0275element(14, "i", 10);
        \u0275\u0275text(15, " Se d\xE9connecter ");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.username);
      }
    }, dependencies: [NgIf], styles: ["\n\n.unauthorized-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background-color: #f8f9fa;\n  padding: 20px;\n}\n.unauthorized-content[_ngcontent-%COMP%] {\n  text-align: center;\n  max-width: 500px;\n  background: white;\n  padding: 40px;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n}\n.icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  color: #dc3545;\n  margin-bottom: 20px;\n}\nh1[_ngcontent-%COMP%] {\n  color: #dc3545;\n  margin-bottom: 15px;\n}\n.message[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 25px;\n  font-size: 1.1rem;\n}\n.user-info[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  padding: 15px;\n  border-radius: 5px;\n  margin-bottom: 25px;\n  text-align: left;\n}\n.user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0;\n  font-size: 0.9rem;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  justify-content: center;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: background-color 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #545b62;\n}\n/*# sourceMappingURL=unauthorized.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnauthorizedComponent, { className: "UnauthorizedComponent" });
})();

// src/app/shared/shared.module.ts
var SharedModule = class _SharedModule {
  static {
    this.\u0275fac = function SharedModule_Factory(t) {
      return new (t || _SharedModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _SharedModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule,
      MatButtonModule
    ] });
  }
};

export {
  PageNotFoundComponent,
  UnauthorizedComponent,
  HasRoleDirective,
  SharedModule
};
//# sourceMappingURL=chunk-CJYPXICG.js.map
