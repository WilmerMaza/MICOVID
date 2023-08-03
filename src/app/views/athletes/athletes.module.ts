import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthletesComponent } from './athletes.component'
import { AthletesRoutingModule } from './athletes-routing.module'
import { SharedModuleModule } from '../../shared/shared-module.module'

@NgModule({
  declarations: [AthletesComponent],
  imports: [
    AthletesRoutingModule,
    CommonModule,
    SharedModuleModule
  ]
})
export class AthletesModule { }
