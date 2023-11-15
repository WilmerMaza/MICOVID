import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjerciciosComponent } from './Components/ejercicios/ejercicios.component'
import { IndicadorComponent } from './Components/create-indicador/indicador.component';
import { IndicatorsGuard } from '../../infraestructure/guard/indicatorsGuard';

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
    component: IndicadorComponent,
    canActivate: [IndicatorsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjerciciosRoutingModule { }
