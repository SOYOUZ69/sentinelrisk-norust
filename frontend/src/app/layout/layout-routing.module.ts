import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

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
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] }
      },
      {
        path: 'users',
        loadChildren: () => import('../features/admin/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'risks',
        loadChildren: () => import('../features/risks/risks.module').then(m => m.RisksModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] }
      },
      {
        path: 'controls',
        loadChildren: () => import('../features/controls/controls.module').then(m => m.ControlsModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] }
      },
      {
        path: 'categories',
        loadChildren: () => import('../features/categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'risk_manager', 'compliance_officer', 'auditor', 'user'] }
      },
      {
        path: 'assessments',
        loadChildren: () => import('../features/assessments/assessments.module').then(m => m.AssessmentsModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'compliance_officer', 'risk_manager', 'auditor', 'user'] }
      },
      {
        path: 'compliance',
        loadChildren: () => import('../features/compliance/compliance.module').then(m => m.ComplianceModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'compliance_officer', 'risk_manager', 'auditor', 'user'] }
      },
      {
        path: 'remediation-plans',
        loadChildren: () => import('../features/remediation-plan/remediation-plan.module').then(m => m.RemediationPlanModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'compliance_officer', 'risk_manager', 'auditor', 'user'] }
      },
      {
        path: 'snmp',
        loadChildren: () => import('../features/snmp/snmp.module').then(m => m.SnmpModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'risk_manager'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { } 