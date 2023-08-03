import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinamicTableComponent } from './dinamic-table/dinamic-table.component'
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MaterialModule } from '../infraestructure/modules/material/material.module';

@NgModule({
  declarations: [DinamicTableComponent],
  imports: [
    CommonModule,
    MatTableModule, 
    MatCheckboxModule, 
    MatPaginatorModule,
    MaterialModule
  ],
  exports: [
    DinamicTableComponent
  ]
})
export class SharedModuleModule { }
