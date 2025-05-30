import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'remediation-plans',
    loadChildren: () => {
      console.debug('AppRoutingModule: Chargement du module RemediationPlan');
      return import('./features/remediation-plan/remediation-plan.module').then(m => {
        console.debug('AppRoutingModule: Module RemediationPlan chargé avec succès');
        return m.RemediationPlanModule;
      });
    },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./features/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'assessments',
    loadChildren: () => import('./features/assessments/assessments.module').then(m => m.AssessmentsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'compliance',
    loadChildren: () => import('./features/compliance/compliance.module').then(m => m.ComplianceModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '404', 
    component: PageNotFoundComponent 
  },
  { 
    path: '**', 
    redirectTo: '/404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    paramsInheritanceStrategy: 'always',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { } 