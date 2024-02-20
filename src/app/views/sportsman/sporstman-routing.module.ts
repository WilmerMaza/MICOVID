import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsmanComponent } from './sportsman.component';
import { ViewIndicatorsComponent } from './Components/view-indicators/view-indicators.component';
import { ViewRubricaComponent } from './Components/view-rubrica/view-rubrica.component';
import { CalificacionRubricaComponent } from './Components/calificacion-rubrica/calificacion-rubrica.component';


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
  },
  {
    path: 'rubrica',
    component : ViewRubricaComponent,
  },
  {
    path:'calificar',
    component: CalificacionRubricaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsmanRoutingModule { }
