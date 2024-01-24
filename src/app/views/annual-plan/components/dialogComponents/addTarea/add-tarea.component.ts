import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators as validForm,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Toast } from '../../../../../utils/alert_Toast';
import { AnnualPlanService } from '../../../Services/annual-plan.service';

import { DynamicError } from 'src/app/shared/model/filterModel';
import { resposeCreate } from 'src/app/views/Entrenador/Model/entrenadorModel';
import { editTareaComplement } from 'src/app/views/Complementos/model/interfaceComplementos';
import { ComplementosService } from 'src/app/views/Complementos/services/complementos.service';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.scss'],
})
export class AddTareaComponent implements OnInit{
  public addTaskForm: FormGroup;
  public titleInit: string = 'Crear Actividad';
  public isEdit: boolean = false;

  selectedColor = new FormControl('');
  constructor(@Inject(MAT_DIALOG_DATA) public data: editTareaComplement,
    public dialogRef: MatDialogRef<AddTareaComponent>,
    private annualPlanService$: AnnualPlanService,
    private complementos$: ComplementosService
  ) {
    this.addTaskForm = new FormGroup({
      name: new FormControl('', [validForm.required]),
      describe: new FormControl('', [validForm.required]),
      color: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if(this.data !== null) {
      this.editTask();
    }
  }

  editTask(): void{
    const { ID, name, describe, color } = this.data;
    this.isEdit = true;
    this.titleInit = 'Editar Actividad'
    if(ID !== ''){
      this.addTaskForm.patchValue({name});
      this.addTaskForm.patchValue({describe});
      this.addTaskForm.patchValue({color});
    }
  }

  createTask(): void {
    if (this.addTaskForm.invalid) {
      this.alertTrigger();
      return;
    }
    const request = {
      ...this.addTaskForm.value,
    };

    this.annualPlanService$.createTask(request).subscribe(
      (data: resposeCreate) => {
        Toast.fire({
          icon: 'success',
          title: data.Menssage,
        });
        this.onNoClick();
      },
      (dataError: DynamicError<any>) => {
        const {
          error: { msg },
        } = dataError;

        Toast.fire({
          icon: 'error',
          title: msg,
        });
      }
    );
  }

  EditActividad():void{
    if (this.addTaskForm.invalid) {
      this.alertTrigger();
      return;
    }

    var request : editTareaComplement = {
      ...this.addTaskForm.value,
      ID : this.data.ID
    }

    this.complementos$.editarTarea(request).subscribe(
      (data: resposeCreate) => {
        Toast.fire({
          icon: 'success',
          title: data.Menssage,
        });
        this.onNoClick();
      },
      (dataError: DynamicError<any>) => {
        const {
          error: { msg },
        } = dataError;

        Toast.fire({
          icon: 'error',
          title: msg,
        });
      }
    );
    
  }

  alertTrigger(): void {
    this.addTaskForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
