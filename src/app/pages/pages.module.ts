import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDashboardComponent } from './chart-dashboard/chart-dashboard.component';
import { RouterModule } from '@angular/router';
import { PageRoutes } from './pages.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ChartDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PageRoutes),

    SharedModule
  ]
})
export class PagesModule { }
