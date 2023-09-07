import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators as validForm  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnnualPlanService } from '../../../Services/annual-plan.service';
import { Toast } from '../../../../../utils/alert_Toast';
import { categoryModel } from 'src/app/views/models/categoryModel';
import { ReturnInsert, dialogDataMacro } from '../../../models/interfaceFormPlan';
import { DynamicError} from 'src/app/shared/model/filterModel';
import { Validators } from 'src/app/utils/Validators';

@Component({
  selector: 'app-add-macro',
  templateUrl: './add-macro.component.html',
  styleUrls: ['./add-macro.component.scss']
})
export class AddMacroComponent {
  public addMacroForm: FormGroup;
  public categoriesList:categoryModel[] = [];
  public minDate = new Date();
  public isEditPanel : boolean = false;
  public titleInit : string;

  constructor(
    public dialogRef: MatDialogRef<AddMacroComponent>,
    @Inject(MAT_DIALOG_DATA) public data:dialogDataMacro,
    private annualPlanService$: AnnualPlanService
  ){
    this.addMacroForm = new FormGroup({
      name:new FormControl('',[validForm.required]),
      date_initial: new FormControl('', [validForm.required]),
      date_end: new FormControl('', [validForm.required]),
      detail: new FormControl('', [validForm.required])
    })
  }

  ngOnInit(): void {
    this.setValueForm();
  }

  setValueForm(): void {
    const { action, dataList } = this.data;
    this.isEditPanel = action === 'Edit';
    this.titleInit = this.isEditPanel ? 'Editar': 'Crear';
    if(!Validators.isNullOrUndefined(dataList)) {
      this.addMacroForm.patchValue(dataList);
    }
  }

  createMacrociclo():void{
    const { routeId } = this.data;
    this.addMacroForm.value['PlanAnualID'] = routeId;
    this.annualPlanService$.insertMacro(this.addMacroForm.value).subscribe((data:ReturnInsert) => {
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
    this.addMacroForm.markAllAsTouched();
  }

  EditDataMacro():void{
    const { dataList } = this.data;
    this.addMacroForm.value['ID'] = dataList.ID;
    this.annualPlanService$.updateMacro(this.addMacroForm.value).subscribe((resp: ReturnInsert) => {
      Toast.fire({
        icon: 'success',
        title: resp.msg
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
