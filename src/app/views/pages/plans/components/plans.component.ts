import { Component, OnInit } from '@angular/core';
import { planModel } from 'src/app/views/pages/model/PlanModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { PlansService } from '../services/plans.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  public targetPlans: Array<planModel> = [];
  public colorTarget: string[] = ['yellow', 'blue', 'red', 'green'];

  constructor(
    private planService$: PlansService,
    private authService$: AuthService
  ) {}

  ngOnInit() {
    this.GetPlans();
  }

  GetPlans(): void {
    this.planService$.consultGetPlans().subscribe((data: Array<planModel>) => {
      this.targetPlans.push(...data);
    });
  }

  GenerarCobro(item: planModel): void {
    let userDataInfo: DataUser = {} as DataUser;
    this.authService$.getDataUser.subscribe((userData) => {
      userDataInfo = userData;
    });
    const { ID, email } = userDataInfo;
    const { planname, price, caracteristicas } = item;

    const data = {
      amount: Number(price),
      currency: 'USD',
      planName: planname,
      characteristicsPlan: caracteristicas,
      userName: email,
      userId: ID,
    };

    this.planService$.createPagoPaypal(data).subscribe((res) => {
      window.location.href = res.url;
    });
  }
}
