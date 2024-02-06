import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from 'src/app/infraestructure/modules/material/material.module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { SwiperModule } from 'swiper/angular';
import { AddCategoriaComponent } from '../Complementos/components/addCategoria/add-categoria.component';
import { AsignDeportistaComponent } from './Components/asignDeportista/asignDeportista.component';
import { CreateEjercicioComponent } from './Components/create-ejercicio/create-ejercicio.component';
import { IndicadorComponent } from './Components/create-indicador/indicador.component';
import { CreateSubgrupoComponent } from './Components/create-subgrupo/create-subgrupo.component';
import { EjerciciosComponent } from './Components/ejercicios/ejercicios.component';
import { ViewEjericioComponent } from './Components/view-ejericio/view-ejericio.component';
import { EjerciciosRoutingModule } from './Ejercicios-routing.module';

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
    NgxMaskModule.forRoot(),
    SwiperModule,
  ],
  declarations: [
    EjerciciosComponent,
    CreateEjercicioComponent,
    CreateSubgrupoComponent,
    ViewEjericioComponent,
    IndicadorComponent,
    AddCategoriaComponent,
    AsignDeportistaComponent,
  ],
})
export class EjerciciosModule {}
