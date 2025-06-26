import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssetFormComponent } from './components/asset-form/asset-form.component';
import { ConfigListComponent } from './components/config-list/config-list.component';
import { ConfigFormComponent } from './components/config-form/config-form.component';
import { ManualScanComponent } from './components/manual-scan/manual-scan.component';
import { ScanHistoryComponent } from './components/scan-history/scan-history.component';
import { ScanDetailComponent } from './components/scan-detail/scan-detail.component';
import { AutomationDashboardComponent } from './components/automation-dashboard/automation-dashboard.component';
import { AutomationConfigComponent } from './components/automation-config/automation-config.component';

const routes: Routes = [
  // Route par défaut : liste des assets (/snmp/assets)
  { path: '', redirectTo: 'assets', pathMatch: 'full' },
  
  // 1. AssetListComponent (/snmp/assets)
  { path: 'assets', component: AssetListComponent },
  { path: 'assets/new', component: AssetFormComponent },
  { path: 'assets/edit/:id', component: AssetFormComponent },
  
  // 2. ConfigListComponent (/snmp/configs)
  { path: 'configs', component: ConfigListComponent },
  { path: 'configs/new', component: ConfigFormComponent },
  { path: 'configs/edit/:id', component: ConfigFormComponent },
  
  // 3. ManualScanComponent (/snmp/run)
  { path: 'run', component: ManualScanComponent },
  
  // 4. ScanHistoryComponent (/snmp/results)
  { path: 'results', component: ScanHistoryComponent },
  { path: 'results/:id', component: ScanDetailComponent },
  
  // 5. AutomationDashboardComponent (/snmp/automation)
  { path: 'automation', component: AutomationDashboardComponent },
  
  // 6. AutomationConfigComponent (/snmp/automation/config)
  { path: 'automation/config', component: AutomationConfigComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnmpRoutingModule { }
