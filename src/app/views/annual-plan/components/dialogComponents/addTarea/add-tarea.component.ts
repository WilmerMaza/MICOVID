import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators as validForm,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Toast } from '../../../../../utils/alert_Toast';
import { AnnualPlanService } from '../../../Services/annual-plan.service';

import { DynamicError } from 'src/app/shared/model/filterModel';
import { resposeCreate } from 'src/app/views/Entrenador/Model/entrenadorModel';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.scss'],
})
export class AddTareaComponent {
  public addTaskForm: FormGroup;
  public titleInit: string = 'Crear Actividad';

  selectedColor = new FormControl('');
  constructor(
    public dialogRef: MatDialogRef<AddTareaComponent>,
    private annualPlanService$: AnnualPlanService
  ) {
    this.addTaskForm = new FormGroup({
      name: new FormControl('', [validForm.required]),
      describe: new FormControl('', [validForm.required]),
      color: new FormControl(''),
    });
  }

  createTask(): void {
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

  alertTrigger(): void {
    this.addTaskForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
