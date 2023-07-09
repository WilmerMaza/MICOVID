import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import {DataLoginModel} from 'src/app/views/pages/model/DataLoginModel';
import { DefaultResponse } from "src/app/shared/model/Response/DefaultResponse";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
 
  constructor(
    private micovid$ : MicoviApiService
  ) { }


  sessionLogin(data:DataLoginModel):Observable<DefaultResponse>{
    const endpoint = '/login';
    return this.micovid$.post(endpoint,data);
  }

}
