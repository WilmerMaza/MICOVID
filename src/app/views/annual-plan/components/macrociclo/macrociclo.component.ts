import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnualPlanService } from '../../Services/annual-plan.service';
import { ItemMacro, MacroDatos, PlanAnualForm, RootPlanById, dialogDataMacro } from '../../models/interfaceFormPlan';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { filterResult } from 'src/app/shared/model/filterModel';
import { MatDialog } from '@angular/material/dialog';
import { AddMacroComponent } from '../dialogComponents/addMacro/add-macro.component';

@Component({
  selector: 'app-macrociclo',
  templateUrl: './macrociclo.component.html',
  styleUrls: ['./macrociclo.component.scss'],
})
export class MacrocicloComponent implements OnInit {
  public dataPlan:PlanAnualForm; 
  public delayData:boolean=false;
  public dataListMacro: MacroDatos[] = [];
  private dataFilterListMacro: MacroDatos[] = [];
  private routeId:string;
  constructor(
    private route$: ActivatedRoute,
    private service$: AnnualPlanService,
    public dialog: MatDialog,
    private router : Router
    ) {}

  ngOnInit(): void {
    this.routeId = this.route$.snapshot.queryParams["documentId"];
    this.getDataById(this.routeId)
  }

  getDataById(ID: string): void {
    this.service$.getDataPlanById(ID).subscribe((data:RootPlanById) => {
      const {name, year, Categorium} = data.item;
      this.dataPlan = {
        name,
        year,
        CategoriumID: Categorium.name,
      }
      this.delayData = true;
      this.getAllMacrosById(ID);
    })
  }

  getAllMacrosById(id: string): void {
    this.service$.getAllMacrosById(id).subscribe((macros: ItemMacro) => {
      this.dataListMacro = macros.item;
      this.dataFilterListMacro = macros.item;
      
    })
  }

  getDataFilter({filterData}: filterResult): void{
    this.dataListMacro = this.dataFilterListMacro?.filter(item => item.name.includes(filterData['Name']));
  }

  getActionEvent(event: ActionResponse): void{
    let data: dialogDataMacro = {routeId:  this.routeId}
    if(event.action === 'add'){
      let dialogRef = this.dialog.open( AddMacroComponent, {
        width: '384px',
        data
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getAllMacrosById(this.routeId);
      })
    }else if(event.action === 'clearFilter'){
      this.dataListMacro = [...this.dataFilterListMacro];
    }
    
  }

  editData(item: MacroDatos): void{
    let data: dialogDataMacro = {
      routeId:this.routeId,
      dataList: item,
      action: "Edit",
    }

    let dialogRef = this.dialog.open( AddMacroComponent, {
      width: '384px',
      data
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllMacrosById(this.routeId);
    })
  }

  goBack(): void{
    this.router.navigate(['/plan-anual']);
  }
}
