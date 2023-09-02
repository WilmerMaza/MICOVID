import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnnualPlanService } from '../../Services/annual-plan.service';
import { Toast } from '../../../../utils/alert_Toast';
import { categoryModel } from 'src/app/views/models/categoryModel';

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
    private annualPlanService$: AnnualPlanService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.addPlanAnualForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      CategoriumID: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.annualPlanService$.getCategories().subscribe(data => {
      this.categoriesList = data;
    })
  }

  createAnnualPlan():void{
    
    this.annualPlanService$.postInsertAnnualPlan(this.addPlanAnualForm.value).subscribe(data => {
      Toast.fire({
        icon: 'success',
        title: data.msg
      })
      this.onNoClick();
    },(dataError)=> {
      const { error: {msg}} = dataError;
      
      Toast.fire({
        icon: 'error',
        title: msg
      })
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
