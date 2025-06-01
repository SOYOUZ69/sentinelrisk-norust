import {
  ApiService
} from "./chunk-PMRQPNHV.js";
import {
  __spreadProps,
  __spreadValues,
  catchError,
  map,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N6MSFXF2.js";

// src/app/features/controls/services/control.service.ts
var ControlService = class _ControlService {
  constructor(apiService) {
    this.apiService = apiService;
    this.basePath = "/controls";
  }
  /**
   * Récupère la liste de tous les contrôles
   * @returns Observable contenant un tableau de contrôles
   */
  getControls() {
    return this.apiService.get(this.basePath).pipe(map((controlsData) => controlsData.map((control) => this.mapControlResponse(control))), catchError((error) => {
      console.error("Erreur lors de la r\xE9cup\xE9ration des contr\xF4les", error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer la liste des contr\xF4les. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère un contrôle par son identifiant
   * @param id Identifiant du contrôle
   * @returns Observable contenant le contrôle
   */
  getControl(id) {
    return this.apiService.get(`${this.basePath}/${id}`).pipe(map((controlData) => this.mapControlResponse(controlData)), catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration du contr\xF4le ${id}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les d\xE9tails du contr\xF4le. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Crée un nouveau contrôle
   * @param control Données du contrôle à créer
   * @returns Observable contenant le contrôle créé
   */
  createControl(control) {
    const controlRequest = this.formatControlRequest(control);
    return this.apiService.post(this.basePath, controlRequest).pipe(map((controlData) => this.mapControlResponse(controlData)), catchError((error) => {
      console.error("Erreur lors de la cr\xE9ation du contr\xF4le", error);
      const message = this.getErrorMessage(error) || "Impossible de cr\xE9er le contr\xF4le. Veuillez r\xE9essayer.";
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Met à jour un contrôle existant
   * @param id Identifiant du contrôle
   * @param control Nouvelles données du contrôle
   * @returns Observable contenant le contrôle mis à jour
   */
  updateControl(id, control) {
    const controlRequest = this.formatControlRequest(control);
    return this.apiService.put(`${this.basePath}/${id}`, controlRequest).pipe(map((controlData) => this.mapControlResponse(controlData)), catchError((error) => {
      console.error(`Erreur lors de la mise \xE0 jour du contr\xF4le ${id}`, error);
      const message = this.getErrorMessage(error) || "Impossible de mettre \xE0 jour le contr\xF4le. Veuillez r\xE9essayer.";
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Supprime un contrôle
   * @param id Identifiant du contrôle à supprimer
   * @returns Observable
   */
  deleteControl(id) {
    return this.apiService.delete(`${this.basePath}/${id}`).pipe(catchError((error) => {
      console.error(`Erreur lors de la suppression du contr\xF4le ${id}`, error);
      return throwError(() => new Error("Impossible de supprimer le contr\xF4le. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère les contrôles par type
   * @param type Type de contrôle
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByType(type) {
    return this.apiService.get(`${this.basePath}/type/${type}`).pipe(map((controlsData) => controlsData.map((control) => this.mapControlResponse(control))), catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration des contr\xF4les de type ${type}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les contr\xF4les de ce type. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère les contrôles par statut
   * @param status Statut des contrôles
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByStatus(status) {
    return this.apiService.get(`${this.basePath}/status/${status}`).pipe(map((controlsData) => controlsData.map((control) => this.mapControlResponse(control))), catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration des contr\xF4les avec le statut ${status}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les contr\xF4les avec ce statut. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Récupère les contrôles par fréquence
   * @param frequency Fréquence du contrôle
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByFrequency(frequency) {
    return this.apiService.get(`${this.basePath}/frequency/${frequency}`);
  }
  /**
   * Récupère les contrôles associés à un risque
   * @param riskId Identifiant du risque
   * @returns Observable contenant un tableau de contrôles
   */
  getControlsByRisk(riskId) {
    return this.apiService.get(`${this.basePath}/risk/${riskId}`).pipe(map((controlsData) => controlsData.map((control) => this.mapControlResponse(control))), catchError((error) => {
      console.error(`Erreur lors de la r\xE9cup\xE9ration des contr\xF4les associ\xE9s au risque ${riskId}`, error);
      return throwError(() => new Error("Impossible de r\xE9cup\xE9rer les contr\xF4les associ\xE9s \xE0 ce risque. Veuillez r\xE9essayer."));
    }));
  }
  /**
   * Mappe la réponse du backend vers le modèle frontend
   * @param controlData Données du contrôle provenant du backend
   * @returns Objet Control pour le frontend
   */
  mapControlResponse(controlData) {
    return __spreadProps(__spreadValues({}, controlData), {
      // Conversion de l'ID numérique en string si nécessaire
      id: controlData.id?.toString(),
      // Conversion des dates si elles existent
      implementationDate: controlData.implementationDate ? new Date(controlData.implementationDate) : void 0,
      lastTestedDate: controlData.lastTestedDate ? new Date(controlData.lastTestedDate) : void 0,
      createdAt: controlData.createdAt ? new Date(controlData.createdAt) : void 0,
      updatedAt: controlData.updatedAt ? new Date(controlData.updatedAt) : void 0,
      // Extraire les IDs des risques depuis la propriété risks[]
      riskIds: controlData.risks ? controlData.risks.map((risk) => risk.id.toString()) : []
    });
  }
  /**
   * Formate les données du contrôle pour correspondre au format attendu par le backend
   * @param control Données du contrôle
   * @returns Objet formaté pour le backend
   */
  formatControlRequest(control) {
    return {
      name: control.name,
      description: control.description,
      type: control.type,
      status: control.status,
      frequency: control.frequency,
      owner: control.owner,
      implementationDate: control.implementationDate,
      lastTestedDate: control.lastTestedDate,
      effectivenessScore: control.effectivenessScore,
      documentation: control.documentation,
      riskIds: control.riskIds
    };
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
    this.\u0275fac = function ControlService_Factory(t) {
      return new (t || _ControlService)(\u0275\u0275inject(ApiService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ControlService, factory: _ControlService.\u0275fac, providedIn: "root" });
  }
};

export {
  ControlService
};
//# sourceMappingURL=chunk-YS3YDMK3.js.map
