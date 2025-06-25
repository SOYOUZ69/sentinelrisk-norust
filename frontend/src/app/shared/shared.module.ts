import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HasRoleDirective,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [
    PageNotFoundComponent,
    HasRoleDirective,
    UnauthorizedComponent
  ]
})
export class SharedModule { } 