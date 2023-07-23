import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { DataLoginModel } from 'src/app/views/pages/model/DataLoginModel';
import { ResponseLoginModel, ResponseRegister } from '../model/ResponseLoginModel';
import { DataRegisterModel } from '../model/DataRegisterModel';
import { planModel } from '../model/PlanModel';

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

  register(data: DataRegisterModel): Observable<ResponseRegister> {
    return this.micovid$.post('/register', data);
  }

  consultGetPlans(): Observable<Array<planModel>> {
    const endpoint = '/register/planes';
    return this.micovid$.get(endpoint);
  }
}
