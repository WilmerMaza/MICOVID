import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { Validators } from 'src/app/utils/Validators';
import { firstValueFrom } from 'rxjs';
import { PlansService } from 'src/app/views/pages/plans/services/plans.service';
import { userPlan } from 'src/app/views/pages/plans/model/PlanModel';
import { Toast } from 'src/app/utils/alert_Toast';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PlanGuard {
  private userDataInfo: DataUser = {} as DataUser;
  private userPlan: userPlan | undefined;
  constructor(
    private router: Router,
    private authService$: AuthService,
    private planService$: PlansService
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      this.userPlan = await firstValueFrom(
        this.planService$.planUser()
      );
      const {
        dataUserPlan } = this.userPlan;
      if (dataUserPlan) {
        const {
          dataUserPlan :
         { endDate } } = this.userPlan;
         const daysRestantes = moment(endDate).diff(moment(), 'days');
        if(daysRestantes > 0){
          if(daysRestantes < 15){
            Toast.fire({
              icon: 'warning',
              title: `Tu plan esta proximo a vencerse, ${daysRestantes} restantes`,
            });
          }
         return true;
        } 
        else{
          this.mensaje('Tu plan se encuentra vencido')
          this.router.navigate(['/plans']);
          return false;          
        }
      }
      else {
        this.mensaje('No cuentas con un plan')
        this.router.navigate(['/plans']);
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  mensaje(mensaje: string): void {
      Toast.fire({
      icon: 'error',
      title: mensaje,
    });
  }
}