import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { DataLoginModel } from 'src/app/views/pages/model/DataLoginModel';
import { session } from '../model/dataUserModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { Persistence } from 'src/app/utils/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private micovid$: MicoviApiService,
    private Auth$: AuthService,
    private persistence$:Persistence,

  ) { }


  setAuth(values: any): void {
    this.Auth$.setAuth(values);
  }

  logout(): void {
    this.persistence$.deleteAll();
  }

  sessionLogin(data: DataLoginModel): Observable<session> {
    const endpoint = '/login';
    return this.micovid$.post<session>(endpoint, data).pipe(tap(async (UserInfo:session)=>{
      this.setAuth(UserInfo);
    }));
  }

}
