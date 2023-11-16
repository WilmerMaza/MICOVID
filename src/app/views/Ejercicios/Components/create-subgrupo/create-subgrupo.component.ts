import { Component, OnInit } from '@angular/core';
import { subGrupoFormModel } from '../../Model/subGrupoFormModel'
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { Grupo } from '../../Model/ejercicioModel';
import { responseModel } from '../../Model/reponseModel';
import { subgrupoModel } from '../../Model/subGrupoModel';
import { Toast } from 'src/app/utils/alert_Toast';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-subgrupo',
  templateUrl: './create-subgrupo.component.html',
  styleUrls: ['./create-subgrupo.component.scss']
})
export class CreateSubgrupoComponent implements OnInit {

  public message: MatDialog;
  public subGrupoForm: FormGroup = new subGrupoFormModel().formSubGrupos();
  public grupoAll: Grupo[];
  public subGrupo: subgrupoModel;
  public submitted: boolean = false;
  public showFloatingDiv: boolean = false;
  public  floatingDivStyle = { left: '100px', top: '0' };
  public floatingDivContent: string = '';
  public floatingDivContentTittle: string = '';
  public floatingDivContentAbb: string = '';

  constructor(private dialog: MatDialog,
    private ejerciciosService$: EjercicioServices,
    private dialogRef: MatDialogRef<CreateSubgrupoComponent>) {  }

  ngOnInit(): void {
    this.message = this.dialog;
    this.getGrupos();
  }

  getGrupos(): void {
    this.ejerciciosService$.GetGrupos().subscribe((res: any) => {
      this.grupoAll = res.item;
    })
  }

  onMouseOver(event: MouseEvent, opcion: Grupo) {
    this.showFloatingDiv = true;
    this.floatingDivStyle.left = `65%`;
    this.floatingDivStyle.top = `210px`;
    this.floatingDivContent = opcion.Description;
    this.floatingDivContentTittle = opcion.NameGrupo !== undefined ? opcion.NameGrupo : '';
    this.floatingDivContentAbb = opcion.Abbreviation;
  }

  onMouseLeave() {
    this.showFloatingDiv = false;
  }
  cerrar(): void {
    this.dialogRef.close(true);
  }

  onCreateSubGrupo(): void {
    this.submitted = true;
    this.onSubmit();
  }
  
  onSubmit(): void {
    if (this.submitted && this.subGrupoForm.valid) {
    const { Description, NameSubGrupo,
    abbreviation, grupo  } = this.subGrupoForm.value
    this.subGrupo = {
      ...this.subGrupo,
      NameSubGrupo: NameSubGrupo,
      Description: Description,
      abreviatura: abbreviation,
      GrupoID: grupo    
    }
    this.submitted = false;
      this.ejerciciosService$.CreateSubGrupo(this.subGrupo).
       subscribe( async (res: responseModel) => {
         if (res.success) {
           await Toast.fire({
             icon: 'success',
             title: res.msg
           })
           this.dialogRef.close(true);
        }
        else{
          await Toast.fire({
            icon: 'error',
            title: res.msg
          })
        }
        })
    }
  }

}
