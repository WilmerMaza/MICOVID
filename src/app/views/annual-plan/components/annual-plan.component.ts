import { Component, OnInit } from '@angular/core';
import { AnnualPlanService } from '../Services/annual-plan.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnualPlanComponent } from './dialogComponents/addAnnualPlan/add-annual-plan.component';
import { filterPlanValue } from '../models/dataFilterAnnualPlan';
import { filterResult } from 'src/app/shared/model/filterModel';
import { PlanItem } from '../models/interfaceFormPlan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annual-plan',
  templateUrl: './annual-plan.component.html',
  styleUrls: ['./annual-plan.component.scss']
})
export class AnnualPlanComponent implements OnInit {

  public dataListPlan:PlanItem[] = [];
  public allDataByFilter:PlanItem[];
  public filters = filterPlanValue;
  constructor(
    private service$ : AnnualPlanService,
    public dialog: MatDialog,
    private router$ : Router
  ){}

  ngOnInit(): void {
    this.getAllPlan();
  }
  
  getAllPlan():void {
    this.service$.getAllAnnualPlan().subscribe(data => { 
      this.dataListPlan = data.item;
      this.allDataByFilter = data.item;
    })
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddAnnualPlanComponent, {
      width: '384px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPlan();
    });
  }

  getDataFilter(event: filterResult):void {
    const {Categorium, Name, year } = event.filterData;
    const { jsonData: [categoryIsOpen, yearIsOpen] } = event;
    
    if(categoryIsOpen.isOpen && Categorium?.length > 0) {
      this.dataListPlan = this.allDataByFilter.filter(item => item.Categorium.name.toLowerCase().includes(Categorium.toLowerCase()));
    }
    if(Name?.length > 0) {
      this.dataListPlan = this.allDataByFilter.filter(item => item.name?.toLowerCase().includes(Name.toLowerCase()));
    }
    if(yearIsOpen.isOpen && year?.length > 0) {
      this.dataListPlan = this.allDataByFilter.filter(item => {
        const fecha = new Date(item.year);
        const año = fecha.getFullYear();
        return año.toString() === year;
      });
    }

    if((!categoryIsOpen.isOpen && Categorium?.length === 0) && (!yearIsOpen.isOpen && year?.length === 0) && (Name?.length === 0 || Name === null)){
      this.dataListPlan = [...this.allDataByFilter];
    }

  }

  showTooltip(data: string): string {
    return data.length > 13 ? data : '';
  }

  navMacro(id: string): void{
    this.router$.navigate(["/plan-anual/macrociclo"],
    {queryParams: {documentId: id}});
  }
}
