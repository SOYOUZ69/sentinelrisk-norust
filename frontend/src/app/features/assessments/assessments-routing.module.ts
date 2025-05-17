import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { AssessmentDetailComponent } from './components/assessment-detail/assessment-detail.component';
import { AssessmentFormComponent } from './components/assessment-form/assessment-form.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentListComponent,
    data: { roles: ['admin', 'compliance_officer', 'risk_manager', 'auditor', 'user'] }
  },
  {
    path: 'new',
    component: AssessmentFormComponent,
    data: { title: 'Nouvelle évaluation', isEdit: false, roles: ['admin', 'compliance_officer'] }
  },
  {
    path: ':id',
    component: AssessmentDetailComponent,
    data: { roles: ['admin', 'compliance_officer', 'risk_manager', 'auditor', 'user'] }
  },
  {
    path: ':id/edit',
    component: AssessmentFormComponent,
    data: { title: 'Modifier l\'évaluation', isEdit: true, roles: ['admin', 'compliance_officer'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentsRoutingModule { } 