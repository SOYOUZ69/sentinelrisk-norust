import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  exports: [
    LayoutComponent,
    SidebarComponent
  ]
})
export class LayoutModule { } 