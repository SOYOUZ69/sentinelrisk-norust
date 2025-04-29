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
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../features/admin/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'risks',
        loadChildren: () => import('../features/risks/risks.module').then(m => m.RisksModule)
      },
      {
        path: 'controls',
        loadChildren: () => import('../features/controls/controls.module').then(m => m.ControlsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../features/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'assessments',
        loadChildren: () => import('../features/assessments/assessments.module').then(m => m.AssessmentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { } 