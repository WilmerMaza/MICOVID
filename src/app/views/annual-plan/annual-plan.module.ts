import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualPlanRoutingModule } from './annual-plan-routing.module'
import { SharedModuleModule } from '../../shared/shared-module.module'
import { AnnualPlanComponent } from './components/annual-plan.component';
import { AddAnnualPlanComponent } from './components/dialogComponents/add-annual-plan.component';
import { MaterialModule } from 'src/app/infraestructure/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MacrocicloComponent } from './components/macrociclo/macrociclo.component';


@NgModule({
  declarations: [AnnualPlanComponent, AddAnnualPlanComponent, MacrocicloComponent],
  imports: [
    CommonModule,
    AnnualPlanRoutingModule,
    SharedModuleModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AnnualPlanModule { }
