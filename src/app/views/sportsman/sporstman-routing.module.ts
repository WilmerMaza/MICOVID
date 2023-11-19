import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsmanComponent } from './sportsman.component';
import { ViewIndicatorsComponent } from './Components/view-indicators/view-indicators.component';


const routes: Routes = [
  {
    path: '',
    component: SportsmanComponent,
    data: {
      title: 'Sportsman'
    }
  },
  {
    path: 'view',
    component: ViewIndicatorsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsmanRoutingModule { }
