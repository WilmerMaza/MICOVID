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
import { ViewIndicatorsComponent } from './Components/view-indicators/view-indicators.component';
import { SwiperModule } from 'swiper/angular';
import { ViewRubricaComponent } from './Components/view-rubrica/view-rubrica.component';
import { CalificacionRubricaComponent } from './Components/calificacion-rubrica/calificacion-rubrica.component';

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
    NgxMaskModule.forRoot(),
    SwiperModule
  ],
  declarations: [
    SportsmanComponent,
    CreateSportsmanComponent,
    ViewIndicatorsComponent,
    ViewRubricaComponent,
    CalificacionRubricaComponent,

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
