import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthletesComponent } from './athletes.component'

const routes: Routes = [
  {
    path: '',
    component: AthletesComponent,
    data: {
      title: 'athletes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthletesRoutingModule { }
