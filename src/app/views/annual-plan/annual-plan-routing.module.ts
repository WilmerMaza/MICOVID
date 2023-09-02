import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualPlanComponent } from './components/annual-plan.component';


const routes: Routes = [
  {
    path: '',
    component: AnnualPlanComponent,
    data: {
      title: 'plan-anual'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualPlanRoutingModule { }
