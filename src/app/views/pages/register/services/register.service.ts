import { Injectable } from '@angular/core';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { DataRegisterModel } from '../../model/DataRegisterModel';
import { ResponseRegister } from '../../model/ResponseLoginModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private micovid$: MicoviApiService) {}

  register(data: DataRegisterModel): Observable<ResponseRegister> {
    return this.micovid$.post('/register', data);
  }
}
