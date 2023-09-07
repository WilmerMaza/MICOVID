import { Component, OnInit } from '@angular/core';
import { SportsmanService } from './services/sportsman.service'
import { AuthService } from 'src/app/services/auth-service.service';
import { Sportsman } from '../models/DataSportsman'
import { HistorialCategory, visible } from '../models/HistorialCategoryModel'
import { columnsValue } from '../models/columnDataSportman'
import { categoryModel } from '../models/categoryModel'
import { SportsmanData, jsonData } from '../models/dataFilterSportsman'
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { filterResult } from 'src/app/shared/model/filterModel';
import { DateValidators } from 'src/app/utils/Validators';
import { genero } from '../models/constSportsman';


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
  public dataSingleAux: Sportsman;
  public isCheck = true;
  public selectItemCount: number = 0;
  public historyCategory: HistorialCategory[];
  public dataCreateSportsman: SportsmanData[];
  public showViewCreateSportsman: visible;
  public fechaFormateada: string;
  public birdData: string;

  public isDownload = this.data.length !== 0;
  public nameAdd: string = 'deportista'

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
      this.transformGenre(res); 
    });
  }
  getActionEvent(event: ActionResponse): void {
    const {
      action: { action   },
      data  : { birtDate },
      data,
    } = event;
    if (action == 'ver') {
      this.birdData = DateValidators.parseDate(birtDate);
      const generoItem = genero.find(g => g.code === data.gender);
      if (generoItem) {
        data.gender = generoItem.value;
      }
      this.showSportsman = true;
      this.dataSingle = data;
       this.historyCategorico(data)
    }
    if (event.action == 'add') {
      this.showViewCreateSportsman = { isVisible: true };
    }
    if (action == 'Editar') {
      this.transformGenreInversa(data)
      this.showSportsman = false
      this.showViewCreateSportsman = { isVisible: true,
        data: this.dataSingleAux };
    }
  }

  transformGenre(data: Sportsman[]): void{
    this.dataSportman = data.map(item => {
      const generoItem = genero.find(g => g.code === item.gender);
      if (generoItem) {
        item.gender = generoItem.value;
      }
      return item;
    });
  }

  transformGenreInversa(data: Sportsman): void{
    const generoItem = genero.find(g => g.value === data.gender);

    if (generoItem) {
      data.gender = generoItem.code;
    }
    this.dataSingleAux = data;
  }

  reloadData(): void {
    this.getSportsman();
  }

  editSportman(): void {
    const event = {
      action: {
        action: 'Editar'
      },
      data: this.dataSingle // Aquí debes proporcionar los datos adecuados
    };
  
    this.getActionEvent(event);
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
  
  closeCard(): void {
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
          this.transformGenre(res); // Asignar el resultado a dataSportman
        },
        (error) => {
          if (error.status === 404) {
            this.dataSportman = []; // Asignar un vector vacío si no se encontraron deportistas
          }
        }
      );
  }
}