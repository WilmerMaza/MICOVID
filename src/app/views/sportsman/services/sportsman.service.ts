import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { Sportsman } from '../../models/DataSportsman';
import { categoryModel } from '../../models/categoryModel'
import { HistorialCategory } from '../../models/HistorialCategoryModel'
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

  getAllCategory (): Observable<categoryModel[]>{
    const endpoint = '/Categoria/getAll';
    return this.micovid$.get(endpoint);
  }

  getHistoryCategory (idObject: { id: string }): Observable<HistorialCategory[]>{
    const endpoint = '/sportMan/getHistorialCategory';
    return this.micovid$.post(endpoint, idObject);

  }
  
  createSportsman (data: Sportsman): Observable<any> {
    const endpoint = '/sportMan/create';
    return this.micovid$.post(endpoint, data);     
  }

  
}