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
        statusPlan } = this.userPlan;
      if (statusPlan == 'COMPLETED') {
        const {
          dataUserPlan :
         { endDate } } = this.userPlan;
        if(new Date(endDate) > new Date()){
         return true;
        } 
        else{
          this.mensaje('Tu plan se encuentra vencido')
          this.router.navigate(['/plans']);
          return false;          
        }
      } else if (statusPlan === 'INCOMPLETED'){
        this.mensaje('Tu plan no ha completado el proceso de pago')
        return false;
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