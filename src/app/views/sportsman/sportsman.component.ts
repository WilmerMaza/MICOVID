import { Component, OnInit  } from '@angular/core';
import { SportsmanService } from './services/sportsman.service'
import { AuthService } from 'src/app/services/auth-service.service';
import { Sportsman } from '../models/DataSportsman'
import { columnsValue } from '../models/columnDataSportman'
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
 public dataSingle:Sportsman;
 public isCheck = true;
 public selectItemCount:number=0;
 isDownload = this.data.length !== 0;
 nameAdd:string='deportista'


  constructor(
    private sporsmanService$: SportsmanService,
  ) {}

  ngOnInit() {
    this.getSportsman();

  }

  getSportsman(){
    this.sporsmanService$.getSportsman().subscribe((res: Sportsman[]) => {
      this.dataSportman = res;
    });
  }
  getActionEvent(event:any):void{
    if (event.action.action == 'ver')
    {
      this.showSportsman = true;
      this.dataSingle = event.data;
    } 
  }
  closeCard(){
    this.showSportsman = false;
  }
  getselectItemCount($event: number):void{
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