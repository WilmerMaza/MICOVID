import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Toast } from 'src/app/utils/alert_Toast';
import { Grupo, GrupoResponse } from '../../Model/ejercicioModel';
import { responseModel } from '../../Model/reponseModel';
import { subGrupoFormModel } from '../../Model/subGrupoFormModel';
import { subgrupoModel } from '../../Model/subGrupoModel';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { editSubGrupoComplement } from 'src/app/views/Complementos/model/interfaceComplementos';
import { DynamicError } from 'src/app/shared/model/filterModel';
import { resposeCreate } from 'src/app/views/Entrenador/Model/entrenadorModel';
import { ComplementosService } from 'src/app/views/Complementos/services/complementos.service';

@Component({
  selector: 'app-create-subgrupo',
  templateUrl: './create-subgrupo.component.html',
  styleUrls: ['./create-subgrupo.component.scss'],
})
export class CreateSubgrupoComponent implements OnInit {
  public message: MatDialog;
  public subGrupoForm: FormGroup = new subGrupoFormModel().formSubGrupos();
  public grupoAll: Grupo[];
  public subGrupo: subgrupoModel;
  public submitted: boolean = false;
  public showFloatingDiv: boolean = false;
  public floatingDivStyle = { left: '100px', top: '0' };
  public floatingDivContent: string = '';
  public floatingDivContentTittle: string = '';
  public floatingDivContentAbb: string = '';
  public titleInit: string = 'Crear subgrupo';
  private grupoSelect: Grupo | undefined;
  public isEdit : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: editSubGrupoComplement,
    private dialog: MatDialog,
    private ejerciciosService$: EjercicioServices,
    private dialogRef: MatDialogRef<CreateSubgrupoComponent>,
    private complementos$: ComplementosService
  ) {}

  ngOnInit(): void {
    this.message = this.dialog;
    this.getGrupos();
    if(this.data !== null) {
      this.editTask();
    }
  }

  editTask(): void{
    const { ID, NameSubGrupo, Description, GrupoID, abreviatura } = this.data;
    this.isEdit = true;
    this.titleInit = 'Editar subgrupo'
    if(ID !== ''){
      this.subGrupoForm.get('grupo')?.setValidators([Validators.nullValidator]);
      this.subGrupoForm.get('grupo')?.updateValueAndValidity();
      this.subGrupoForm.patchValue({NameSubGrupo});
      this.subGrupoForm.patchValue({Description});
      this.subGrupoForm.patchValue({abbreviation:abreviatura});
      
      this.ejerciciosService$.GetGrupos().subscribe((res: GrupoResponse) => {
        this.grupoSelect = res.item.find((item) => item.ID === GrupoID);
      });
      
    }
  }

  getGrupos(): void {
    this.ejerciciosService$.GetGrupos().subscribe((res: GrupoResponse) => {
      this.grupoAll = res.item;
    });
  }

  onMouseOver(event: MouseEvent, opcion: Grupo) {
    this.showFloatingDiv = true;
    this.floatingDivStyle.left = `65%`;
    this.floatingDivStyle.top = `210px`;
    this.floatingDivContent = opcion.Description;
    this.floatingDivContentTittle =
      opcion.NameGrupo !== undefined ? opcion.NameGrupo : '';
    this.floatingDivContentAbb = opcion.Abbreviation;
  }

  onMouseLeave(): void {
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
      const { Description, NameSubGrupo, abbreviation, grupo } =
        this.subGrupoForm.value;
      this.subGrupo = {
        ...this.subGrupo,
        NameSubGrupo: NameSubGrupo,
        Description: Description,
        abreviatura: abbreviation,
        GrupoID: grupo,
      };
      this.submitted = false;
      this.ejerciciosService$
        .CreateSubGrupo(this.subGrupo)
        .subscribe(async (res: responseModel) => {
          if (res.success) {
            await Toast.fire({
              icon: 'success',
              title: res.msg,
            });
            this.dialogRef.close(true);
          } else {
            await Toast.fire({
              icon: 'error',
              title: res.msg,
            });
          }
        });
    }
  }

  onSubmitEdit(): void {
    if (this.subGrupoForm.valid) {
      const { Description, NameSubGrupo, abbreviation, grupo } =
        this.subGrupoForm.value;

      let idGrupo = grupo;

      if(grupo === ""){
        idGrupo = this.grupoSelect?.ID;
      }

      const request: editSubGrupoComplement = {
        NameSubGrupo: NameSubGrupo,
        Description: Description,
        abreviatura: abbreviation,
        GrupoID: idGrupo,
        ID: this.data.ID
      };

      this.complementos$.editarSubGrupo(request).subscribe(
        (data: resposeCreate) => {
          Toast.fire({
            icon: 'success',
            title: data.Menssage,
          });
          this.dialogRef.close();
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
  }
}
