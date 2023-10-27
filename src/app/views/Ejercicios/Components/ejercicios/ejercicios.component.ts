import { Component, OnInit } from '@angular/core';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { columnsEjerciciosValue } from '../../Model/columnDataEjercicios'
import { filterResult } from 'src/app/shared/model/filterModel';
import { jsonData } from '../../Model/dataFilterEjercicios';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreateEjercicioComponent } from '../create-ejercicio/create-ejercicio.component';
import { EjercicioServices } from '../../services/ejercicioServices.service'
import { Ejercicio, EjercicioResponse, Grupo, GrupoResponse } from '../../Model/ejercicioModel'
import { every } from 'rxjs';
import { ViewEjericioComponent } from '../view-ejericio/view-ejericio.component';
import { DinamicService } from 'src/app/shared/dinamic.service';
import { Router } from '@angular/router';

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
  public isDownload: boolean = true;
  public isCombinate: boolean = true;
  public dataEjercicio: Ejercicio[];
  public dataEjercicioAll: Ejercicio[];
  public dialogRef: MatDialogRef<CreateEjercicioComponent>;
  public grupoAll: Grupo[];
  public combinate: boolean;
  public data: Ejercicio[]
  

  constructor(
    public dialog: MatDialog,
    private  ejercicioServices$: EjercicioServices,
    private dinamicService$ : DinamicService,
    private router: Router
  ) 
  {
    this.selectNumber();
  } 

  selectNumber():void {
      this.dinamicService$.selectNumber$.subscribe((data: number) => {
        this.selectItemCount = data;
        if(data > 1) this.nameAdd = 'indicador';
        else this.nameAdd = 'ejercicio';
      })
  }
    

  ngOnInit():void {
    this.getEjercicios();  
    this.getGrupos();
  }

  getEjercicios():void{
    this.ejercicioServices$.GetEjercicios()
    .subscribe((res: EjercicioResponse) =>{
     for (const ejercicio of res.item) {
      ejercicio.GrupoAbbreviation = ejercicio.SubGrupo.Grupo.Abbreviation;
      ejercicio.SubGrupoAbbreviation = ejercicio.SubGrupo.NameSubGrupo;
    }
     this.dataEjercicio = res.item;
     this.dataEjercicioAll = res.item;
      this.isDownload = this.dataEjercicio.length > 0;
    })

  }

  getGrupos(): void {
    this.ejercicioServices$.GetGrupos().subscribe((res: GrupoResponse) => {
      this.grupoAll = res.item;

      const grupo = this.filtros.findIndex(section => section.title === 'Grupo');
      if (grupo !== -1) {
        
        this.grupoAll.forEach((item) => {          
          this.filtros[grupo].control.push({name: item.NameGrupo || '',
                                             value: item.ID,
                                            code: item.ID})
        })
      }
    })
  }
  
  getselectItemCount($event: number): void {    
    this.selectItemCount = $event;  
  }

  getActionEvent($event: ActionResponse): void {
    const {
      action: { action },
      data,
    } = $event;

    const action2 = $event.action
    this.data = data;
    switch (action || action2) {
      case 'ver':
        const dataResponse = {
          ...data,
        };
        this.openModalEjercicio(data);
      break;
      case 'combinate':
        if(this.data.length > 1) 
        {
          this.combinate = true;
          this.openModal();
        }
          break;
      case 'add indicador':
        this.router.navigate(["Ejercicios/Indicador"]);
        break;
      default:
        break;
    }
  }

  getActionEventFilter($event: ActionResponse): void {
    const { action } = $event;
    switch (action) {
      case 'add':
        this.combinate = false;
        this.openModal();
        break;
      default:
        break;
    }
  }

  getDataFilter(event: filterResult): void {

    const { filterData } = event

        const isOpen = (title: string) => {
          const item = event.jsonData.find(item => item.title === title);
          return item ? item.isOpen : undefined;
      };
      
      const isOpenGrupo = isOpen('Grupo');
      const isOpenSubGrupo = isOpen('Subgrupo');
      const isOpenAbreviacion = isOpen('Abreviación');
      const isOpenTipoRelacion = isOpen('Tipo de Relación');


        this.dataEjercicio = this.dataEjercicioAll.filter(item => {
          let results = [];
      
          if (filterData['Name'] && !item.Name.toLowerCase().includes(filterData['Name'].toLowerCase())) {
            results.push(false);
          }
    
          if (isOpenGrupo && filterData['nameGrupo'].length > 0 && !filterData['nameGrupo'].includes(item.SubGrupo.Grupo.ID)) {
            results.push(false);
          }
      
          if (isOpenSubGrupo && filterData['nameSubGrupo'] && !item.SubGrupo.NameSubGrupo.toLowerCase().includes(filterData['nameSubGrupo'].toLowerCase())) {
            results.push(false);
          }
      
          if (isOpenAbreviacion && filterData['abbreviation'] && !item.Abbreviation.toLowerCase().includes(filterData['abbreviation'].toLowerCase())) {
            results.push(false);
          }
      
          if (isOpenTipoRelacion && filterData['relationship'].length > 0 && !filterData['relationship'].some((relation:string) => item.Relationship.includes(relation))) {
            results.push(false);
          }
      
          return results.length === 0; // Es válido si no hay resultados falsos
        });

  }

  openModal(): void {
    const dialogRef = new MatDialogConfig (); 
    dialogRef.data = {      
        combinate: this.combinate,
        dataEjercicios: this.combinate ? this.data : ''    
    }; 
    dialogRef.width = '517px';
    dialogRef.height = '604px'
    this.dialogRef = this.dialog.open(CreateEjercicioComponent, dialogRef);
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if( result )
      {this.getEjercicios();}
    });
  }

  openModalEjercicio(data:Ejercicio): void {
    const dialogRef = new MatDialogConfig (); 
    dialogRef.data = { 
      data: data,
      dataEjercicio: this.dataEjercicio
    }  
    dialogRef.width = '850px';
    dialogRef.height = '850px'
    this.dialog.open(ViewEjericioComponent, dialogRef);

  }

}
