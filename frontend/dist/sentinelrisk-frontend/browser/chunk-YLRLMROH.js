import {
  AuthGuard
} from "./chunk-PTF3ZGHN.js";
import {
  KeycloakService2 as KeycloakService
} from "./chunk-YZOLHLAY.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-R2B4LHFC.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-N47WCMZ2.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-SOQ7WNQA.js";
import {
  AsyncPipe,
  CommonModule,
  NgIf,
  Router,
  RouterModule,
  __async,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate2
} from "./chunk-N6MSFXF2.js";

// src/app/features/auth/login/login.component.ts
var LoginComponent = class _LoginComponent {
  constructor(keycloakService) {
    this.keycloakService = keycloakService;
  }
  login() {
    this.keycloakService.login();
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(KeycloakService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 8, vars: 0, consts: [[1, "login-container"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
        \u0275\u0275text(4, "Connexion \xE0 SentinelRisk");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "mat-card-content")(6, "button", 1);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_6_listener() {
          return ctx.login();
        });
        \u0275\u0275text(7, " Se connecter avec Keycloak ");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButton], styles: ["\n\n.login-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\nmat-card[_ngcontent-%COMP%] {\n  width: 400px;\n  text-align: center;\n}\nbutton[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent" });
})();

// src/app/features/auth/home/home.component.ts
function HomeComponent_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const profile_r1 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Bonjour ", profile_r1.firstName, " ", profile_r1.lastName, " ! ");
  }
}
var HomeComponent = class _HomeComponent {
  constructor(keycloakService) {
    this.keycloakService = keycloakService;
    this.userProfile$ = this.keycloakService.getUserProfile();
  }
  ngOnInit() {
  }
  logout() {
    this.keycloakService.logout();
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(t) {
      return new (t || _HomeComponent)(\u0275\u0275directiveInject(KeycloakService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 12, vars: 3, consts: [[1, "home-container"], [4, "ngIf"], ["mat-raised-button", "", "color", "warn", 3, "click"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
        \u0275\u0275text(4, "Bienvenue sur SentinelRisk");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "mat-card-content");
        \u0275\u0275template(6, HomeComponent_p_6_Template, 2, 2, "p", 1);
        \u0275\u0275pipe(7, "async");
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "Vous \xEAtes connect\xE9 avec succ\xE8s.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 2);
        \u0275\u0275listener("click", function HomeComponent_Template_button_click_10_listener() {
          return ctx.logout();
        });
        \u0275\u0275text(11, " Se d\xE9connecter ");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(7, 1, ctx.userProfile$));
      }
    }, dependencies: [NgIf, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButton, AsyncPipe], styles: ["\n\n.home-container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\nmat-card[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 0 auto;\n}\nbutton[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n/*# sourceMappingURL=home.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent" });
})();

// src/app/features/auth/logout/logout.component.ts
var LogoutComponent = class _LogoutComponent {
  constructor(keycloakService, router) {
    this.keycloakService = keycloakService;
    this.router = router;
  }
  ngOnInit() {
    this.logout();
  }
  logout() {
    return __async(this, null, function* () {
      try {
        yield this.keycloakService.logout();
      } catch (error) {
        console.error("Erreur lors de la d\xE9connexion:", error);
        this.router.navigate(["/auth/login"]);
      }
    });
  }
  static {
    this.\u0275fac = function LogoutComponent_Factory(t) {
      return new (t || _LogoutComponent)(\u0275\u0275directiveInject(KeycloakService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LogoutComponent, selectors: [["app-logout"]], decls: 7, vars: 0, consts: [[1, "logout-container"], [1, "logout-message"], ["mode", "indeterminate", "diameter", "40"]], template: function LogoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "D\xE9connexion en cours...");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5, "Vous serez redirig\xE9 dans un instant.");
        \u0275\u0275elementEnd();
        \u0275\u0275element(6, "mat-progress-spinner", 2);
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [MatProgressSpinner], styles: ["\n\n.logout-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n.logout-message[_ngcontent-%COMP%] {\n  text-align: center;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\nmat-progress-spinner[_ngcontent-%COMP%] {\n  margin: 24px auto 0;\n}\n/*# sourceMappingURL=logout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LogoutComponent, { className: "LogoutComponent" });
})();

// src/app/features/auth/auth.module.ts
var routes = [
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "login", pathMatch: "full" }
];
var AuthModule = class _AuthModule {
  static {
    this.\u0275fac = function AuthModule_Factory(t) {
      return new (t || _AuthModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MatCardModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      RouterModule
    ] });
  }
};
export {
  AuthModule
};
//# sourceMappingURL=chunk-YLRLMROH.js.map
