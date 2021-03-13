import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReversePipe } from './pipes/reverse.pipe';
import { DxChartModule, DxDataGridModule, DxPieChartModule, DxScrollViewModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    ReversePipe
  ],
  imports: [
    CommonModule,

    DxPieChartModule,
    DxScrollViewModule,
    DxDataGridModule,
    DxChartModule
  ],
  exports: [
    ReversePipe,

    DxPieChartModule,
    DxScrollViewModule,
    DxDataGridModule,
    DxChartModule
  ]
})
export class SharedModule { }
