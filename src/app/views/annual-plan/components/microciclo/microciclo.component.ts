import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnualPlanService } from '../../Services/annual-plan.service';
import { columnsEntrenadorValue } from '../../models/columnsTableMicro';
import { Item, Macrociclo, Microciclo } from '../../models/interfaceFormPlan';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';

@Component({
  selector: 'app-microciclo',
  templateUrl: './microciclo.component.html',
  styleUrls: ['./microciclo.component.scss']
})
export class MicrocicloComponent  implements OnInit {
  private routeId:string;
  public nameMacro: string = '';
  public columns = columnsEntrenadorValue;
  public dataSource: Microciclo[];

  constructor(
    private route$: ActivatedRoute,
    private service$ : AnnualPlanService
  ) { }

  ngOnInit(): void {
    const { snapshot : {queryParams} } = this.route$;
    this.routeId = queryParams["documentId"];
    this.getAllInfoModule();
  }

  getAllInfoModule(): void {
    this.service$.getAllMicrociclos(this.routeId).subscribe((data: Item<Macrociclo>) => {
      const { item: { name, Microciclos } } = data;
      this.nameMacro = name;
      this.dataSource = Microciclos;
      
    })
  }

  getActionEvent(event: ActionResponse): void{
    console.log(event);
  }

  goBack(): void{
    window.history.back();
  }

}
