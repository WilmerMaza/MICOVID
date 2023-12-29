import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators as validForm,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DynamicError } from 'src/app/shared/model/filterModel';
import { Toast } from 'src/app/utils/alert_Toast';
import { resposeCreate } from 'src/app/views/Entrenador/Model/entrenadorModel';
import { ComplementosService } from '../../services/complementos.service';

@Component({
  selector: 'app-crear-disciplina',
  templateUrl: './crear-disciplina.component.html',
  styleUrls: ['./crear-disciplina.component.scss'],
})
export class CrearDisciplinaComponent {
  public addDisciplinaForm: FormGroup;
  public titleInit: string = 'Crear disciplina';

  constructor(
    public dialogRef: MatDialogRef<CrearDisciplinaComponent>,
    private complementos$: ComplementosService
  ) {
    this.addDisciplinaForm = new FormGroup({
      name: new FormControl('', [validForm.required]),
      describe : new FormControl('', [validForm.required]),
    });
  }

  createTask(): void {
    if (this.addDisciplinaForm.invalid) {
      this.alertTrigger();
      return;
    }

    const request = {
      ...this.addDisciplinaForm.value,
    };

    this.complementos$.crearDiciplina(request).subscribe(
      (data: resposeCreate) => {
        Toast.fire({
          icon: 'success',
          title: data.Menssage,
        });
        this.onNoClick();
      },
      (dataError: DynamicError<any>) => {
        const {
          error: { error },
        } = dataError;

        Toast.fire({
          icon: 'error',
          title: error,
        });
      }
    );
  }

  alertTrigger(): void {
    this.addDisciplinaForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
