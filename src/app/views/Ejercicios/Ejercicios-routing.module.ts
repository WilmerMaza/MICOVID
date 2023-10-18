import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjerciciosComponent } from './Components/ejercicios/ejercicios.component'
import { IndicadorComponent } from './Components/create-indicador/indicador.component';


const routes: Routes = [
  {
    path: '',
    component: EjerciciosComponent,
    data: {
      title: 'Ejercicios'
    }
  },
  {
    path: 'Indicador',
    component: IndicadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjerciciosRoutingModule { }
