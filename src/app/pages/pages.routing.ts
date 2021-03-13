import { Routes } from "@angular/router";

import { ChartDashboardComponent } from "./chart-dashboard/chart-dashboard.component";


export const PageRoutes: Routes = [
    {
        path: 'mqtt-chart',
        component: ChartDashboardComponent
    },
    {
        path: '**',
        redirectTo: 'mqtt-chart',
        pathMatch: 'full'
    }
];