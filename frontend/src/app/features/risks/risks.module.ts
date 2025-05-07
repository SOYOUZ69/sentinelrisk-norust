import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Material imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

// Components
import { RisksComponent } from './risks.component';
import { RiskFormDialogComponent } from './risk-form-dialog/risk-form-dialog.component';
import { RiskDetailComponent } from './risk-detail/risk-detail.component';

// Shared modules
import { AdminSharedModule } from '../admin/shared/admin-shared.module';

const routes: Routes = [
  { path: '', component: RisksComponent },
  { path: ':id', component: RiskDetailComponent }
];

@NgModule({
  declarations: [
    RisksComponent,
    RiskFormDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AdminSharedModule,
    
    // Material modules
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatCardModule
  ]
})
export class RisksModule { } 