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
import { AddTareaComponent } from 'src/app/views/annual-plan/components/dialogComponents/addTarea/add-tarea.component';
import { ComplementosService } from '../../services/complementos.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.scss'],
})
export class AddCategoriaComponent {
  public addCategoriaForm: FormGroup;
  public titleInit: string = 'Crear categoria';

  constructor(
    public dialogRef: MatDialogRef<AddTareaComponent>,
    private complementos$: ComplementosService
  ) {
    this.addCategoriaForm = new FormGroup({
      name: new FormControl('', [validForm.required]),
      descripcion: new FormControl('', [validForm.required]),
    });
  }

  createTask(): void {
    if (this.addCategoriaForm.invalid) {
      this.alertTrigger();
      return;
    }
    const request = {
      ...this.addCategoriaForm.value,
    };

    this.complementos$.crearCategoria(request).subscribe(
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
    this.addCategoriaForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
