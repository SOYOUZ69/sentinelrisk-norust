import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { SnmpRoutingModule } from './snmp-routing.module';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssetFormComponent } from './components/asset-form/asset-form.component';
import { ConfigListComponent } from './components/config-list/config-list.component';
import { ConfigFormComponent } from './components/config-form/config-form.component';
import { ManualScanComponent } from './components/manual-scan/manual-scan.component';
import { ScanHistoryComponent } from './components/scan-history/scan-history.component';
import { ScanDetailComponent } from './components/scan-detail/scan-detail.component';
import { ScanDetailDialogComponent } from './components/scan-detail-dialog/scan-detail-dialog.component';
import { AutomationDashboardComponent } from './components/automation-dashboard/automation-dashboard.component';
import { AutomationConfigComponent } from './components/automation-config/automation-config.component';
import { AssetFormDialogComponent } from '../../components/snmp/assets/asset-form-dialog.component';

@NgModule({
  declarations: [
    AssetListComponent,
    AssetFormComponent,
    ConfigListComponent,
    ConfigFormComponent,
    ManualScanComponent,
    ScanHistoryComponent,
    ScanDetailComponent,
    ScanDetailDialogComponent,
    AutomationDashboardComponent,
    AutomationConfigComponent,
    AssetFormDialogComponent
  ],
  imports: [
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
    MatSlideToggleModule,
    MatMenuModule,
    MatDividerModule
  ]
})
export class SnmpModule { }
