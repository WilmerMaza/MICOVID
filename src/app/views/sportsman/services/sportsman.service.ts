import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { DynamicObject } from 'src/app/shared/model/filterModel';
import { Sportsman } from '../../models/DataSportsman';
import { HistorialCategory } from '../../models/HistorialCategoryModel';
import { SuccessResponse } from '../../models/SuccessResponse';
import { categoryModel } from '../../models/categoryModel';
@Injectable({
  providedIn: 'root'
})
export class SportsmanService {
  constructor(private micovid$: MicoviApiService) {}
  private redirectSportmanInfo:Sportsman[]=[];

  getSportmanInfoRedirect():Sportsman[]{
    const data = [...this.redirectSportmanInfo];
    this.redirectSportmanInfo = [];
    return data;
  }

  setSportmanInfoRedirect(data : Sportsman):void{
    this.redirectSportmanInfo = [];
    this.redirectSportmanInfo.push(data);
  }

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
  
  createSportsman (data: Sportsman): Observable<SuccessResponse> {
    const endpoint = '/sportMan/create';
    return this.micovid$.post(endpoint, data);     
  }

  updateSportsman (data: Sportsman): Observable<SuccessResponse> {
    const endpoint = '/sportMan/update';
    return this.micovid$.post(endpoint, data);     
  }

  getAlldataIndicators(ID: string): Observable<any>{
    const url = `/indicators/get-indicators?id=${ID}`;
    return this.micovid$.get(url);
  }
  
}