import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HasRoleDirective } from './directives/has-role.directive';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [
    PageNotFoundComponent,
    HasRoleDirective
  ]
})
export class SharedModule { } 