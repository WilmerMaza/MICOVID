import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { columnsEjerciciosValue } from '../../Model/columnDataEjercicios'
import { filterResult } from 'src/app/shared/model/filterModel';
import { jsonData } from '../../Model/dataFilterEjercicios';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreateEjercicioComponent } from '../create-ejercicio/create-ejercicio.component';
import { EjercicioServices } from '../../services/ejercicioServices.service'
import { Ejercicio, EjercicioResponse } from '../../Model/ejercicioModel'

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss']
})
export class EjerciciosComponent implements OnInit {
  public selectItemCount: number = 0;
  public isCheck: boolean = true;
  public column = columnsEjerciciosValue;
  public filtros = jsonData;
  public nameAdd: string = 'ejercicio';
  public isDownload: boolean;
  public dataEjercicio: Ejercicio[];
  public dialogRef: MatDialogRef<CreateEjercicioComponent>;

  constructor(
    public dialog: MatDialog,
    private  ejercicioServices$: EjercicioServices
  ) {} 

  ngOnInit():void {
    this.getEjercicios();  
  }

  getEjercicios():void{
    this.ejercicioServices$.GetEjercicios()
    .subscribe((res: EjercicioResponse) =>{
     for (const ejercicio of res.item) {
      ejercicio.GrupoAbbreviation = ejercicio.SubGrupo.Grupo.Abbreviation;
      ejercicio.SubGrupoAbbreviation = ejercicio.SubGrupo.NameSubGrupo;
    }
     this.dataEjercicio = res.item;
    })

  }
  
  getselectItemCount($event: number): void {
    this.selectItemCount = $event;  
  }

  getActionEvent($event: ActionResponse): void {
    //esta enproceso no comentes esto jajaja
  }

  getActionEventFilter($event: ActionResponse): void {
    const { action } = $event;

    switch (action) {
      case 'add':
        this.openModal();
        break;
      default:
        break;
    }
  }

  getDataFilter(event: filterResult): void {
    this.getEjercicios();
  }

  openModal(): void {
    const dialogRef = new MatDialogConfig (); 
    dialogRef.data = {      
        message: 'Este es un mensaje de texto.'    
    }; 
    dialogRef.width = '517px';
    dialogRef.height = '604px'
    this.dialogRef = this.dialog.open(CreateEjercicioComponent, dialogRef);

    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if( result )
      {this.getEjercicios();}
    });
  }

}