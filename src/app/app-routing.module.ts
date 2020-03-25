import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartDataComponent } from './chart-data/chart-data.component';


const routes: Routes = [
  {path : 'chart' , component:ChartDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
