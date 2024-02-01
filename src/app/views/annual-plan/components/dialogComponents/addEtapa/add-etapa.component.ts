import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators as validForm,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DynamicError } from 'src/app/shared/model/filterModel';
import { Toast } from 'src/app/utils/alert_Toast';
import { editComplement } from 'src/app/views/Complementos/model/interfaceComplementos';
import { ComplementosService } from 'src/app/views/Complementos/services/complementos.service';
import { resposeCreate } from 'src/app/views/Entrenador/Model/entrenadorModel';

@Component({
  selector: 'app-add-etapa',
  templateUrl: './add-etapa.component.html',
  styleUrls: ['./add-etapa.component.scss'],
})
export class AddEtapaComponent implements OnInit {
  public addEtapaForm: FormGroup;
  public titleInit: string = 'Crear etapa';
  public isEdit: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: editComplement,
    public dialogRef: MatDialogRef<AddEtapaComponent>,
    private complementos$: ComplementosService
  ) {
    this.addEtapaForm = new FormGroup({
      name: new FormControl('', [validForm.required]),
      descripcion: new FormControl('', [validForm.required]),
    });
  }

  ngOnInit(): void {
    if(this.data !== null) {
      this.editTask();
    }
  }

  editTask(): void{
    const { ID, name, descripcion } = this.data;
    this.isEdit = true;
    this.titleInit = 'Editar etapa'
    if(ID !== ''){
      this.addEtapaForm.patchValue({name});
      this.addEtapaForm.patchValue({descripcion});

    }
  }

  createTask(): void {
    if (this.addEtapaForm.invalid) {
      this.alertTrigger();
      return;
    }
    const request = {
      ...this.addEtapaForm.value,
    };

    this.complementos$.crearEtapa(request).subscribe(
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

  EditEtapa():void {
    if (this.addEtapaForm.invalid) {
      this.alertTrigger();
      return;
    }

    var request : editComplement = {
      ...this.addEtapaForm.value,
      ID : this.data.ID
    }

    this.complementos$.editarEtapa(request).subscribe(
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
    this.addEtapaForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
