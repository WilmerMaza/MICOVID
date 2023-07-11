import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { DataLoginModel } from 'src/app/views/pages/model/DataLoginModel';
import { ResponseLoginModel } from '../model/ResponseLoginModel';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private micovid$: MicoviApiService
  ) { }


  sessionLogin(data: DataLoginModel): Observable<ResponseLoginModel> {
    const endpoint = '/login';
    return this.micovid$.post(endpoint, data);
  }

}
