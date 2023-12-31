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
  public lastDate:string;
  public dateNow: Date;
  public isInitial : boolean = false;
  public isCoach: boolean;
  public date_end:string;
  constructor(
    private route$: ActivatedRoute,
    private service$: AnnualPlanService,
    public dialog: MatDialog,
    private router : Router
    ) {}

  ngOnInit(): void {
    const { snapshot : {queryParams: {documentId, isCoach}} } = this.route$;
    this.isCoach = isCoach === 'true';
    this.routeId = documentId;
    this.getDataById(this.routeId)
  }

  getDataById(ID: string): void {
    this.service$.getDataPlanById(ID).subscribe((data:RootPlanById) => {
      const {name, date_initial, Categorium, date_end} = data.item;
      this.dataPlan = {
        name,
        date_initial,
        CategoriumID: Categorium.name,
        date_end
      }
      this.dateNow = new Date(date_initial)
      this.date_end = date_end;
      this.delayData = true;
      this.getAllMacrosById(ID);
    })
  }

  getAllMacrosById(id: string): void {
    this.service$.getAllMacrosById(id).subscribe((macros: ItemMacro) => {
      this.dataListMacro = macros.item;
      this.dataFilterListMacro = macros.item;
      this.lastDate = this.dataFilterListMacro.length > 0 ? this.dataFilterListMacro[0].date_end : this.dateNow.toString();
      this.isInitial = this.dataFilterListMacro.length === 0;
    })
  }

  getDataFilter({filterData}: filterResult): void{
    this.dataListMacro = this.dataFilterListMacro?.filter(item => item.name.includes(filterData['Name']));
  }

  getActionEvent({action}: ActionResponse): void{
    let data: dialogDataMacro = {
      routeId:  this.routeId, 
      lastDate: this.lastDate,
      initial:this.isInitial,
      date_end: this.date_end
    }
    if(action === 'add'){
      let dialogRef = this.dialog.open( AddMacroComponent, {
        width: '384px',
        data
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getAllMacrosById(this.routeId);
      })
    }else if(action === 'clearFilter'){
      this.dataListMacro = [...this.dataFilterListMacro];
    }
    
  }

  addMacrociclo(): void{
    let data: dialogDataMacro = {
      routeId:  this.routeId, 
      lastDate: this.lastDate,
      initial:this.isInitial,
      date_end: this.date_end
    }
    let dialogRef = this.dialog.open( AddMacroComponent, {
      width: '384px',
      data
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllMacrosById(this.routeId);
    })
  }

  editData(item: MacroDatos): void{
    let data: dialogDataMacro = {
      routeId:this.routeId,
      dataList: item,
      action: "Edit",
      lastDate: this.lastDate,
      date_end: this.date_end
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
    if(this.isCoach){
      this.router.navigate(['/plan-anual']);
    }
    else {
      window.history.back();
    }
  }

  goToModuleMicro({ID}: MacroDatos): void{
    this.router.navigate(["/plan-anual/microciclo"],
    {queryParams: {documentId: ID}});
  }
}
