import { Component, OnInit } from '@angular/core';
import { planModel } from 'src/app/views/pages/model/PlanModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { PlansService } from '../services/plans.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  public targetPlans: Array<planModel> = [];
  public colorTarget: string[] = ['yellow', 'blue', 'red', 'green'];
  private userID:string;
  private userEmail:string;
  constructor(
    private planService$: PlansService,
    private authService$: AuthService,
    private route$: ActivatedRoute,
  ) {}

  ngOnInit() {
    const { snapshot : {queryParams : {ID, email}}} = this.route$;
    this.userID = ID;
    this.userEmail = email;
    this.GetPlans();
  }

  GetPlans(): void {
    this.planService$.consultGetPlans().subscribe((data: Array<planModel>) => {
      this.targetPlans.push(...data);
    });
  }

  GenerarCobro(item: planModel): void {
    let timerInterval: number | undefined;
    Swal.fire({
      title: 'Espera, Estamos trabajando en tu compra',
      timer: 6000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        }, 200)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })

    const { planname, price, caracteristicas } = item;

    const data = {
      amount: Number(price),
      currency: 'USD',
      planName: planname,
      characteristicsPlan: caracteristicas,
      userName: this.userEmail,
      userId: this.userID,
    };

    this.planService$.createPagoPaypal(data).subscribe((res) : void => {
      window.location.href = res.url;
    },(respError): void => {
      const { error} = respError;
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 2000
      })
    });
  }
}
