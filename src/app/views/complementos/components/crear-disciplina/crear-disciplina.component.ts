import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators as validForm, } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ComplementosService } from '../../services/complementos.service';

@Component({
  selector: 'app-crear-disciplina',
  templateUrl: './crear-disciplina.component.html',
  styleUrls: ['./crear-disciplina.component.scss']
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
      descripcion: new FormControl('', [validForm.required]),
    });
  }

  createTask(): void {
    const request = {
      ...this.addDisciplinaForm.value,
    };
  }

  alertTrigger(): void {
    this.addDisciplinaForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

