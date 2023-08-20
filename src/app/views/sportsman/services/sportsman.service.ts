import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { Sportsman } from '../../models/DataSportsman';
import { DynamicObject } from 'src/app/shared/model/filterModel';

@Injectable({
  providedIn: 'root'
})
export class SportsmanService {
  constructor(private micovid$: MicoviApiService) {}
  getSportsman(): Observable<Sportsman[]>{
    const endpoint = '/sportMan/getAll';
    return this.micovid$.get(endpoint);
  }

  getSFilterSportsman(filterData:DynamicObject<any>): Observable<Sportsman[]>{
    const endpoint = '/sportMan/get';
    return this.micovid$.post(endpoint, filterData);
  }
  
}