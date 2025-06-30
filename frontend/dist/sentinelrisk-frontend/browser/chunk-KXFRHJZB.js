import {
  ApiService
} from "./chunk-T473K2PU.js";
import {
  HttpClient,
  __spreadProps,
  __spreadValues,
  catchError,
  map,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-NDFIPPEC.js";

// src/app/features/risks/services/risk.service.ts
var RiskService = class _RiskService {
  constructor(apiService, http) {
    this.apiService = apiService;
    this.http = http;
    this.basePath = "/risks";
  }
  /**
   * Récupère la liste de tous les risques
   * @returns Observable contenant un tableau de risques
   */
  getRisks() {
    return this.apiService.get(this.basePath).pipe(map((risksData) => risksData.map((risk) => this.mapRiskResponse(risk))), catchError((error) => {
      console.error("Erreur lors de la r\xE9cup\xE9ration des risques", error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer la liste des risques. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère un risque par son identifiant
   * @param id Identifiant du risque
   * @returns Observable contenant le risque
   */
  getRisk(id) {
    return this.apiService.get(`${this.basePath}/${id}`).pipe(map((riskData) => this.mapRiskResponse(riskData)), catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration du risque ${id}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les d\xE9tails du risque. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Crée un nouveau risque
   * @param risk Données du risque à créer
   * @returns Observable contenant le risque créé
   */
  createRisk(risk) {
    const riskRequest = this.formatRiskRequest(risk);
    return this.apiService.post(this.basePath, riskRequest).pipe(map((riskData) => this.mapRiskResponse(riskData)), catchError((error) => {
      console.error("Erreur lors de la cr\xE9ation du risque", error);
      if (error.status === 409) {
        let message2 = "Un risque similaire existe d\xE9j\xE0.";
        if (error.error && error.error.message) {
          message2 = error.error.message;
        }
        return throwError(() => new Error(message2));
      }
      if (error.status === 422 && error.error && error.error.error === "risk_above_threshold") {
        let message2 = "Le score de ce risque d\xE9passe le seuil d'acceptation.";
        if (error.error && error.error.message) {
          message2 = error.error.message;
        }
        return throwError(() => new Error(message2));
      }
      const message = this.getErrorMessage(error) || "Impossible de cr\xE9er le risque. Veuillez r\xE9essayer.";
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Met à jour un risque existant
   * @param id Identifiant du risque
   * @param risk Nouvelles données du risque
   * @returns Observable contenant le risque mis à jour
   */
  updateRisk(id, risk) {
    const riskRequest = this.formatRiskRequest(risk);
    return this.apiService.put(`${this.basePath}/${id}`, riskRequest).pipe(map((riskData) => this.mapRiskResponse(riskData)), catchError((error) => {
      console.error(`Erreur lors de la mise \xE0 jour du risque ${id}`, error);
      const message = this.getErrorMessage(error) || "Impossible de mettre \xE0 jour le risque. Veuillez r\xE9essayer.";
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Met à jour uniquement les contrôles associés à un risque
   * @param id Identifiant du risque
   * @param controlIds IDs des contrôles à associer
   * @returns Observable contenant le risque mis à jour
   */
  updateRiskControls(id, controlIds) {
    const numericControlIds = controlIds.map((id2) => typeof id2 === "string" ? +id2 : id2);
    return this.apiService.put(`${this.basePath}/${id}/controls`, numericControlIds).pipe(map((riskData) => this.mapRiskResponse(riskData)), catchError((error) => {
      console.error(`Erreur lors de la mise \xE0 jour des contr\xF4les du risque ${id}`, error);
      const message = this.getErrorMessage(error) || "Impossible de mettre \xE0 jour les contr\xF4les associ\xE9s au risque. Veuillez r\xE9essayer.";
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Supprime un risque
   * @param id Identifiant du risque à supprimer
   * @returns Observable
   */
  deleteRisk(id) {
    return this.apiService.delete(`${this.basePath}/${id}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la suppression du risque ${id}`, error);
      return throwError(() => new Error("Impossible de supprimer le risque. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère les risques par catégorie
   * @param categoryId Identifiant de la catégorie
   * @returns Observable contenant un tableau de risques
   */
  getRisksByCategory(categoryId) {
    return this.apiService.get(`${this.basePath}/category/${categoryId}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration des risques de la cat\xE9gorie ${categoryId}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les risques de cette cat\xE9gorie. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère un risque par son identifiant DID
   * @param did Identifiant DID du risque
   * @returns Observable contenant le risque
   */
  getRiskByDid(did) {
    return this.apiService.get(`${this.basePath}/did/${did}`).pipe(map((riskData) => this.mapRiskResponse(riskData)), catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration du risque avec DID ${did}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer le risque avec cet identifiant DID. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Vérifie si un identifiant DID existe
   * @param did Identifiant DID à vérifier
   * @returns Observable contenant un booléen
   */
  checkDidExists(did) {
    return this.apiService.get(`${this.basePath}/did/${did}/exists`).pipe(map((response) => response.exists), catchError((error) => {
      console.error(`Erreur lors de la v\xE9rification du DID ${did}`, error);
      return throwError(() => new Error("Impossible de v\xE9rifier l'existence de cet identifiant DID."));
    }));
  }
  /**
   * Attribue des identifiants DID aux risques qui n'en ont pas encore
   * @returns Observable contenant le nombre de risques mis à jour
   */
  assignMissingDids() {
    return this.apiService.post(`${this.basePath}/did/assign-missing`, {}).pipe(map((response) => response.updatedCount), catchError((error) => {
      console.error("Erreur lors de l'attribution des identifiants DID", error);
      return throwError(() => new Error("Impossible d'attribuer les identifiants DID manquants. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère les risques avec un score élevé
   * @returns Observable contenant un tableau de risques
   */
  getHighScoreRisks() {
    return this.apiService.get(`${this.basePath}/high-score`).pipe(catchError((error) => {
      console.error("Erreur lors de la r\xE9cup\xE9ration des risques \xE0 score \xE9lev\xE9", error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les risques \xE0 score \xE9lev\xE9. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Formate les données du risque pour correspondre au format attendu par le backend
   * @param risk Données du risque
   * @returns Objet formaté pour le backend
   */
  formatRiskRequest(risk) {
    const categoryId = risk.categoryId || risk.category?.id;
    return {
      name: risk.name,
      description: risk.description,
      categoryId,
      // Utilise directement categoryId pour le backend
      impactLevel: risk.impactLevel,
      probabilityLevel: risk.probabilityLevel,
      status: risk.status,
      mitigationPlan: risk.mitigationPlan
    };
  }
  /**
   * Extrait un message d'erreur lisible de la réponse HTTP
   * @param error Erreur HTTP
   * @returns Message d'erreur lisible
   */
  getErrorMessage(error) {
    console.log("Analyse de l'erreur:", error);
    if (error.status === 409) {
      if (error.error && error.error.message) {
        return error.error.message;
      }
      if (error.error && error.error.error === "duplicate_risk") {
        return "Un risque avec ce titre et cette cat\xE9gorie existe d\xE9j\xE0.";
      }
      return "Un risque similaire existe d\xE9j\xE0.";
    }
    if (error.error) {
      if (typeof error.error === "string") {
        return error.error;
      }
      if (error.error.message) {
        return error.error.message;
      }
      if (typeof error.error === "object") {
        const validationErrors = Object.entries(error.error).map(([field, message]) => `${field}: ${message}`).join(", ");
        if (validationErrors) {
          return `Erreurs de validation: ${validationErrors}`;
        }
      }
    }
    return error.statusText || "Une erreur est survenue";
  }
  /**
   * Mappe la réponse du backend vers le modèle frontend
   * @param riskData Données du risque provenant du backend
   * @returns Objet Risk pour le frontend
   */
  mapRiskResponse(riskData) {
    console.log("Mapping risk response:", riskData);
    const categoryObject = riskData.categoryId ? {
      id: riskData.categoryId.toString(),
      name: riskData.categoryName || "Sans cat\xE9gorie"
    } : void 0;
    let controls = [];
    if (riskData.controls && Array.isArray(riskData.controls)) {
      controls = riskData.controls.map((ctrl) => ({
        id: ctrl.id?.toString(),
        name: ctrl.name || `Contr\xF4le ${ctrl.id}`,
        description: ctrl.description,
        type: ctrl.type || "UNKNOWN",
        status: ctrl.status || "UNKNOWN",
        frequency: ctrl.frequency
      }));
      console.log("Mapped controls from complete objects:", controls);
    } else if (riskData.controlIds && Array.isArray(riskData.controlIds)) {
      controls = riskData.controlIds.map((id) => ({
        id: id.toString(),
        name: `Contr\xF4le ${id}`,
        type: "UNKNOWN",
        status: "UNKNOWN"
      }));
      console.log("Mapped controls from IDs:", controls);
    }
    return __spreadProps(__spreadValues({}, riskData), {
      // Conversion de l'ID numérique en string si nécessaire
      id: riskData.id?.toString(),
      // Inclure l'identifiant DID
      did: riskData.did,
      // Pour la rétrocompatibilité avec l'interface actuelle
      category: categoryObject,
      // Ajouter les contrôles mappés
      controls,
      // Utiliser riskScore du backend comme score dans le frontend
      score: riskData.riskScore || 0,
      // S'assurer que les dates sont correctement converties
      createdAt: riskData.createdAt ? new Date(riskData.createdAt) : /* @__PURE__ */ new Date(),
      updatedAt: riskData.updatedAt ? new Date(riskData.updatedAt) : /* @__PURE__ */ new Date()
    });
  }
  /**
   * Crée plusieurs risques en une seule opération
   * @param risks Tableau d'objets risques à créer
   * @returns Observable contenant les risques créés
   */
  bulkCreate(risks) {
    const riskRequests = risks.map((risk) => {
      return {
        name: risk.name,
        description: risk.description,
        categoryName: risk.categoryName,
        // Utilisé pour rechercher la catégorie par nom
        impactLevel: risk.impactLevel,
        probabilityLevel: risk.probabilityLevel,
        mitigationPlan: risk.mitigationPlan
      };
    });
    return this.apiService.post(`${this.basePath}/bulk`, riskRequests).pipe(map((responseData) => responseData.map((risk) => this.mapRiskResponse(risk))), catchError((error) => {
      console.error("Erreur lors de la cr\xE9ation massive de risques", error);
      const message = this.getErrorMessage(error) || "Impossible de cr\xE9er les risques. Veuillez r\xE9essayer.";
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Importe des risques à partir d'un fichier CSV
   * @param file Fichier CSV à importer
   * @returns Observable contenant le résultat de l'import
   */
  importRisksFromFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.apiService.postFormData(`${this.basePath}/bulk`, formData).pipe(catchError((error) => {
      console.error("Erreur lors de l'import du fichier CSV", error);
      const message = this.getErrorMessage(error) || "Impossible d'importer le fichier CSV. Veuillez r\xE9essayer.";
      return throwError(() => new Error(message));
    }));
  }
  static {
    this.\u0275fac = function RiskService_Factory(t) {
      return new (t || _RiskService)(\u0275\u0275inject(ApiService), \u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RiskService, factory: _RiskService.\u0275fac, providedIn: "root" });
  }
};

export {
  RiskService
};
//# sourceMappingURL=chunk-KXFRHJZB.js.map
