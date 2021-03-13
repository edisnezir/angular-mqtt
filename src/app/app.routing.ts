import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const AppRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },  
];
