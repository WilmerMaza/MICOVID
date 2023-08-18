import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { planModel } from '../../model/PlanModel';
import { pagoPaypal } from '../../model/pagoPaypal';
import { createPagoResponse, userPlan } from '../model/PlanModel';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private micovid$: MicoviApiService) {}

  planUser(): Observable<userPlan> {
    const endpoint = `/home`;
    return this.micovid$.get(endpoint);
  }

  consultGetPlans(): Observable<Array<planModel>> {
    const endpoint = '/register/planes';
    return this.micovid$.get(endpoint);
  }

  createPagoPaypal(data: pagoPaypal): Observable<createPagoResponse> {
    const endpoint = '/payment/create-payment';
    return this.micovid$.post(endpoint, data);
  }
}
