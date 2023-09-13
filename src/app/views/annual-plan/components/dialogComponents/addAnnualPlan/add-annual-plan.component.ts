import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AnnualPlanService } from '../../../Services/annual-plan.service';
import { Toast } from '../../../../../utils/alert_Toast';
import { categoryModel } from 'src/app/views/models/categoryModel';
import { ReturnInsert } from '../../../models/interfaceFormPlan';
import { DynamicError} from 'src/app/shared/model/filterModel';

@Component({
  selector: 'app-add-annual-plan',
  templateUrl: './add-annual-plan.component.html',
  styleUrls: ['./add-annual-plan.component.scss']
})
export class AddAnnualPlanComponent implements OnInit {

  public addPlanAnualForm: FormGroup;
  public categoriesList:categoryModel[] = [];
  public minDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<AddAnnualPlanComponent>,
    private annualPlanService$: AnnualPlanService
  ){
    this.addPlanAnualForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      CategoriumID: new FormControl('', [Validators.required]),
      date_initial: new FormControl('', [Validators.required]),
      date_end: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.annualPlanService$.getCategories().subscribe((data:categoryModel[])=> {
      this.categoriesList = data;
    })
  }

  createAnnualPlan():void{

    this.annualPlanService$.postInsertAnnualPlan(this.addPlanAnualForm.value).subscribe((data:ReturnInsert) => {
      Toast.fire({
        icon: 'success',
        title: data.msg
      })
      this.onNoClick();
    },(dataError: DynamicError<any>)=> {
      const { error: {msg}} = dataError;
      
      Toast.fire({
        icon: 'error',
        title: msg
      })
    })
  }

  alertTrigger():void{
    this.addPlanAnualForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
