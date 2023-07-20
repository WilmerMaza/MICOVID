import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { DataLoginModel } from 'src/app/views/pages/model/DataLoginModel';
import { ResponseLoginModel } from '../model/ResponseLoginModel';
import { DataRegisterModel } from '../model/DataRegisterModel';
import { environment } from 'src/environments/environment';

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

  async register(data: DataRegisterModel): Promise<boolean> {
    const endpoint = `${environment.micovi_api}/register`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Indicamos que estamos enviando un objeto JSON en el cuerpo
      },
      body: JSON.stringify(data) // Convertimos el objeto a formato JSON para enviarlo en el cuerpo
    };
    const response = await fetch(endpoint, requestOptions);
    return await response.ok;
  }
}
