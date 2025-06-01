import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-O3JNOZJZ.js";
import {
  MatChip,
  MatChipListbox,
  MatChipOption,
  MatChipsModule
} from "./chunk-3PN52UW6.js";
import {
  MatDatepickerModule
} from "./chunk-WTZCJFYH.js";
import {
  MatPaginatorModule,
  MatSortModule
} from "./chunk-2ESS6S3M.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-R2B4LHFC.js";
import {
  MAT_DIALOG_DATA,
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatInput,
  MatInputModule,
  MatLabel,
  MatRow,
  MatRowDef,
  MatSelect,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule,
  MatSuffix,
  MatTable,
  MatTableModule
} from "./chunk-PKA5PYFO.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatIcon,
  MatIconModule,
  MatTooltip,
  MatTooltipModule,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-X5WSOYDN.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-N47WCMZ2.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
  environment
} from "./chunk-SOQ7WNQA.js";
import {
  A11yModule,
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  AriaDescriber,
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  EnvironmentInjector,
  HttpClient,
  HttpParams,
  Inject,
  Input,
  InputFlags,
  InteractivityChecker,
  MatCommonModule,
  MatNativeDateModule,
  MatOption,
  NgForOf,
  NgIf,
  NgModule,
  NgZone,
  Optional,
  Renderer2,
  Router,
  RouterLink,
  RouterModule,
  ViewEncapsulation$1,
  __async,
  booleanAttribute,
  createComponent,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInputTransformsFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-N6MSFXF2.js";

// node_modules/@angular/material/fesm2022/badge.mjs
var nextId = 0;
var BADGE_CONTENT_CLASS = "mat-badge-content";
var badgeApps = /* @__PURE__ */ new Set();
var _MatBadgeStyleLoader = class __MatBadgeStyleLoader {
  static {
    this.\u0275fac = function _MatBadgeStyleLoader_Factory(t) {
      return new (t || __MatBadgeStyleLoader)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: __MatBadgeStyleLoader,
      selectors: [["ng-component"]],
      standalone: true,
      features: [\u0275\u0275StandaloneFeature],
      decls: 0,
      vars: 0,
      template: function _MatBadgeStyleLoader_Template(rf, ctx) {
      },
      styles: [".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color);color:var(--mat-badge-text-color);font-family:var(--mat-badge-text-font);font-weight:var(--mat-badge-text-weight);border-radius:var(--mat-badge-container-shape)}.cdk-high-contrast-active .mat-badge-content{outline:solid 1px;border-radius:0}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color);color:var(--mat-badge-disabled-state-text-color)}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, unset);min-height:var(--mat-badge-small-size-container-size, unset);line-height:var(--mat-badge-legacy-small-size-container-size, var(--mat-badge-small-size-container-size));padding:var(--mat-badge-small-size-container-padding);font-size:var(--mat-badge-small-size-text-size);margin:var(--mat-badge-small-size-container-offset)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, unset);min-height:var(--mat-badge-container-size, unset);line-height:var(--mat-badge-legacy-container-size, var(--mat-badge-container-size));padding:var(--mat-badge-container-padding);font-size:var(--mat-badge-text-size);margin:var(--mat-badge-container-offset)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, unset);min-height:var(--mat-badge-large-size-container-size, unset);line-height:var(--mat-badge-legacy-large-size-container-size, var(--mat-badge-large-size-container-size));padding:var(--mat-badge-large-size-container-padding);font-size:var(--mat-badge-large-size-text-size);margin:var(--mat-badge-large-size-container-offset)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset)}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatBadgeStyleLoader, [{
    type: Component,
    args: [{
      standalone: true,
      encapsulation: ViewEncapsulation$1.None,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color);color:var(--mat-badge-text-color);font-family:var(--mat-badge-text-font);font-weight:var(--mat-badge-text-weight);border-radius:var(--mat-badge-container-shape)}.cdk-high-contrast-active .mat-badge-content{outline:solid 1px;border-radius:0}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color);color:var(--mat-badge-disabled-state-text-color)}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, unset);min-height:var(--mat-badge-small-size-container-size, unset);line-height:var(--mat-badge-legacy-small-size-container-size, var(--mat-badge-small-size-container-size));padding:var(--mat-badge-small-size-container-padding);font-size:var(--mat-badge-small-size-text-size);margin:var(--mat-badge-small-size-container-offset)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, unset);min-height:var(--mat-badge-container-size, unset);line-height:var(--mat-badge-legacy-container-size, var(--mat-badge-container-size));padding:var(--mat-badge-container-padding);font-size:var(--mat-badge-text-size);margin:var(--mat-badge-container-offset)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, unset);min-height:var(--mat-badge-large-size-container-size, unset);line-height:var(--mat-badge-legacy-large-size-container-size, var(--mat-badge-large-size-container-size));padding:var(--mat-badge-large-size-container-padding);font-size:var(--mat-badge-large-size-text-size);margin:var(--mat-badge-large-size-container-offset)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset)}"]
    }]
  }], null, null);
})();
var MatBadge = class _MatBadge {
  /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
  get color() {
    return this._color;
  }
  set color(value) {
    this._setColor(value);
    this._color = value;
  }
  /** The content for the badge */
  get content() {
    return this._content;
  }
  set content(newContent) {
    this._updateRenderedContent(newContent);
  }
  /** Message used to describe the decorated element via aria-describedby */
  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._updateDescription(newDescription);
  }
  constructor(_ngZone, _elementRef, _ariaDescriber, _renderer, _animationMode) {
    this._ngZone = _ngZone;
    this._elementRef = _elementRef;
    this._ariaDescriber = _ariaDescriber;
    this._renderer = _renderer;
    this._animationMode = _animationMode;
    this._color = "primary";
    this.overlap = true;
    this.position = "above after";
    this.size = "medium";
    this._id = nextId++;
    this._isInitialized = false;
    this._interactivityChecker = inject(InteractivityChecker);
    this._document = inject(DOCUMENT);
    const appRef = inject(ApplicationRef);
    if (!badgeApps.has(appRef)) {
      badgeApps.add(appRef);
      const componentRef = createComponent(_MatBadgeStyleLoader, {
        environmentInjector: inject(EnvironmentInjector)
      });
      appRef.onDestroy(() => {
        badgeApps.delete(appRef);
        if (badgeApps.size === 0) {
          componentRef.destroy();
        }
      });
    }
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const nativeElement = _elementRef.nativeElement;
      if (nativeElement.nodeType !== nativeElement.ELEMENT_NODE) {
        throw Error("matBadge must be attached to an element node.");
      }
      const matIconTagName = "mat-icon";
      if (nativeElement.tagName.toLowerCase() === matIconTagName && nativeElement.getAttribute("aria-hidden") === "true") {
        console.warn(`Detected a matBadge on an "aria-hidden" "<mat-icon>". Consider setting aria-hidden="false" in order to surface the information assistive technology.
${nativeElement.outerHTML}`);
      }
    }
  }
  /** Whether the badge is above the host or not */
  isAbove() {
    return this.position.indexOf("below") === -1;
  }
  /** Whether the badge is after the host or not */
  isAfter() {
    return this.position.indexOf("before") === -1;
  }
  /**
   * Gets the element into which the badge's content is being rendered. Undefined if the element
   * hasn't been created (e.g. if the badge doesn't have content).
   */
  getBadgeElement() {
    return this._badgeElement;
  }
  ngOnInit() {
    this._clearExistingBadges();
    if (this.content && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
      this._updateRenderedContent(this.content);
    }
    this._isInitialized = true;
  }
  ngOnDestroy() {
    if (this._renderer.destroyNode) {
      this._renderer.destroyNode(this._badgeElement);
      this._inlineBadgeDescription?.remove();
    }
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
  }
  /** Gets whether the badge's host element is interactive. */
  _isHostInteractive() {
    return this._interactivityChecker.isFocusable(this._elementRef.nativeElement, {
      ignoreVisibility: true
    });
  }
  /** Creates the badge element */
  _createBadgeElement() {
    const badgeElement = this._renderer.createElement("span");
    const activeClass = "mat-badge-active";
    badgeElement.setAttribute("id", `mat-badge-content-${this._id}`);
    badgeElement.setAttribute("aria-hidden", "true");
    badgeElement.classList.add(BADGE_CONTENT_CLASS);
    if (this._animationMode === "NoopAnimations") {
      badgeElement.classList.add("_mat-animation-noopable");
    }
    this._elementRef.nativeElement.appendChild(badgeElement);
    if (typeof requestAnimationFrame === "function" && this._animationMode !== "NoopAnimations") {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          badgeElement.classList.add(activeClass);
        });
      });
    } else {
      badgeElement.classList.add(activeClass);
    }
    return badgeElement;
  }
  /** Update the text content of the badge element in the DOM, creating the element if necessary. */
  _updateRenderedContent(newContent) {
    const newContentNormalized = `${newContent ?? ""}`.trim();
    if (this._isInitialized && newContentNormalized && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }
    if (this._badgeElement) {
      this._badgeElement.textContent = newContentNormalized;
    }
    this._content = newContentNormalized;
  }
  /** Updates the host element's aria description via AriaDescriber. */
  _updateDescription(newDescription) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
    if (!newDescription || this._isHostInteractive()) {
      this._removeInlineDescription();
    }
    this._description = newDescription;
    if (this._isHostInteractive()) {
      this._ariaDescriber.describe(this._elementRef.nativeElement, newDescription);
    } else {
      this._updateInlineDescription();
    }
  }
  _updateInlineDescription() {
    if (!this._inlineBadgeDescription) {
      this._inlineBadgeDescription = this._document.createElement("span");
      this._inlineBadgeDescription.classList.add("cdk-visually-hidden");
    }
    this._inlineBadgeDescription.textContent = this.description;
    this._badgeElement?.appendChild(this._inlineBadgeDescription);
  }
  _removeInlineDescription() {
    this._inlineBadgeDescription?.remove();
    this._inlineBadgeDescription = void 0;
  }
  /** Adds css theme class given the color to the component host */
  _setColor(colorPalette) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(`mat-badge-${this._color}`);
    if (colorPalette) {
      classList.add(`mat-badge-${colorPalette}`);
    }
  }
  /** Clears any existing badges that might be left over from server-side rendering. */
  _clearExistingBadges() {
    const badges = this._elementRef.nativeElement.querySelectorAll(`:scope > .${BADGE_CONTENT_CLASS}`);
    for (const badgeElement of Array.from(badges)) {
      if (badgeElement !== this._badgeElement) {
        badgeElement.remove();
      }
    }
  }
  static {
    this.\u0275fac = function MatBadge_Factory(t) {
      return new (t || _MatBadge)(\u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(AriaDescriber), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatBadge,
      selectors: [["", "matBadge", ""]],
      hostAttrs: [1, "mat-badge"],
      hostVars: 20,
      hostBindings: function MatBadge_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mat-badge-overlap", ctx.overlap)("mat-badge-above", ctx.isAbove())("mat-badge-below", !ctx.isAbove())("mat-badge-before", !ctx.isAfter())("mat-badge-after", ctx.isAfter())("mat-badge-small", ctx.size === "small")("mat-badge-medium", ctx.size === "medium")("mat-badge-large", ctx.size === "large")("mat-badge-hidden", ctx.hidden || !ctx.content)("mat-badge-disabled", ctx.disabled);
        }
      },
      inputs: {
        color: [InputFlags.None, "matBadgeColor", "color"],
        overlap: [InputFlags.HasDecoratorInputTransform, "matBadgeOverlap", "overlap", booleanAttribute],
        disabled: [InputFlags.HasDecoratorInputTransform, "matBadgeDisabled", "disabled", booleanAttribute],
        position: [InputFlags.None, "matBadgePosition", "position"],
        content: [InputFlags.None, "matBadge", "content"],
        description: [InputFlags.None, "matBadgeDescription", "description"],
        size: [InputFlags.None, "matBadgeSize", "size"],
        hidden: [InputFlags.HasDecoratorInputTransform, "matBadgeHidden", "hidden", booleanAttribute]
      },
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatBadge, [{
    type: Directive,
    args: [{
      selector: "[matBadge]",
      host: {
        "class": "mat-badge",
        "[class.mat-badge-overlap]": "overlap",
        "[class.mat-badge-above]": "isAbove()",
        "[class.mat-badge-below]": "!isAbove()",
        "[class.mat-badge-before]": "!isAfter()",
        "[class.mat-badge-after]": "isAfter()",
        "[class.mat-badge-small]": 'size === "small"',
        "[class.mat-badge-medium]": 'size === "medium"',
        "[class.mat-badge-large]": 'size === "large"',
        "[class.mat-badge-hidden]": "hidden || !content",
        "[class.mat-badge-disabled]": "disabled"
      },
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: ElementRef
  }, {
    type: AriaDescriber
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    color: [{
      type: Input,
      args: ["matBadgeColor"]
    }],
    overlap: [{
      type: Input,
      args: [{
        alias: "matBadgeOverlap",
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "matBadgeDisabled",
        transform: booleanAttribute
      }]
    }],
    position: [{
      type: Input,
      args: ["matBadgePosition"]
    }],
    content: [{
      type: Input,
      args: ["matBadge"]
    }],
    description: [{
      type: Input,
      args: ["matBadgeDescription"]
    }],
    size: [{
      type: Input,
      args: ["matBadgeSize"]
    }],
    hidden: [{
      type: Input,
      args: [{
        alias: "matBadgeHidden",
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatBadgeModule = class _MatBadgeModule {
  static {
    this.\u0275fac = function MatBadgeModule_Factory(t) {
      return new (t || _MatBadgeModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatBadgeModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [A11yModule, MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatBadgeModule, [{
    type: NgModule,
    args: [{
      // Note: we _shouldn't_ have to import `_MatBadgeStyleLoader`,
      // but it seems to be necessary for tests.
      imports: [A11yModule, MatCommonModule, MatBadge, _MatBadgeStyleLoader],
      exports: [MatBadge, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/features/snmp/models/asset.model.ts
var AssetType;
(function(AssetType2) {
  AssetType2["SERVER"] = "SERVER";
  AssetType2["PC"] = "PC";
  AssetType2["SWITCH"] = "SWITCH";
  AssetType2["ROUTER"] = "ROUTER";
  AssetType2["PRINTER"] = "PRINTER";
  AssetType2["FIREWALL"] = "FIREWALL";
  AssetType2["OTHER"] = "OTHER";
})(AssetType || (AssetType = {}));
var SnmpVersion;
(function(SnmpVersion2) {
  SnmpVersion2["V1"] = "V1";
  SnmpVersion2["V2C"] = "V2C";
  SnmpVersion2["V3"] = "V3";
})(SnmpVersion || (SnmpVersion = {}));

// src/app/features/snmp/services/snmp.service.ts
var SnmpService = class _SnmpService {
  constructor(http) {
    this.http = http;
    this.baseUrl = `${environment.apiUrl}/api/snmp`;
  }
  // ===== ASSETS =====
  /**
   * Récupère tous les assets
   */
  getAllAssets() {
    return this.http.get(`${this.baseUrl}/assets`);
  }
  /**
   * Récupère un asset par son ID
   */
  getAssetById(id) {
    return this.http.get(`${this.baseUrl}/assets/${id}`);
  }
  /**
   * Récupère les assets actifs
   */
  getActiveAssets() {
    return this.http.get(`${this.baseUrl}/assets/active`);
  }
  /**
   * Récupère les assets par type
   */
  getAssetsByType(type) {
    return this.http.get(`${this.baseUrl}/assets/type/${type}`);
  }
  /**
   * Crée un nouvel asset
   */
  createAsset(asset) {
    return this.http.post(`${this.baseUrl}/assets`, asset);
  }
  /**
   * Met à jour un asset existant
   */
  updateAsset(id, asset) {
    return this.http.put(`${this.baseUrl}/assets/${id}`, asset);
  }
  /**
   * Supprime un asset
   */
  deleteAsset(id) {
    return this.http.delete(`${this.baseUrl}/assets/${id}`);
  }
  /**
   * Active/désactive un asset
   */
  toggleAssetStatus(id) {
    return this.http.patch(`${this.baseUrl}/assets/${id}/toggle-status`, {});
  }
  /**
   * Récupère les statistiques des assets par type
   */
  getAssetStatistics() {
    return this.http.get(`${this.baseUrl}/assets/statistics/by-type`);
  }
  // ===== CONFIGURATIONS =====
  /**
   * Récupère toutes les configurations
   */
  getAllConfigs() {
    return this.http.get(`${this.baseUrl}/configs`);
  }
  /**
   * Récupère une configuration par son ID
   */
  getConfigById(id) {
    return this.http.get(`${this.baseUrl}/configs/${id}`);
  }
  /**
   * Récupère les configurations actives
   */
  getActiveConfigs() {
    return this.http.get(`${this.baseUrl}/configs/active`);
  }
  /**
   * Récupère les configurations par asset
   */
  getConfigsByAsset(assetId) {
    return this.http.get(`${this.baseUrl}/configs/asset/${assetId}`);
  }
  /**
   * Crée une nouvelle configuration
   */
  createConfig(config) {
    return this.http.post(`${this.baseUrl}/configs`, config);
  }
  /**
   * Met à jour une configuration existante
   */
  updateConfig(id, config) {
    return this.http.put(`${this.baseUrl}/configs/${id}`, config);
  }
  /**
   * Supprime une configuration
   */
  deleteConfig(id) {
    return this.http.delete(`${this.baseUrl}/configs/${id}`);
  }
  /**
   * Lance un scan manuel
   */
  runManualScan(configId) {
    return this.http.post(`${this.baseUrl}/configs/${configId}/run`, {});
  }
  /**
   * Active/désactive une configuration
   */
  toggleConfigStatus(id) {
    return this.http.patch(`${this.baseUrl}/configs/${id}/toggle-status`, {});
  }
  // ===== RÉSULTATS =====
  /**
   * Récupère tous les résultats avec pagination
   */
  getAllResults(page = 0, size = 20) {
    const params = new HttpParams().set("page", page.toString()).set("size", size.toString());
    return this.http.get(`${this.baseUrl}/results`, { params });
  }
  /**
   * Récupère un résultat par son ID
   */
  getResultById(id) {
    return this.http.get(`${this.baseUrl}/results/${id}`);
  }
  /**
   * Récupère les résultats par asset
   */
  getResultsByAsset(assetId, page = 0, size = 20) {
    const params = new HttpParams().set("page", page.toString()).set("size", size.toString());
    return this.http.get(`${this.baseUrl}/results/asset/${assetId}`, { params });
  }
  /**
   * Récupère les résultats par configuration
   */
  getResultsByConfig(configId, page = 0, size = 20) {
    const params = new HttpParams().set("page", page.toString()).set("size", size.toString());
    return this.http.get(`${this.baseUrl}/results/config/${configId}`, { params });
  }
  /**
   * Récupère les résultats par statut
   */
  getResultsByStatus(status, page = 0, size = 20) {
    const params = new HttpParams().set("page", page.toString()).set("size", size.toString());
    return this.http.get(`${this.baseUrl}/results/status/${status}`, { params });
  }
  /**
   * Récupère le dernier résultat pour un asset
   */
  getLatestResultByAsset(assetId) {
    return this.http.get(`${this.baseUrl}/results/latest/asset/${assetId}`);
  }
  /**
   * Récupère le dernier résultat pour une configuration
   */
  getLatestResultByConfig(configId) {
    return this.http.get(`${this.baseUrl}/results/latest/config/${configId}`);
  }
  /**
   * Récupère le taux de succès des scans
   */
  getSuccessRate() {
    return this.http.get(`${this.baseUrl}/results/statistics/success-rate`);
  }
  /**
   * Récupère les statistiques par statut
   */
  getResultStatistics() {
    return this.http.get(`${this.baseUrl}/results/statistics/by-status`);
  }
  /**
   * Test de connexion SNMP
   */
  testConnection(assetData) {
    return this.http.post(`${this.baseUrl}/assets/test-connection`, assetData);
  }
  static {
    this.\u0275fac = function SnmpService_Factory(t) {
      return new (t || _SnmpService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SnmpService, factory: _SnmpService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/snmp/components/asset-list/asset-list.component.ts
function AssetListComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement des assets...");
    \u0275\u0275elementEnd()();
  }
}
function AssetListComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-icon");
    \u0275\u0275text(2, "devices_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucun asset configur\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Commencez par ajouter votre premier asset SNMP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 2);
    \u0275\u0275listener("click", function AssetListComponent_div_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createAsset());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Ajouter un asset ");
    \u0275\u0275elementEnd()();
  }
}
function AssetListComponent_div_15_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Hostname");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_15_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const asset_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", asset_r3.hostname || "-", " ");
  }
}
function AssetListComponent_div_15_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Adresse IP");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_15_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const asset_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", asset_r4.ipAddress || "-", " ");
  }
}
function AssetListComponent_div_15_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Type");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_15_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21)(1, "mat-chip", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const asset_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("color", "primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getAssetTypeLabel(asset_r5.type), " ");
  }
}
function AssetListComponent_div_15_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Version SNMP");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_15_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21)(1, "mat-chip", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const asset_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", asset_r6.snmpVersion === "V3" ? "accent" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", asset_r6.snmpVersion, " ");
  }
}
function AssetListComponent_div_15_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_15_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21)(1, "mat-chip", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const asset_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", asset_r7.active ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", asset_r7.active ? "Actif" : "Inactif", " ");
  }
}
function AssetListComponent_div_15_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_15_td_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 21)(1, "button", 23);
    \u0275\u0275listener("click", function AssetListComponent_div_15_td_19_Template_button_click_1_listener() {
      const asset_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleAssetStatus(asset_r9));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 24);
    \u0275\u0275listener("click", function AssetListComponent_div_15_td_19_Template_button_click_4_listener() {
      const asset_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editAsset(asset_r9));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 25);
    \u0275\u0275listener("click", function AssetListComponent_div_15_td_19_Template_button_click_7_listener() {
      const asset_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteAsset(asset_r9));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const asset_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", asset_r9.active ? "warn" : "primary")("matTooltip", asset_r9.active ? "D\xE9sactiver" : "Activer");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(asset_r9.active ? "pause" : "play_arrow");
  }
}
function AssetListComponent_div_15_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 26);
  }
}
function AssetListComponent_div_15_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 27);
  }
}
function AssetListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "table", 9);
    \u0275\u0275elementContainerStart(2, 10);
    \u0275\u0275template(3, AssetListComponent_div_15_th_3_Template, 2, 0, "th", 11)(4, AssetListComponent_div_15_td_4_Template, 2, 1, "td", 12);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 13);
    \u0275\u0275template(6, AssetListComponent_div_15_th_6_Template, 2, 0, "th", 11)(7, AssetListComponent_div_15_td_7_Template, 2, 1, "td", 12);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 14);
    \u0275\u0275template(9, AssetListComponent_div_15_th_9_Template, 2, 0, "th", 11)(10, AssetListComponent_div_15_td_10_Template, 3, 2, "td", 12);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 15);
    \u0275\u0275template(12, AssetListComponent_div_15_th_12_Template, 2, 0, "th", 11)(13, AssetListComponent_div_15_td_13_Template, 3, 2, "td", 12);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 16);
    \u0275\u0275template(15, AssetListComponent_div_15_th_15_Template, 2, 0, "th", 11)(16, AssetListComponent_div_15_td_16_Template, 3, 2, "td", 12);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 17);
    \u0275\u0275template(18, AssetListComponent_div_15_th_18_Template, 2, 0, "th", 11)(19, AssetListComponent_div_15_td_19_Template, 10, 3, "td", 12);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(20, AssetListComponent_div_15_tr_20_Template, 1, 0, "tr", 18)(21, AssetListComponent_div_15_tr_21_Template, 1, 0, "tr", 19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.assets);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
var AssetListComponent = class _AssetListComponent {
  constructor(snmpService, router, snackBar) {
    this.snmpService = snmpService;
    this.router = router;
    this.snackBar = snackBar;
    this.assets = [];
    this.loading = false;
    this.displayedColumns = ["hostname", "ipAddress", "type", "snmpVersion", "active", "actions"];
  }
  ngOnInit() {
    this.loadAssets();
  }
  loadAssets() {
    this.loading = true;
    this.snmpService.getAllAssets().subscribe({
      next: (assets) => {
        this.assets = assets;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des assets:", error);
        this.snackBar.open("Erreur lors du chargement des assets", "Fermer", {
          duration: 3e3
        });
        this.loading = false;
      }
    });
  }
  createAsset() {
    this.router.navigate(["/snmp/assets/new"]);
  }
  editAsset(asset) {
    this.router.navigate(["/snmp/assets/edit", asset.id]);
  }
  toggleAssetStatus(asset) {
    if (!asset.id)
      return;
    this.snmpService.toggleAssetStatus(asset.id).subscribe({
      next: (updatedAsset) => {
        const index = this.assets.findIndex((a) => a.id === updatedAsset.id);
        if (index !== -1) {
          this.assets[index] = updatedAsset;
        }
        this.snackBar.open(`Asset ${updatedAsset.active ? "activ\xE9" : "d\xE9sactiv\xE9"}`, "Fermer", { duration: 3e3 });
      },
      error: (error) => {
        console.error("Erreur lors du changement de statut:", error);
        this.snackBar.open("Erreur lors du changement de statut", "Fermer", {
          duration: 3e3
        });
      }
    });
  }
  deleteAsset(asset) {
    if (!asset.id)
      return;
    if (confirm(`\xCAtes-vous s\xFBr de vouloir supprimer l'asset ${asset.hostname || asset.ipAddress} ?`)) {
      this.snmpService.deleteAsset(asset.id).subscribe({
        next: () => {
          this.assets = this.assets.filter((a) => a.id !== asset.id);
          this.snackBar.open("Asset supprim\xE9 avec succ\xE8s", "Fermer", {
            duration: 3e3
          });
        },
        error: (error) => {
          console.error("Erreur lors de la suppression:", error);
          this.snackBar.open("Erreur lors de la suppression", "Fermer", {
            duration: 3e3
          });
        }
      });
    }
  }
  getAssetTypeLabel(type) {
    const labels = {
      [AssetType.SERVER]: "Serveur",
      [AssetType.PC]: "PC",
      [AssetType.SWITCH]: "Switch",
      [AssetType.ROUTER]: "Routeur",
      [AssetType.PRINTER]: "Imprimante",
      [AssetType.FIREWALL]: "Firewall",
      [AssetType.OTHER]: "Autre"
    };
    return labels[type] || type;
  }
  static {
    this.\u0275fac = function AssetListComponent_Factory(t) {
      return new (t || _AssetListComponent)(\u0275\u0275directiveInject(SnmpService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssetListComponent, selectors: [["app-asset-list"]], decls: 16, vars: 3, consts: [[1, "asset-list-container"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["class", "loading-container", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], [1, "loading-container"], [1, "empty-state"], [1, "table-container"], ["mat-table", "", 1, "assets-table", 3, "dataSource"], ["matColumnDef", "hostname"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "ipAddress"], ["matColumnDef", "type"], ["matColumnDef", "snmpVersion"], ["matColumnDef", "active"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["selected", "", 3, "color"], ["mat-icon-button", "", 3, "click", "color", "matTooltip"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Modifier", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Supprimer", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function AssetListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
        \u0275\u0275text(5, "devices");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Assets SNMP ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 1)(8, "button", 2);
        \u0275\u0275listener("click", function AssetListComponent_Template_button_click_8_listener() {
          return ctx.createAsset();
        });
        \u0275\u0275elementStart(9, "mat-icon");
        \u0275\u0275text(10, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Nouvel Asset ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "mat-card-content");
        \u0275\u0275template(13, AssetListComponent_div_13_Template, 4, 0, "div", 3)(14, AssetListComponent_div_14_Template, 11, 0, "div", 4)(15, AssetListComponent_div_15_Template, 22, 3, "div", 5);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.assets.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.assets.length > 0);
      }
    }, dependencies: [NgIf, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButton, MatIconButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatChip, MatProgressSpinner, MatTooltip] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssetListComponent, { className: "AssetListComponent" });
})();

// src/app/features/snmp/components/asset-form/asset-form.component.ts
function AssetFormComponent_mat_option_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r1 = ctx.$implicit;
    \u0275\u0275property("value", type_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r1, " ");
  }
}
function AssetFormComponent_mat_option_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const version_r2 = ctx.$implicit;
    \u0275\u0275property("value", version_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", version_r2, " ");
  }
}
function AssetFormComponent_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 4)(2, "mat-form-field", 5)(3, "mat-label");
    \u0275\u0275text(4, "Community String");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 27);
    \u0275\u0275elementStart(6, "mat-icon", 28);
    \u0275\u0275text(7, "security");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-error");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.getErrorMessage("community"));
  }
}
function AssetFormComponent_div_62_mat_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const protocol_r5 = ctx.$implicit;
    \u0275\u0275property("value", protocol_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", protocol_r5, " ");
  }
}
function AssetFormComponent_div_62_mat_form_field_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 8)(1, "mat-label");
    \u0275\u0275text(2, "Mot de passe d'authentification");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 35);
    \u0275\u0275elementStart(4, "mat-icon", 28);
    \u0275\u0275text(5, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-error");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getErrorMessage("authPassword"));
  }
}
function AssetFormComponent_div_62_mat_option_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const protocol_r6 = ctx.$implicit;
    \u0275\u0275property("value", protocol_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", protocol_r6, " ");
  }
}
function AssetFormComponent_div_62_mat_form_field_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 8)(1, "mat-label");
    \u0275\u0275text(2, "Mot de passe de chiffrement");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 36);
    \u0275\u0275elementStart(4, "mat-icon", 28);
    \u0275\u0275text(5, "enhanced_encryption");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-error");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getErrorMessage("privPassword"));
  }
}
function AssetFormComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 4)(2, "mat-form-field", 5)(3, "mat-label");
    \u0275\u0275text(4, "Nom d'utilisateur SNMP v3");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 30);
    \u0275\u0275elementStart(6, "mat-icon", 28);
    \u0275\u0275text(7, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-error");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 4)(11, "mat-form-field", 8)(12, "mat-label");
    \u0275\u0275text(13, "Protocole d'authentification");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-select", 31);
    \u0275\u0275listener("selectionChange", function AssetFormComponent_div_62_Template_mat_select_selectionChange_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onAuthProtocolChange());
    });
    \u0275\u0275elementStart(15, "mat-option", 32);
    \u0275\u0275text(16, "Aucun");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, AssetFormComponent_div_62_mat_option_17_Template, 2, 2, "mat-option", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-error");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, AssetFormComponent_div_62_mat_form_field_20_Template, 8, 1, "mat-form-field", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 4)(22, "mat-form-field", 8)(23, "mat-label");
    \u0275\u0275text(24, "Protocole de chiffrement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "mat-select", 34);
    \u0275\u0275listener("selectionChange", function AssetFormComponent_div_62_Template_mat_select_selectionChange_25_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPrivProtocolChange());
    });
    \u0275\u0275elementStart(26, "mat-option", 32);
    \u0275\u0275text(27, "Aucun");
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, AssetFormComponent_div_62_mat_option_28_Template, 2, 2, "mat-option", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "mat-error");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(31, AssetFormComponent_div_62_mat_form_field_31_Template, 8, 1, "mat-form-field", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_7_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.getErrorMessage("username"));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r2.authProtocols);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getErrorMessage("authProtocol"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r2.assetForm.get("authProtocol")) == null ? null : tmp_4_0.value);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r2.privProtocols);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getErrorMessage("privProtocol"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_7_0 = ctx_r2.assetForm.get("privProtocol")) == null ? null : tmp_7_0.value);
  }
}
function AssetFormComponent_mat_error_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error", 37);
    \u0275\u0275text(1, " Au moins un hostname ou une adresse IP doit \xEAtre sp\xE9cifi\xE9 ");
    \u0275\u0275elementEnd();
  }
}
function AssetFormComponent_mat_icon_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "wifi_tethering");
    \u0275\u0275elementEnd();
  }
}
function AssetFormComponent_mat_spinner_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 38);
  }
}
function AssetFormComponent_mat_icon_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.isEditMode ? "save" : "add");
  }
}
function AssetFormComponent_mat_spinner_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 38);
  }
}
var AssetFormComponent = class _AssetFormComponent {
  constructor(fb, snmpService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.snmpService = snmpService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isEditMode = false;
    this.isLoading = false;
    this.isTestingConnection = false;
    this.assetTypes = Object.values(AssetType);
    this.snmpVersions = Object.values(SnmpVersion);
    this.authProtocols = ["MD5", "SHA", "SHA224", "SHA256", "SHA384", "SHA512"];
    this.privProtocols = ["DES", "3DES", "AES128", "AES192", "AES256"];
    this.isEditMode = !!data?.asset;
    this.createForm();
  }
  ngOnInit() {
    if (this.isEditMode && this.data.asset) {
      this.populateForm(this.data.asset);
    }
    this.assetForm.get("snmpVersion")?.valueChanges.subscribe((version) => {
      this.updateValidatorsForSnmpVersion(version);
    });
  }
  createForm() {
    this.assetForm = this.fb.group({
      hostname: ["", [this.hostnameValidator]],
      ipAddress: ["", [this.ipAddressValidator]],
      type: ["", [Validators.required]],
      snmpVersion: ["", [Validators.required]],
      port: [161, [Validators.required, Validators.min(1), Validators.max(65535)]],
      // SNMP v1/v2c
      community: [""],
      // SNMP v3
      username: [""],
      authProtocol: [""],
      authPassword: [""],
      privProtocol: [""],
      privPassword: [""],
      description: ["", [Validators.maxLength(500)]],
      active: [true]
    }, { validators: [this.hostnameOrIpValidator] });
  }
  populateForm(asset) {
    this.assetForm.patchValue({
      hostname: asset.hostname,
      ipAddress: asset.ipAddress,
      type: asset.type,
      snmpVersion: asset.snmpVersion,
      port: asset.port,
      community: asset.community,
      username: asset.username,
      authProtocol: asset.authProtocol,
      authPassword: asset.authPassword,
      privProtocol: asset.privProtocol,
      privPassword: asset.privPassword,
      active: asset.active
    });
  }
  updateValidatorsForSnmpVersion(version) {
    const communityControl = this.assetForm.get("community");
    const snmpV3UserControl = this.assetForm.get("snmpV3User");
    const authProtocolControl = this.assetForm.get("authProtocol");
    const authPassControl = this.assetForm.get("authPass");
    const privProtocolControl = this.assetForm.get("privProtocol");
    const privPassControl = this.assetForm.get("privPass");
    communityControl?.clearValidators();
    snmpV3UserControl?.clearValidators();
    authProtocolControl?.clearValidators();
    authPassControl?.clearValidators();
    privProtocolControl?.clearValidators();
    privPassControl?.clearValidators();
    if (version === SnmpVersion.V1 || version === SnmpVersion.V2C) {
      communityControl?.setValidators([Validators.required, Validators.maxLength(100)]);
    } else if (version === SnmpVersion.V3) {
      snmpV3UserControl?.setValidators([Validators.required, Validators.maxLength(50)]);
      if (this.assetForm.get("authProtocol")?.value) {
        authPassControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
      }
      if (this.assetForm.get("privProtocol")?.value) {
        privPassControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
      }
    }
    communityControl?.updateValueAndValidity();
    snmpV3UserControl?.updateValueAndValidity();
    authProtocolControl?.updateValueAndValidity();
    authPassControl?.updateValueAndValidity();
    privProtocolControl?.updateValueAndValidity();
    privPassControl?.updateValueAndValidity();
  }
  // Validateurs personnalisés
  hostnameValidator(control) {
    if (!control.value)
      return null;
    const hostnameRegex = /^[a-zA-Z0-9.-]+$/;
    if (!hostnameRegex.test(control.value)) {
      return { "invalidHostname": true };
    }
    if (control.value.length > 255) {
      return { "maxlength": true };
    }
    return null;
  }
  ipAddressValidator(control) {
    if (!control.value)
      return null;
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(control.value)) {
      return { "invalidIpAddress": true };
    }
    return null;
  }
  hostnameOrIpValidator(form) {
    const hostname = form.get("hostname")?.value;
    const ipAddress = form.get("ipAddress")?.value;
    if (!hostname && !ipAddress) {
      return { "hostnameOrIpRequired": true };
    }
    return null;
  }
  onAuthProtocolChange() {
    const authProtocol = this.assetForm.get("authProtocol")?.value;
    const authPassControl = this.assetForm.get("authPass");
    if (authProtocol) {
      authPassControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
    } else {
      authPassControl?.clearValidators();
      authPassControl?.setValue("");
    }
    authPassControl?.updateValueAndValidity();
  }
  onPrivProtocolChange() {
    const privProtocol = this.assetForm.get("privProtocol")?.value;
    const privPassControl = this.assetForm.get("privPass");
    if (privProtocol) {
      privPassControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
    } else {
      privPassControl?.clearValidators();
      privPassControl?.setValue("");
    }
    privPassControl?.updateValueAndValidity();
  }
  testConnection() {
    return __async(this, null, function* () {
      if (this.assetForm.invalid) {
        this.snackBar.open("Veuillez corriger les erreurs du formulaire avant de tester la connexion", "Fermer", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
        return;
      }
      this.isTestingConnection = true;
      try {
        const assetData = this.assetForm.value;
        const testResult = yield this.snmpService.testConnection(assetData).toPromise();
        if (testResult?.success) {
          this.snackBar.open("\u2705 Connexion SNMP r\xE9ussie !", "Fermer", {
            duration: 3e3,
            panelClass: ["success-snackbar"]
          });
        } else {
          this.snackBar.open(`\u274C \xC9chec de la connexion : ${testResult?.error || "Erreur inconnue"}`, "Fermer", {
            duration: 5e3,
            panelClass: ["error-snackbar"]
          });
        }
      } catch (error) {
        this.snackBar.open("\u274C Erreur lors du test de connexion", "Fermer", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
      } finally {
        this.isTestingConnection = false;
      }
    });
  }
  onSubmit() {
    if (this.assetForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    this.isLoading = true;
    const assetData = this.assetForm.value;
    const operation = this.isEditMode ? this.snmpService.updateAsset(this.data.asset.id, assetData) : this.snmpService.createAsset(assetData);
    operation.subscribe({
      next: (asset) => {
        const message = this.isEditMode ? "Asset mis \xE0 jour avec succ\xE8s" : "Asset cr\xE9\xE9 avec succ\xE8s";
        this.snackBar.open(message, "Fermer", {
          duration: 3e3,
          panelClass: ["success-snackbar"]
        });
        this.dialogRef.close(asset);
      },
      error: (error) => {
        console.error("Erreur lors de la sauvegarde:", error);
        this.snackBar.open("Erreur lors de la sauvegarde de l'asset", "Fermer", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
        this.isLoading = false;
      }
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
  markFormGroupTouched() {
    Object.keys(this.assetForm.controls).forEach((key) => {
      const control = this.assetForm.get(key);
      control?.markAsTouched();
    });
  }
  getErrorMessage(fieldName) {
    const control = this.assetForm.get(fieldName);
    if (!control || !control.errors || !control.touched)
      return "";
    const errors = control.errors;
    if (errors["required"])
      return `${this.getFieldDisplayName(fieldName)} est obligatoire`;
    if (errors["minlength"])
      return `${this.getFieldDisplayName(fieldName)} doit contenir au moins ${errors["minlength"].requiredLength} caract\xE8res`;
    if (errors["maxlength"])
      return `${this.getFieldDisplayName(fieldName)} ne peut pas d\xE9passer ${errors["maxlength"].requiredLength} caract\xE8res`;
    if (errors["min"])
      return `${this.getFieldDisplayName(fieldName)} doit \xEAtre sup\xE9rieur \xE0 ${errors["min"].min}`;
    if (errors["max"])
      return `${this.getFieldDisplayName(fieldName)} doit \xEAtre inf\xE9rieur \xE0 ${errors["max"].max}`;
    if (errors["invalidHostname"])
      return "Le hostname ne peut contenir que des lettres, chiffres, points et tirets";
    if (errors["invalidIpAddress"])
      return "L'adresse IP doit \xEAtre au format IPv4 valide";
    if (errors["hostnameOrIpRequired"])
      return "Au moins un hostname ou une adresse IP doit \xEAtre sp\xE9cifi\xE9";
    return "Champ invalide";
  }
  getFieldDisplayName(fieldName) {
    const displayNames = {
      "hostname": "Hostname",
      "ipAddress": "Adresse IP",
      "type": "Type d'asset",
      "snmpVersion": "Version SNMP",
      "port": "Port",
      "community": "Community",
      "snmpV3User": "Utilisateur SNMP v3",
      "authProtocol": "Protocole d'authentification",
      "authPass": "Mot de passe d'authentification",
      "privProtocol": "Protocole de chiffrement",
      "privPass": "Mot de passe de chiffrement",
      "description": "Description"
    };
    return displayNames[fieldName] || fieldName;
  }
  get isSnmpV3() {
    return this.assetForm.get("snmpVersion")?.value === SnmpVersion.V3;
  }
  get isSnmpV1OrV2C() {
    const version = this.assetForm.get("snmpVersion")?.value;
    return version === SnmpVersion.V1 || version === SnmpVersion.V2C;
  }
  static {
    this.\u0275fac = function AssetFormComponent_Factory(t) {
      return new (t || _AssetFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(SnmpService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssetFormComponent, selectors: [["app-asset-form"]], decls: 76, vars: 22, consts: [[1, "asset-form-container"], ["mat-dialog-title", ""], [1, "asset-form", 3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "form-row"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "hostname", "placeholder", "server01.example.com"], ["matInput", "", "formControlName", "ipAddress", "placeholder", "192.168.1.100"], ["appearance", "outline", 1, "half-width"], ["formControlName", "type"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "type", "number", "formControlName", "port", "placeholder", "161"], ["matInput", "", "formControlName", "description", "rows", "3", "placeholder", "Description de l'asset..."], ["formControlName", "active"], ["formControlName", "snmpVersion"], ["class", "snmp-v2c-config", 4, "ngIf"], ["class", "snmp-v3-config", 4, "ngIf"], ["class", "global-error", 4, "ngIf"], ["align", "end", 1, "dialog-actions"], ["mat-stroked-button", "", "type", "button", 1, "test-button", 3, "click", "disabled"], [4, "ngIf"], ["diameter", "20", 4, "ngIf"], [1, "spacer"], ["mat-button", "", "type", "button", 3, "click", "disabled"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [3, "value"], [1, "snmp-v2c-config"], ["matInput", "", "formControlName", "community", "placeholder", "public"], ["matSuffix", ""], [1, "snmp-v3-config"], ["matInput", "", "formControlName", "username", "placeholder", "admin"], ["formControlName", "authProtocol", 3, "selectionChange"], ["value", ""], ["appearance", "outline", "class", "half-width", 4, "ngIf"], ["formControlName", "privProtocol", 3, "selectionChange"], ["matInput", "", "type", "password", "formControlName", "authPassword", "placeholder", "Mot de passe (min. 8 caract\xE8res)"], ["matInput", "", "type", "password", "formControlName", "privPassword", "placeholder", "Mot de passe (min. 8 caract\xE8res)"], [1, "global-error"], ["diameter", "20"]], template: function AssetFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "form", 2);
        \u0275\u0275listener("ngSubmit", function AssetFormComponent_Template_form_ngSubmit_3_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(4, "mat-dialog-content")(5, "mat-card", 3)(6, "mat-card-header")(7, "mat-card-title");
        \u0275\u0275text(8, "Identification");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "mat-card-content")(10, "div", 4)(11, "mat-form-field", 5)(12, "mat-label");
        \u0275\u0275text(13, "Hostname");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "input", 6);
        \u0275\u0275elementStart(15, "mat-error");
        \u0275\u0275text(16);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 4)(18, "mat-form-field", 5)(19, "mat-label");
        \u0275\u0275text(20, "Adresse IP");
        \u0275\u0275elementEnd();
        \u0275\u0275element(21, "input", 7);
        \u0275\u0275elementStart(22, "mat-error");
        \u0275\u0275text(23);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(24, "div", 4)(25, "mat-form-field", 8)(26, "mat-label");
        \u0275\u0275text(27, "Type d'Asset");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "mat-select", 9);
        \u0275\u0275template(29, AssetFormComponent_mat_option_29_Template, 2, 2, "mat-option", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "mat-error");
        \u0275\u0275text(31);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "mat-form-field", 8)(33, "mat-label");
        \u0275\u0275text(34, "Port SNMP");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 11);
        \u0275\u0275elementStart(36, "mat-error");
        \u0275\u0275text(37);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(38, "div", 4)(39, "mat-form-field", 5)(40, "mat-label");
        \u0275\u0275text(41, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275element(42, "textarea", 12);
        \u0275\u0275elementStart(43, "mat-error");
        \u0275\u0275text(44);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(45, "div", 4)(46, "mat-checkbox", 13);
        \u0275\u0275text(47, "Asset actif");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(48, "mat-card", 3)(49, "mat-card-header")(50, "mat-card-title");
        \u0275\u0275text(51, "Configuration SNMP");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "mat-card-content")(53, "div", 4)(54, "mat-form-field", 5)(55, "mat-label");
        \u0275\u0275text(56, "Version SNMP");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "mat-select", 14);
        \u0275\u0275template(58, AssetFormComponent_mat_option_58_Template, 2, 2, "mat-option", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "mat-error");
        \u0275\u0275text(60);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(61, AssetFormComponent_div_61_Template, 10, 1, "div", 15)(62, AssetFormComponent_div_62_Template, 32, 7, "div", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(63, AssetFormComponent_mat_error_63_Template, 2, 0, "mat-error", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "mat-dialog-actions", 18)(65, "button", 19);
        \u0275\u0275listener("click", function AssetFormComponent_Template_button_click_65_listener() {
          return ctx.testConnection();
        });
        \u0275\u0275template(66, AssetFormComponent_mat_icon_66_Template, 2, 0, "mat-icon", 20)(67, AssetFormComponent_mat_spinner_67_Template, 1, 0, "mat-spinner", 21);
        \u0275\u0275text(68);
        \u0275\u0275elementEnd();
        \u0275\u0275element(69, "div", 22);
        \u0275\u0275elementStart(70, "button", 23);
        \u0275\u0275listener("click", function AssetFormComponent_Template_button_click_70_listener() {
          return ctx.onCancel();
        });
        \u0275\u0275text(71, " Annuler ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "button", 24);
        \u0275\u0275template(73, AssetFormComponent_mat_icon_73_Template, 2, 1, "mat-icon", 20)(74, AssetFormComponent_mat_spinner_74_Template, 1, 0, "mat-spinner", 21);
        \u0275\u0275text(75);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Modifier l'Asset SNMP" : "Nouvel Asset SNMP", " ");
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.assetForm);
        \u0275\u0275advance(13);
        \u0275\u0275textInterpolate(ctx.getErrorMessage("hostname"));
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.getErrorMessage("ipAddress"));
        \u0275\u0275advance(6);
        \u0275\u0275property("ngForOf", ctx.assetTypes);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.getErrorMessage("type"));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.getErrorMessage("port"));
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.getErrorMessage("description"));
        \u0275\u0275advance(14);
        \u0275\u0275property("ngForOf", ctx.snmpVersions);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.getErrorMessage("snmpVersion"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isSnmpV1OrV2C);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isSnmpV3);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (ctx.assetForm.errors == null ? null : ctx.assetForm.errors["hostnameOrIpRequired"]) && ctx.assetForm.touched);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.assetForm.invalid || ctx.isTestingConnection || ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isTestingConnection);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isTestingConnection);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isTestingConnection ? "Test en cours..." : "Tester la connexion", " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.assetForm.invalid || ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isLoading ? "Sauvegarde..." : ctx.isEditMode ? "Mettre \xE0 jour" : "Cr\xE9er", " ");
      }
    }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatFormField, MatLabel, MatError, MatSuffix, MatInput, MatSelect, MatOption, MatCheckbox, MatProgressSpinner, MatDialogTitle, MatDialogActions, MatDialogContent], styles: ["\n\n.asset-form-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n}\n.asset-form-container[_ngcontent-%COMP%]   .asset-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  color: #1976d2;\n  font-weight: 500;\n  font-size: 1.1rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  align-items: flex-start;\n}\n.asset-form-container[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.asset-form-container[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.asset-form-container[_ngcontent-%COMP%]   .half-width[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.asset-form-container[_ngcontent-%COMP%]   .snmp-v2c-config[_ngcontent-%COMP%], .asset-form-container[_ngcontent-%COMP%]   .snmp-v3-config[_ngcontent-%COMP%] {\n  border-left: 3px solid #4caf50;\n  padding-left: 1rem;\n  margin-top: 1rem;\n  background-color: #f8f9fa;\n  border-radius: 4px;\n  padding: 1rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   .snmp-v3-config[_ngcontent-%COMP%] {\n  border-left-color: #ff9800;\n}\n.asset-form-container[_ngcontent-%COMP%]   .global-error[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n  padding: 0.75rem;\n  border-radius: 4px;\n  border-left: 4px solid #f44336;\n  margin: 1rem 0;\n  font-size: 0.875rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e0e0e0;\n  margin-top: 1rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   .test-button[_ngcontent-%COMP%] {\n  color: #4caf50;\n  border-color: #4caf50;\n}\n.asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   .test-button[_ngcontent-%COMP%]:hover:not([disabled]) {\n  background-color: rgba(76, 175, 80, 0.04);\n}\n.asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   .test-button[disabled][_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-child {\n  margin-left: 0;\n}\n@media (max-width: 768px) {\n  .asset-form-container[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .asset-form-container[_ngcontent-%COMP%]   .half-width[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   .test-button[_ngcontent-%COMP%] {\n    order: 3;\n    width: 100%;\n  }\n  .asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .asset-form-container[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    margin: 0;\n    width: 100%;\n  }\n}\n.asset-form-container[_ngcontent-%COMP%]   .snmp-v2c-config[_ngcontent-%COMP%], .asset-form-container[_ngcontent-%COMP%]   .snmp-v3-config[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.asset-form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   mat-icon[matSuffix][_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 1.2rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]   .mat-checkbox-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.asset-form-container[_ngcontent-%COMP%]   mat-select[_ngcontent-%COMP%]   .mat-select-trigger[_ngcontent-%COMP%] {\n  min-height: 1.5rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.asset-form-container[_ngcontent-%COMP%]   mat-form-field.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-outline-thick[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.asset-form-container[_ngcontent-%COMP%]   mat-error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.asset-form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus, .asset-form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:focus-within {\n  outline: 2px solid #1976d2;\n  outline-offset: 2px;\n}\n.asset-form-container[_ngcontent-%COMP%]   .loading-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(255, 255, 255, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n  .success-snackbar {\n  background-color: #4caf50 !important;\n  color: white !important;\n}\n  .error-snackbar {\n  background-color: #f44336 !important;\n  color: white !important;\n}\n/*# sourceMappingURL=asset-form.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssetFormComponent, { className: "AssetFormComponent" });
})();

// src/app/features/snmp/components/config-list/config-list.component.ts
function ConfigListComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement des configurations...");
    \u0275\u0275elementEnd()();
  }
}
function ConfigListComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-icon");
    \u0275\u0275text(2, "settings_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucune configuration trouv\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Commencez par cr\xE9er votre premi\xE8re configuration de scan SNMP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 2)(8, "mat-icon");
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Cr\xE9er une configuration ");
    \u0275\u0275elementEnd()();
  }
}
function ConfigListComponent_div_15_mat_card_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 10)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-subtitle");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-content")(7, "p")(8, "strong");
    \u0275\u0275text(9, "OIDs:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p")(12, "strong");
    \u0275\u0275text(13, "Statut:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-chip", 11);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "mat-card-actions")(17, "button", 12)(18, "mat-icon");
    \u0275\u0275text(19, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Modifier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 13)(22, "mat-icon");
    \u0275\u0275text(23, "play_arrow");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Lancer ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const config_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(config_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Asset: ", (config_r1.asset == null ? null : config_r1.asset.hostname) || (config_r1.asset == null ? null : config_r1.asset.ipAddress), "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (config_r1.oids == null ? null : config_r1.oids.length) || 0, " configur\xE9s");
    \u0275\u0275advance(4);
    \u0275\u0275property("color", config_r1.active ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", config_r1.active ? "Actif" : "Inactif", " ");
  }
}
function ConfigListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275template(1, ConfigListComponent_div_15_mat_card_1_Template, 25, 5, "mat-card", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.configs);
  }
}
var ConfigListComponent = class _ConfigListComponent {
  constructor(snmpService) {
    this.snmpService = snmpService;
    this.configs = [];
    this.loading = false;
  }
  ngOnInit() {
    this.loadConfigs();
  }
  loadConfigs() {
    this.loading = true;
    this.snmpService.getAllConfigs().subscribe({
      next: (configs) => {
        this.configs = configs;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des configurations:", error);
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function ConfigListComponent_Factory(t) {
      return new (t || _ConfigListComponent)(\u0275\u0275directiveInject(SnmpService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfigListComponent, selectors: [["app-config-list"]], decls: 16, vars: 3, consts: [[1, "config-list-container"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", "routerLink", "/snmp/configs/new"], ["class", "loading-container", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "configs-grid", 4, "ngIf"], [1, "loading-container"], [1, "empty-state"], [1, "configs-grid"], ["class", "config-card", 4, "ngFor", "ngForOf"], [1, "config-card"], ["selected", "", 3, "color"], ["mat-button", "", "color", "primary"], ["mat-button", "", "color", "accent"]], template: function ConfigListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
        \u0275\u0275text(5, "settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Configurations SNMP ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 1)(8, "button", 2)(9, "mat-icon");
        \u0275\u0275text(10, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Nouvelle Configuration ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "mat-card-content");
        \u0275\u0275template(13, ConfigListComponent_div_13_Template, 4, 0, "div", 3)(14, ConfigListComponent_div_14_Template, 11, 0, "div", 4)(15, ConfigListComponent_div_15_Template, 2, 1, "div", 5);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.configs.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.configs.length > 0);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, MatButton, MatIcon, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatChip, MatProgressSpinner] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfigListComponent, { className: "ConfigListComponent" });
})();

// src/app/features/snmp/components/config-form/config-form.component.ts
var ConfigFormComponent = class _ConfigFormComponent {
  static {
    this.\u0275fac = function ConfigFormComponent_Factory(t) {
      return new (t || _ConfigFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfigFormComponent, selectors: [["app-config-form"]], decls: 14, vars: 0, consts: [[1, "config-form-container"], ["mat-raised-button", "", "routerLink", "/snmp/configs"]], template: function ConfigFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
        \u0275\u0275text(5, "settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Formulaire Configuration SNMP ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content")(8, "p");
        \u0275\u0275text(9, "Formulaire de cr\xE9ation/modification de configuration SNMP (\xE0 impl\xE9menter)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 1)(11, "mat-icon");
        \u0275\u0275text(12, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(13, " Retour aux configurations ");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [RouterLink, MatButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfigFormComponent, { className: "ConfigFormComponent" });
})();

// src/app/features/snmp/components/manual-scan/manual-scan.component.ts
var ManualScanComponent = class _ManualScanComponent {
  static {
    this.\u0275fac = function ManualScanComponent_Factory(t) {
      return new (t || _ManualScanComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManualScanComponent, selectors: [["app-manual-scan"]], decls: 14, vars: 0, consts: [[1, "manual-scan-container"], ["mat-raised-button", "", "color", "primary"]], template: function ManualScanComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
        \u0275\u0275text(5, "play_circle");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Scan Manuel SNMP ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content")(8, "p");
        \u0275\u0275text(9, "Interface de lancement de scan manuel SNMP (\xE0 impl\xE9menter)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 1)(11, "mat-icon");
        \u0275\u0275text(12, "play_arrow");
        \u0275\u0275elementEnd();
        \u0275\u0275text(13, " Lancer un scan ");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [MatButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManualScanComponent, { className: "ManualScanComponent" });
})();

// src/app/features/snmp/components/scan-history/scan-history.component.ts
var ScanHistoryComponent = class _ScanHistoryComponent {
  static {
    this.\u0275fac = function ScanHistoryComponent_Factory(t) {
      return new (t || _ScanHistoryComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScanHistoryComponent, selectors: [["app-scan-history"]], decls: 19, vars: 0, consts: [[1, "scan-history-container"], ["color", "primary", "selected", ""]], template: function ScanHistoryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
        \u0275\u0275text(5, "history");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Historique des Scans SNMP ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content")(8, "p");
        \u0275\u0275text(9, "Historique et r\xE9sultats des scans SNMP (\xE0 impl\xE9menter)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "mat-chip-listbox")(11, "mat-chip-option", 1);
        \u0275\u0275text(12, "Tous");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "mat-chip-option");
        \u0275\u0275text(14, "Succ\xE8s");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "mat-chip-option");
        \u0275\u0275text(16, "\xC9checs");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "mat-chip-option");
        \u0275\u0275text(18, "En cours");
        \u0275\u0275elementEnd()()()()();
      }
    }, dependencies: [MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatChipListbox, MatChipOption] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScanHistoryComponent, { className: "ScanHistoryComponent" });
})();

// src/app/features/snmp/components/scan-detail/scan-detail.component.ts
var ScanDetailComponent = class _ScanDetailComponent {
  static {
    this.\u0275fac = function ScanDetailComponent_Factory(t) {
      return new (t || _ScanDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScanDetailComponent, selectors: [["app-scan-detail"]], decls: 14, vars: 0, consts: [[1, "scan-detail-container"], ["mat-raised-button", "", "routerLink", "/snmp/results"]], template: function ScanDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
        \u0275\u0275text(5, "info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " D\xE9tails du Scan SNMP ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content")(8, "p");
        \u0275\u0275text(9, "D\xE9tails et r\xE9sultats d'un scan SNMP sp\xE9cifique (\xE0 impl\xE9menter)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 1)(11, "mat-icon");
        \u0275\u0275text(12, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(13, " Retour \xE0 l'historique ");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [RouterLink, MatButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScanDetailComponent, { className: "ScanDetailComponent" });
})();

// src/app/features/snmp/snmp-routing.module.ts
var routes = [
  { path: "", component: AssetListComponent },
  { path: "assets/new", component: AssetFormComponent },
  { path: "assets/edit/:id", component: AssetFormComponent },
  { path: "configs", component: ConfigListComponent },
  { path: "configs/new", component: ConfigFormComponent },
  { path: "configs/edit/:id", component: ConfigFormComponent },
  { path: "run", component: ManualScanComponent },
  { path: "results", component: ScanHistoryComponent },
  { path: "results/:id", component: ScanDetailComponent }
];
var SnmpRoutingModule = class _SnmpRoutingModule {
  static {
    this.\u0275fac = function SnmpRoutingModule_Factory(t) {
      return new (t || _SnmpRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _SnmpRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/features/snmp/snmp.module.ts
var SnmpModule = class _SnmpModule {
  static {
    this.\u0275fac = function SnmpModule_Factory(t) {
      return new (t || _SnmpModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _SnmpModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      ReactiveFormsModule,
      SnmpRoutingModule,
      // Angular Material modules
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatCheckboxModule,
      MatChipsModule,
      MatBadgeModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatSnackBarModule,
      MatTooltipModule,
      MatDatepickerModule,
      MatNativeDateModule
    ] });
  }
};
export {
  SnmpModule
};
//# sourceMappingURL=chunk-WYI7TUZJ.js.map
