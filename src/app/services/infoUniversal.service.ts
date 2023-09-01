import { Injectable } from '@angular/core';
import { UniversalTutorialService } from './universalTutorial.service';
import { Observable } from 'rxjs';
import { UniversalList } from '../views/Entrenador/Model/entrenadorModel';
import { universalToken } from '../views/pages/model/ResponseLoginModel';

@Injectable({
  providedIn: 'root',
})
export class InfoUniversalService {
  constructor(private universalService$: UniversalTutorialService) {}

  getPaises(): Observable<Array<UniversalList>> {
    const endpoint = '/api/countries/';
    return this.universalService$.get(endpoint);
  }
  getCiudades(value:string): Observable<Array<UniversalList>> {
    const endpoint = `/api/cities/${value}`;
    return this.universalService$.get(endpoint);
  }
  getEstados(value:string): Observable<Array<UniversalList>> {
    const endpoint = `/api/states/${value}`;
    return this.universalService$.get(endpoint);
  }

  tokenSuscribe(): Observable<universalToken> {
    const endpoint = '/api/getaccesstoken';
   return this.universalService$.get(endpoint)
  }
}
