import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormDialogComponent } from './components/category-form-dialog/category-form-dialog.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent, data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] } },
  { path: ':id', component: CategoryDetailComponent, data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] } },
  { path: ':id/edit', component: CategoryFormDialogComponent, data: { roles: ['admin', 'risk_manager'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {} 