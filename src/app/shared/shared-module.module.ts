import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinamicTableComponent } from './dinamic-table/dinamic-table.component'
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MaterialModule } from '../infraestructure/modules/material/material.module';
import { DinamicFilterComponent } from './dinamic-filter/dinamic-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [DinamicTableComponent, DinamicFilterComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatExpansionModule
  ],
  exports: [
    DinamicTableComponent,
    DinamicFilterComponent
  ]
})
export class SharedModuleModule { }
