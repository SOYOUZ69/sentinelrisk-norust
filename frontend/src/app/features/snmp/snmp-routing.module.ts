import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssetFormComponent } from './components/asset-form/asset-form.component';
import { ConfigListComponent } from './components/config-list/config-list.component';
import { ConfigFormComponent } from './components/config-form/config-form.component';
import { ManualScanComponent } from './components/manual-scan/manual-scan.component';
import { ScanHistoryComponent } from './components/scan-history/scan-history.component';
import { ScanDetailComponent } from './components/scan-detail/scan-detail.component';

const routes: Routes = [
  { path: '', component: AssetListComponent },
  { path: 'assets/new', component: AssetFormComponent },
  { path: 'assets/edit/:id', component: AssetFormComponent },
  { path: 'configs', component: ConfigListComponent },
  { path: 'configs/new', component: ConfigFormComponent },
  { path: 'configs/edit/:id', component: ConfigFormComponent },
  { path: 'run', component: ManualScanComponent },
  { path: 'results', component: ScanHistoryComponent },
  { path: 'results/:id', component: ScanDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnmpRoutingModule { }
