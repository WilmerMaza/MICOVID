import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infraestructure/modules/material/material.module';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { AnnualPlanRoutingModule } from './annual-plan-routing.module';
import { AnnualPlanComponent } from './components/annual-plan.component';
import { AddAnnualPlanComponent } from './components/dialogComponents/addAnnualPlan/add-annual-plan.component';
import { AddAssingTareaComponent } from './components/dialogComponents/addAssingTarea/add-assingtarea.component';
import { AddMacroComponent } from './components/dialogComponents/addMacro/add-macro.component';
import { AddTareaComponent } from './components/dialogComponents/addTarea/add-tarea.component';
import { MacrocicloComponent } from './components/macrociclo/macrociclo.component';
import { MicrocicloComponent } from './components/microciclo/microciclo.component';
import { TareasxmicroComponent } from './components/tareasxmicro/tareasxmicro.component';

@NgModule({
  declarations: [
    AnnualPlanComponent,
    AddAnnualPlanComponent,
    MacrocicloComponent,
    AddMacroComponent,
    MicrocicloComponent,
    TareasxmicroComponent,
    AddAssingTareaComponent,
    AddTareaComponent,
  ],
  imports: [
    CommonModule,
    AnnualPlanRoutingModule,
    SharedModuleModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AnnualPlanModule {}
