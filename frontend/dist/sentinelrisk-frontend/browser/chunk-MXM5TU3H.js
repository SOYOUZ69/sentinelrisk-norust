import {
  KeycloakAuthGuard,
  KeycloakService
} from "./chunk-H7I66HTM.js";
import {
  Router,
  __async,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-NDFIPPEC.js";

// src/app/core/guards/auth.guard.ts
var AuthGuard = class _AuthGuard extends KeycloakAuthGuard {
  constructor(router, keycloak) {
    super(router, keycloak);
    this.router = router;
    this.keycloak = keycloak;
  }
  isAccessAllowed(route, state) {
    return __async(this, null, function* () {
      console.log(`\u{1F510} [AuthGuard] V\xE9rification d'authentification pour: ${state.url}`);
      if (!this.authenticated) {
        console.log("\u274C [AuthGuard] Utilisateur non authentifi\xE9, redirection vers login");
        yield this.keycloak.login({
          redirectUri: window.location.origin + state.url
        });
        return false;
      }
      console.log(`\u2705 [AuthGuard] Utilisateur authentifi\xE9`);
      return true;
    });
  }
  static {
    this.\u0275fac = function AuthGuard_Factory(t) {
      return new (t || _AuthGuard)(\u0275\u0275inject(Router), \u0275\u0275inject(KeycloakService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthGuard
};
//# sourceMappingURL=chunk-MXM5TU3H.js.map
