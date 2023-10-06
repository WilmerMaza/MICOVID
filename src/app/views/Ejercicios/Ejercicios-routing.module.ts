import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjerciciosComponent } from './Components/ejercicios/ejercicios.component'


const routes: Routes = [
  {
    path: '',
    component: EjerciciosComponent,
    data: {
      title: 'Ejercicios'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjerciciosRoutingModule { }
