import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualPlanComponent } from './components/annual-plan.component';
import { MacrocicloComponent } from './components/macrociclo/macrociclo.component';
import { MicrocicloComponent } from './components/microciclo/microciclo.component';


const routes: Routes = [
  {
    path: '',
    component: AnnualPlanComponent
  },
  {
    path: 'macrociclo',
    component: MacrocicloComponent,
  },
  {
    path: 'microciclo',
    component: MicrocicloComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualPlanRoutingModule { }
