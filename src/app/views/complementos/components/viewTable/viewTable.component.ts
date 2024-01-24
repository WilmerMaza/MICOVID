import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { dinamicTableComplements } from 'src/app/views/annual-plan/models/interfaceFormPlan';
import { columnsDefault, columnsSubgrupo } from '../../model/columnDataTable';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { CreateSubgrupoComponent } from 'src/app/views/Ejercicios/Components/create-subgrupo/create-subgrupo.component';
import { AddTareaComponent } from 'src/app/views/annual-plan/components/dialogComponents/addTarea/add-tarea.component';
import { AddCategoriaComponent } from '../addCategoria/add-categoria.component';
import { AddEtapaComponent } from 'src/app/views/annual-plan/components/dialogComponents/addEtapa/add-etapa.component';
import { CrearDisciplinaComponent } from '../crear-disciplina/crear-disciplina.component';
import { editComplement, editSubGrupoComplement, editTareaComplement } from '../../model/interfaceComplementos';

@Component({
  selector: 'app-view-table',
  templateUrl: './viewTable.component.html',
  styleUrls: ['./viewTable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTableComponent implements OnInit {
  public titleInit: string = '';
  public column = [{}];
  public dataSet = [{}];
  public modalName: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: dinamicTableComplements,
  public dialog: MatDialog,
  public dialogRef: MatDialogRef<ViewTableComponent>) {}
  ngOnInit(): void {
    this.typeTable();
  }

  typeTable(): void {
    const { name, data } = this.data;
    this.titleInit = `${name} existentes`;
    this.modalName = name;
    this.columnaTable(name);
    this.dataSet = data;
  }

  columnaTable(name: string): void {
    switch (name) {
      case 'Categorías':
        this.column = columnsDefault;
        break;
      case 'Etapas':
        this.column = columnsDefault;
        break;
      case 'Actividades':
        this.column = columnsDefault;
        break;
      case 'Subgrupos':
        this.column = columnsSubgrupo;
        break;
        case 'Disciplinas':
        this.column = columnsDefault;
        break;
      default:
        this.column = columnsDefault;
        break;
    }
  }

  getActionEvent(event: ActionResponse) {
    const { name } = this.data;

    switch (name) {
      case 'Categorías':
        this.editCategoria(event);
        break;
      case 'Etapas':
        this.editEtapa(event);
        break;
      case 'Actividades':
        this.editTask(event);
        break;
      case 'Subgrupos':
        this.editSubgrupo(event);
        break;
        case 'Disciplinas':
        this.editDisciplina(event);
        break;
      default:
        break;
    }
  }

  editSubgrupo(event: ActionResponse): void {
    const { data } = event;

    const editData : editSubGrupoComplement = {
      ID: data.ID,
      GrupoID: data.GrupoID,
      NameSubGrupo: data.NameSubGrupo,
      Description: data.Description,
      abreviatura: data.abreviatura
    }

    let dialogRef = this.dialog.open(CreateSubgrupoComponent, {
      width: '384px',
      height: '470px',
      data: editData
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close();
    })
  }

  editTask(event: ActionResponse): void {
   const { data } = event;

   const editData : editTareaComplement = {
      name: data.name,
      describe: data.describe,
      color: data.color,
      ID: data.ID
   }
   
   let dialogRef = this.dialog.open(AddTareaComponent, {
      width: '384px',
      data: editData
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close();
    })
  }

  editCategoria(event: ActionResponse): void {
    const { data } = event;

    const editData : editComplement = {
      name : data.name,
      descripcion : data.descripcion,
      ID : data.ID
    }

    let dialogRef = this.dialog.open(AddCategoriaComponent, {
      width: '384px',
      data: editData
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close();
    })
  }

  editEtapa(event: ActionResponse): void {
    const { data } = event;

    const editData : editComplement = {
      name : data.name,
      descripcion : data.descripcion,
      ID : data.ID
    }

    let dialogRef = this.dialog.open(AddEtapaComponent, {
      width: '384px',
      data: editData
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close();
    })
  }

  editDisciplina(event: ActionResponse):void{
    const { data } = event;

    const editData : editComplement = {
      name : data.name,
      descripcion : data.describe,
      ID : data.ID
    }

    let dialogRef = this.dialog.open(CrearDisciplinaComponent, {
      width: '384px',
      data: editData
    })
    dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close();
    })
  }
  
}
