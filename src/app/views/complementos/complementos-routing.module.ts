import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComplementosComponent } from './components/complementos/complementos.component';

const routes: Routes = [
  {
    path: '',
    component: ComplementosComponent,
    data: {
      title: 'Complementos',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplementosRoutingModule {}
