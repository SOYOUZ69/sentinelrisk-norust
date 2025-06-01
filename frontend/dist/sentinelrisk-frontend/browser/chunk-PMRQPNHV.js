import {
  environment
} from "./chunk-SOQ7WNQA.js";
import {
  HttpClient,
  HttpParams,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N6MSFXF2.js";

// src/app/core/services/api.service.ts
var ApiService = class _ApiService {
  constructor(http) {
    this.http = http;
    this.apiUrl = environment.apiUrl;
    this.apiPrefix = "/api";
  }
  /**
   * Effectue une requête HTTP GET
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param params Paramètres optionnels de la requête
   * @returns Observable avec les données
   */
  get(path, params = new HttpParams()) {
    const url = `${this.apiUrl}${this.apiPrefix}${path}`;
    console.log(`ApiService GET: ${url} avec params:`, params.toString());
    return this.http.get(url, { params });
  }
  /**
   * Effectue une requête HTTP POST
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param body Corps de la requête
   * @returns Observable avec les données
   */
  post(path, body) {
    return this.http.post(`${this.apiUrl}${this.apiPrefix}${path}`, body);
  }
  /**
   * Effectue une requête HTTP PUT
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param body Corps de la requête
   * @returns Observable avec les données
   */
  put(path, body) {
    return this.http.put(`${this.apiUrl}${this.apiPrefix}${path}`, body);
  }
  /**
   * Effectue une requête HTTP PATCH
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param body Corps de la requête
   * @returns Observable avec les données
   */
  patch(path, body) {
    return this.http.patch(`${this.apiUrl}${this.apiPrefix}${path}`, body);
  }
  /**
   * Effectue une requête HTTP DELETE
   * @param path Chemin de l'API (sans le préfixe de base)
   * @returns Observable avec les données
   */
  delete(path) {
    return this.http.delete(`${this.apiUrl}${this.apiPrefix}${path}`);
  }
  /**
   * Effectue une requête HTTP POST avec FormData (pour l'upload de fichiers)
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param formData Objet FormData contenant les fichiers et autres données
   * @returns Observable avec les données
   */
  postFormData(path, formData) {
    const url = `${this.apiUrl}${this.apiPrefix}${path}`;
    console.log(`ApiService POST FormData: ${url}`);
    return this.http.post(url, formData);
  }
  static {
    this.\u0275fac = function ApiService_Factory(t) {
      return new (t || _ApiService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
  }
};

export {
  ApiService
};
//# sourceMappingURL=chunk-PMRQPNHV.js.map
