import {
  KeycloakAuthGuard,
  KeycloakService
} from "./chunk-YZOLHLAY.js";
import {
  Router,
  __async,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N6MSFXF2.js";

// src/app/core/guards/auth.guard.ts
var AuthGuard = class _AuthGuard extends KeycloakAuthGuard {
  constructor(router, keycloak) {
    super(router, keycloak);
    this.router = router;
    this.keycloak = keycloak;
  }
  isAccessAllowed(route, state) {
    return __async(this, null, function* () {
      if (!this.authenticated) {
        yield this.keycloak.login({
          redirectUri: window.location.origin + state.url
        });
        return false;
      }
      const requiredRoles = route.data["roles"];
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
      return requiredRoles.some((role) => this.roles.includes(role));
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
//# sourceMappingURL=chunk-PTF3ZGHN.js.map
