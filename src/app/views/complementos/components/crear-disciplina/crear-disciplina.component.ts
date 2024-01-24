import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators as validForm,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicError } from 'src/app/shared/model/filterModel';
import { Toast } from 'src/app/utils/alert_Toast';
import { resposeCreate } from 'src/app/views/Entrenador/Model/entrenadorModel';
import { ComplementosService } from '../../services/complementos.service';
import { editComplement, editDisciplinaRequest } from '../../model/interfaceComplementos';

@Component({
  selector: 'app-crear-disciplina',
  templateUrl: './crear-disciplina.component.html',
  styleUrls: ['./crear-disciplina.component.scss'],
})
export class CrearDisciplinaComponent implements OnInit{
  public addDisciplinaForm: FormGroup;
  public titleInit: string = 'Crear disciplina';
  public isEdit: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: editComplement,
    public dialogRef: MatDialogRef<CrearDisciplinaComponent>,
    private complementos$: ComplementosService
  ) {
    this.addDisciplinaForm = new FormGroup({
      name: new FormControl('', [validForm.required]),
      describe : new FormControl('', [validForm.required]),
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
    this.titleInit = 'Editar disciplina'
    if(ID !== ''){
      this.addDisciplinaForm.patchValue({name});
      this.addDisciplinaForm.patchValue({describe:descripcion});

    }
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

  EditDisciplina(): void {
    if (this.addDisciplinaForm.invalid) {
      this.alertTrigger();
      return;
    }

    var request : editDisciplinaRequest = {
      ...this.addDisciplinaForm.value,
      ID : this.data.ID
    }

    this.complementos$.editarDiciplina(request).subscribe(
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
    this.addDisciplinaForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
