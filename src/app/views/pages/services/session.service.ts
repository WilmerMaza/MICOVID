import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { DataLoginModel } from 'src/app/views/pages/model/DataLoginModel';
import { ResponseRegister } from '../model/ResponseLoginModel';
import { DataRegisterModel } from '../model/DataRegisterModel';
import { planModel } from '../model/PlanModel';
import { session } from '../model/dataUserModel';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private micovid$: MicoviApiService
  ) { }


  sessionLogin(data: DataLoginModel): Observable<session> {
    const endpoint = '/login';
    return this.micovid$.post<session>(endpoint, data).pipe(tap((UserInfo:session)=>{
      this.micovid$.setAuth(UserInfo);
    }));
  }

  register(data: DataRegisterModel): Observable<ResponseRegister> {
    return this.micovid$.post('/register', data);
  }

  consultGetPlans(): Observable<Array<planModel>> {
    const endpoint = '/register/planes';
    return this.micovid$.get(endpoint);
  }
}
