import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsmanRoutingModule } from './sporstman-routing.module';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { SportsmanComponent } from './sportsman.component';
import { MaterialModule } from '../../infraestructure//modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateSportsmanComponent } from './Components/create-sportsman/create-sportsman.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {MatIconModule, MatIconRegistry } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    SportsmanRoutingModule,
    SharedModuleModule,
    MaterialModule,
    SharedModuleModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    SportsmanComponent,
    CreateSportsmanComponent,

  ],
  bootstrap: [CreateSportsmanComponent],
})
export class SportManModule {
  constructor(private matIconRegistry: MatIconRegistry) {
    // Registrar los iconos SVG personalizados aquí
    matIconRegistry.addSvgIcon(
      'sliceRigh',
      'src/assets/slice.svg'
    );

  }
}
