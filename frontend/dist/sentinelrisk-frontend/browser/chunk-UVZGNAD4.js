import {
  ApiService
} from "./chunk-PMRQPNHV.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N6MSFXF2.js";

// src/app/features/categories/services/category.service.ts
var CategoryService = class _CategoryService {
  constructor(api) {
    this.api = api;
  }
  /**
   * Récupère la liste de toutes les catégories
   * @returns Observable contenant un tableau de catégories
   */
  getCategories() {
    console.log("Appel API pour r\xE9cup\xE9rer toutes les cat\xE9gories");
    return this.api.get("/categories");
  }
  /**
   * Récupère une catégorie par son identifiant
   * @param id Identifiant de la catégorie
   * @returns Observable contenant la catégorie
   */
  getCategory(id) {
    return this.api.get(`/categories/${id}`);
  }
  /**
   * Crée une nouvelle catégorie
   * @param category Données de la catégorie à créer
   * @returns Observable contenant la catégorie créée
   */
  createCategory(body) {
    return this.api.post("/categories", body);
  }
  /**
   * Met à jour une catégorie existante
   * @param id Identifiant de la catégorie
   * @param category Nouvelles données de la catégorie
   * @returns Observable contenant la catégorie mise à jour
   */
  updateCategory(id, body) {
    return this.api.put(`/categories/${id}`, body);
  }
  /**
   * Supprime une catégorie
   * @param id Identifiant de la catégorie à supprimer
   * @returns Observable
   */
  deleteCategory(id) {
    return this.api.delete(`/categories/${id}`);
  }
  /**
   * Vérifie si une catégorie existe avec un nom donné
   * @param name Nom de la catégorie à vérifier
   * @returns Observable contenant un booléen
   */
  categoryExists(name) {
    return this.api.get(`/categories/exists?name=${encodeURIComponent(name)}`);
  }
  static {
    this.\u0275fac = function CategoryService_Factory(t) {
      return new (t || _CategoryService)(\u0275\u0275inject(ApiService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CategoryService, factory: _CategoryService.\u0275fac, providedIn: "root" });
  }
};

export {
  CategoryService
};
//# sourceMappingURL=chunk-UVZGNAD4.js.map
