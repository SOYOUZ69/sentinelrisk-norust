import {
  ApiService
} from "./chunk-PMRQPNHV.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N6MSFXF2.js";

// src/app/features/admin/users/services/user.service.ts
var UserService = class _UserService {
  constructor(apiService) {
    this.apiService = apiService;
    this.basePath = "/users";
  }
  /**
   * Récupère la liste de tous les utilisateurs
   * @returns Observable contenant un tableau d'utilisateurs
   */
  getUsers() {
    return this.apiService.get(this.basePath);
  }
  /**
   * Récupère un utilisateur par son identifiant
   * @param id Identifiant de l'utilisateur
   * @returns Observable contenant l'utilisateur
   */
  getUser(id) {
    return this.apiService.get(`${this.basePath}/${id}`);
  }
  /**
   * Crée un nouvel utilisateur
   * @param user Données de l'utilisateur à créer
   * @returns Observable contenant l'utilisateur créé
   */
  createUser(user) {
    return this.apiService.post(this.basePath, user);
  }
  /**
   * Met à jour un utilisateur existant
   * @param id Identifiant de l'utilisateur
   * @param user Nouvelles données de l'utilisateur
   * @returns Observable contenant l'utilisateur mis à jour
   */
  updateUser(id, user) {
    return this.apiService.put(`${this.basePath}/${id}`, user);
  }
  /**
   * Supprime un utilisateur
   * @param id Identifiant de l'utilisateur à supprimer
   * @returns Observable
   */
  deleteUser(id) {
    return this.apiService.delete(`${this.basePath}/${id}`);
  }
  /**
   * Recherche des utilisateurs par leur rôle
   * @param role Rôle à rechercher
   * @returns Observable contenant un tableau d'utilisateurs
   */
  getUsersByRole(role) {
    return this.apiService.get(`${this.basePath}/role/${role}`);
  }
  /**
   * Récupère tous les utilisateurs actifs
   * @returns Observable contenant un tableau d'utilisateurs
   */
  getActiveUsers() {
    return this.apiService.get(`${this.basePath}/active`);
  }
  static {
    this.\u0275fac = function UserService_Factory(t) {
      return new (t || _UserService)(\u0275\u0275inject(ApiService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
  }
};

export {
  UserService
};
//# sourceMappingURL=chunk-ZNN45TJ3.js.map
