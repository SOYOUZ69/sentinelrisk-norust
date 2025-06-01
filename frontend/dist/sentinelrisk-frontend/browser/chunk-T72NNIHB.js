import {
  ApiService
} from "./chunk-PMRQPNHV.js";
import {
  catchError,
  map,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N6MSFXF2.js";

// src/app/features/compliance/services/risk-compliance-mapping.service.ts
var RiskComplianceMappingService = class _RiskComplianceMappingService {
  constructor(apiService) {
    this.apiService = apiService;
    this.basePath = "/risk-compliance-mappings";
    this.gapAnalysisPath = "/risk-compliance-mappings/gap-analysis";
  }
  /**
   * Récupère la liste de tous les mappings risques-conformité
   * @returns Observable contenant un tableau de mappings
   */
  getMappings() {
    return this.apiService.get(this.basePath).pipe(catchError((error) => {
      console.error("Erreur lors de la r\xE9cup\xE9ration des mappings", error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer la liste des mappings. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère la liste des mappings risque-conformité filtrés par risque
   * @param riskId Identifiant du risque
   * @returns Observable contenant un tableau de mappings
   */
  getMappingsByRisk(riskId) {
    return this.apiService.get(`${this.basePath}?riskId=${riskId}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration des mappings du risque ${riskId}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les mappings de ce risque. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère la liste des mappings risque-conformité filtrés par framework
   * @param frameworkId Identifiant du framework
   * @returns Observable contenant un tableau de mappings
   */
  getMappingsByFramework(frameworkId) {
    return this.apiService.get(`${this.basePath}?frameworkId=${frameworkId}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration des mappings du framework ${frameworkId}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les mappings de ce framework. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère un mapping par son identifiant
   * @param id Identifiant du mapping
   * @returns Observable contenant le mapping
   */
  getMapping(id) {
    return this.apiService.get(`${this.basePath}/${id}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration du mapping ${id}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les d\xE9tails du mapping. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Crée un nouveau mapping
   * @param mapping Données du mapping à créer
   * @returns Observable contenant le mapping créé
   */
  createMapping(mapping) {
    return this.apiService.post(this.basePath, mapping).pipe(catchError((error) => {
      console.error("Erreur lors de la cr\xE9ation du mapping", error);
      return throwError(() => new Error("Impossible de cr\xE9er le mapping. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Met à jour un mapping existant
   * @param id Identifiant du mapping
   * @param mapping Nouvelles données du mapping
   * @returns Observable contenant le mapping mis à jour
   */
  updateMapping(id, mapping) {
    return this.apiService.put(`${this.basePath}/${id}`, mapping).pipe(catchError((error) => {
      console.error(`Erreur lors de la mise \xE0 jour du mapping ${id}`, error);
      return throwError(() => new Error("Impossible de mettre \xE0 jour le mapping. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Supprime un mapping
   * @param id Identifiant du mapping à supprimer
   * @returns Observable
   */
  deleteMapping(id) {
    return this.apiService.delete(`${this.basePath}/${id}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la suppression du mapping ${id}`, error);
      return throwError(() => new Error("Impossible de supprimer le mapping. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère l'analyse d'écarts pour un framework donné
   * Si riskId est fourni, l'analyse sera spécifique à ce risque
   * @param frameworkId Identifiant du référentiel
   * @param riskId Identifiant du risque (optionnel)
   * @returns Observable contenant les résultats de l'analyse d'écarts
   */
  getGapAnalysis(frameworkId, riskId) {
    let url = `${this.gapAnalysisPath}?frameworkId=${frameworkId}`;
    if (riskId) {
      url += `&riskId=${riskId}`;
    }
    return this.apiService.get(url).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration de l'analyse d'\xE9carts. Framework: ${frameworkId}, Risque: ${riskId || "non sp\xE9cifi\xE9"}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer l'analyse d'\xE9carts. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère le pourcentage de conformité d'un risque par rapport à un framework
   * @param riskId Identifiant du risque
   * @param frameworkId Identifiant du framework
   * @returns Observable contenant le pourcentage de conformité
   */
  getCompliancePercentage(riskId, frameworkId) {
    return this.apiService.get(`${this.basePath}/compliance-percentage?riskId=${riskId}&frameworkId=${frameworkId}`).pipe(map((response) => response.percentage), catchError((error) => {
      console.error(`Erreur lors du calcul du pourcentage de conformit\xE9 pour le risque ${riskId} et le framework ${frameworkId}`, error);
      return throwError(() => new Error("Impossible de calculer le pourcentage de conformit\xE9. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère un mapping spécifique par risque et exigence
   * @param riskId Identifiant du risque
   * @param requirementId Identifiant de l'exigence
   * @returns Observable contenant le mapping s'il existe
   */
  getMappingByRiskAndRequirement(riskId, requirementId) {
    return this.apiService.get(`${this.basePath}?riskId=${riskId}&requirementId=${requirementId}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration du mapping pour le risque ${riskId} et l'exigence ${requirementId}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer le mapping sp\xE9cifique. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Extrait un message d'erreur lisible de la réponse HTTP
   * @param error Erreur HTTP
   * @returns Message d'erreur lisible
   */
  getErrorMessage(error) {
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
  static {
    this.\u0275fac = function RiskComplianceMappingService_Factory(t) {
      return new (t || _RiskComplianceMappingService)(\u0275\u0275inject(ApiService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RiskComplianceMappingService, factory: _RiskComplianceMappingService.\u0275fac, providedIn: "root" });
  }
};

export {
  RiskComplianceMappingService
};
//# sourceMappingURL=chunk-T72NNIHB.js.map
