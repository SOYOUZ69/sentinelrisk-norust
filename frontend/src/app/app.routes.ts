import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then(m => m.AppComponent),
  }
];

export const routes: Routes = APP_ROUTES;
