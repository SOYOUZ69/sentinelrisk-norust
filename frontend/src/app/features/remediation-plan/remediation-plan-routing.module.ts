import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

// Composants
import { PlanListComponent } from './components/plan-list/plan-list.component';
import { PlanFormComponent } from './components/plan-form/plan-form.component';
import { PlanDetailComponent } from './components/plan-detail/plan-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PlanListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Liste des plans' }
  },
  {
    path: 'new/:mappingId',
    component: PlanFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'Nouveau plan' }
  },
  {
    path: 'edit/:id',
    component: PlanFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'Modifier le plan' }
  },
  {
    path: 'detail/:id',
    component: PlanDetailComponent,
    canActivate: [AuthGuard],
    data: { title: 'Détails du plan' }
  },
  {
    path: ':mappingId',
    component: PlanListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Plans par mapping' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemediationPlanRoutingModule {
  constructor() {
    console.debug('RemediationPlanRoutingModule: Module de routage initialisé');
  }
} 