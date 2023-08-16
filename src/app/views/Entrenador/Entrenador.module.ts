import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrenadorRoutingModule } from 'src/app/views/Entrenador/Entrenador-routing.module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { EntrenadorComponent } from './Components/entrenador/entrenador.component';
@NgModule({
  imports: [CommonModule, EntrenadorRoutingModule, SharedModuleModule],
  declarations: [EntrenadorComponent]
})
export class EntrenadorModule {}
