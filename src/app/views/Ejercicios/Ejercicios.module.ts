import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { EjerciciosRoutingModule } from './Ejercicios-routing.module';
import { CreateSubgrupoComponent } from './Components/create-subgrupo/create-subgrupo.component';
import { EjerciciosComponent } from './Components/ejercicios/ejercicios.component';
import { CreateEjercicioComponent } from './Components/create-ejercicio/create-ejercicio.component';
import { MaterialModule } from 'src/app/infraestructure/modules/material/material.module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';


@NgModule({
  imports: [
    CommonModule,
    EjerciciosRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    SharedModuleModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    EjerciciosComponent,
    CreateEjercicioComponent,
    CreateSubgrupoComponent
  ],

})
export class EjerciciosModule {}
