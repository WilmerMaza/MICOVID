import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrenadorRoutingModule } from 'src/app/views/Entrenador/Entrenador-routing.module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { EntrenadorComponent } from './Components/entrenador/entrenador.component';
import { ViewEntrenadorComponent } from './Components/viewEntrenador/viewEntrenador.component';
import { MaterialModule } from 'src/app/infraestructure/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateEntrenadorComponent } from './Components/createEntrenador/createEntrenador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule, MatIconRegistry } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    EntrenadorRoutingModule,
    SharedModuleModule,
    MaterialModule,
    SharedModuleModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [
    EntrenadorComponent,
    ViewEntrenadorComponent,
    CreateEntrenadorComponent,

  ],
  bootstrap: [CreateEntrenadorComponent],
})
export class EntrenadorModule {
  constructor(private matIconRegistry: MatIconRegistry) {
    // Registrar los iconos SVG personalizados aquí
    matIconRegistry.addSvgIcon(
      'sliceRigh',
      'src/assets/slice.svg'
    );

  }
}
