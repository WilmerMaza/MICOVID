import { Component, OnInit } from '@angular/core';
import { SportsmanService } from './services/sportsman.service'
import { AuthService } from 'src/app/services/auth-service.service';
import { Sportsman } from '../models/DataSportsman'
import { HistorialCategory, visible } from '../models/HistorialCategoryModel'
import { columnsValue } from '../models/columnDataSportman'
import { categoryModel } from '../models/categoryModel'
import { jsonData } from '../models/dataFilterSportsman'
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { filterResult } from 'src/app/shared/model/filterModel';


@Component({
  selector: 'app-sportsman',
  templateUrl: './sportsman.component.html',
  styleUrls: ['./sportsman.component.scss']
})
export class SportsmanComponent implements OnInit {
  public dataSportman: Sportsman[] = [];
  public data = columnsValue;
  public jsonFilter = jsonData;
  public showSportsman: Boolean = false;
  public dataSingle: Sportsman;
  public isCheck = true;
  public selectItemCount: number = 0;
  public historyCategory: HistorialCategory[];
  public dataCreateSportsman: any;
  public showViewCreateSportsman: visible;
  public fechaFormateada: string;
  isDownload = this.data.length !== 0;
  nameAdd: string = 'deportista'

  calculateCirclePosition(index: number): number {
    const circleSpacing = 100; // Ajusta el espaciado entre círculos
    return index * circleSpacing;
  }
  constructor(
    private sporsmanService$: SportsmanService,
  ) { }

  ngOnInit() {
    this.getSportsman();
    this.getCategory();
   
  }

  getCategory() {
    this.sporsmanService$.getAllCategory().subscribe((res: categoryModel[]) => {
      const categoriaIndex = jsonData.findIndex(section => section.title === 'Categoria');
      // Si se encuentra la sección "Categoria"
      if (categoriaIndex !== -1) {
        jsonData[categoriaIndex].control = res.map(item => ({
          name: item.name,
          value: item.name,
          code: item.ID
        }));
      }
    })

    this.dataCreateSportsman = this.jsonFilter;
    }

  getSportsman() {
    this.sporsmanService$.getSportsman().subscribe((res: Sportsman[]) => {
      this.dataSportman = res;
    });
  }
  getActionEvent(event: any): void {
    if (event.action.action == 'ver') {
      this.showSportsman = true;
      this.dataSingle = event.data;
      this.transformFecha(event.data.birtDate);
       this.historyCategorico(event.data)
    }
    if (event.action == 'add') {
      this.showViewCreateSportsman = { isVisible: true };
    }
    if (event.action.action == 'Editar') {
      this.showViewCreateSportsman = { isVisible: true,
        data: event.data };
    }
  }

  transformFecha(birtDate: string):void{
    const fecha = new Date(birtDate);
    const nombresMeses = [
      "Enero", "Febrero", "Marzo", "Abril",
      "Mayo", "Junio", "Julio", "Agosto",
      "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const año = fecha.getFullYear();
    
    // Obtener el nombre del mes a partir del array de nombres de meses
    const nombreMes = nombresMeses[mes];
    
    // Crear la cadena de fecha en el formato deseado
    this.fechaFormateada = `${dia}-${nombreMes}-${año}`;
  }

  historyCategorico(data: Sportsman):void {
    const idObject = {
      id: data.ID // Aquí asigna el valor de tu variable "id"
    };
    this.sporsmanService$.getHistoryCategory(idObject)
    .subscribe((res: HistorialCategory[]) => {    
      this.historyCategory = res;
      this.historyCategory.forEach(item => {
        // Transforma FechaInicio
        const fechaInicio = new Date(item.FechaInicio);
        item.FechaInicio = fechaInicio.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD
        
        // Transforma FechaFin
        const fechaFin = new Date(item.FechaFin);
        item.FechaFin = fechaFin.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD
      });
    }, (error) => {
      if (error.status === 404) {
        this.historyCategory = []; // Asignar un vector vacío si no se encontraron deportistas
      }
    });  
  

  }

  closeCard() {
    this.showSportsman = false;
  }
  getselectItemCount($event: number): void {
    this.selectItemCount = $event;
  }

  getDataFilter(event: filterResult): void {
    event.jsonData.forEach(item => {
      if (!item.disable) {
        event.filterData[item.property] = [];
      }
    });
    this.sporsmanService$.getSFilterSportsman(event.filterData)
      .subscribe(
        (res: Sportsman[]) => {
          this.dataSportman = res; // Asignar el resultado a dataSportman
        },
        (error) => {
          if (error.status === 404) {
            this.dataSportman = []; // Asignar un vector vacío si no se encontraron deportistas
          }
        }
      );
  }
}