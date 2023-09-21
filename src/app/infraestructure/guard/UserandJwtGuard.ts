import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth-service.service'
import { DataUser } from '../../views/pages/model/dataUserModel';
import { objectStikyUser, stiky } from '../../containers/utilsLayout/constants'

@Injectable({
  providedIn: 'root',
})
export class UserAndJwtGuard {
  constructor(private authService$: AuthService) {}
  canActivate():boolean{
    let isAdmin:boolean|undefined;
    this.authService$.getDataUser.subscribe((res: DataUser) => {
        isAdmin =  objectStikyUser.find((data:stiky) => data.roll === res.account)?.showLinkPlan;
    })

    if (this.authService$.isAuthenticated() && isAdmin) {  
        return true;
    }
    else {
        return false;
    }

  }
}
