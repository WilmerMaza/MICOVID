import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators as validForm,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AnnualPlanService } from '../../../Services/annual-plan.service';
import { Toast } from '../../../../../utils/alert_Toast';
import { DynamicError } from 'src/app/shared/model/filterModel';
import { AddTareaComponent } from '../addTarea/add-tarea.component';
import { Tarea, dataModelAssing } from '../../../models/eventsModel';
import { resposeCreate } from 'src/app/views/Entrenador/Model/entrenadorModel';

@Component({
  selector: 'add-assingtarea',
  templateUrl: './add-assingtarea.component.html',
  styleUrls: ['./add-assingtarea.component.scss'],
})
export class AddAssingTareaComponent {
  public addTaskForm: FormGroup;
  public categoriesList: Tarea[] = [];
  public minDate: Date;
  public maxDate: Date;
  public titleInit: string = 'Asignar tarear';

  constructor(
    public dialogRef: MatDialogRef<AddAssingTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataModelAssing,
    private annualPlanService$: AnnualPlanService,
    public dialog: MatDialog
  ) {
    this.addTaskForm = new FormGroup({
      task: new FormControl('', [validForm.required]),
      date_initial: new FormControl({ value: '', disabled: true }, [
        validForm.required,
      ]),
      date_end: new FormControl(Date, [validForm.required]),
    });
  }

  ngOnInit(): void {
    this.setValueForm();
    this.setInitialMinDate();
  }

  setInitialMinDate(): void {
    const {
      fecha: { fecha },
    } = this.data;
    this.minDate = new Date(fecha);
    this.addTaskForm.patchValue({ date_initial: this.minDate });
  }

  setValueForm(): void {
    const { tareas } = this.data;
    this.categoriesList = tareas;
  }

  assingTask(): void {
    const { MicrocicloID } = this.data;
    const {
      value: { date_end, task },
    } = this.addTaskForm;

    const request = {
      MicrocicloID,
      TareaID: task,
      fechaInicio: this.minDate,
      fechaFin: date_end,
    };

    this.annualPlanService$.assingTask(request).subscribe(
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

  createtask(): void {
    this.dialog.open(AddTareaComponent, {
      width: '384px',
    });
  }
}
