import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Validators } from '../utils/Validators';

import { Persistence } from '../utils/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class UniversalTutorialService {
  public params = new HttpParams();
  public basePatch = environment.universalTutorial;
  public headers$: HttpHeaders | undefined;
  public token: string = '';
  constructor(private _http: HttpClient, private persistence$: Persistence) {
    this.tokeStorage();
    this.init();
  }

  init(): void {
    this.headers$ = this.httpOptions();
  }

  tokeStorage(): void {
    this.token =
      this.token === null || this.token === ''
        ? this.persistence$.get('UniversalTutorial')
        : this.token;
  }

  get<T>(url: string, params?: HttpParams, endpoint?: string): Observable<any> {
    this.init()
    let path$ = `${this.basePatch}${url}`;
    const headers = {
      headers: this.headers$,
      params,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }

    return this._http.get(path$, headers).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public handleError(errors: HttpErrorResponse): Observable<never> {
const {error} = errors;

    if (error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error}`
      );
    }
    return throwError(error);
  }

  async tokenSuscribe(): Promise<void> {
    const endpoint = '/api/getaccesstoken';
    const isotoke = await firstValueFrom(this.get(endpoint));
    const { auth_token } = isotoke;
    this.token = auth_token;
    this.persistence$.save('UniversalTutorial', this.token);
    this.init();
  }

  private httpOptions(): HttpHeaders {
    this.tokeStorage();
    if (this.token) {
      return this.jsonAuth();
    }
    if (!this.token) {
      return this.notAuth();
    }
    return new HttpHeaders();
  }

  private jsonAuth = (): HttpHeaders =>
    new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
      .set('Accept', 'application/json');

  private notAuth = () =>
    new HttpHeaders()
      .set('Accept', 'application/json')
      .set(
        'api-token',
        'y9BBUHU6EU-afCI6SW58A4dn2FD-4p2D0z-XqmDlxH3iZunGH7ZQFJT0hVpRRo4v2d4'
      )
      .set('user-email', 'milton@micovi.com');
}
