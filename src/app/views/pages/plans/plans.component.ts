import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { planModel } from '../model/PlanModel'

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit  {

  public targetPlans: Array<planModel> = [];
  public colorTarget: string[]= ['yellow', 'blue', 'red','green']

  constructor(private $session_service: SessionService){
  }

  ngOnInit(){
    this.GetPlans();
  }

  GetPlans(): void{
    this.$session_service.consultGetPlans().subscribe((data: Array<planModel>) => {
      this.targetPlans.push(...data);
    })
  }

  GenerarCobro(data: planModel):void {
    console.log("Se esta trabajando en eso", data)
  }
}
