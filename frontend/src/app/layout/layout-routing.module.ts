import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] }
      },
      {
        path: 'users',
        loadChildren: () => import('../features/admin/users/users.module').then(m => m.UsersModule),
        data: { roles: ['admin'] }
      },
      {
        path: 'risks',
        loadChildren: () => import('../features/risks/risks.module').then(m => m.RisksModule),
        data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] }
      },
      {
        path: 'controls',
        loadChildren: () => import('../features/controls/controls.module').then(m => m.ControlsModule),
        data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] }
      },
      {
        path: 'categories',
        loadChildren: () => import('../features/categories/categories.module').then(m => m.CategoriesModule),
        data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] }
      },
      {
        path: 'assessments',
        loadChildren: () => import('../features/assessments/assessments.module').then(m => m.AssessmentsModule),
        data: { roles: ['admin', 'compliance_officer', 'risk_manager', 'auditor', 'user'] }
      },
      {
        path: 'compliance',
        loadChildren: () => import('../features/compliance/compliance.module').then(m => m.ComplianceModule),
        data: { roles: ['admin', 'compliance_officer', 'risk_manager', 'auditor', 'user'] }
      },
      {
        path: 'remediation-plans',
        loadChildren: () => import('../features/remediation-plan/remediation-plan.module').then(m => m.RemediationPlanModule),
        data: { roles: ['admin', 'compliance_officer', 'risk_manager', 'auditor', 'user'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { } 