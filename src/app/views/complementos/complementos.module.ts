import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormModule, ProgressModule } from '@coreui/angular';

import { MaterialModule } from 'src/app/infraestructure/modules/material/material.module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { ComplementosRoutingModule } from './complementos-routing.module';
import { ComplementosComponent } from './components/complementos/complementos.component';
import { ViewTableComponent } from './components/viewTable/viewTable.component';
@NgModule({
  imports: [
    CommonModule,
    ComplementosRoutingModule,
    FormModule,
    ReactiveFormsModule,
    SharedModuleModule,
    ProgressModule,
    MaterialModule,
  ],
  declarations: [
    ComplementosComponent,
    ViewTableComponent,
    
  ],
})
export class ComplementosModule {}
