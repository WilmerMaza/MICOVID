import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpModel } from 'src/app/models/IHttp.Model';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import {requestEntrenador, requetEntrenador, resposeCreate} from 'src/app/views/Entrenador/Model/entrenadorModel'

@Injectable({
  providedIn: 'root',
})
export class EntrenadorServices {
  constructor(private micovid$: MicoviApiService) {}

  getAllEntrenadores(bodyRequest: requestEntrenador): Observable<any> {
    const endpoint = '/Entrenador/getAll';
    return this.micovid$.post(endpoint, bodyRequest);
  }

  createEntrenador(bodyRequest:requetEntrenador):Observable<resposeCreate>{
    const endpoint = '/Entrenador/create';
    return this.micovid$.post(endpoint,bodyRequest)
  }

  updateEntrenador(bodyRequest:requetEntrenador):Observable<resposeCreate>{
    const endpoint = '/Entrenador/update';
    return this.micovid$.put(endpoint,bodyRequest)
  }

}
