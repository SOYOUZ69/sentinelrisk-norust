import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { AssessmentDetailComponent } from './components/assessment-detail/assessment-detail.component';
import { AssessmentFormComponent } from './components/assessment-form/assessment-form.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentListComponent
  },
  {
    path: 'new',
    component: AssessmentFormComponent,
    data: { title: 'Nouvelle évaluation', isEdit: false }
  },
  {
    path: ':id',
    component: AssessmentDetailComponent
  },
  {
    path: ':id/edit',
    component: AssessmentFormComponent,
    data: { title: 'Modifier l\'évaluation', isEdit: true }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentsRoutingModule { } 