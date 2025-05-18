import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Guards
import { AdminGuard } from '../../core/guards/admin.guard';

// Components
import { ComplianceComponent } from './compliance.component';
import { FrameworksComponent } from './frameworks/frameworks.component';
import { FrameworkDetailComponent } from './frameworks/framework-detail/framework-detail.component';
import { FrameworkFormDialogComponent } from './frameworks/framework-form-dialog/framework-form-dialog.component';
import { FrameworkEditComponent } from './frameworks/framework-edit/framework-edit.component';
import { RequirementFormDialogComponent } from './requirements/requirement-form-dialog/requirement-form-dialog.component';
import { RequirementsComponent } from './requirements/requirements/requirements.component';
import { MappingsComponent } from './mappings/mappings/mappings.component';
import { GapAnalysisComponent } from './gap-analysis/gap-analysis/gap-analysis.component';

// Services
import { ComplianceFrameworkService } from './services/compliance-framework.service';
import { ComplianceRequirementService } from './services/compliance-requirement.service';
import { RiskComplianceMappingService } from './services/risk-compliance-mapping.service';

const routes: Routes = [
  {
    path: '',
    component: ComplianceComponent,
    children: [
      { path: '', redirectTo: 'frameworks', pathMatch: 'full' },
      { path: 'frameworks', component: FrameworksComponent },
      { path: 'frameworks/:id', component: FrameworkDetailComponent },
      { 
        path: 'frameworks/edit/:id', 
        component: FrameworkEditComponent,
        canActivate: [AdminGuard]
      },
      { path: 'requirements', component: RequirementsComponent },
      { path: 'mappings', component: MappingsComponent },
      { path: 'gap-analysis', component: GapAnalysisComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ComplianceComponent,
    FrameworksComponent,
    FrameworkDetailComponent,
    FrameworkFormDialogComponent,
    RequirementFormDialogComponent,
    FrameworkEditComponent,
    RequirementsComponent,
    MappingsComponent,
    GapAnalysisComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    
    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatChipsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  providers: [
    ComplianceFrameworkService,
    ComplianceRequirementService,
    RiskComplianceMappingService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComplianceModule { } 