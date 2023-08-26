import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import {requestEntrenador} from 'src/app/views/Entrenador/Model/entrenadorModel'

@Injectable({
  providedIn: 'root',
})
export class EntrenadorServices {
  constructor(private micovid$: MicoviApiService) {}

  getAllEntrenadores(bodyRequest: requestEntrenador): Observable<any> {
    const endpoint = '/Entrenador/getAll';
    return this.micovid$.post(endpoint, bodyRequest);
  }
  createEntrenador(bodyRequest:any):Observable<any>{
    const endpoint = '/Entrenador/create';
    return this.micovid$.post(endpoint,bodyRequest)
  }
}
