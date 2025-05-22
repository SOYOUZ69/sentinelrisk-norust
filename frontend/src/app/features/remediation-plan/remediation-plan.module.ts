import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Material UI
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

// Layout
import { LayoutModule } from '../../layout/layout.module';

// Routing
import { RemediationPlanRoutingModule } from './remediation-plan-routing.module';

// Components
import { PlanListComponent } from './components/plan-list/plan-list.component';
import { PlanFormComponent } from './components/plan-form/plan-form.component';
import { PlanDetailComponent } from './components/plan-detail/plan-detail.component';

@NgModule({
  declarations: [
    PlanListComponent,
    PlanFormComponent,
    PlanDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RemediationPlanRoutingModule,
    LayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatToolbarModule
  ],
  exports: [
    PlanListComponent,
    PlanFormComponent,
    PlanDetailComponent
  ]
})
export class RemediationPlanModule { } 