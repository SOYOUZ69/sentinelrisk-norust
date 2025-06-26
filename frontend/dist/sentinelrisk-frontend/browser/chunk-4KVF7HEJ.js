import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-J22TRL45.js";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-F7PYTKHL.js";
import {
  MatProgressBarModule
} from "./chunk-CDF474VT.js";
import {
  MatExpansionModule
} from "./chunk-NDDHFHAV.js";
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule
} from "./chunk-EUNBOPZI.js";
import {
  MatChip,
  MatChipAvatar,
  MatChipRemove,
  MatChipSet,
  MatChipsModule
} from "./chunk-IVKLCN7C.js";
import {
  MatDatepickerModule
} from "./chunk-QNUUCXVC.js";
import {
  MatPaginator,
  MatPaginatorModule,
  MatSortModule
} from "./chunk-CO4HJ675.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-LUZGXFLY.js";
import {
  MAT_DIALOG_DATA,
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatSnackBar,
  MatSnackBarModule,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-ITG5NHFL.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MatSelect,
  MatSelectModule,
  MatSuffix
} from "./chunk-WWV4A57T.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatIcon,
  MatIconModule,
  MatTooltip,
  MatTooltipModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-5YYCTZQZ.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-ZVOS3GIS.js";
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
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIconButton,
  MatNativeDateModule,
  MatOption,
  NgClass,
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
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  createComponent,
  environment,
  forkJoin,
  inject,
  map,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-NIHVSCK6.js";

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

// src/app/services/snmp.service.ts
var SnmpService = class _SnmpService {
  constructor(http) {
    this.http = http;
    this.apiUrl = environment.apiUrl;
  }
  // Méthodes pour les assets SNMP - utilise notre API CRUD locale
  getAssets() {
    return this.http.get(`${this.apiUrl}/snmp/local/assets`);
  }
  // Récupérer un asset par ID
  getAssetById(id) {
    return this.http.get(`${this.apiUrl}/snmp/local/assets/${id}`);
  }
  // Créer un nouvel asset
  createAsset(asset) {
    return this.http.post(`${this.apiUrl}/snmp/local/assets`, asset);
  }
  // Modifier un asset existant
  updateAsset(id, asset) {
    return this.http.put(`${this.apiUrl}/snmp/local/assets/${id}`, asset);
  }
  // Supprimer un asset
  deleteAsset(id) {
    return this.http.delete(`${this.apiUrl}/snmp/local/assets/${id}`);
  }
  // Récupérer les assets par statut
  getAssetsByStatus(status) {
    return this.http.get(`${this.apiUrl}/snmp/local/assets/status/${status}`);
  }
  // Méthodes pour les configurations de scan
  getConfigs() {
    return this.http.get(`${this.apiUrl}/snmp/configs`);
  }
  createConfig(config) {
    return this.http.post(`${this.apiUrl}/snmp/configs`, config);
  }
  updateConfig(id, config) {
    return this.http.put(`${this.apiUrl}/snmp/configs/${id}`, config);
  }
  deleteConfig(id) {
    return this.http.delete(`${this.apiUrl}/snmp/configs/${id}`);
  }
  // Méthodes pour les scans
  runScan(configId, hostId) {
    return this.http.post(`${this.apiUrl}/snmp/configs/${configId}/run?hostId=${hostId}`, {});
  }
  // Méthodes pour l'historique
  getHistory(hostId, start, end) {
    let url = `${this.apiUrl}/snmp/history/${hostId}`;
    if (start && end) {
      url += `?start=${start}&end=${end}`;
    }
    return this.http.get(url);
  }
  // Méthodes pour la synchronisation Zabbix
  checkSyncStatus(assetId) {
    return this.http.get(`${this.apiUrl}/snmp/zabbix/sync-status/${assetId}`);
  }
  syncAssetWithZabbix(assetId) {
    return this.http.post(`${this.apiUrl}/snmp/zabbix/sync/${assetId}`, {});
  }
  syncAllAssets() {
    return this.http.post(`${this.apiUrl}/snmp/zabbix/sync-all`, {});
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

// src/app/components/snmp/assets/asset-form-dialog.component.ts
function AssetFormDialogComponent_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le nom est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function AssetFormDialogComponent_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le nom ne peut pas d\xE9passer 100 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function AssetFormDialogComponent_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " L'adresse IP est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function AssetFormDialogComponent_mat_error_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Format d'adresse IP invalide ");
    \u0275\u0275elementEnd();
  }
}
function AssetFormDialogComponent_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le port SNMP est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function AssetFormDialogComponent_mat_error_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Le port doit \xEAtre entre 1 et 65535 ");
    \u0275\u0275elementEnd();
  }
}
function AssetFormDialogComponent_mat_error_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " La communaut\xE9 SNMP est obligatoire ");
    \u0275\u0275elementEnd();
  }
}
function AssetFormDialogComponent_mat_icon_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "hourglass_empty");
    \u0275\u0275elementEnd();
  }
}
var AssetFormDialogComponent = class _AssetFormDialogComponent {
  constructor(fb, snmpService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.snmpService = snmpService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isEdit = false;
    this.isSubmitting = false;
    this.isEdit = !!data?.asset;
    this.assetForm = this.createForm();
  }
  ngOnInit() {
    if (this.isEdit && this.data.asset) {
      this.populateForm(this.data.asset);
    }
  }
  createForm() {
    return this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      ipAddress: ["", [
        Validators.required,
        Validators.pattern(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      ]],
      snmpPort: [161, [Validators.required, Validators.min(1), Validators.max(65535)]],
      snmpCommunity: ["public", [Validators.required, Validators.maxLength(50)]],
      snmpVersion: ["2c"],
      deviceType: [""],
      status: ["active"],
      description: [""],
      location: [""]
    });
  }
  populateForm(asset) {
    this.assetForm.patchValue({
      name: asset.name || asset.hostName,
      ipAddress: asset.ipAddress,
      snmpPort: asset.snmpPort || 161,
      snmpCommunity: asset.snmpCommunity || "public",
      snmpVersion: asset.snmpVersion || "2c",
      deviceType: asset.deviceType || "",
      status: asset.status || "active",
      description: asset.description || "",
      location: asset.location || ""
    });
  }
  onSubmit() {
    if (this.assetForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    const formValue = this.assetForm.value;
    const assetRequest = {
      name: formValue.name,
      ipAddress: formValue.ipAddress,
      snmpPort: formValue.snmpPort,
      snmpCommunity: formValue.snmpCommunity,
      snmpVersion: formValue.snmpVersion,
      deviceType: formValue.deviceType,
      status: formValue.status,
      description: formValue.description,
      location: formValue.location
    };
    const operation = this.isEdit ? this.snmpService.updateAsset(this.data.asset.id, assetRequest) : this.snmpService.createAsset(assetRequest);
    operation.subscribe({
      next: (result) => {
        const message = this.isEdit ? `Asset "${result.name}" modifi\xE9 avec succ\xE8s` : `Asset "${result.name}" cr\xE9\xE9 avec succ\xE8s`;
        this.snackBar.open(message, "Fermer", {
          duration: 3e3,
          panelClass: ["success-snackbar"]
        });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error("Erreur lors de l'op\xE9ration:", error);
        let message = "Une erreur est survenue";
        if (error.status === 409) {
          message = "Un asset avec cette adresse IP existe d\xE9j\xE0";
        } else if (error.status === 400) {
          message = "Donn\xE9es invalides";
        } else if (error.status === 404) {
          message = "Asset non trouv\xE9";
        }
        this.snackBar.open(message, "Fermer", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
        this.isSubmitting = false;
      }
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
  static {
    this.\u0275fac = function AssetFormDialogComponent_Factory(t) {
      return new (t || _AssetFormDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(SnmpService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssetFormDialogComponent, selectors: [["app-asset-form-dialog"]], decls: 82, vars: 12, consts: [["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], [1, "dialog-content"], [1, "form-row"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "name", "placeholder", "ex: Router-Principal-01"], [4, "ngIf"], ["matInput", "", "formControlName", "ipAddress", "placeholder", "192.168.1.1"], ["appearance", "outline", 1, "half-width"], ["matInput", "", "type", "number", "formControlName", "snmpPort", "placeholder", "161"], ["matInput", "", "formControlName", "snmpCommunity", "placeholder", "public"], ["formControlName", "snmpVersion"], ["value", "1"], ["value", "2c"], ["value", "3"], ["formControlName", "deviceType"], ["value", "router"], ["value", "switch"], ["value", "server"], ["value", "printer"], ["value", "other"], ["formControlName", "status"], ["value", "active"], ["value", "inactive"], ["value", "maintenance"], ["matInput", "", "formControlName", "description", "rows", "3", "placeholder", "Description de l'\xE9quipement"], ["matInput", "", "formControlName", "location", "placeholder", "ex: Salle serveur - Rack A1"], ["align", "end"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"]], template: function AssetFormDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h2", 0);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "form", 1);
        \u0275\u0275listener("ngSubmit", function AssetFormDialogComponent_Template_form_ngSubmit_2_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(3, "mat-dialog-content", 2)(4, "div", 3)(5, "mat-form-field", 4)(6, "mat-label");
        \u0275\u0275text(7, "Nom de l'asset *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "input", 5);
        \u0275\u0275template(9, AssetFormDialogComponent_mat_error_9_Template, 2, 0, "mat-error", 6)(10, AssetFormDialogComponent_mat_error_10_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 3)(12, "mat-form-field", 4)(13, "mat-label");
        \u0275\u0275text(14, "Adresse IP *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 7);
        \u0275\u0275template(16, AssetFormDialogComponent_mat_error_16_Template, 2, 0, "mat-error", 6)(17, AssetFormDialogComponent_mat_error_17_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 3)(19, "mat-form-field", 8)(20, "mat-label");
        \u0275\u0275text(21, "Port SNMP *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(22, "input", 9);
        \u0275\u0275template(23, AssetFormDialogComponent_mat_error_23_Template, 2, 0, "mat-error", 6)(24, AssetFormDialogComponent_mat_error_24_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "mat-form-field", 8)(26, "mat-label");
        \u0275\u0275text(27, "Communaut\xE9 SNMP *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(28, "input", 10);
        \u0275\u0275template(29, AssetFormDialogComponent_mat_error_29_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "div", 3)(31, "mat-form-field", 8)(32, "mat-label");
        \u0275\u0275text(33, "Version SNMP");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "mat-select", 11)(35, "mat-option", 12);
        \u0275\u0275text(36, "Version 1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "mat-option", 13);
        \u0275\u0275text(38, "Version 2c");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "mat-option", 14);
        \u0275\u0275text(40, "Version 3");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(41, "mat-form-field", 8)(42, "mat-label");
        \u0275\u0275text(43, "Type d'\xE9quipement");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "mat-select", 15)(45, "mat-option", 16);
        \u0275\u0275text(46, "Routeur");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "mat-option", 17);
        \u0275\u0275text(48, "Switch");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "mat-option", 18);
        \u0275\u0275text(50, "Serveur");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "mat-option", 19);
        \u0275\u0275text(52, "Imprimante");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "mat-option", 20);
        \u0275\u0275text(54, "Autre");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(55, "div", 3)(56, "mat-form-field", 8)(57, "mat-label");
        \u0275\u0275text(58, "Statut");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "mat-select", 21)(60, "mat-option", 22);
        \u0275\u0275text(61, "Actif");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "mat-option", 23);
        \u0275\u0275text(63, "Inactif");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "mat-option", 24);
        \u0275\u0275text(65, "Maintenance");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(66, "div", 3)(67, "mat-form-field", 4)(68, "mat-label");
        \u0275\u0275text(69, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275element(70, "textarea", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(71, "div", 3)(72, "mat-form-field", 4)(73, "mat-label");
        \u0275\u0275text(74, "Emplacement");
        \u0275\u0275elementEnd();
        \u0275\u0275element(75, "input", 26);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(76, "mat-dialog-actions", 27)(77, "button", 28);
        \u0275\u0275listener("click", function AssetFormDialogComponent_Template_button_click_77_listener() {
          return ctx.onCancel();
        });
        \u0275\u0275text(78, "Annuler");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "button", 29);
        \u0275\u0275template(80, AssetFormDialogComponent_mat_icon_80_Template, 2, 0, "mat-icon", 6);
        \u0275\u0275text(81);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        let tmp_6_0;
        let tmp_7_0;
        let tmp_8_0;
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1("", ctx.isEdit ? "Modifier" : "Cr\xE9er", " un Asset SNMP");
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.assetForm);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", (tmp_2_0 = ctx.assetForm.get("name")) == null ? null : tmp_2_0.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_3_0 = ctx.assetForm.get("name")) == null ? null : tmp_3_0.hasError("maxlength"));
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", (tmp_4_0 = ctx.assetForm.get("ipAddress")) == null ? null : tmp_4_0.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_5_0 = ctx.assetForm.get("ipAddress")) == null ? null : tmp_5_0.hasError("pattern"));
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", (tmp_6_0 = ctx.assetForm.get("snmpPort")) == null ? null : tmp_6_0.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.assetForm.get("snmpPort")) == null ? null : tmp_7_0.hasError("min")) || ((tmp_7_0 = ctx.assetForm.get("snmpPort")) == null ? null : tmp_7_0.hasError("max")));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", (tmp_8_0 = ctx.assetForm.get("snmpCommunity")) == null ? null : tmp_8_0.hasError("required"));
        \u0275\u0275advance(50);
        \u0275\u0275property("disabled", ctx.assetForm.invalid || ctx.isSubmitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isSubmitting);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? "Enregistrement..." : ctx.isEdit ? "Modifier" : "Cr\xE9er", " ");
      }
    }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButton, MatIcon, MatFormField, MatLabel, MatError, MatInput, MatSelect, MatOption, MatDialogTitle, MatDialogActions, MatDialogContent], styles: ["\n\n.dialog-content[_ngcontent-%COMP%] {\n  width: 500px;\n  max-height: 70vh;\n  overflow-y: auto;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.half-width[_ngcontent-%COMP%] {\n  width: calc(50% - 8px);\n}\nmat-form-field[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.mat-mdc-dialog-actions[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n}\n/*# sourceMappingURL=asset-form-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssetFormDialogComponent, { className: "AssetFormDialogComponent" });
})();

// src/app/features/snmp/components/asset-list/asset-list.component.ts
function AssetListComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement des assets...");
    \u0275\u0275elementEnd()();
  }
}
function AssetListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "device_hub");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucun asset SNMP trouv\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Commencez par cr\xE9er votre premier asset SNMP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 2);
    \u0275\u0275listener("click", function AssetListComponent_div_18_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createAsset());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Cr\xE9er un Asset ");
    \u0275\u0275elementEnd()();
  }
}
function AssetListComponent_div_19_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Nom/Host");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_19_td_4_small_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const asset_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(asset_r3.description);
  }
}
function AssetListComponent_div_19_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "div", 23)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AssetListComponent_div_19_td_4_small_4_Template, 2, 1, "small", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const asset_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(asset_r3.name || asset_r3.hostName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", asset_r3.description);
  }
}
function AssetListComponent_div_19_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "IP");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_19_td_7_small_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const asset_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(":", asset_r4.snmpPort, "");
  }
}
function AssetListComponent_div_19_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "div", 26)(2, "code");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AssetListComponent_div_19_td_7_small_4_Template, 2, 1, "small", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const asset_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(asset_r4.ipAddress);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", asset_r4.snmpPort && asset_r4.snmpPort !== 161);
  }
}
function AssetListComponent_div_19_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "SNMP");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_19_td_10_small_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const asset_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(asset_r5.snmpCommunity);
  }
}
function AssetListComponent_div_19_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "div", 29)(2, "mat-chip", 30);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AssetListComponent_div_19_td_10_small_4_Template, 2, 1, "small", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const asset_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("color", asset_r5.snmpVersion === "3" ? "accent" : "primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" v", asset_r5.snmpVersion || "2c", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", asset_r5.snmpCommunity);
  }
}
function AssetListComponent_div_19_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_19_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "mat-chip", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const asset_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("color", ctx_r1.getStatusColor(asset_r6.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(asset_r6.status), " ");
  }
}
function AssetListComponent_div_19_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Synchronisation");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_19_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "div", 33)(2, "mat-icon", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const asset_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("spinning", asset_r7.syncInProgress);
    \u0275\u0275property("color", ctx_r1.getSyncStatusColor(asset_r7))("matTooltip", ctx_r1.getSyncStatusText(asset_r7));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getSyncStatusIcon(asset_r7), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getSyncStatusColor(asset_r7) + "-text");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getSyncStatusText(asset_r7), " ");
  }
}
function AssetListComponent_div_19_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function AssetListComponent_div_19_td_19_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function AssetListComponent_div_19_td_19_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const asset_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.syncAsset(asset_r10));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const asset_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("disabled", asset_r10.syncInProgress || asset_r10.synchronizedWithZabbix);
  }
}
function AssetListComponent_div_19_td_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275template(1, AssetListComponent_div_19_td_19_button_1_Template, 3, 1, "button", 36);
    \u0275\u0275elementStart(2, "button", 37);
    \u0275\u0275listener("click", function AssetListComponent_div_19_td_19_Template_button_click_2_listener() {
      const asset_r10 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editAsset(asset_r10));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 38);
    \u0275\u0275listener("click", function AssetListComponent_div_19_td_19_Template_button_click_5_listener() {
      const asset_r10 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteAsset(asset_r10));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const asset_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !asset_r10.synchronizedWithZabbix);
  }
}
function AssetListComponent_div_19_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 40);
  }
}
function AssetListComponent_div_19_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 41);
  }
}
function AssetListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "table", 10);
    \u0275\u0275elementContainerStart(2, 11);
    \u0275\u0275template(3, AssetListComponent_div_19_th_3_Template, 2, 0, "th", 12)(4, AssetListComponent_div_19_td_4_Template, 5, 2, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 14);
    \u0275\u0275template(6, AssetListComponent_div_19_th_6_Template, 2, 0, "th", 12)(7, AssetListComponent_div_19_td_7_Template, 5, 2, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 15);
    \u0275\u0275template(9, AssetListComponent_div_19_th_9_Template, 2, 0, "th", 12)(10, AssetListComponent_div_19_td_10_Template, 5, 3, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 16);
    \u0275\u0275template(12, AssetListComponent_div_19_th_12_Template, 2, 0, "th", 12)(13, AssetListComponent_div_19_td_13_Template, 3, 2, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 17);
    \u0275\u0275template(15, AssetListComponent_div_19_th_15_Template, 2, 0, "th", 12)(16, AssetListComponent_div_19_td_16_Template, 6, 7, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 18);
    \u0275\u0275template(18, AssetListComponent_div_19_th_18_Template, 2, 0, "th", 12)(19, AssetListComponent_div_19_td_19_Template, 8, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(20, AssetListComponent_div_19_tr_20_Template, 1, 0, "tr", 19)(21, AssetListComponent_div_19_tr_21_Template, 1, 0, "tr", 20);
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
  constructor(router, snackBar, dialog, snmpService) {
    this.router = router;
    this.snackBar = snackBar;
    this.dialog = dialog;
    this.snmpService = snmpService;
    this.assets = [];
    this.loading = false;
    this.syncingAssets = /* @__PURE__ */ new Set();
    this.displayedColumns = ["host", "ip", "version", "status", "sync", "actions"];
  }
  ngOnInit() {
    this.loadAssets();
  }
  loadAssets() {
    this.loading = true;
    this.snmpService.getAssets().subscribe({
      next: (data) => {
        this.assets = data.map((asset, index) => __spreadProps(__spreadValues({}, asset), {
          id: asset.id || index + 1,
          // Assigner un ID si manquant
          synchronizedWithZabbix: false,
          syncInProgress: false
        }));
        this.checkAllSyncStatuses();
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des assets SNMP:", error);
        this.snackBar.open("Erreur lors du chargement des assets SNMP", "Fermer", {
          duration: 3e3,
          panelClass: ["error-snackbar"]
        });
        this.loading = false;
      }
    });
  }
  checkAllSyncStatuses() {
    if (this.assets.length === 0)
      return;
    const syncChecks = this.assets.map((asset) => this.snmpService.checkSyncStatus(asset.id));
    forkJoin(syncChecks).subscribe({
      next: (results) => {
        results.forEach((result, index) => {
          if (this.assets[index]) {
            this.assets[index].synchronizedWithZabbix = result.synchronized;
            this.assets[index].zabbixHostId = result.zabbixHostId;
            this.assets[index].lastSyncCheck = result.lastChecked;
          }
        });
      },
      error: (error) => {
        console.error("Erreur lors de la v\xE9rification des statuts de synchronisation:", error);
      }
    });
  }
  // Créer un nouvel asset avec dialogue
  createAsset() {
    const dialogRef = this.dialog.open(AssetFormDialogComponent, {
      width: "600px",
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAssets();
      }
    });
  }
  // Modifier un asset existant avec dialogue
  editAsset(asset) {
    const dialogRef = this.dialog.open(AssetFormDialogComponent, {
      width: "600px",
      data: { asset }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAssets();
      }
    });
  }
  // Supprimer un asset
  deleteAsset(asset) {
    if (!asset.id) {
      return;
    }
    const confirmed = confirm(`\xCAtes-vous s\xFBr de vouloir supprimer l'asset "${asset.name || asset.hostName}" ?`);
    if (confirmed) {
      this.snmpService.deleteAsset(asset.id).subscribe({
        next: () => {
          this.snackBar.open(`Asset "${asset.name || asset.hostName}" supprim\xE9 avec succ\xE8s`, "Fermer", {
            duration: 3e3,
            panelClass: ["success-snackbar"]
          });
          this.loadAssets();
        },
        error: (error) => {
          console.error("Erreur lors de la suppression:", error);
          let message = "Erreur lors de la suppression";
          if (error.status === 404) {
            message = "Asset non trouv\xE9";
          }
          this.snackBar.open(message, "Fermer", {
            duration: 3e3,
            panelClass: ["error-snackbar"]
          });
        }
      });
    }
  }
  syncAsset(asset) {
    if (!asset.id || this.syncingAssets.has(asset.id)) {
      return;
    }
    this.syncingAssets.add(asset.id);
    asset.syncInProgress = true;
    this.snmpService.syncAssetWithZabbix(asset.id).subscribe({
      next: (result) => {
        if (result.success) {
          asset.synchronizedWithZabbix = true;
          asset.zabbixHostId = result.zabbixHostId;
          this.snackBar.open(`Asset ${asset.hostName || asset.name} synchronis\xE9 avec succ\xE8s`, "Fermer", {
            duration: 3e3,
            panelClass: ["success-snackbar"]
          });
        } else {
          this.snackBar.open(`\xC9chec de synchronisation: ${result.message}`, "Fermer", {
            duration: 5e3,
            panelClass: ["error-snackbar"]
          });
        }
      },
      error: (error) => {
        console.error("Erreur lors de la synchronisation:", error);
        this.snackBar.open("Erreur lors de la synchronisation", "Fermer", {
          duration: 3e3,
          panelClass: ["error-snackbar"]
        });
      },
      complete: () => {
        this.syncingAssets.delete(asset.id);
        asset.syncInProgress = false;
      }
    });
  }
  syncAllAssets() {
    const unsyncedAssets = this.assets.filter((asset) => !asset.synchronizedWithZabbix);
    if (unsyncedAssets.length === 0) {
      this.snackBar.open("Tous les assets sont d\xE9j\xE0 synchronis\xE9s", "Fermer", {
        duration: 3e3
      });
      return;
    }
    unsyncedAssets.forEach((asset) => {
      if (asset.id) {
        this.syncingAssets.add(asset.id);
        asset.syncInProgress = true;
      }
    });
    this.snmpService.syncAllAssets().subscribe({
      next: (result) => {
        const message = `Synchronisation termin\xE9e: ${result.synchronized} r\xE9ussies, ${result.failed} \xE9checs`;
        this.snackBar.open(message, "Fermer", {
          duration: 5e3,
          panelClass: result.failed > 0 ? ["warning-snackbar"] : ["success-snackbar"]
        });
        this.checkAllSyncStatuses();
      },
      error: (error) => {
        console.error("Erreur lors de la synchronisation en lot:", error);
        this.snackBar.open("Erreur lors de la synchronisation en lot", "Fermer", {
          duration: 3e3,
          panelClass: ["error-snackbar"]
        });
      },
      complete: () => {
        unsyncedAssets.forEach((asset) => {
          if (asset.id) {
            this.syncingAssets.delete(asset.id);
            asset.syncInProgress = false;
          }
        });
      }
    });
  }
  getSyncStatusIcon(asset) {
    if (asset.syncInProgress) {
      return "sync";
    } else if (asset.synchronizedWithZabbix) {
      return "check_circle";
    } else {
      return "error";
    }
  }
  getSyncStatusColor(asset) {
    if (asset.syncInProgress) {
      return "accent";
    } else if (asset.synchronizedWithZabbix) {
      return "primary";
    } else {
      return "warn";
    }
  }
  getSyncStatusText(asset) {
    if (asset.syncInProgress) {
      return "Synchronisation...";
    } else if (asset.synchronizedWithZabbix) {
      return "Synchronis\xE9";
    } else {
      return "Non synchronis\xE9";
    }
  }
  // Méthodes helper pour l'affichage
  getStatusColor(status) {
    switch (status) {
      case "active":
        return "primary";
      case "inactive":
        return "warn";
      case "maintenance":
        return "accent";
      default:
        return "basic";
    }
  }
  getStatusLabel(status) {
    switch (status) {
      case "active":
        return "Actif";
      case "inactive":
        return "Inactif";
      case "maintenance":
        return "Maintenance";
      default:
        return status || "Inconnu";
    }
  }
  pauseAsset(asset) {
    this.snackBar.open(`Pause de l'asset ${asset.hostName || asset.name}`, "Fermer", {
      duration: 2e3
    });
  }
  allAssetsAreSynchronized() {
    return this.assets.every((asset) => asset.synchronizedWithZabbix);
  }
  static {
    this.\u0275fac = function AssetListComponent_Factory(t) {
      return new (t || _AssetListComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(SnmpService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssetListComponent, selectors: [["app-asset-list"]], decls: 20, vars: 4, consts: [[1, "asset-list-container"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "click", "disabled"], ["class", "loading-container", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], [1, "loading-container"], [1, "empty-state"], [1, "table-container"], ["mat-table", "", 1, "assets-table", 3, "dataSource"], ["matColumnDef", "host"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "ip"], ["matColumnDef", "version"], ["matColumnDef", "status"], ["matColumnDef", "sync"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "asset-name"], ["class", "asset-description", 4, "ngIf"], [1, "asset-description"], [1, "ip-info"], ["class", "port-info", 4, "ngIf"], [1, "port-info"], [1, "snmp-info"], ["selected", "", 3, "color"], ["class", "community", 4, "ngIf"], [1, "community"], [1, "sync-status"], [3, "color", "matTooltip"], [1, "sync-text", 3, "ngClass"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Synchroniser avec Zabbix", 3, "disabled", "click", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Modifier", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Supprimer", 3, "click"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Synchroniser avec Zabbix", 3, "click", "disabled"], ["mat-header-row", ""], ["mat-row", ""]], template: function AssetListComponent_Template(rf, ctx) {
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
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 3);
        \u0275\u0275listener("click", function AssetListComponent_Template_button_click_12_listener() {
          return ctx.syncAllAssets();
        });
        \u0275\u0275elementStart(13, "mat-icon");
        \u0275\u0275text(14, "sync");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Synchroniser Tout ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "mat-card-content");
        \u0275\u0275template(17, AssetListComponent_div_17_Template, 4, 0, "div", 4)(18, AssetListComponent_div_18_Template, 11, 0, "div", 5)(19, AssetListComponent_div_19_Template, 22, 3, "div", 6);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("disabled", ctx.allAssetsAreSynchronized());
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.assets.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.assets.length > 0);
      }
    }, dependencies: [NgClass, NgIf, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButton, MatIconButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatChip, MatProgressSpinner, MatTooltip], styles: ['\n\n.asset-list-container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\nmat-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\nmat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 16px;\n}\nmat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px;\n  gap: 16px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n  color: #ccc;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 16px 0 8px 0;\n  color: #333;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  color: #666;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.assets-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.assets-table[_ngcontent-%COMP%]   .asset-name[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.assets-table[_ngcontent-%COMP%]   .asset-name[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.assets-table[_ngcontent-%COMP%]   .asset-name[_ngcontent-%COMP%]   .asset-description[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.8em;\n  line-height: 1.2;\n}\n.assets-table[_ngcontent-%COMP%]   .ip-info[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n}\n.assets-table[_ngcontent-%COMP%]   .ip-info[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: none;\n  padding: 0;\n  font-size: inherit;\n}\n.assets-table[_ngcontent-%COMP%]   .ip-info[_ngcontent-%COMP%]   .port-info[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9em;\n}\n.assets-table[_ngcontent-%COMP%]   .snmp-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-start;\n}\n.assets-table[_ngcontent-%COMP%]   .snmp-info[_ngcontent-%COMP%]   .community[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.8em;\n}\n.assets-table[_ngcontent-%COMP%]   .sync-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.assets-table[_ngcontent-%COMP%]   .sync-status[_ngcontent-%COMP%]   .sync-text[_ngcontent-%COMP%] {\n  font-size: 0.9em;\n}\n.assets-table[_ngcontent-%COMP%]   .sync-status[_ngcontent-%COMP%]   .sync-text.primary-text[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.assets-table[_ngcontent-%COMP%]   .sync-status[_ngcontent-%COMP%]   .sync-text.accent-text[_ngcontent-%COMP%] {\n  color: #ff5722;\n}\n.assets-table[_ngcontent-%COMP%]   .sync-status[_ngcontent-%COMP%]   .sync-text.warn-text[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.assets-table[_ngcontent-%COMP%]   .sync-status[_ngcontent-%COMP%]   .spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n[_ngcontent-%COMP%]:ng-deep   .success-snackbar[_ngcontent-%COMP%] {\n  background-color: #4caf50 !important;\n  color: white !important;\n}\n[_ngcontent-%COMP%]:ng-deep   .error-snackbar[_ngcontent-%COMP%] {\n  background-color: #f44336 !important;\n  color: white !important;\n}\n[_ngcontent-%COMP%]:ng-deep   .warning-snackbar[_ngcontent-%COMP%] {\n  background-color: #ff9800 !important;\n  color: white !important;\n}\n/*# sourceMappingURL=asset-list.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssetListComponent, { className: "AssetListComponent" });
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
var SnmpService2 = class _SnmpService {
  constructor(http) {
    this.http = http;
    this.baseUrl = `${environment.apiUrl}/snmp`;
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
      return new (t || _AssetFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(SnmpService2), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
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
function ConfigListComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement des configurations...");
    \u0275\u0275elementEnd()();
  }
}
function ConfigListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "settings_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucune configuration d\xE9finie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Commencez par cr\xE9er votre premi\xE8re configuration de scan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 3);
    \u0275\u0275listener("click", function ConfigListComponent_div_18_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createConfig());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Cr\xE9er une configuration ");
    \u0275\u0275elementEnd()();
  }
}
function ConfigListComponent_div_19_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "ID");
    \u0275\u0275elementEnd();
  }
}
function ConfigListComponent_div_19_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const config_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", config_r3.id, " ");
  }
}
function ConfigListComponent_div_19_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Nom de la configuration");
    \u0275\u0275elementEnd();
  }
}
function ConfigListComponent_div_19_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const config_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(config_r4.nom);
  }
}
function ConfigListComponent_div_19_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Intervalle");
    \u0275\u0275elementEnd();
  }
}
function ConfigListComponent_div_19_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "mat-chip", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const config_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getIntervalleLabel(config_r5.intervalle), " ");
  }
}
function ConfigListComponent_div_19_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Nombre de OID");
    \u0275\u0275elementEnd();
  }
}
function ConfigListComponent_div_19_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "mat-chip", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const config_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.getOidsCount(config_r6.oids), " OID", ctx_r1.getOidsCount(config_r6.oids) > 1 ? "s" : "", " ");
  }
}
function ConfigListComponent_div_19_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function ConfigListComponent_div_19_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "mat-chip", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const config_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", config_r7.statut === "Activ\xE9e" ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", config_r7.statut, " ");
  }
}
function ConfigListComponent_div_19_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function ConfigListComponent_div_19_td_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 22)(1, "button", 25);
    \u0275\u0275listener("click", function ConfigListComponent_div_19_td_19_Template_button_click_1_listener() {
      const config_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleConfigStatus(config_r9));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 26);
    \u0275\u0275listener("click", function ConfigListComponent_div_19_td_19_Template_button_click_4_listener() {
      const config_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editConfig(config_r9));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 27);
    \u0275\u0275listener("click", function ConfigListComponent_div_19_td_19_Template_button_click_7_listener() {
      const config_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteConfig(config_r9));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const config_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", config_r9.statut === "Activ\xE9e" ? "warn" : "primary")("matTooltip", config_r9.statut === "Activ\xE9e" ? "D\xE9sactiver" : "Activer");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(config_r9.statut === "Activ\xE9e" ? "pause" : "play_arrow");
  }
}
function ConfigListComponent_div_19_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 28);
  }
}
function ConfigListComponent_div_19_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 29);
  }
}
function ConfigListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "table", 10);
    \u0275\u0275elementContainerStart(2, 11);
    \u0275\u0275template(3, ConfigListComponent_div_19_th_3_Template, 2, 0, "th", 12)(4, ConfigListComponent_div_19_td_4_Template, 2, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 14);
    \u0275\u0275template(6, ConfigListComponent_div_19_th_6_Template, 2, 0, "th", 12)(7, ConfigListComponent_div_19_td_7_Template, 3, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 15);
    \u0275\u0275template(9, ConfigListComponent_div_19_th_9_Template, 2, 0, "th", 12)(10, ConfigListComponent_div_19_td_10_Template, 3, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 16);
    \u0275\u0275template(12, ConfigListComponent_div_19_th_12_Template, 2, 0, "th", 12)(13, ConfigListComponent_div_19_td_13_Template, 3, 2, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 17);
    \u0275\u0275template(15, ConfigListComponent_div_19_th_15_Template, 2, 0, "th", 12)(16, ConfigListComponent_div_19_td_16_Template, 3, 2, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 18);
    \u0275\u0275template(18, ConfigListComponent_div_19_th_18_Template, 2, 0, "th", 12)(19, ConfigListComponent_div_19_td_19_Template, 10, 3, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(20, ConfigListComponent_div_19_tr_20_Template, 1, 0, "tr", 19)(21, ConfigListComponent_div_19_tr_21_Template, 1, 0, "tr", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.configs);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
var ConfigListComponent = class _ConfigListComponent {
  constructor(snackBar) {
    this.snackBar = snackBar;
    this.configs = [
      {
        id: 1,
        nom: "Scan critique 5 min",
        intervalle: 5,
        oids: [".1.3.6.1.2.1.1.3"],
        statut: "Activ\xE9e"
      },
      {
        id: 2,
        nom: "Audit mensuel",
        intervalle: 43200,
        oids: [".1.3.6.1.2.1.2.2.1.10", ".1.3.6.1.2.1.1.1", ".1.3.6.1.2.1.25.1.1"],
        statut: "D\xE9sactiv\xE9e"
      },
      {
        id: 3,
        nom: "Perf continue",
        intervalle: 1,
        oids: [".1.3.6.1.4.1.2021.4"],
        statut: "Activ\xE9e"
      }
    ];
    this.loading = false;
    this.displayedColumns = ["id", "nom", "intervalle", "oids", "statut", "actions"];
  }
  ngOnInit() {
    this.showStaticModeNotification();
  }
  showStaticModeNotification() {
    this.snackBar.open("Mode statique : Configurations de d\xE9monstration", "Fermer", {
      duration: 4e3,
      panelClass: ["demo-mode-snackbar"]
    });
  }
  createConfig() {
    this.snackBar.open("Fonctionnalit\xE9 d\xE9sactiv\xE9e en mode statique", "Fermer", {
      duration: 3e3
    });
  }
  editConfig(config) {
    this.snackBar.open("Fonctionnalit\xE9 d\xE9sactiv\xE9e en mode statique", "Fermer", {
      duration: 3e3
    });
  }
  toggleConfigStatus(config) {
    config.statut = config.statut === "Activ\xE9e" ? "D\xE9sactiv\xE9e" : "Activ\xE9e";
    this.snackBar.open(`Configuration ${config.statut.toLowerCase()} (mode statique)`, "Fermer", { duration: 3e3 });
  }
  deleteConfig(config) {
    if (confirm(`\xCAtes-vous s\xFBr de vouloir supprimer la configuration "${config.nom}" ?`)) {
      const index = this.configs.findIndex((c) => c.id === config.id);
      if (index !== -1) {
        this.configs.splice(index, 1);
      }
      this.snackBar.open("Configuration supprim\xE9e (mode statique)", "Fermer", {
        duration: 3e3
      });
    }
  }
  getIntervalleLabel(minutes) {
    if (minutes < 60) {
      return `${minutes} min`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} h`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} j`;
    }
  }
  getOidsCount(oids) {
    return oids.length;
  }
  static {
    this.\u0275fac = function ConfigListComponent_Factory(t) {
      return new (t || _ConfigListComponent)(\u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfigListComponent, selectors: [["app-config-list"]], decls: 20, vars: 3, consts: [[1, "config-list-container"], [1, "header-actions"], ["color", "accent", "selected", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], ["class", "loading-container", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], [1, "loading-container"], [1, "empty-state"], [1, "table-container"], ["mat-table", "", 1, "configs-table", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "nom"], ["matColumnDef", "intervalle"], ["matColumnDef", "oids"], ["matColumnDef", "statut"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["color", "primary", "selected", ""], ["selected", "", 3, "color"], ["mat-icon-button", "", 3, "click", "color", "matTooltip"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Modifier", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Supprimer", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function ConfigListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
        \u0275\u0275text(5, "settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Configurations de Scan SNMP ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 1)(8, "mat-chip", 2)(9, "mat-icon");
        \u0275\u0275text(10, "info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " MODE D\xC9MO ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 3);
        \u0275\u0275listener("click", function ConfigListComponent_Template_button_click_12_listener() {
          return ctx.createConfig();
        });
        \u0275\u0275elementStart(13, "mat-icon");
        \u0275\u0275text(14, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Nouvelle Configuration ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "mat-card-content");
        \u0275\u0275template(17, ConfigListComponent_div_17_Template, 4, 0, "div", 4)(18, ConfigListComponent_div_18_Template, 11, 0, "div", 5)(19, ConfigListComponent_div_19_Template, 22, 3, "div", 6);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(17);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.configs.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.configs.length > 0);
      }
    }, dependencies: [NgIf, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButton, MatIconButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatChip, MatProgressSpinner, MatTooltip], styles: ["\n\n.config-list-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px;\n  gap: 16px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px 20px;\n  text-align: center;\n  color: #666;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.table-container[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  overflow-x: auto;\n}\n.configs-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 700px;\n}\n.configs-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.configs-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 8px;\n}\n@media (max-width: 768px) {\n  .config-list-container[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 8px;\n  }\n  .configs-table[_ngcontent-%COMP%] {\n    min-width: 600px;\n  }\n}\n/*# sourceMappingURL=config-list.component.css.map */"] });
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

// src/app/features/snmp/models/manual-scan.model.ts
var SNMP_VERSIONS = ["1", "2c", "3"];
var PREDEFINED_OIDS = [
  // === SYSTÈME ===
  {
    oid: "1.3.6.1.2.1.1.1.0",
    name: "Description du syst\xE8me",
    description: "Description compl\xE8te du syst\xE8me d'exploitation et du mat\xE9riel",
    category: "system",
    icon: "computer",
    interpretation: "Informations syst\xE8me de base"
  },
  {
    oid: "1.3.6.1.2.1.1.3.0",
    name: "Temps de fonctionnement",
    description: "Dur\xE9e depuis le dernier red\xE9marrage du syst\xE8me",
    category: "system",
    unit: "jours",
    icon: "schedule",
    interpretation: "Uptime du syst\xE8me"
  },
  {
    oid: "1.3.6.1.2.1.1.5.0",
    name: "Nom du syst\xE8me",
    description: "Nom d'h\xF4te ou nom du p\xE9riph\xE9rique r\xE9seau",
    category: "system",
    icon: "label",
    interpretation: "Nom d'identification"
  },
  {
    oid: "1.3.6.1.2.1.1.6.0",
    name: "Localisation",
    description: "Emplacement physique du p\xE9riph\xE9rique",
    category: "system",
    icon: "location_on",
    interpretation: "Localisation physique"
  },
  {
    oid: "1.3.6.1.2.1.1.4.0",
    name: "Contact administrateur",
    description: "Informations de contact de l'administrateur syst\xE8me",
    category: "system",
    icon: "contact_phone",
    interpretation: "Contact technique"
  },
  // === MÉMOIRE ===
  {
    oid: "1.3.6.1.4.1.2021.4.5.0",
    name: "M\xE9moire RAM totale",
    description: "Quantit\xE9 totale de m\xE9moire vive install\xE9e",
    category: "memory",
    unit: "MB",
    icon: "memory",
    interpretation: "Capacit\xE9 m\xE9moire totale"
  },
  {
    oid: "1.3.6.1.4.1.2021.4.6.0",
    name: "M\xE9moire RAM disponible",
    description: "Quantit\xE9 de m\xE9moire vive actuellement libre",
    category: "memory",
    unit: "MB",
    icon: "memory",
    criticalThreshold: { min: 500, operator: "lt" },
    interpretation: "M\xE9moire libre (critique si < 500 MB)"
  },
  {
    oid: "1.3.6.1.4.1.2021.4.3.0",
    name: "M\xE9moire SWAP totale",
    description: "Taille totale de l'espace d'\xE9change (fichier de pagination)",
    category: "memory",
    unit: "MB",
    icon: "storage",
    interpretation: "Espace SWAP total"
  },
  {
    oid: "1.3.6.1.4.1.2021.4.4.0",
    name: "M\xE9moire SWAP disponible",
    description: "Espace d'\xE9change actuellement libre",
    category: "memory",
    unit: "MB",
    icon: "storage",
    interpretation: "SWAP libre"
  },
  // === PROCESSEUR ===
  {
    oid: "1.3.6.1.4.1.2021.11.9.0",
    name: "CPU inactif (%)",
    description: "Pourcentage de temps o\xF9 le processeur est inactif",
    category: "cpu",
    unit: "%",
    icon: "speed",
    criticalThreshold: { min: 10, operator: "lt" },
    interpretation: "Temps CPU libre (critique si < 10%)"
  },
  {
    oid: "1.3.6.1.4.1.2021.11.10.0",
    name: "CPU utilisateur (%)",
    description: "Pourcentage de temps CPU utilis\xE9 par les processus utilisateur",
    category: "cpu",
    unit: "%",
    icon: "person",
    interpretation: "Usage CPU utilisateur"
  },
  {
    oid: "1.3.6.1.4.1.2021.11.11.0",
    name: "CPU syst\xE8me (%)",
    description: "Pourcentage de temps CPU utilis\xE9 par le syst\xE8me d'exploitation",
    category: "cpu",
    unit: "%",
    icon: "settings",
    interpretation: "Usage CPU syst\xE8me"
  },
  // === STOCKAGE ===
  {
    oid: "1.3.6.1.4.1.2021.9.1.6.1",
    name: "Espace disque total (/)",
    description: "Taille totale du syst\xE8me de fichiers racine",
    category: "storage",
    unit: "GB",
    icon: "storage",
    interpretation: "Capacit\xE9 disque total"
  },
  {
    oid: "1.3.6.1.4.1.2021.9.1.7.1",
    name: "Espace disque disponible (/)",
    description: "Espace libre sur le syst\xE8me de fichiers racine",
    category: "storage",
    unit: "GB",
    icon: "storage",
    criticalThreshold: { min: 2, operator: "lt" },
    interpretation: "Espace libre (critique si < 2 GB)"
  },
  {
    oid: "1.3.6.1.4.1.2021.9.1.9.1",
    name: "Utilisation disque (%)",
    description: "Pourcentage d'utilisation du syst\xE8me de fichiers racine",
    category: "storage",
    unit: "%",
    icon: "pie_chart",
    criticalThreshold: { max: 90, operator: "gt" },
    interpretation: "Taux d'occupation (critique si > 90%)"
  },
  // === RÉSEAU ===
  {
    oid: "1.3.6.1.2.1.2.1.0",
    name: "Nombre d'interfaces r\xE9seau",
    description: "Nombre total d'interfaces r\xE9seau sur le p\xE9riph\xE9rique",
    category: "network",
    icon: "settings_ethernet",
    interpretation: "Nombre d'interfaces"
  },
  {
    oid: "1.3.6.1.2.1.2.2.1.10.1",
    name: "Octets re\xE7us (interface 1)",
    description: "Nombre total d'octets re\xE7us sur la premi\xE8re interface r\xE9seau",
    category: "network",
    unit: "MB",
    icon: "download",
    interpretation: "Trafic entrant cumul\xE9"
  },
  {
    oid: "1.3.6.1.2.1.2.2.1.16.1",
    name: "Octets envoy\xE9s (interface 1)",
    description: "Nombre total d'octets envoy\xE9s sur la premi\xE8re interface r\xE9seau",
    category: "network",
    unit: "MB",
    icon: "upload",
    interpretation: "Trafic sortant cumul\xE9"
  },
  // === PROCESSUS ===
  {
    oid: "1.3.6.1.2.1.25.1.6.0",
    name: "Nombre de processus",
    description: "Nombre total de processus en cours d'ex\xE9cution",
    category: "process",
    icon: "list",
    interpretation: "Processus actifs"
  },
  {
    oid: "1.3.6.1.4.1.2021.10.1.3.1",
    name: "Charge syst\xE8me (1 min)",
    description: "Charge moyenne du syst\xE8me sur 1 minute",
    category: "process",
    icon: "trending_up",
    criticalThreshold: { max: 2, operator: "gt" },
    interpretation: "Load average (critique si > 2)"
  }
];
var OID_CATEGORIES = {
  system: { label: "Syst\xE8me", icon: "computer", color: "#2196F3" },
  memory: { label: "M\xE9moire", icon: "memory", color: "#4CAF50" },
  cpu: { label: "Processeur", icon: "speed", color: "#FF9800" },
  storage: { label: "Stockage", icon: "storage", color: "#9C27B0" },
  network: { label: "R\xE9seau", icon: "settings_ethernet", color: "#00BCD4" },
  process: { label: "Processus", icon: "list", color: "#795548" },
  other: { label: "Autre", icon: "help_outline", color: "#607D8B" }
};
var SnmpValueInterpreter = class {
  /**
   * Convertit les TimeTicks en format lisible
   */
  static formatTimeTicks(value) {
    const ticks = parseInt(value);
    if (isNaN(ticks))
      return value;
    const seconds = Math.floor(ticks / 100);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    if (days > 0) {
      return `${days} jour${days > 1 ? "s" : ""}, ${hours}h${minutes}min`;
    } else if (hours > 0) {
      return `${hours}h${minutes}min`;
    } else {
      return `${minutes}min`;
    }
  }
  /**
   * Convertit les octets en unités lisibles
   */
  static formatBytes(value, fromUnit = "bytes") {
    let bytes = parseInt(value);
    if (isNaN(bytes))
      return value;
    if (fromUnit === "kb")
      bytes *= 1024;
    if (fromUnit === "mb")
      bytes *= 1024 * 1024;
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    while (bytes >= 1024 && unitIndex < units.length - 1) {
      bytes /= 1024;
      unitIndex++;
    }
    return `${bytes.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
  }
  /**
   * Formate un pourcentage
   */
  static formatPercentage(value) {
    const num = parseFloat(value);
    if (isNaN(num))
      return value;
    return `${num.toFixed(1)}%`;
  }
  /**
   * Interprète une valeur SNMP selon son OID
   */
  static interpretValue(oid, value, type) {
    const predefined = PREDEFINED_OIDS.find((p) => p.oid === oid);
    let formatted = value;
    let interpretation = predefined?.interpretation || "Valeur brute";
    let status = "normal";
    let unit = predefined?.unit;
    if (type === "TimeTicks") {
      formatted = this.formatTimeTicks(value);
      interpretation = "Dur\xE9e de fonctionnement";
    } else if (predefined) {
      if (predefined.unit === "MB" && predefined.oid.includes("4.1.2021.4")) {
        formatted = this.formatBytes(value, "kb");
      } else if (predefined.unit === "GB") {
        formatted = this.formatBytes(value, "kb");
      } else if (predefined.unit === "%") {
        formatted = this.formatPercentage(value);
      } else if (predefined.unit === "MB" && predefined.oid.includes("2.2.1")) {
        formatted = this.formatBytes(value);
      }
      if (predefined.criticalThreshold) {
        const numValue = parseFloat(value);
        const threshold = predefined.criticalThreshold;
        if (threshold.operator === "lt" && threshold.min && numValue < threshold.min) {
          status = "critical";
        } else if (threshold.operator === "gt" && threshold.max && numValue > threshold.max) {
          status = "critical";
        }
      }
    }
    return { formatted, interpretation, status, unit };
  }
};

// src/app/features/snmp/services/manual-scan.service.ts
var ManualScanService = class _ManualScanService {
  constructor(http) {
    this.http = http;
    this.baseUrl = `${environment.apiUrl}/snmp/manual`;
  }
  /**
   * Effectue un scan SNMP manuel
   */
  performManualScan(request) {
    console.log("\u{1F50D} Lancement du scan SNMP manuel:", request);
    return this.http.post(`${this.baseUrl}/scan`, request);
  }
  /**
   * Teste la connectivité SNMP avec un équipement
   */
  testConnectivity(request) {
    console.log("\u{1F517} Test de connectivit\xE9 SNMP:", request);
    let params = new HttpParams().set("ip", request.ip).set("port", request.port?.toString() || "161").set("community", request.community || "public").set("version", request.version || "2c");
    return this.http.get(`${this.baseUrl}/test-connectivity`, { params });
  }
  /**
   * Endpoint de test simple
   */
  testHello() {
    return this.http.get(`${this.baseUrl}/hello`, { responseType: "text" });
  }
  static {
    this.\u0275fac = function ManualScanService_Factory(t) {
      return new (t || _ManualScanService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ManualScanService, factory: _ManualScanService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/snmp/components/manual-scan/manual-scan.component.ts
var _c0 = (a0) => ({ "expanded": a0 });
var _c1 = (a0) => ({ "selected": a0 });
function ManualScanComponent_div_10_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "mat-icon", 52);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 47)(4, "span", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 49);
    \u0275\u0275text(7, "Critiques");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getCriticalResultsCount());
  }
}
function ManualScanComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45)(2, "mat-icon", 46);
    \u0275\u0275text(3, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 47)(5, "span", 48);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 49);
    \u0275\u0275text(8, "R\xE9ussis");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, ManualScanComponent_div_10_div_9_Template, 8, 1, "div", 50);
    \u0275\u0275elementStart(10, "div", 45)(11, "mat-icon", 51);
    \u0275\u0275text(12, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 47)(14, "span", 48);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 49);
    \u0275\u0275text(17, "ms");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.getSuccessfulResultsCount());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.getCriticalResultsCount() > 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.lastScanDuration);
  }
}
function ManualScanComponent_mat_error_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("ip"), " ");
  }
}
function ManualScanComponent_mat_error_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("port"), " ");
  }
}
function ManualScanComponent_mat_error_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("community"), " ");
  }
}
function ManualScanComponent_mat_icon_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "wifi_tethering");
    \u0275\u0275elementEnd();
  }
}
function ManualScanComponent_mat_icon_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 53);
    \u0275\u0275text(1, "sync");
    \u0275\u0275elementEnd();
  }
}
function ManualScanComponent_div_73_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", ctx_r0.connectivityResult.duration, "ms)");
  }
}
function ManualScanComponent_div_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 55)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275template(6, ManualScanComponent_div_73_span_6_Template, 2, 1, "span", 56);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.connectivityResult.success ? "success" : "error");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.connectivityResult.success ? "check_circle" : "error");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.connectivityResult.success ? "Connexion r\xE9ussie" : "Connexion \xE9chou\xE9e", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.connectivityResult.duration);
  }
}
function ManualScanComponent_mat_error_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("timeout"), " ");
  }
}
function ManualScanComponent_mat_error_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("retries"), " ");
  }
}
function ManualScanComponent_span_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", ctx_r0.getSelectedOidsCount(), " s\xE9lectionn\xE9e", ctx_r0.getSelectedOidsCount() > 1 ? "s" : "", ") ");
  }
}
function ManualScanComponent_mat_tab_109_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 63);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("color", ctx_r0.oidCategories[category_r2].color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.oidCategories[category_r2].icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.oidCategories[category_r2].label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getCategoryOids(category_r2).length);
  }
}
function ManualScanComponent_mat_tab_109_div_3_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const oid_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(oid_r4.unit);
  }
}
function ManualScanComponent_mat_tab_109_div_3_mat_icon_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 75);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ManualScanComponent_mat_tab_109_div_3_mat_icon_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 76);
    \u0275\u0275text(1, " warning ");
    \u0275\u0275elementEnd();
  }
}
function ManualScanComponent_mat_tab_109_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275listener("click", function ManualScanComponent_mat_tab_109_div_3_Template_div_click_0_listener() {
      const oid_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePredefinedOid(oid_r4));
    });
    \u0275\u0275elementStart(1, "div", 65)(2, "mat-icon", 66);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 67)(5, "h4");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ManualScanComponent_mat_tab_109_div_3_span_7_Template, 2, 1, "span", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, ManualScanComponent_mat_tab_109_div_3_mat_icon_8_Template, 2, 0, "mat-icon", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 70);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 71)(12, "span", 72);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ManualScanComponent_mat_tab_109_div_3_mat_icon_14_Template, 2, 0, "mat-icon", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const oid_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(10, _c1, ctx_r0.isOidSelected(oid_r4)));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r0.oidCategories[oid_r4.category].color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", oid_r4.icon, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(oid_r4.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", oid_r4.unit);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isOidSelected(oid_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(oid_r4.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(oid_r4.oid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", oid_r4.criticalThreshold);
  }
}
function ManualScanComponent_mat_tab_109_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-tab", 59);
    \u0275\u0275template(1, ManualScanComponent_mat_tab_109_ng_template_1_Template, 5, 5, "ng-template", 60);
    \u0275\u0275elementStart(2, "div", 61);
    \u0275\u0275template(3, ManualScanComponent_mat_tab_109_div_3_Template, 15, 12, "div", 62);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("label", ctx_r0.oidCategories[category_r2].label);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.getCategoryOids(category_r2));
  }
}
function ManualScanComponent_div_115_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("customOid"), " ");
  }
}
function ManualScanComponent_div_115_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 77)(1, "mat-form-field", 78)(2, "mat-label");
    \u0275\u0275text(3, "OID personnalis\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-icon", 16);
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 79);
    \u0275\u0275listener("keyup.enter", function ManualScanComponent_div_115_Template_input_keyup_enter_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.addCustomOid());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-hint");
    \u0275\u0275text(8, "Format: 1.3.6.1.2.1.1.1.0");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, ManualScanComponent_div_115_mat_error_9_Template, 2, 1, "mat-error", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 80);
    \u0275\u0275listener("click", function ManualScanComponent_div_115_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.addCustomOid());
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "add");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ((tmp_1_0 = ctx_r0.scanForm.get("customOid")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx_r0.scanForm.get("customOid")) == null ? null : tmp_1_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", (tmp_2_0 = ctx_r0.scanForm.get("customOid")) == null ? null : tmp_2_0.invalid);
  }
}
function ManualScanComponent_div_116_mat_chip_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip", 85);
    \u0275\u0275listener("removed", function ManualScanComponent_div_116_mat_chip_7_Template_mat_chip_removed_0_listener() {
      const oid_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeSelectedOid(oid_r7));
    });
    \u0275\u0275elementStart(1, "mat-icon", 86);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "mat-icon", 87);
    \u0275\u0275text(5, "cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const oid_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("removable", true);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r0.oidCategories[oid_r7.category].color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", oid_r7.icon, " ");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", oid_r7.name, " ");
  }
}
function ManualScanComponent_div_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "h4", 82)(2, "mat-icon");
    \u0275\u0275text(3, "playlist_add_check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " M\xE9triques s\xE9lectionn\xE9es ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 83)(6, "mat-chip-set");
    \u0275\u0275template(7, ManualScanComponent_div_116_mat_chip_7_Template, 6, 5, "mat-chip", 84);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r0.selectedPredefinedOids);
  }
}
function ManualScanComponent_mat_icon_119_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function ManualScanComponent_mat_icon_120_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 53);
    \u0275\u0275text(1, "sync");
    \u0275\u0275elementEnd();
  }
}
function ManualScanComponent_mat_card_122_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 96)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 97)(4, "span", 98);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 99);
    \u0275\u0275text(7, "Normales");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getResultsByStatus("normal").length);
  }
}
function ManualScanComponent_mat_card_122_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 100)(1, "mat-icon");
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 97)(4, "span", 98);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 99);
    \u0275\u0275text(7, "Avertissements");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getResultsByStatus("warning").length);
  }
}
function ManualScanComponent_mat_card_122_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 97)(4, "span", 98);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 99);
    \u0275\u0275text(7, "Critiques");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getResultsByStatus("critical").length);
  }
}
function ManualScanComponent_mat_card_122_div_14_mat_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("color", ctx_r0.oidCategories[result_r8.predefinedOid.category].color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", result_r8.predefinedOid.icon, " ");
  }
}
function ManualScanComponent_mat_card_122_div_14_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 66);
    \u0275\u0275text(1, "help_outline");
    \u0275\u0275elementEnd();
  }
}
function ManualScanComponent_mat_card_122_div_14_div_13_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 122);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(result_r8.predefinedOid == null ? null : result_r8.predefinedOid.unit);
  }
}
function ManualScanComponent_mat_card_122_div_14_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113)(1, "div", 114)(2, "div", 115)(3, "span", 116);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ManualScanComponent_mat_card_122_div_14_div_13_span_5_Template, 2, 1, "span", 117);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 118);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 119)(9, "span", 120);
    \u0275\u0275text(10, "Valeur brute:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 121);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const result_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(result_r8.formattedValue);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r8.predefinedOid == null ? null : result_r8.predefinedOid.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r8.interpretation);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", result_r8.rawValue, " (", result_r8.type, ")");
  }
}
function ManualScanComponent_mat_card_122_div_14_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 123)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(result_r8.error || "Erreur de r\xE9cup\xE9ration");
  }
}
function ManualScanComponent_mat_card_122_div_14_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 124)(1, "mat-icon");
    \u0275\u0275text(2, "info_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(result_r8.predefinedOid == null ? null : result_r8.predefinedOid.description);
  }
}
function ManualScanComponent_mat_card_122_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102)(1, "div", 103)(2, "div", 104);
    \u0275\u0275template(3, ManualScanComponent_mat_card_122_div_14_mat_icon_3_Template, 2, 3, "mat-icon", 105)(4, ManualScanComponent_mat_card_122_div_14_mat_icon_4_Template, 2, 0, "mat-icon", 106);
    \u0275\u0275elementStart(5, "div", 107)(6, "h4");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 108);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 109)(11, "mat-icon");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(13, ManualScanComponent_mat_card_122_div_14_div_13_Template, 13, 5, "div", 110)(14, ManualScanComponent_mat_card_122_div_14_div_14_Template, 5, 1, "div", 111)(15, ManualScanComponent_mat_card_122_div_14_div_15_Template, 5, 1, "div", 112);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", result_r8.status);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", result_r8.predefinedOid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !result_r8.predefinedOid);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((result_r8.predefinedOid == null ? null : result_r8.predefinedOid.name) || "OID personnalis\xE9");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r8.oid);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r0.getStatusColor(result_r8.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStatusIcon(result_r8.status), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r8.success);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !result_r8.success);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r8.predefinedOid == null ? null : result_r8.predefinedOid.description);
  }
}
function ManualScanComponent_mat_card_122_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 88)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon", 10);
    \u0275\u0275text(4, "analytics");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " R\xE9sultats du scan ");
    \u0275\u0275elementStart(6, "span", 89);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "mat-card-content")(9, "div", 90);
    \u0275\u0275template(10, ManualScanComponent_mat_card_122_div_10_Template, 8, 1, "div", 91)(11, ManualScanComponent_mat_card_122_div_11_Template, 8, 1, "div", 92)(12, ManualScanComponent_mat_card_122_div_12_Template, 8, 1, "div", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 94);
    \u0275\u0275template(14, ManualScanComponent_mat_card_122_div_14_Template, 16, 11, "div", 95);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("(", ctx_r0.scanResults.length, " m\xE9trique", ctx_r0.scanResults.length > 1 ? "s" : "", ")");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.hasResultsWithStatus("normal"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.hasResultsWithStatus("warning"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.hasResultsWithStatus("critical"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.scanResults);
  }
}
var ManualScanComponent = class _ManualScanComponent {
  constructor(fb, manualScanService, snackBar, dialog) {
    this.fb = fb;
    this.manualScanService = manualScanService;
    this.snackBar = snackBar;
    this.dialog = dialog;
    this.isLoading = false;
    this.isTestingConnectivity = false;
    this.connectivityResult = null;
    this.scanResults = [];
    this.lastScanDuration = 0;
    this.predefinedOids = PREDEFINED_OIDS;
    this.oidCategories = OID_CATEGORIES;
    this.categorizedOids = {
      system: [],
      memory: [],
      cpu: [],
      storage: [],
      network: [],
      process: [],
      other: []
    };
    this.selectedCategory = "system";
    this.showAdvancedSettings = false;
    this.showCustomOidInput = false;
    this.snmpVersions = SNMP_VERSIONS;
    this.categories = Object.keys(this.oidCategories);
    this.scanForm = this.createForm();
  }
  ngOnInit() {
    this.initializePredefinedOids();
    this.loadDefaultOids();
  }
  createForm() {
    return this.fb.group({
      // Configuration de connexion
      ip: ["127.0.0.1", [
        Validators.required,
        Validators.pattern(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      ]],
      port: [161, [Validators.required, Validators.min(1), Validators.max(65535)]],
      community: ["public", Validators.required],
      version: ["2c", Validators.required],
      // Paramètres avancés
      timeout: [5e3, [Validators.required, Validators.min(1e3), Validators.max(3e4)]],
      retries: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      // OIDs sélectionnés
      selectedPredefinedOids: [[]],
      customOid: ["", this.oidValidator],
      // OIDs finaux (pour compatibilité avec l'ancienne logique)
      oids: this.fb.array([])
    });
  }
  initializePredefinedOids() {
    this.predefinedOids.forEach((oid) => {
      this.categorizedOids[oid.category].push(oid);
    });
  }
  loadDefaultOids() {
    const defaultSystemOids = this.categorizedOids.system.slice(0, 3);
    this.scanForm.get("selectedPredefinedOids")?.setValue(defaultSystemOids);
    this.updateOidsFormArray();
  }
  // === GESTION DES OIDS ===
  get oidsFormArray() {
    return this.scanForm.get("oids");
  }
  get selectedPredefinedOids() {
    return this.scanForm.get("selectedPredefinedOids")?.value || [];
  }
  isOidSelected(oid) {
    return this.selectedPredefinedOids.some((selected) => selected.oid === oid.oid);
  }
  togglePredefinedOid(oid) {
    const current = this.selectedPredefinedOids;
    const index = current.findIndex((selected) => selected.oid === oid.oid);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(oid);
    }
    this.scanForm.get("selectedPredefinedOids")?.setValue([...current]);
    this.updateOidsFormArray();
  }
  addCustomOid() {
    const customOid = this.scanForm.get("customOid")?.value?.trim();
    if (!customOid)
      return;
    const current = this.selectedPredefinedOids;
    if (current.some((oid) => oid.oid === customOid)) {
      this.snackBar.open("Cet OID est d\xE9j\xE0 s\xE9lectionn\xE9", "Fermer", { duration: 3e3 });
      return;
    }
    const customOidObj = {
      oid: customOid,
      name: "OID personnalis\xE9",
      description: "OID ajout\xE9 manuellement par l'utilisateur",
      category: "other",
      icon: "edit",
      interpretation: "Valeur personnalis\xE9e"
    };
    current.push(customOidObj);
    this.scanForm.get("selectedPredefinedOids")?.setValue([...current]);
    this.scanForm.get("customOid")?.setValue("");
    this.updateOidsFormArray();
    this.showCustomOidInput = false;
  }
  removeSelectedOid(oidToRemove) {
    const current = this.selectedPredefinedOids;
    const filtered = current.filter((oid) => oid.oid !== oidToRemove.oid);
    this.scanForm.get("selectedPredefinedOids")?.setValue(filtered);
    this.updateOidsFormArray();
  }
  updateOidsFormArray() {
    const oidsArray = this.oidsFormArray;
    oidsArray.clear();
    this.selectedPredefinedOids.forEach((oid) => {
      oidsArray.push(this.fb.control(oid.oid, [Validators.required, this.oidValidator]));
    });
  }
  // === VALIDATION ===
  oidValidator(control) {
    if (!control.value)
      return null;
    const oidPattern = /^[0-9]+(\.[0-9]+)*$/;
    return oidPattern.test(control.value) ? null : { invalidOid: true };
  }
  getFieldError(fieldName) {
    const field = this.scanForm.get(fieldName);
    if (!field || !field.errors || !field.touched)
      return "";
    if (field.errors["required"])
      return `${fieldName} est requis`;
    if (field.errors["pattern"])
      return `Format ${fieldName} invalide`;
    if (field.errors["min"])
      return `${fieldName} trop petit`;
    if (field.errors["max"])
      return `${fieldName} trop grand`;
    if (field.errors["invalidOid"])
      return "Format OID invalide (ex: 1.3.6.1.2.1.1.1.0)";
    return "Erreur de validation";
  }
  // === CONNECTIVITÉ ===
  testConnectivity() {
    return __async(this, null, function* () {
      if (this.scanForm.invalid)
        return;
      this.isTestingConnectivity = true;
      this.connectivityResult = null;
      try {
        const request = {
          ip: this.scanForm.get("ip")?.value,
          port: this.scanForm.get("port")?.value,
          community: this.scanForm.get("community")?.value,
          version: this.scanForm.get("version")?.value
        };
        console.log("\u{1F50D} Test de connectivit\xE9 SNMP...", request);
        const response = yield this.manualScanService.testConnectivity(request).toPromise();
        this.connectivityResult = {
          success: response?.success || false,
          duration: response?.duration
        };
        const message = response?.success ? `\u2705 Connectivit\xE9 OK (${response.duration}ms)` : `\u274C \xC9chec de connexion: ${response?.error}`;
        this.snackBar.open(message, "Fermer", {
          duration: 5e3,
          panelClass: response?.success ? "success-snackbar" : "error-snackbar"
        });
        console.log("\u{1F50D} R\xE9sultat du test:", response);
      } catch (error) {
        console.error("\u274C Erreur lors du test de connectivit\xE9:", error);
        this.connectivityResult = { success: false };
        this.snackBar.open("\u274C Erreur lors du test de connectivit\xE9", "Fermer", {
          duration: 5e3,
          panelClass: "error-snackbar"
        });
      } finally {
        this.isTestingConnectivity = false;
      }
    });
  }
  // === SCAN SNMP ===
  performScan() {
    return __async(this, null, function* () {
      if (this.scanForm.invalid || this.selectedPredefinedOids.length === 0) {
        this.snackBar.open("\u26A0\uFE0F Veuillez corriger les erreurs du formulaire", "Fermer", { duration: 3e3 });
        return;
      }
      this.isLoading = true;
      this.scanResults = [];
      try {
        const request = {
          ip: this.scanForm.get("ip")?.value,
          port: this.scanForm.get("port")?.value,
          community: this.scanForm.get("community")?.value,
          version: this.scanForm.get("version")?.value,
          oids: this.selectedPredefinedOids.map((oid) => oid.oid),
          timeout: this.scanForm.get("timeout")?.value,
          retries: this.scanForm.get("retries")?.value
        };
        console.log("\u{1F680} Lancement du scan SNMP...", request);
        const response = yield this.manualScanService.performManualScan(request).toPromise();
        if (response?.success && response.results) {
          this.lastScanDuration = response.duration;
          this.scanResults = this.interpretResults(response.results);
          const successCount = this.scanResults.filter((r) => r.success).length;
          const totalCount = this.scanResults.length;
          this.snackBar.open(`\u2705 Scan termin\xE9: ${successCount}/${totalCount} OIDs r\xE9cup\xE9r\xE9s (${response.duration}ms)`, "Fermer", { duration: 5e3, panelClass: "success-snackbar" });
          console.log("\u2705 R\xE9sultats du scan:", this.scanResults);
        } else {
          throw new Error(response?.error || "\xC9chec du scan SNMP");
        }
      } catch (error) {
        console.error("\u274C Erreur lors du scan:", error);
        this.snackBar.open("\u274C Erreur lors du scan SNMP", "Fermer", {
          duration: 5e3,
          panelClass: "error-snackbar"
        });
      } finally {
        this.isLoading = false;
      }
    });
  }
  interpretResults(results) {
    return results.map((result) => {
      const predefinedOid = this.predefinedOids.find((p) => p.oid === result.oid);
      if (result.success && result.value) {
        const interpretation = SnmpValueInterpreter.interpretValue(result.oid, result.value, result.type);
        return {
          oid: result.oid,
          predefinedOid,
          rawValue: result.value,
          formattedValue: interpretation.formatted,
          interpretation: interpretation.interpretation,
          type: result.type,
          success: true,
          status: interpretation.status
        };
      } else {
        return {
          oid: result.oid,
          predefinedOid,
          rawValue: "",
          formattedValue: "",
          interpretation: "Erreur de r\xE9cup\xE9ration",
          type: result.type,
          success: false,
          status: "critical",
          error: result.error
        };
      }
    });
  }
  // === UTILITAIRES UI ===
  getCategoryOids(category) {
    return this.categorizedOids[category] || [];
  }
  getSelectedOidsCount() {
    return this.selectedPredefinedOids.length;
  }
  getCriticalResultsCount() {
    return this.scanResults.filter((r) => r.status === "critical").length;
  }
  getStatusIcon(status) {
    switch (status) {
      case "normal":
        return "check_circle";
      case "warning":
        return "warning";
      case "critical":
        return "error";
      default:
        return "help";
    }
  }
  getStatusColor(status) {
    switch (status) {
      case "normal":
        return "#4CAF50";
      case "warning":
        return "#FF9800";
      case "critical":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  }
  // === MÉTHODES POUR LES FILTRES DANS LE TEMPLATE ===
  getResultsByStatus(status) {
    return this.scanResults.filter((r) => r.status === status);
  }
  getSuccessfulResultsCount() {
    return this.scanResults.filter((r) => r.success).length;
  }
  hasResultsWithStatus(status) {
    return this.scanResults.some((r) => r.status === status);
  }
  static {
    this.\u0275fac = function ManualScanComponent_Factory(t) {
      return new (t || _ManualScanComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ManualScanService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManualScanComponent, selectors: [["app-manual-scan"]], decls: 123, vars: 27, consts: [[1, "manual-scan-container"], [1, "page-header"], [1, "header-content"], [1, "header-text"], [1, "page-title"], [1, "title-icon"], [1, "page-subtitle"], ["class", "quick-stats", 4, "ngIf"], [1, "content-layout"], [1, "config-card"], [1, "section-icon"], [3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "section-title"], [1, "form-row"], ["appearance", "outline", 1, "form-field"], ["matPrefix", ""], ["matInput", "", "formControlName", "ip", "placeholder", "192.168.1.100"], [4, "ngIf"], ["matInput", "", "type", "number", "formControlName", "port", "min", "1", "max", "65535"], ["matInput", "", "formControlName", "community"], ["formControlName", "version"], ["value", "1"], ["value", "2c"], ["value", "3"], [1, "connectivity-section"], ["type", "button", "mat-stroked-button", "", 1, "test-btn", 3, "click", "disabled"], ["class", "spinning", 4, "ngIf"], ["class", "connectivity-result", 4, "ngIf"], [1, "section-header", 3, "click"], [1, "expand-icon", 3, "ngClass"], [1, "expandable-content", 3, "ngClass"], ["matInput", "", "type", "number", "formControlName", "timeout", "min", "1000", "max", "30000", "step", "500"], ["matInput", "", "type", "number", "formControlName", "retries", "min", "1", "max", "10"], ["class", "selection-count", 4, "ngIf"], [1, "metrics-tabs"], [3, "label", 4, "ngFor", "ngForOf"], [1, "custom-oid-section"], ["type", "button", "mat-stroked-button", "", 1, "custom-oid-btn", 3, "click"], ["class", "custom-oid-input", 4, "ngIf"], ["class", "selected-oids", 4, "ngIf"], [1, "form-actions"], ["type", "submit", "mat-raised-button", "", "color", "primary", 1, "scan-btn", 3, "disabled"], ["class", "results-card", 4, "ngIf"], [1, "quick-stats"], [1, "stat-card"], [1, "stat-icon", "success"], [1, "stat-content"], [1, "stat-value"], [1, "stat-label"], ["class", "stat-card", 4, "ngIf"], [1, "stat-icon"], [1, "stat-icon", "critical"], [1, "spinning"], [1, "connectivity-result"], [1, "result-indicator", 3, "ngClass"], ["class", "duration", 4, "ngIf"], [1, "duration"], [1, "selection-count"], [3, "label"], ["mat-tab-label", ""], [1, "metrics-grid"], ["class", "metric-card", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "category-count"], [1, "metric-card", 3, "click", "ngClass"], [1, "metric-header"], [1, "metric-icon"], [1, "metric-title"], ["class", "metric-unit", 4, "ngIf"], ["class", "selection-icon", 4, "ngIf"], [1, "metric-description"], [1, "metric-footer"], [1, "metric-oid"], ["class", "warning-icon", "matTooltip", "M\xE9trique avec seuil critique", 4, "ngIf"], [1, "metric-unit"], [1, "selection-icon"], ["matTooltip", "M\xE9trique avec seuil critique", 1, "warning-icon"], [1, "custom-oid-input"], ["appearance", "outline"], ["matInput", "", "formControlName", "customOid", "placeholder", "1.3.6.1.2.1.1.1.0", 3, "keyup.enter"], ["type", "button", "mat-icon-button", "", 3, "click", "disabled"], [1, "selected-oids"], [1, "selected-title"], [1, "selected-chips"], [3, "removable", "removed", 4, "ngFor", "ngForOf"], [3, "removed", "removable"], ["matChipAvatar", ""], ["matChipRemove", ""], [1, "results-card"], [1, "results-count"], [1, "results-summary"], ["class", "summary-card normal", 4, "ngIf"], ["class", "summary-card warning", 4, "ngIf"], ["class", "summary-card critical", 4, "ngIf"], [1, "results-table"], ["class", "result-row", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "summary-card", "normal"], [1, "summary-content"], [1, "summary-count"], [1, "summary-label"], [1, "summary-card", "warning"], [1, "summary-card", "critical"], [1, "result-row", 3, "ngClass"], [1, "result-header"], [1, "result-title"], ["class", "metric-icon", 3, "color", 4, "ngIf"], ["class", "metric-icon", 4, "ngIf"], [1, "title-content"], [1, "oid-code"], [1, "result-status"], ["class", "result-content", 4, "ngIf"], ["class", "result-error", 4, "ngIf"], ["class", "result-description", 4, "ngIf"], [1, "result-content"], [1, "value-display"], [1, "formatted-value"], [1, "value"], ["class", "unit", 4, "ngIf"], [1, "interpretation"], [1, "raw-data"], [1, "raw-label"], [1, "raw-value"], [1, "unit"], [1, "result-error"], [1, "result-description"]], template: function ManualScanComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4)(5, "mat-icon", 5);
        \u0275\u0275text(6, "network_check");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Scan SNMP Manuel ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 6);
        \u0275\u0275text(9, "Surveillez vos \xE9quipements r\xE9seau en temps r\xE9el");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(10, ManualScanComponent_div_10_Template, 18, 3, "div", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 8)(12, "mat-card", 9)(13, "mat-card-header")(14, "mat-card-title")(15, "mat-icon", 10);
        \u0275\u0275text(16, "settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(17, " Configuration SNMP ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "mat-card-content")(19, "form", 11);
        \u0275\u0275listener("ngSubmit", function ManualScanComponent_Template_form_ngSubmit_19_listener() {
          return ctx.performScan();
        });
        \u0275\u0275elementStart(20, "div", 12)(21, "h3", 13)(22, "mat-icon", 10);
        \u0275\u0275text(23, "link");
        \u0275\u0275elementEnd();
        \u0275\u0275text(24, " Connexion ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "div", 14)(26, "mat-form-field", 15)(27, "mat-label");
        \u0275\u0275text(28, "Adresse IP");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "mat-icon", 16);
        \u0275\u0275text(30, "computer");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 17);
        \u0275\u0275elementStart(32, "mat-hint");
        \u0275\u0275text(33, "Adresse IP de l'\xE9quipement \xE0 scanner");
        \u0275\u0275elementEnd();
        \u0275\u0275template(34, ManualScanComponent_mat_error_34_Template, 2, 1, "mat-error", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "mat-form-field", 15)(36, "mat-label");
        \u0275\u0275text(37, "Port");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "mat-icon", 16);
        \u0275\u0275text(39, "electrical_services");
        \u0275\u0275elementEnd();
        \u0275\u0275element(40, "input", 19);
        \u0275\u0275elementStart(41, "mat-hint");
        \u0275\u0275text(42, "Port SNMP (d\xE9faut: 161)");
        \u0275\u0275elementEnd();
        \u0275\u0275template(43, ManualScanComponent_mat_error_43_Template, 2, 1, "mat-error", 18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 14)(45, "mat-form-field", 15)(46, "mat-label");
        \u0275\u0275text(47, "Communaut\xE9");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "mat-icon", 16);
        \u0275\u0275text(49, "key");
        \u0275\u0275elementEnd();
        \u0275\u0275element(50, "input", 20);
        \u0275\u0275elementStart(51, "mat-hint");
        \u0275\u0275text(52, "Cha\xEEne d'authentification SNMP");
        \u0275\u0275elementEnd();
        \u0275\u0275template(53, ManualScanComponent_mat_error_53_Template, 2, 1, "mat-error", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "mat-form-field", 15)(55, "mat-label");
        \u0275\u0275text(56, "Version SNMP");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "mat-icon", 16);
        \u0275\u0275text(58, "info");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "mat-select", 21)(60, "mat-option", 22);
        \u0275\u0275text(61, "SNMP v1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "mat-option", 23);
        \u0275\u0275text(63, "SNMP v2c");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "mat-option", 24);
        \u0275\u0275text(65, "SNMP v3");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(66, "mat-hint");
        \u0275\u0275text(67, "Protocole SNMP \xE0 utiliser");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(68, "div", 25)(69, "button", 26);
        \u0275\u0275listener("click", function ManualScanComponent_Template_button_click_69_listener() {
          return ctx.testConnectivity();
        });
        \u0275\u0275template(70, ManualScanComponent_mat_icon_70_Template, 2, 0, "mat-icon", 18)(71, ManualScanComponent_mat_icon_71_Template, 2, 0, "mat-icon", 27);
        \u0275\u0275text(72);
        \u0275\u0275elementEnd();
        \u0275\u0275template(73, ManualScanComponent_div_73_Template, 7, 4, "div", 28);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(74, "div", 12)(75, "div", 29);
        \u0275\u0275listener("click", function ManualScanComponent_Template_div_click_75_listener() {
          return ctx.showAdvancedSettings = !ctx.showAdvancedSettings;
        });
        \u0275\u0275elementStart(76, "h3", 13)(77, "mat-icon", 10);
        \u0275\u0275text(78, "tune");
        \u0275\u0275elementEnd();
        \u0275\u0275text(79, " Param\xE8tres avanc\xE9s ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "mat-icon", 30);
        \u0275\u0275text(81, " expand_more ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(82, "div", 31)(83, "div", 14)(84, "mat-form-field", 15)(85, "mat-label");
        \u0275\u0275text(86, "Timeout (ms)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(87, "mat-icon", 16);
        \u0275\u0275text(88, "timer");
        \u0275\u0275elementEnd();
        \u0275\u0275element(89, "input", 32);
        \u0275\u0275elementStart(90, "mat-hint");
        \u0275\u0275text(91, "D\xE9lai d'attente pour chaque requ\xEAte");
        \u0275\u0275elementEnd();
        \u0275\u0275template(92, ManualScanComponent_mat_error_92_Template, 2, 1, "mat-error", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(93, "mat-form-field", 15)(94, "mat-label");
        \u0275\u0275text(95, "Tentatives");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(96, "mat-icon", 16);
        \u0275\u0275text(97, "refresh");
        \u0275\u0275elementEnd();
        \u0275\u0275element(98, "input", 33);
        \u0275\u0275elementStart(99, "mat-hint");
        \u0275\u0275text(100, "Nombre de tentatives en cas d'\xE9chec");
        \u0275\u0275elementEnd();
        \u0275\u0275template(101, ManualScanComponent_mat_error_101_Template, 2, 1, "mat-error", 18);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(102, "div", 12)(103, "h3", 13)(104, "mat-icon", 10);
        \u0275\u0275text(105, "analytics");
        \u0275\u0275elementEnd();
        \u0275\u0275text(106, " M\xE9triques \xE0 surveiller ");
        \u0275\u0275template(107, ManualScanComponent_span_107_Template, 2, 2, "span", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(108, "mat-tab-group", 35);
        \u0275\u0275template(109, ManualScanComponent_mat_tab_109_Template, 4, 2, "mat-tab", 36);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(110, "div", 37)(111, "button", 38);
        \u0275\u0275listener("click", function ManualScanComponent_Template_button_click_111_listener() {
          return ctx.showCustomOidInput = !ctx.showCustomOidInput;
        });
        \u0275\u0275elementStart(112, "mat-icon");
        \u0275\u0275text(113, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(114, " Ajouter un OID personnalis\xE9 ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(115, ManualScanComponent_div_115_Template, 13, 2, "div", 39);
        \u0275\u0275elementEnd();
        \u0275\u0275template(116, ManualScanComponent_div_116_Template, 8, 1, "div", 40);
        \u0275\u0275elementStart(117, "div", 41)(118, "button", 42);
        \u0275\u0275template(119, ManualScanComponent_mat_icon_119_Template, 2, 0, "mat-icon", 18)(120, ManualScanComponent_mat_icon_120_Template, 2, 0, "mat-icon", 27);
        \u0275\u0275text(121);
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275template(122, ManualScanComponent_mat_card_122_Template, 15, 6, "mat-card", 43);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        let tmp_12_0;
        let tmp_13_0;
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.scanResults.length > 0);
        \u0275\u0275advance(9);
        \u0275\u0275property("formGroup", ctx.scanForm);
        \u0275\u0275advance(15);
        \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.scanForm.get("ip")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.scanForm.get("ip")) == null ? null : tmp_2_0.touched));
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.scanForm.get("port")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.scanForm.get("port")) == null ? null : tmp_3_0.touched));
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.scanForm.get("community")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.scanForm.get("community")) == null ? null : tmp_4_0.touched));
        \u0275\u0275advance(16);
        \u0275\u0275property("disabled", ctx.isTestingConnectivity || ((tmp_5_0 = ctx.scanForm.get("ip")) == null ? null : tmp_5_0.invalid) || ((tmp_5_0 = ctx.scanForm.get("port")) == null ? null : tmp_5_0.invalid));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isTestingConnectivity);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isTestingConnectivity);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isTestingConnectivity ? "Test en cours..." : "Tester la connectivit\xE9", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.connectivityResult);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(23, _c0, ctx.showAdvancedSettings));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(25, _c0, ctx.showAdvancedSettings));
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ((tmp_12_0 = ctx.scanForm.get("timeout")) == null ? null : tmp_12_0.invalid) && ((tmp_12_0 = ctx.scanForm.get("timeout")) == null ? null : tmp_12_0.touched));
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ((tmp_13_0 = ctx.scanForm.get("retries")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx.scanForm.get("retries")) == null ? null : tmp_13_0.touched));
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.getSelectedOidsCount() > 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.categories);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.showCustomOidInput);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.getSelectedOidsCount() > 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.isLoading || ctx.getSelectedOidsCount() === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isLoading ? "Scan en cours..." : "Lancer le scan", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.scanResults.length > 0);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, MatButton, MatIconButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatInput, MatSelect, MatOption, MatChip, MatChipAvatar, MatChipRemove, MatChipSet, MatTooltip, MatTabLabel, MatTab, MatTabGroup], styles: ['@charset "UTF-8";\n\n\n\n.manual-scan-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1400px;\n  margin: 0 auto;\n  min-height: calc(100vh - 100px);\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 32px;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n}\n.page-header[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.page-header[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 2.5rem;\n  font-weight: 300;\n  color: #1976d2;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.page-header[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%]   .title-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  width: 2.5rem;\n  height: 2.5rem;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%]   .title-icon[_ngcontent-%COMP%] {\n    font-size: 2rem;\n    width: 2rem;\n    height: 2rem;\n  }\n}\n.page-header[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   .page-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  color: #666;\n  font-weight: 400;\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-around;\n  }\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 120px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon.success[_ngcontent-%COMP%] {\n  color: #4CAF50;\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon.critical[_ngcontent-%COMP%] {\n  color: #F44336;\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-content[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  line-height: 1;\n}\n.page-header[_ngcontent-%COMP%]   .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-content[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #666;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.content-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 24px;\n}\n@media (min-width: 1200px) {\n  .content-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .content-layout[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n  .content-layout[_ngcontent-%COMP%]   .results-card[_ngcontent-%COMP%] {\n    grid-column: 2;\n  }\n}\n.config-card[_ngcontent-%COMP%], .results-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.config-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%], .results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding: 24px;\n}\n.config-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%], .results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.4rem;\n  font-weight: 500;\n  color: #333;\n}\n.config-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   .section-icon[_ngcontent-%COMP%], .results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   .section-icon[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.config-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   .selection-count[_ngcontent-%COMP%], .config-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%], .results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   .selection-count[_ngcontent-%COMP%], .results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #666;\n  font-weight: 400;\n}\n.config-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%], .results-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 32px !important;\n}\n.form-section[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n.form-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0 0 24px 0;\n  font-size: 1.2rem;\n  font-weight: 500;\n  color: #333;\n}\n.form-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   .section-icon[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n  padding: 8px 0;\n  transition: all 0.2s ease;\n}\n.form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]:hover {\n  background: rgba(25, 118, 210, 0.04);\n  border-radius: 8px;\n  padding: 8px 16px;\n  margin: 0 -16px;\n}\n.form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .expand-icon[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease;\n}\n.form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .expand-icon.expanded[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.form-section[_ngcontent-%COMP%]   .expandable-content[_ngcontent-%COMP%] {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.3s ease;\n}\n.form-section[_ngcontent-%COMP%]   .expandable-content.expanded[_ngcontent-%COMP%] {\n  max-height: 200px;\n  margin-top: 16px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin-bottom: 20px;\n}\n@media (max-width: 768px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n}\n.form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-field[_ngcontent-%COMP%]   mat-icon[matPrefix][_ngcontent-%COMP%] {\n  color: #1976d2;\n  margin-right: 8px;\n}\n.form-field[_ngcontent-%COMP%]   mat-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #666;\n}\n.connectivity-section[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.connectivity-section[_ngcontent-%COMP%]   .test-btn[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  border: 2px solid #1976d2;\n  color: #1976d2;\n  font-weight: 500;\n  padding: 0 24px;\n  height: 44px;\n  border-radius: 22px;\n  transition: all 0.3s ease;\n}\n.connectivity-section[_ngcontent-%COMP%]   .test-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1976d2;\n  color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);\n}\n.connectivity-section[_ngcontent-%COMP%]   .test-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.connectivity-section[_ngcontent-%COMP%]   .connectivity-result[_ngcontent-%COMP%]   .result-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-weight: 500;\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease;\n}\n.connectivity-section[_ngcontent-%COMP%]   .connectivity-result[_ngcontent-%COMP%]   .result-indicator.success[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n  border: 1px solid #4caf50;\n}\n.connectivity-section[_ngcontent-%COMP%]   .connectivity-result[_ngcontent-%COMP%]   .result-indicator.error[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  border: 1px solid #f44336;\n}\n.connectivity-section[_ngcontent-%COMP%]   .connectivity-result[_ngcontent-%COMP%]   .result-indicator[_ngcontent-%COMP%]   .duration[_ngcontent-%COMP%] {\n  font-weight: normal;\n  opacity: 0.8;\n}\n.metrics-tabs[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.metrics-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-label .mdc-tab__text-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 500;\n}\n.metrics-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-label .mdc-tab__text-label .category-count {\n  background: rgba(25, 118, 210, 0.1);\n  color: #1976d2;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.metrics-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body-content {\n  padding: 24px 0;\n}\n.metrics-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 16px;\n}\n@media (max-width: 768px) {\n  .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.metric-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #e0e0e0;\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  position: relative;\n}\n.metric-card[_ngcontent-%COMP%]:hover {\n  border-color: #1976d2;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.15);\n}\n.metric-card.selected[_ngcontent-%COMP%] {\n  border-color: #1976d2;\n  background:\n    linear-gradient(\n      135deg,\n      #e3f2fd 0%,\n      #f3e5f5 100%);\n  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.2);\n}\n.metric-card[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n  flex-shrink: 0;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%]   .metric-title[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%]   .metric-title[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #333;\n  line-height: 1.2;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%]   .metric-title[_ngcontent-%COMP%]   .metric-unit[_ngcontent-%COMP%] {\n  background: rgba(25, 118, 210, 0.1);\n  color: #1976d2;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%]   .selection-icon[_ngcontent-%COMP%] {\n  color: #4caf50;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-description[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: 0.9rem;\n  color: #666;\n  line-height: 1.4;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-footer[_ngcontent-%COMP%]   .metric-oid[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.8rem;\n  color: #999;\n  background: #f5f5f5;\n  padding: 4px 8px;\n  border-radius: 6px;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-footer[_ngcontent-%COMP%]   .warning-icon[_ngcontent-%COMP%] {\n  color: #ff9800;\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.custom-oid-section[_ngcontent-%COMP%] {\n  margin-top: 32px;\n}\n.custom-oid-section[_ngcontent-%COMP%]   .custom-oid-btn[_ngcontent-%COMP%] {\n  border: 2px dashed #ccc;\n  color: #666;\n  padding: 16px 24px;\n  width: 100%;\n  border-radius: 12px;\n  transition: all 0.3s ease;\n}\n.custom-oid-section[_ngcontent-%COMP%]   .custom-oid-btn[_ngcontent-%COMP%]:hover {\n  border-color: #1976d2;\n  color: #1976d2;\n  background: rgba(25, 118, 210, 0.04);\n}\n.custom-oid-section[_ngcontent-%COMP%]   .custom-oid-input[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  margin-top: 16px;\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease;\n}\n.custom-oid-section[_ngcontent-%COMP%]   .custom-oid-input[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.selected-oids[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  padding: 24px;\n  background: #f8f9fa;\n  border-radius: 12px;\n  border: 1px solid #e9ecef;\n}\n.selected-oids[_ngcontent-%COMP%]   .selected-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 0 16px 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #333;\n}\n.selected-oids[_ngcontent-%COMP%]   .selected-chips[_ngcontent-%COMP%]     mat-chip {\n  margin: 4px;\n}\n.selected-oids[_ngcontent-%COMP%]   .selected-chips[_ngcontent-%COMP%]     mat-chip mat-icon[matChipAvatar] {\n  font-size: 16px !important;\n  width: 16px !important;\n  height: 16px !important;\n}\n.form-actions[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  display: flex;\n  justify-content: center;\n}\n.form-actions[_ngcontent-%COMP%]   .scan-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1976d2 0%,\n      #1565c0 100%);\n  color: white;\n  padding: 0 32px;\n  height: 48px;\n  border-radius: 24px;\n  font-weight: 600;\n  font-size: 1rem;\n  transition: all 0.3s ease;\n}\n.form-actions[_ngcontent-%COMP%]   .scan-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #1565c0 0%,\n      #0d47a1 100%);\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);\n}\n.form-actions[_ngcontent-%COMP%]   .scan-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.results-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 32px;\n}\n@media (max-width: 768px) {\n  .results-summary[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card.normal[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #e8f5e8 0%,\n      #c8e6c9 100%);\n  border: 1px solid #4caf50;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card.warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fff3e0 0%,\n      #ffcc02 100%);\n  border: 1px solid #ff9800;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card.critical[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ffebee 0%,\n      #ffcdd2 100%);\n  border: 1px solid #f44336;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:nth-child(1) {\n  color: #4caf50;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .warning[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #ff9800;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .critical[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-content[_ngcontent-%COMP%]   .summary-count[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.8rem;\n  font-weight: 700;\n  line-height: 1;\n}\n.results-summary[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-content[_ngcontent-%COMP%]   .summary-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 500;\n  opacity: 0.8;\n}\n.results-table[_ngcontent-%COMP%]   .result-row[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e0e0e0;\n  border-radius: 12px;\n  margin-bottom: 16px;\n  padding: 20px;\n  transition: all 0.3s ease;\n}\n.results-table[_ngcontent-%COMP%]   .result-row.normal[_ngcontent-%COMP%] {\n  border-left: 4px solid #4caf50;\n}\n.results-table[_ngcontent-%COMP%]   .result-row.warning[_ngcontent-%COMP%] {\n  border-left: 4px solid #ff9800;\n}\n.results-table[_ngcontent-%COMP%]   .result-row.critical[_ngcontent-%COMP%] {\n  border-left: 4px solid #f44336;\n  background: #ffebee;\n}\n.results-table[_ngcontent-%COMP%]   .result-row[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n}\n.results-table[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n.results-table[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  flex: 1;\n}\n.results-table[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-title[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.results-table[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-title[_ngcontent-%COMP%]   .title-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n}\n.results-table[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-title[_ngcontent-%COMP%]   .title-content[_ngcontent-%COMP%]   .oid-code[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.85rem;\n  color: #666;\n  background: #f5f5f5;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.results-table[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-status[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%]   .value-display[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%]   .value-display[_ngcontent-%COMP%]   .formatted-value[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  margin-bottom: 4px;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%]   .value-display[_ngcontent-%COMP%]   .formatted-value[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 600;\n  color: #1976d2;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%]   .value-display[_ngcontent-%COMP%]   .formatted-value[_ngcontent-%COMP%]   .unit[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #666;\n  font-weight: 500;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%]   .value-display[_ngcontent-%COMP%]   .interpretation[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #666;\n  font-style: italic;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%]   .raw-data[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  padding: 8px 12px;\n  border-radius: 6px;\n  font-size: 0.8rem;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%]   .raw-data[_ngcontent-%COMP%]   .raw-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #666;\n}\n.results-table[_ngcontent-%COMP%]   .result-content[_ngcontent-%COMP%]   .raw-data[_ngcontent-%COMP%]   .raw-value[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  color: #333;\n}\n.results-table[_ngcontent-%COMP%]   .result-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #c62828;\n  font-weight: 500;\n  margin-bottom: 16px;\n}\n.results-table[_ngcontent-%COMP%]   .result-description[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  font-size: 0.85rem;\n  color: #666;\n  line-height: 1.4;\n}\n.results-table[_ngcontent-%COMP%]   .result-description[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  margin-top: 2px;\n  flex-shrink: 0;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_spinning {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spinning 1s linear infinite;\n}\n  .success-snackbar {\n  background: #4caf50 !important;\n  color: white !important;\n}\n  .error-snackbar {\n  background: #f44336 !important;\n  color: white !important;\n}\n@media (max-width: 1200px) {\n  .content-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n}\n@media (max-width: 768px) {\n  .manual-scan-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .config-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%], .results-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    padding: 20px !important;\n  }\n  .form-section[_ngcontent-%COMP%] {\n    margin-bottom: 32px;\n  }\n  .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .result-row[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .quick-stats[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n    padding: 12px;\n    min-width: 100px;\n  }\n}\n/*# sourceMappingURL=manual-scan.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManualScanComponent, { className: "ManualScanComponent" });
})();

// src/app/features/snmp/models/scan-history.model.ts
var SNMP_VERSION_LABELS = {
  "1": "SNMP v1",
  "2c": "SNMP v2c",
  "3": "SNMP v3"
};

// src/app/features/snmp/components/scan-detail-dialog/scan-detail-dialog.component.ts
function ScanDetailDialogComponent_span_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("- ", ctx_r0.scan.errorMessage, "");
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(result_r2.oid);
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "mat-icon", 36);
    \u0275\u0275text(2, "help");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(result_r2.oidDescription);
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_div_12_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 39);
    \u0275\u0275text(2, "Valeur format\xE9e:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(result_r2.formattedValue);
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_div_12_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 39);
    \u0275\u0275text(2, "Interpr\xE9tation:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(result_r2.interpretation);
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_div_12_mat_chip_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(result_r2.snmpType);
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_div_12_mat_chip_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(result_r2.oidCategory);
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38)(2, "span", 39);
    \u0275\u0275text(3, "Valeur brute:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "code", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, ScanDetailDialogComponent_mat_card_83_div_8_div_12_div_6_Template, 5, 1, "div", 41)(7, ScanDetailDialogComponent_mat_card_83_div_8_div_12_div_7_Template, 5, 1, "div", 41);
    \u0275\u0275elementStart(8, "div", 42);
    \u0275\u0275template(9, ScanDetailDialogComponent_mat_card_83_div_8_div_12_mat_chip_9_Template, 2, 1, "mat-chip", 43)(10, ScanDetailDialogComponent_mat_card_83_div_8_div_12_mat_chip_10_Template, 2, 1, "mat-chip", 44);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(result_r2.value);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r2.formattedValue && result_r2.formattedValue !== result_r2.value);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r2.interpretation);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", result_r2.snmpType);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r2.oidCategory);
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "mat-icon", 50);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(result_r2.errorMessage);
  }
}
function ScanDetailDialogComponent_mat_card_83_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26)(2, "div", 27)(3, "mat-icon");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 29)(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, ScanDetailDialogComponent_mat_card_83_div_8_span_10_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, ScanDetailDialogComponent_mat_card_83_div_8_div_11_Template, 5, 1, "div", 31)(12, ScanDetailDialogComponent_mat_card_83_div_8_div_12_Template, 11, 5, "div", 32)(13, ScanDetailDialogComponent_mat_card_83_div_8_div_13_Template, 5, 1, "div", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("success", result_r2.success)("error", !result_r2.success);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("color", ctx_r0.getResultStatusColor(result_r2.success, result_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getResultStatusIcon(result_r2.success, result_r2.status), " ");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r0.getResultStatusColor(result_r2.success, result_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", result_r2.status || (result_r2.success ? "SUCC\xC8S" : "\xC9CHEC"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(result_r2.oidName || result_r2.oid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r2.oidName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r2.oidDescription);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r2.success && result_r2.value);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !result_r2.success && result_r2.errorMessage);
  }
}
function ScanDetailDialogComponent_mat_card_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 22)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
    \u0275\u0275text(4, "list");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-content")(7, "div", 23);
    \u0275\u0275template(8, ScanDetailDialogComponent_mat_card_83_div_8_Template, 14, 15, "div", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" R\xE9sultats d\xE9taill\xE9s (", ctx_r0.scan.results.length, " OIDs) ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.scan.results)("ngForTrackBy", ctx_r0.trackByOid);
  }
}
function ScanDetailDialogComponent_mat_card_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 52)(1, "mat-card-content")(2, "div", 53)(3, "mat-icon", 54);
    \u0275\u0275text(4, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "Aucun r\xE9sultat d\xE9taill\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Les d\xE9tails des OIDs ne sont pas disponibles pour ce scan.");
    \u0275\u0275elementEnd()()()();
  }
}
var ScanDetailDialogComponent = class _ScanDetailDialogComponent {
  constructor(dialogRef, scan) {
    this.dialogRef = dialogRef;
    this.scan = scan;
  }
  /**
   * Ferme la dialog
   */
  close() {
    this.dialogRef.close();
  }
  /**
   * Obtient la couleur de statut pour un résultat OID
   */
  getResultStatusColor(success, status) {
    if (!success)
      return "#F44336";
    switch (status) {
      case "CRITICAL":
        return "#F44336";
      case "WARNING":
        return "#FF9800";
      case "NORMAL":
        return "#4CAF50";
      default:
        return "#2196F3";
    }
  }
  /**
   * Obtient l'icône de statut pour un résultat OID
   */
  getResultStatusIcon(success, status) {
    if (!success)
      return "error";
    switch (status) {
      case "CRITICAL":
        return "error";
      case "WARNING":
        return "warning";
      case "NORMAL":
        return "check_circle";
      default:
        return "info";
    }
  }
  /**
   * Formate la durée en millisecondes
   */
  formatDuration(durationMs) {
    if (durationMs < 1e3) {
      return `${durationMs}ms`;
    } else if (durationMs < 6e4) {
      return `${(durationMs / 1e3).toFixed(1)}s`;
    } else {
      const minutes = Math.floor(durationMs / 6e4);
      const seconds = Math.floor(durationMs % 6e4 / 1e3);
      return `${minutes}min ${seconds}s`;
    }
  }
  /**
   * Formate la date
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  /**
   * TrackBy function pour optimiser le rendu de la liste
   */
  trackByOid(index, result) {
    return result.oid || index.toString();
  }
  static {
    this.\u0275fac = function ScanDetailDialogComponent_Factory(t) {
      return new (t || _ScanDetailDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScanDetailDialogComponent, selectors: [["app-scan-detail-dialog"]], decls: 90, vars: 21, consts: [[1, "scan-detail-dialog"], [1, "dialog-header"], ["mat-dialog-title", ""], [1, "title-icon"], ["mat-icon-button", "", "mat-dialog-close", "", "matTooltip", "Fermer", 1, "close-button"], [1, "dialog-content"], [1, "info-card"], [1, "info-grid"], [1, "info-row"], [1, "info-item"], [1, "info-icon"], [1, "info-details"], [1, "info-label"], [1, "info-value"], ["class", "error-msg", 4, "ngIf"], [1, "info-item", "full-width"], [1, "success-rate"], ["class", "results-card", 4, "ngIf"], ["class", "no-results-card", 4, "ngIf"], ["align", "end", 1, "dialog-actions"], ["mat-raised-button", "", "color", "primary", "mat-dialog-close", ""], [1, "error-msg"], [1, "results-card"], [1, "results-container"], ["class", "result-item", 3, "success", "error", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "result-item"], [1, "result-header"], [1, "result-status"], [1, "status-text"], [1, "result-oid"], ["class", "oid-code", 4, "ngIf"], ["class", "result-description", 4, "ngIf"], ["class", "result-value", 4, "ngIf"], ["class", "result-error", 4, "ngIf"], [1, "oid-code"], [1, "result-description"], [1, "desc-icon"], [1, "result-value"], [1, "value-section"], [1, "value-label"], [1, "raw-value"], ["class", "value-section", 4, "ngIf"], [1, "metadata"], ["class", "type-chip", 4, "ngIf"], ["class", "category-chip", 4, "ngIf"], [1, "formatted-value"], [1, "interpretation"], [1, "type-chip"], [1, "category-chip"], [1, "result-error"], [1, "error-icon"], [1, "error-message"], [1, "no-results-card"], [1, "no-results"], [1, "no-results-icon"]], template: function ScanDetailDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "mat-icon", 3);
        \u0275\u0275text(4, "info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "button", 4)(7, "mat-icon");
        \u0275\u0275text(8, "close");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "mat-dialog-content", 5)(10, "mat-card", 6)(11, "mat-card-header")(12, "mat-card-title")(13, "mat-icon");
        \u0275\u0275text(14, "settings");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Informations du Scan ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "mat-card-content")(17, "div", 7)(18, "div", 8)(19, "div", 9)(20, "mat-icon", 10);
        \u0275\u0275text(21, "router");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "div", 11)(23, "span", 12);
        \u0275\u0275text(24, "Cible");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "span", 13);
        \u0275\u0275text(26);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "div", 9)(28, "mat-icon", 10);
        \u0275\u0275text(29, "schedule");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div", 11)(31, "span", 12);
        \u0275\u0275text(32, "Date du scan");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "span", 13);
        \u0275\u0275text(34);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(35, "div", 8)(36, "div", 9)(37, "mat-icon", 10);
        \u0275\u0275text(38, "info");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "div", 11)(40, "span", 12);
        \u0275\u0275text(41, "Version SNMP");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "span", 13);
        \u0275\u0275text(43);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(44, "div", 9)(45, "mat-icon", 10);
        \u0275\u0275text(46, "key");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "div", 11)(48, "span", 12);
        \u0275\u0275text(49, "Communaut\xE9");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "span", 13);
        \u0275\u0275text(51);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(52, "div", 8)(53, "div", 9)(54, "mat-icon", 10);
        \u0275\u0275text(55);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "div", 11)(57, "span", 12);
        \u0275\u0275text(58, "Statut g\xE9n\xE9ral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "span", 13);
        \u0275\u0275text(60);
        \u0275\u0275template(61, ScanDetailDialogComponent_span_61_Template, 2, 1, "span", 14);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(62, "div", 9)(63, "mat-icon", 10);
        \u0275\u0275text(64, "timer");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "div", 11)(66, "span", 12);
        \u0275\u0275text(67, "Dur\xE9e d'ex\xE9cution");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "span", 13);
        \u0275\u0275text(69);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(70, "div", 8)(71, "div", 15)(72, "mat-icon", 10);
        \u0275\u0275text(73, "assessment");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "div", 11)(75, "span", 12);
        \u0275\u0275text(76, "R\xE9sultats OIDs");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "span", 13)(78, "strong");
        \u0275\u0275text(79);
        \u0275\u0275elementEnd();
        \u0275\u0275text(80, " OIDs r\xE9cup\xE9r\xE9s ");
        \u0275\u0275elementStart(81, "span", 16);
        \u0275\u0275text(82);
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275template(83, ScanDetailDialogComponent_mat_card_83_Template, 9, 3, "mat-card", 17)(84, ScanDetailDialogComponent_mat_card_84_Template, 9, 0, "mat-card", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "mat-dialog-actions", 19)(86, "button", 20)(87, "mat-icon");
        \u0275\u0275text(88, "close");
        \u0275\u0275elementEnd();
        \u0275\u0275text(89, " Fermer ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" D\xE9tails du Scan SNMP #", ctx.scan.id, " ");
        \u0275\u0275advance(21);
        \u0275\u0275textInterpolate2("", ctx.scan.targetIp, ":", ctx.scan.targetPort, "");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.formatDate(ctx.scan.createdAt));
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.scan.snmpVersion);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.scan.community);
        \u0275\u0275advance(3);
        \u0275\u0275styleProp("color", ctx.scan.success ? "#4CAF50" : "#F44336");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.scan.success ? "check_circle" : "error", " ");
        \u0275\u0275advance(4);
        \u0275\u0275styleProp("color", ctx.scan.success ? "#4CAF50" : "#F44336");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.scan.success ? "Succ\xE8s" : "\xC9chec", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.scan.errorMessage);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.formatDuration(ctx.scan.durationMs));
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate2("", ctx.scan.successfulOidsCount, "/", ctx.scan.oidsCount, "");
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("color", ctx.scan.successRate >= 80 ? "#4CAF50" : ctx.scan.successRate >= 50 ? "#FF9800" : "#F44336");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" (", ctx.scan.successRate.toFixed(1), "%) ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.scan.results && ctx.scan.results.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.scan.results || ctx.scan.results.length === 0);
      }
    }, dependencies: [NgForOf, NgIf, MatButton, MatIconButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatChip, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, MatTooltip], styles: ['\n\n.scan-detail-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  min-width: 600px;\n  max-width: 900px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px 0;\n  border-bottom: 1px solid #e0e0e0;\n  margin-bottom: 16px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 500;\n  color: #1976d2;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .title-icon[_ngcontent-%COMP%] {\n  margin-right: 12px;\n  font-size: 1.8rem;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  margin-left: 16px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%] {\n  padding: 0 24px !important;\n  overflow-y: auto;\n  flex: 1;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%], .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-card[_ngcontent-%COMP%], .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .no-results-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%], .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%], .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .no-results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-size: 1.2rem;\n  color: #424242;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .no-results-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  color: #1976d2;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  margin-bottom: 16px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  flex: 1;\n  gap: 12px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item.full-width[_ngcontent-%COMP%] {\n  flex: 1 1 100%;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {\n  color: #1976d2;\n  margin-top: 2px;\n  font-size: 1.2rem;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-details[_ngcontent-%COMP%]   .info-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #757575;\n  font-weight: 500;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-details[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #424242;\n  font-weight: 400;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-details[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%]   .error-msg[_ngcontent-%COMP%] {\n  color: #f44336;\n  font-style: italic;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-details[_ngcontent-%COMP%]   .info-value[_ngcontent-%COMP%]   .success-rate[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-left: 8px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%] {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  padding: 16px;\n  background-color: #fafafa;\n  transition: all 0.2s ease;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item.success[_ngcontent-%COMP%] {\n  border-left: 4px solid #4caf50;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item.error[_ngcontent-%COMP%] {\n  border-left: 4px solid #f44336;\n  background-color: #fff5f5;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 12px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-status[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-status[_ngcontent-%COMP%]   .status-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-oid[_ngcontent-%COMP%] {\n  text-align: right;\n  max-width: 60%;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-oid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #1976d2;\n  display: block;\n  margin-bottom: 4px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-oid[_ngcontent-%COMP%]   .oid-code[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  color: #757575;\n  background-color: #f5f5f5;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-description[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  padding: 8px 12px;\n  background-color: #e3f2fd;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  color: #1565c0;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-description[_ngcontent-%COMP%]   .desc-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .value-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 8px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .value-section[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 12px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .value-section[_ngcontent-%COMP%]   .value-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #424242;\n  min-width: 140px;\n  font-size: 0.875rem;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .value-section[_ngcontent-%COMP%]   .raw-value[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  background-color: #f5f5f5;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  flex: 1;\n  word-break: break-all;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .value-section[_ngcontent-%COMP%]   .formatted-value[_ngcontent-%COMP%], .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .value-section[_ngcontent-%COMP%]   .interpretation[_ngcontent-%COMP%] {\n  color: #424242;\n  flex: 1;\n  font-size: 0.875rem;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .value-section[_ngcontent-%COMP%]   .interpretation[_ngcontent-%COMP%] {\n  color: #1976d2;\n  font-weight: 500;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .metadata[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 8px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .metadata[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  height: 24px;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .metadata[_ngcontent-%COMP%]   mat-chip.type-chip[_ngcontent-%COMP%] {\n  background-color: #e1f5fe;\n  color: #0277bd;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%]   .metadata[_ngcontent-%COMP%]   mat-chip.category-chip[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  background-color: #ffebee;\n  border-radius: 4px;\n  color: #c62828;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-error[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-error[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .no-results[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #757575;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .no-results[_ngcontent-%COMP%]   .no-results-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .no-results[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  color: #424242;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .no-results[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%] {\n  padding: 16px 24px !important;\n  border-top: 1px solid #e0e0e0;\n  margin: 0;\n}\n.scan-detail-dialog[_ngcontent-%COMP%]   .dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n@media (max-width: 768px) {\n  .scan-detail-dialog[_ngcontent-%COMP%] {\n    min-width: 95vw;\n    max-width: 95vw;\n  }\n  .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .scan-detail-dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .results-container[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   .result-header[_ngcontent-%COMP%]   .result-oid[_ngcontent-%COMP%] {\n    text-align: left;\n    max-width: 100%;\n  }\n}\n.result-item[_ngcontent-%COMP%] {\n  opacity: 1;\n  transition: opacity 0.3s ease;\n}\n/*# sourceMappingURL=scan-detail-dialog.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScanDetailDialogComponent, { className: "ScanDetailDialogComponent" });
})();

// src/app/features/snmp/services/scan-history.service.ts
var ScanHistoryService = class _ScanHistoryService {
  constructor(http) {
    this.http = http;
    this.baseUrl = `${environment.apiUrl}/snmp/history`;
  }
  /**
   * Récupère tous les scans avec pagination
   */
  getAllScans(page = 0, size = 20) {
    console.log("\u{1F4CB} R\xE9cup\xE9ration de l'historique des scans - page:", page, "taille:", size);
    const params = new HttpParams().set("page", page.toString()).set("size", size.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }
  /**
   * Récupère les détails complets d'un scan spécifique
   */
  getScanDetails(scanId) {
    console.log("\u{1F50D} R\xE9cup\xE9ration des d\xE9tails du scan ID:", scanId);
    return this.http.get(`${this.baseUrl}/${scanId}`);
  }
  /**
   * Récupère tous les scans pour une IP spécifique
   */
  getScansByIp(ip) {
    console.log("\u{1F50D} R\xE9cup\xE9ration des scans pour IP:", ip);
    return this.http.get(`${this.baseUrl}/by-ip/${ip}`);
  }
  /**
   * Recherche dans l'historique
   */
  searchScans(searchTerm) {
    console.log("\u{1F50D} Recherche dans l'historique:", searchTerm);
    const params = new HttpParams().set("q", searchTerm);
    return this.http.get(`${this.baseUrl}/search`, { params });
  }
  /**
   * Récupère les scans récents
   */
  getRecentScans(hours = 24) {
    console.log("\u{1F4C5} R\xE9cup\xE9ration des scans r\xE9cents - derni\xE8res", hours, "heures");
    const params = new HttpParams().set("hours", hours.toString());
    return this.http.get(`${this.baseUrl}/recent`, { params });
  }
  /**
   * Récupère les statistiques globales
   */
  getStatistics() {
    console.log("\u{1F4CA} R\xE9cup\xE9ration des statistiques globales");
    return this.http.get(`${this.baseUrl}/statistics`);
  }
  /**
   * Supprime un scan de l'historique
   */
  deleteScan(scanId) {
    console.log("\u{1F5D1}\uFE0F Suppression du scan ID:", scanId);
    return this.http.delete(`${this.baseUrl}/${scanId}`);
  }
  /**
   * Nettoyage automatique des anciens scans
   */
  cleanupOldScans(daysToKeep = 30) {
    console.log("\u{1F9F9} Nettoyage des scans ant\xE9rieurs \xE0", daysToKeep, "jours");
    const params = new HttpParams().set("daysToKeep", daysToKeep.toString());
    return this.http.post(`${this.baseUrl}/cleanup`, null, { params });
  }
  /**
   * Récupère les scans avec filtres avancés
   */
  getScansWithFilter(filter) {
    console.log("\u{1F50D} R\xE9cup\xE9ration des scans avec filtres:", filter);
    let params = new HttpParams();
    if (filter.targetIp) {
      return this.getScansByIp(filter.targetIp);
    }
    if (filter.searchTerm) {
      return this.searchScans(filter.searchTerm);
    }
    if (filter.hoursBack) {
      return this.getRecentScans(filter.hoursBack);
    }
    return this.getAllScans(filter.page || 0, filter.size || 20).pipe(
      // Extraire seulement le contenu de la réponse paginée
      map((response) => response.content)
    );
  }
  // === MÉTHODES UTILITAIRES ===
  /**
   * Formate la durée en millisecondes en texte lisible
   */
  formatDuration(durationMs) {
    if (durationMs < 1e3) {
      return `${durationMs}ms`;
    } else if (durationMs < 6e4) {
      return `${(durationMs / 1e3).toFixed(1)}s`;
    } else {
      const minutes = Math.floor(durationMs / 6e4);
      const seconds = Math.floor(durationMs % 6e4 / 1e3);
      return `${minutes}min ${seconds}s`;
    }
  }
  /**
   * Formate la date de création
   */
  formatCreatedAt(createdAt) {
    const date = new Date(createdAt);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 24 * 60 * 60 * 1e3) {
      if (diffMs < 60 * 60 * 1e3) {
        const minutes = Math.floor(diffMs / (60 * 1e3));
        return `Il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
      } else {
        const hours = Math.floor(diffMs / (60 * 60 * 1e3));
        return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`;
      }
    }
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  /**
   * Calcule la couleur de statut pour un scan
   */
  getScanStatusColor(scan) {
    if (!scan.success)
      return "#F44336";
    if (scan.successRate < 50)
      return "#FF9800";
    if (scan.successRate < 100)
      return "#FFC107";
    return "#4CAF50";
  }
  /**
   * Obtient l'icône de statut pour un scan
   */
  getScanStatusIcon(scan) {
    if (!scan.success)
      return "error";
    if (scan.successRate < 50)
      return "warning";
    if (scan.successRate < 100)
      return "info";
    return "check_circle";
  }
  /**
   * Obtient le texte de statut pour un scan
   */
  getScanStatusText(scan) {
    if (!scan.success)
      return "\xC9chec";
    if (scan.successRate < 50)
      return "Succ\xE8s partiel";
    if (scan.successRate < 100)
      return "Succ\xE8s incomplet";
    return "Succ\xE8s";
  }
  static {
    this.\u0275fac = function ScanHistoryService_Factory(t) {
      return new (t || _ScanHistoryService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ScanHistoryService, factory: _ScanHistoryService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/snmp/components/scan-history/scan-history.component.ts
var _c02 = () => [10, 20, 50, 100];
function ScanHistoryComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "mat-card", 19)(2, "mat-card-content")(3, "div", 20)(4, "mat-icon", 21);
    \u0275\u0275text(5, "assessment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 22)(7, "span", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 24);
    \u0275\u0275text(10, "Total des scans");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(11, "mat-card", 25)(12, "mat-card-content")(13, "div", 20)(14, "mat-icon", 21);
    \u0275\u0275text(15, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 22)(17, "span", 23);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 24);
    \u0275\u0275text(20, "Scans r\xE9ussis");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(21, "mat-card", 26)(22, "mat-card-content")(23, "div", 20)(24, "mat-icon", 21);
    \u0275\u0275text(25, "trending_up");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 22)(27, "span", 23);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 24);
    \u0275\u0275text(30, "Taux de succ\xE8s");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(31, "mat-card", 27)(32, "mat-card-content")(33, "div", 20)(34, "mat-icon", 21);
    \u0275\u0275text(35, "speed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 22)(37, "span", 23);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 24);
    \u0275\u0275text(40, "Dur\xE9e moyenne");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.statistics.totalScans);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.statistics.successfulScans);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r0.statistics.successRate.toFixed(1), "%");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.formatDuration(ctx_r0.statistics.averageDurationMs));
  }
}
function ScanHistoryComponent_mat_chip_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 28)(1, "mat-icon");
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.statistics.scansLast24h, " scan(s) aujourd'hui ");
  }
}
function ScanHistoryComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement de l'historique...");
    \u0275\u0275elementEnd()();
  }
}
function ScanHistoryComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "mat-icon");
    \u0275\u0275text(2, "history_toggle_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucun scan dans l'historique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "L'historique des scans s'affichera ici une fois que vous aurez lanc\xE9 des scans SNMP manuels");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 31)(8, "mat-icon");
    \u0275\u0275text(9, "play_arrow");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Lancer un scan SNMP ");
    \u0275\u0275elementEnd()();
  }
}
function ScanHistoryComponent_div_33_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275text(1, "ID");
    \u0275\u0275elementEnd();
  }
}
function ScanHistoryComponent_div_33_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 47)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const scan_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", scan_r3.id, "");
  }
}
function ScanHistoryComponent_div_33_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275text(1, "Cible");
    \u0275\u0275elementEnd();
  }
}
function ScanHistoryComponent_div_33_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 47)(1, "div", 48)(2, "mat-icon", 49);
    \u0275\u0275text(3, "router");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 50)(5, "span", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 53);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const scan_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(scan_r4.targetIp);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(":", scan_r4.targetPort, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatSnmpVersion(scan_r4.snmpVersion));
  }
}
function ScanHistoryComponent_div_33_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275text(1, "Date");
    \u0275\u0275elementEnd();
  }
}
function ScanHistoryComponent_div_33_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 47)(1, "div", 54)(2, "mat-icon", 55);
    \u0275\u0275text(3, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const scan_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatCreatedAt(scan_r5.createdAt));
  }
}
function ScanHistoryComponent_div_33_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275text(1, "Statut");
    \u0275\u0275elementEnd();
  }
}
function ScanHistoryComponent_div_33_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 47)(1, "mat-chip", 56)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const scan_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-color", ctx_r0.getStatusColor(scan_r6))("color", "white");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getStatusIcon(scan_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStatusText(scan_r6), " ");
  }
}
function ScanHistoryComponent_div_33_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275text(1, "OIDs");
    \u0275\u0275elementEnd();
  }
}
function ScanHistoryComponent_div_33_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 47)(1, "div", 57)(2, "div", 58);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 59);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const scan_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", scan_r7.successfulOidsCount, "/", scan_r7.oidsCount, " ");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", scan_r7.successRate >= 80 ? "#4CAF50" : scan_r7.successRate >= 50 ? "#FF9800" : "#F44336");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", scan_r7.successRate.toFixed(1), "% ");
  }
}
function ScanHistoryComponent_div_33_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275text(1, "Dur\xE9e");
    \u0275\u0275elementEnd();
  }
}
function ScanHistoryComponent_div_33_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 47)(1, "div", 60)(2, "mat-icon", 61);
    \u0275\u0275text(3, "timer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const scan_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatDuration(scan_r8.durationMs));
  }
}
function ScanHistoryComponent_div_33_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function ScanHistoryComponent_div_33_td_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 47)(1, "div", 62)(2, "button", 63);
    \u0275\u0275listener("click", function ScanHistoryComponent_div_33_td_22_Template_button_click_2_listener() {
      const scan_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.voirDetails(scan_r10));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 64);
    \u0275\u0275listener("click", function ScanHistoryComponent_div_33_td_22_Template_button_click_5_listener() {
      const scan_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.relancerScan(scan_r10));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "refresh");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 65);
    \u0275\u0275listener("click", function ScanHistoryComponent_div_33_td_22_Template_button_click_8_listener() {
      const scan_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.supprimerScan(scan_r10));
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "delete");
    \u0275\u0275elementEnd()()()();
  }
}
function ScanHistoryComponent_div_33_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function ScanHistoryComponent_div_33_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 67);
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    \u0275\u0275classProp("success-row", row_r11.success)("error-row", !row_r11.success);
  }
}
function ScanHistoryComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "table", 33);
    \u0275\u0275elementContainerStart(2, 34);
    \u0275\u0275template(3, ScanHistoryComponent_div_33_th_3_Template, 2, 0, "th", 35)(4, ScanHistoryComponent_div_33_td_4_Template, 3, 1, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 37);
    \u0275\u0275template(6, ScanHistoryComponent_div_33_th_6_Template, 2, 0, "th", 35)(7, ScanHistoryComponent_div_33_td_7_Template, 11, 3, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 38);
    \u0275\u0275template(9, ScanHistoryComponent_div_33_th_9_Template, 2, 0, "th", 35)(10, ScanHistoryComponent_div_33_td_10_Template, 6, 1, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 39);
    \u0275\u0275template(12, ScanHistoryComponent_div_33_th_12_Template, 2, 0, "th", 35)(13, ScanHistoryComponent_div_33_td_13_Template, 5, 6, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 40);
    \u0275\u0275template(15, ScanHistoryComponent_div_33_th_15_Template, 2, 0, "th", 35)(16, ScanHistoryComponent_div_33_td_16_Template, 6, 5, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 41);
    \u0275\u0275template(18, ScanHistoryComponent_div_33_th_18_Template, 2, 0, "th", 35)(19, ScanHistoryComponent_div_33_td_19_Template, 6, 1, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 42);
    \u0275\u0275template(21, ScanHistoryComponent_div_33_th_21_Template, 2, 0, "th", 35)(22, ScanHistoryComponent_div_33_td_22_Template, 11, 0, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(23, ScanHistoryComponent_div_33_tr_23_Template, 1, 0, "tr", 43)(24, ScanHistoryComponent_div_33_tr_24_Template, 1, 4, "tr", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "mat-paginator", 45, 0);
    \u0275\u0275listener("page", function ScanHistoryComponent_div_33_Template_mat_paginator_page_25_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPageChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r0.dataSource);
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r0.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r0.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("length", ctx_r0.totalElements)("pageIndex", ctx_r0.currentPage)("pageSize", ctx_r0.pageSize)("pageSizeOptions", \u0275\u0275pureFunction0(7, _c02));
  }
}
var ScanHistoryComponent = class _ScanHistoryComponent {
  constructor(scanHistoryService, snackBar, dialog) {
    this.scanHistoryService = scanHistoryService;
    this.snackBar = snackBar;
    this.dialog = dialog;
    this.dataSource = new MatTableDataSource([]);
    this.statistics = null;
    this.loading = false;
    this.displayedColumns = ["id", "target", "createdAt", "success", "successRate", "duration", "actions"];
    this.currentPage = 0;
    this.pageSize = 20;
    this.totalElements = 0;
    this.searchTerm = "";
    this.showSuccessOnly = false;
    this.showRecentOnly = false;
  }
  ngOnInit() {
    this.loadScanHistory();
    this.loadStatistics();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /**
   * Charge l'historique des scans
   */
  loadScanHistory() {
    this.loading = true;
    console.log("\u{1F4CB} Chargement de l'historique des scans...");
    this.scanHistoryService.getAllScans(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.log("\u2705 Historique charg\xE9:", response);
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error("\u274C Erreur lors du chargement de l'historique:", error);
        this.loading = false;
        this.snackBar.open("Erreur lors du chargement de l'historique", "Fermer", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
      }
    });
  }
  /**
   * Charge les statistiques globales
   */
  loadStatistics() {
    this.scanHistoryService.getStatistics().subscribe({
      next: (stats) => {
        console.log("\u{1F4CA} Statistiques charg\xE9es:", stats);
        this.statistics = stats;
      },
      error: (error) => {
        console.error("\u274C Erreur lors du chargement des statistiques:", error);
      }
    });
  }
  /**
   * Affiche les détails d'un scan
   */
  voirDetails(scan) {
    console.log("\u{1F50D} Affichage des d\xE9tails du scan:", scan.id);
    this.scanHistoryService.getScanDetails(scan.id).subscribe({
      next: (detailedScan) => {
        console.log("\u2705 D\xE9tails du scan r\xE9cup\xE9r\xE9s:", detailedScan);
        this.openScanDetailsDialog(detailedScan);
      },
      error: (error) => {
        console.error("\u274C Erreur lors de la r\xE9cup\xE9ration des d\xE9tails:", error);
        this.snackBar.open("Erreur lors de la r\xE9cup\xE9ration des d\xE9tails", "Fermer", {
          duration: 3e3
        });
      }
    });
  }
  /**
   * Relance un scan avec les mêmes paramètres
   */
  relancerScan(scan) {
    this.snackBar.open(`Relance du scan sur ${scan.target}`, "Fermer", {
      duration: 3e3
    });
  }
  /**
   * Supprime un scan de l'historique
   */
  supprimerScan(scan) {
    if (confirm(`\xCAtes-vous s\xFBr de vouloir supprimer le scan #${scan.id} sur ${scan.target} ?`)) {
      this.scanHistoryService.deleteScan(scan.id).subscribe({
        next: () => {
          console.log("\u2705 Scan supprim\xE9:", scan.id);
          this.snackBar.open("Scan supprim\xE9 avec succ\xE8s", "Fermer", {
            duration: 3e3
          });
          this.loadScanHistory();
          this.loadStatistics();
        },
        error: (error) => {
          console.error("\u274C Erreur lors de la suppression:", error);
          this.snackBar.open("Erreur lors de la suppression", "Fermer", {
            duration: 3e3
          });
        }
      });
    }
  }
  /**
   * Recherche dans l'historique
   */
  onSearch() {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.scanHistoryService.searchScans(this.searchTerm).subscribe({
        next: (scans) => {
          this.dataSource.data = scans;
          this.loading = false;
        },
        error: (error) => {
          console.error("\u274C Erreur lors de la recherche:", error);
          this.loading = false;
        }
      });
    } else {
      this.loadScanHistory();
    }
  }
  /**
   * Filtre les scans récents
   */
  onFilterRecent() {
    if (this.showRecentOnly) {
      this.loading = true;
      this.scanHistoryService.getRecentScans(24).subscribe({
        next: (scans) => {
          this.dataSource.data = scans;
          this.loading = false;
        },
        error: (error) => {
          console.error("\u274C Erreur lors du filtrage:", error);
          this.loading = false;
        }
      });
    } else {
      this.loadScanHistory();
    }
  }
  /**
   * Change de page
   */
  onPageChange(event) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadScanHistory();
  }
  /**
   * Ouvre la dialog des détails
   */
  openScanDetailsDialog(scan) {
    console.log("\u{1F3AF} Ouverture de la dialog des d\xE9tails pour le scan:", scan.id);
    const dialogRef = this.dialog.open(ScanDetailDialogComponent, {
      width: "80vw",
      maxWidth: "900px",
      height: "80vh",
      maxHeight: "800px",
      data: scan,
      disableClose: false,
      autoFocus: true,
      restoreFocus: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("\u{1F512} Dialog des d\xE9tails ferm\xE9e");
    });
  }
  // === MÉTHODES UTILITAIRES ===
  /**
   * Formate la durée du scan
   */
  formatDuration(durationMs) {
    return this.scanHistoryService.formatDuration(durationMs);
  }
  /**
   * Formate la date de création
   */
  formatCreatedAt(createdAt) {
    return this.scanHistoryService.formatCreatedAt(createdAt);
  }
  /**
   * Obtient la couleur de statut
   */
  getStatusColor(scan) {
    return this.scanHistoryService.getScanStatusColor(scan);
  }
  /**
   * Obtient l'icône de statut
   */
  getStatusIcon(scan) {
    return this.scanHistoryService.getScanStatusIcon(scan);
  }
  /**
   * Obtient le texte de statut
   */
  getStatusText(scan) {
    return this.scanHistoryService.getScanStatusText(scan);
  }
  /**
   * Formate la version SNMP
   */
  formatSnmpVersion(version) {
    return SNMP_VERSION_LABELS[version] || version;
  }
  /**
   * Obtient les statistiques affichables
   */
  get totalScans() {
    return this.statistics?.totalScans || 0;
  }
  get successfulScans() {
    return this.statistics?.successfulScans || 0;
  }
  get successRate() {
    return this.statistics?.successRate || 0;
  }
  get averageDuration() {
    if (!this.statistics)
      return "0ms";
    return this.formatDuration(this.statistics.averageDurationMs);
  }
  static {
    this.\u0275fac = function ScanHistoryComponent_Factory(t) {
      return new (t || _ScanHistoryComponent)(\u0275\u0275directiveInject(ScanHistoryService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScanHistoryComponent, selectors: [["app-scan-history"]], viewQuery: function ScanHistoryComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatPaginator, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      }
    }, decls: 34, vars: 8, consts: [["paginator", ""], [1, "scan-history-container"], ["class", "summary-cards", 4, "ngIf"], [1, "filters-card"], [1, "filters-container"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "Ex: 192.168.1.10", 3, "ngModelChange", "keyup.enter", "ngModel"], ["matSuffix", ""], [1, "filter-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["color", "accent", 3, "ngModelChange", "change", "ngModel"], ["mat-button", "", 3, "click"], [1, "history-table-card"], [1, "header-actions"], ["color", "accent", "selected", "", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], [1, "summary-cards"], [1, "summary-card"], [1, "summary-content"], [1, "summary-icon"], [1, "summary-details"], [1, "summary-value"], [1, "summary-label"], [1, "summary-card", "success"], [1, "summary-card", "rate"], [1, "summary-card", "average"], ["color", "accent", "selected", ""], [1, "loading-container"], [1, "empty-state"], ["mat-raised-button", "", "color", "primary", "routerLink", "/snmp/run"], [1, "table-container"], ["mat-table", "", 1, "history-table", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "target"], ["matColumnDef", "createdAt"], ["matColumnDef", "success"], ["matColumnDef", "successRate"], ["matColumnDef", "duration"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "data-row", 3, "success-row", "error-row", 4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", 3, "page", "length", "pageIndex", "pageSize", "pageSizeOptions"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "target-info"], [1, "target-icon"], [1, "target-details"], [1, "target-ip"], [1, "target-port"], [1, "target-version"], [1, "date-info"], [1, "date-icon"], ["selected", ""], [1, "oids-info"], [1, "oids-count"], [1, "success-rate"], [1, "duration-info"], [1, "duration-icon"], [1, "actions-container"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Voir les d\xE9tails des OIDs", 3, "click"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Relancer ce scan", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Supprimer de l'historique", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 1, "data-row"]], template: function ScanHistoryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, ScanHistoryComponent_div_1_Template, 41, 4, "div", 2);
        \u0275\u0275elementStart(2, "mat-card", 3)(3, "mat-card-content")(4, "div", 4)(5, "mat-form-field", 5)(6, "mat-label");
        \u0275\u0275text(7, "Rechercher par IP ou port");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function ScanHistoryComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("keyup.enter", function ScanHistoryComponent_Template_input_keyup_enter_8_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "mat-icon", 7);
        \u0275\u0275text(10, "search");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 8)(12, "button", 9);
        \u0275\u0275listener("click", function ScanHistoryComponent_Template_button_click_12_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementStart(13, "mat-icon");
        \u0275\u0275text(14, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Rechercher ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "mat-slide-toggle", 10);
        \u0275\u0275twoWayListener("ngModelChange", function ScanHistoryComponent_Template_mat_slide_toggle_ngModelChange_16_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.showRecentOnly, $event) || (ctx.showRecentOnly = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ScanHistoryComponent_Template_mat_slide_toggle_change_16_listener() {
          return ctx.onFilterRecent();
        });
        \u0275\u0275text(17, " Derni\xE8res 24h seulement ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "button", 11);
        \u0275\u0275listener("click", function ScanHistoryComponent_Template_button_click_18_listener() {
          ctx.searchTerm = "";
          ctx.showRecentOnly = false;
          return ctx.loadScanHistory();
        });
        \u0275\u0275elementStart(19, "mat-icon");
        \u0275\u0275text(20, "clear");
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, " Effacer filtres ");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(22, "mat-card", 12)(23, "mat-card-header")(24, "mat-card-title")(25, "mat-icon");
        \u0275\u0275text(26, "history");
        \u0275\u0275elementEnd();
        \u0275\u0275text(27, " Historique des Scans SNMP ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 13);
        \u0275\u0275template(29, ScanHistoryComponent_mat_chip_29_Template, 4, 1, "mat-chip", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "mat-card-content");
        \u0275\u0275template(31, ScanHistoryComponent_div_31_Template, 4, 0, "div", 15)(32, ScanHistoryComponent_div_32_Template, 11, 0, "div", 16)(33, ScanHistoryComponent_div_33_Template, 27, 8, "div", 17);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.statistics);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", !ctx.searchTerm.trim());
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.showRecentOnly);
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", ctx.statistics && ctx.statistics.scansLast24h > 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.dataSource.data.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.dataSource.data.length > 0);
      }
    }, dependencies: [NgIf, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButton, MatIconButton, MatIcon, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatFormField, MatLabel, MatSuffix, MatInput, MatChip, MatProgressSpinner, MatPaginator, MatTooltip, MatSlideToggle], styles: ["\n\n.scan-history-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1400px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.summary-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  cursor: pointer;\n}\n.summary-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.summary-card.success[_ngcontent-%COMP%] {\n  border-left: 4px solid #4caf50;\n}\n.summary-card.rate[_ngcontent-%COMP%] {\n  border-left: 4px solid #2196f3;\n}\n.summary-card.average[_ngcontent-%COMP%] {\n  border-left: 4px solid #ff9800;\n}\n.summary-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.summary-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  opacity: 0.8;\n  color: #666;\n}\n.summary-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.summary-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.8em;\n  font-weight: 600;\n  color: #333;\n  line-height: 1;\n}\n.summary-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.9em;\n  color: #666;\n  margin-top: 4px;\n}\n.filters-card[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 1px solid #e9ecef;\n}\n.filters-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  align-items: center;\n}\n.search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 250px;\n}\n.filter-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n}\n.history-table-card[_ngcontent-%COMP%] {\n  background: white;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px 20px;\n  gap: 16px;\n  color: #666;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 80px 20px;\n  text-align: center;\n  color: #666;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 72px;\n  width: 72px;\n  height: 72px;\n  margin-bottom: 24px;\n  opacity: 0.4;\n  color: #bbb;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin-bottom: 8px;\n  font-weight: 500;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  max-width: 400px;\n  line-height: 1.5;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  background: white;\n}\n.history-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 900px;\n}\n.history-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  background: #f8f9fa;\n  padding: 16px 12px;\n  border-bottom: 2px solid #dee2e6;\n}\n.history-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px 12px;\n  border-bottom: 1px solid #e9ecef;\n}\n.data-row[_ngcontent-%COMP%] {\n  transition: background-color 0.2s ease;\n}\n.data-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.success-row[_ngcontent-%COMP%] {\n  border-left: 3px solid #4caf50;\n}\n.error-row[_ngcontent-%COMP%] {\n  border-left: 3px solid #f44336;\n}\n.target-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.target-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: #666;\n}\n.target-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.target-ip[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.target-port[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9em;\n}\n.target-version[_ngcontent-%COMP%] {\n  font-size: 0.8em;\n  color: #888;\n  background: #f0f0f0;\n  padding: 2px 6px;\n  border-radius: 4px;\n  width: fit-content;\n}\n.date-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.date-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #666;\n}\n.oids-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.oids-count[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.success-rate[_ngcontent-%COMP%] {\n  font-size: 0.9em;\n  font-weight: 500;\n}\n.duration-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.duration-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #666;\n}\n.actions-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\nmat-paginator[_ngcontent-%COMP%] {\n  border-top: 1px solid #e9ecef;\n  background: #f8f9fa;\n}\n@media (max-width: 992px) {\n  .scan-history-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  .filters-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .search-field[_ngcontent-%COMP%] {\n    min-width: auto;\n  }\n  .filter-buttons[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n@media (max-width: 768px) {\n  .scan-history-container[_ngcontent-%COMP%] {\n    padding: 12px;\n    gap: 16px;\n  }\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n  .summary-content[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .summary-icon[_ngcontent-%COMP%] {\n    font-size: 28px;\n    width: 28px;\n    height: 28px;\n  }\n  .summary-value[_ngcontent-%COMP%] {\n    font-size: 1.5em;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 8px;\n  }\n  .history-table[_ngcontent-%COMP%] {\n    min-width: 800px;\n  }\n  .target-info[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 4px;\n  }\n  .target-details[_ngcontent-%COMP%] {\n    gap: 1px;\n  }\n  .actions-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 2px;\n  }\n}\n@media (max-width: 480px) {\n  .scan-history-container[_ngcontent-%COMP%] {\n    padding: 8px;\n  }\n  .filters-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .filter-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .filter-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .filter-buttons[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 40px 16px;\n  }\n  .empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 48px;\n    width: 48px;\n    height: 48px;\n  }\n  .history-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .history-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 8px 6px;\n  }\n  .summary-value[_ngcontent-%COMP%] {\n    font-size: 1.3em;\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.summary-card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeInUp 0.6s ease-out;\n}\n.summary-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.1s;\n}\n.summary-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.2s;\n}\n.summary-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.3s;\n}\nmat-chip[_ngcontent-%COMP%] {\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\nmat-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.data-row[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #2196f3;\n  outline-offset: -2px;\n}\nbutton[mat-icon-button][_ngcontent-%COMP%]:focus {\n  outline: 2px solid #2196f3;\n  outline-offset: 2px;\n}\n@media (prefers-color-scheme: dark) {\n  .filters-card[_ngcontent-%COMP%] {\n    background: #2d2d2d;\n    border-color: #444;\n  }\n  .summary-value[_ngcontent-%COMP%] {\n    color: #fff;\n  }\n  .summary-label[_ngcontent-%COMP%] {\n    color: #ccc;\n  }\n  .target-version[_ngcontent-%COMP%] {\n    background: #444;\n    color: #ccc;\n  }\n}\n/*# sourceMappingURL=scan-history.component.css.map */"] });
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
  // Route par défaut : liste des assets (/snmp/assets)
  { path: "", redirectTo: "assets", pathMatch: "full" },
  // 1. AssetListComponent (/snmp/assets)
  { path: "assets", component: AssetListComponent },
  { path: "assets/new", component: AssetFormComponent },
  { path: "assets/edit/:id", component: AssetFormComponent },
  // 2. ConfigListComponent (/snmp/configs)
  { path: "configs", component: ConfigListComponent },
  { path: "configs/new", component: ConfigFormComponent },
  { path: "configs/edit/:id", component: ConfigFormComponent },
  // 3. ManualScanComponent (/snmp/run)
  { path: "run", component: ManualScanComponent },
  // 4. ScanHistoryComponent (/snmp/results)
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
      FormsModule,
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
      MatProgressBarModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatSnackBarModule,
      MatTooltipModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTabsModule,
      MatExpansionModule,
      MatSlideToggleModule
    ] });
  }
};
export {
  SnmpModule
};
//# sourceMappingURL=chunk-4KVF7HEJ.js.map
