import { Component, OnInit  } from '@angular/core';
import { SportsmanService } from './services/sportsman.service'
import { AuthService } from 'src/app/services/auth-service.service';
import { Sportsman } from '../models/DataSportsman'
import { columnsValue } from '../models/columnDataSportman'
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';


@Component({
  selector: 'app-sportsman',
  templateUrl: './sportsman.component.html',
  styleUrls: ['./sportsman.component.scss']
})
export class SportsmanComponent implements OnInit {
 public dataSportman: Sportsman[] = [];
 public data = columnsValue;
 public showSportsman: Boolean = false;
 public dataSingle:Sportsman;
 public isCheck = true;
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
}
