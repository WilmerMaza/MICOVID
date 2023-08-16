import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrenadorComponent } from './Components/entrenador/entrenador.component';


const routes: Routes = [
  {
    path: '',
    component: EntrenadorComponent,
    data: {
      title: 'Entrenador'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrenadorRoutingModule { }
