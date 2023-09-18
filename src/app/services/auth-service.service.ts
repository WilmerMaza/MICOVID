import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ComponentStore } from '@ngrx/component-store';
import { DataUser, Ijwt, session } from '../views/pages/model/dataUserModel';
import { Persistence } from 'src/app/utils/persistence.service';
import { Observable } from 'rxjs';
import { KEYSESSION } from 'src/app/models/constan';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends ComponentStore<session> {
  private jwt: string = '';

  constructor(private persistence$: Persistence) {
    super({} as session);

    const isAuth = persistence$.get(KEYSESSION);
    if (isAuth) {
      this.setAuth(isAuth);
    }

    this.getToken.subscribe((res) => {
      this.jwt = res;
    });
  }

  isAuthenticated(): boolean {
    const token = this.jwt;

    if (token) {
      try {
        // Decodificar el token
        const tokenPayload: any = jwtDecode(token);

        // Obtener la fecha de expiración del token en segundos
        const expirationDateInSeconds = tokenPayload.exp;

        // Obtener la fecha actual en segundos
        const currentDateInSeconds = Math.floor(Date.now() / 1000);

        // Verificar si el token ha expirado
        if (expirationDateInSeconds < currentDateInSeconds) {
          this.persistence$.delete(KEYSESSION);
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    } else {
      return false;
    }
  }

  readonly setAuth = this.updater((state, payload: session) => {
    this.persistence$.save(KEYSESSION, payload);
    return {
      ...state,
      token: payload.token,
    };
  });

  readonly getToken: Observable<string> = this.select((state:session) => state.token);
  readonly getDataUser: Observable<DataUser> = this.select((state:session) => {
    const tokenPayload: Ijwt = jwtDecode(state.token);
    const {dataUser} = tokenPayload;
    return dataUser;
  });
}
