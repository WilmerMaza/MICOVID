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

    this.userPlan = await firstValueFrom(
      this.planService$.planUser()
    );

    if (!Validators.isNullOrUndefined(this.userPlan)) {
      return true;
    } else {
      this.router.navigate(['/plans']);
      return false;
    }
  }
}
