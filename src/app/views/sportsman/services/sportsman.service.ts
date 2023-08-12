import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { Sportsman } from '../../models/DataSportsman';

@Injectable({
  providedIn: 'root'
})
export class SportsmanService {
  constructor(private micovid$: MicoviApiService) {}
  getSportsman(): Observable<Sportsman[]>{
    const endpoint = '/sportMan/getAll';
    return this.micovid$.get(endpoint);
  }
}