import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsmanComponent } from './sportsman.component';


const routes: Routes = [
  {
    path: '',
    component: SportsmanComponent,
    data: {
      title: 'Sportsman'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsmanRoutingModule { }
