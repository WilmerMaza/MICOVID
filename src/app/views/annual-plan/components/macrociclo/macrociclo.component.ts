import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnualPlanService } from '../../Services/annual-plan.service';
import { PlanAnualForm, RootPlanById } from '../../models/interfaceFormPlan';

@Component({
  selector: 'app-macrociclo',
  templateUrl: './macrociclo.component.html',
  styleUrls: ['./macrociclo.component.scss'],
})
export class MacrocicloComponent implements OnInit {
  public dataPlan:PlanAnualForm; 
  constructor(
    private route$: ActivatedRoute,
    private service$: AnnualPlanService
    ) {}

  ngOnInit(): void {
    const routeId = this.route$.snapshot.queryParams["documentId"];
    this.getDataById(routeId)
  }

  getDataById(ID: string): void {
    this.service$.getDataPlanById(ID).subscribe((data:RootPlanById) => {
      const {name, year, Categorium} = data.item;
      this.dataPlan = {
        name,
        year,
        CategoriumID: Categorium.name,
      }
    })
  }
}
