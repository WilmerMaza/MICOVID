import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DinamicService } from 'src/app/shared/dinamic.service';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { filterResult } from 'src/app/shared/model/filterModel';
import { Sportsman } from 'src/app/views/models/DataSportsman';
import { SportsmanService } from 'src/app/views/sportsman/services/sportsman.service';
import { columnsEjerciciosValue } from '../../Model/columnDataEjercicios';
import { EjerciciosData, jsonData } from '../../Model/dataFilterEjercicios';
import {
  Ejercicio,
  EjercicioResponse,
  Grupo,
  GrupoResponse,
  combinateDialogModel,
  viewEjercicio,
} from '../../Model/ejercicioModel';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { AsignDeportistaComponent } from '../asignDeportista/asignDeportista.component';
import { CreateEjercicioComponent } from '../create-ejercicio/create-ejercicio.component';
@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss'],
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
  public data: Ejercicio[];

  //----view image------------
  public dataValuesImage: viewEjercicio;

  constructor(
    public dialog: MatDialog,
    private ejercicioServices$: EjercicioServices,
    private dinamicService$: DinamicService,
    private router: Router,
    private sporsmanService$: SportsmanService
  ) {
    this.selectNumber();
  }

  selectNumber(): void {
    this.dinamicService$.selectNumber$.subscribe((data: number) => {
      this.selectItemCount = data;
    });
  }

  ngOnInit(): void {
    this.getEjercicios();
    this.getGrupos();
  }

  getEjercicios(): void {
    this.ejercicioServices$
      .GetEjercicios()
      .subscribe((res: EjercicioResponse) => {
        for (const ejercicio of res.item) {
          ejercicio.GrupoAbbreviation = ejercicio.SubGrupo.Grupo.Abbreviation;
          ejercicio.SubGrupoAbbreviation = ejercicio.SubGrupo.NameSubGrupo;
        }
        this.dataEjercicio = res.item;
        this.dataEjercicioAll = res.item;
        this.isDownload = this.dataEjercicio.length > 0;
      });
  }

  getGrupos(): void {
    this.ejercicioServices$.GetGrupos().subscribe((res: GrupoResponse) => {
      this.grupoAll = res.item;

      const grupo = this.filtros.findIndex(
        (section: EjerciciosData) => section.title === 'Grupo'
      );
      if (grupo !== -1) {
        this.grupoAll.forEach((item: Grupo) => {
          this.filtros[grupo].control.push({
            name: item.NameGrupo || '',
            value: item.ID,
            code: item.ID,
          });
        });
      }
    });
  }

  getselectItemCount($event: number): void {
    this.selectItemCount = $event;
  }

  getActionEvent($event: ActionResponse): void {
    const {
      action: { action },
      data,
    } = $event;
    const action2 = $event.action;
    this.data = data;
    switch (action || action2) {
      case 'ver ejercicio':
        var values = {
          data: data,
          dataEjercicio: this.dataEjercicio,
        };
        this.dataValuesImage = values;
        break;
      case 'combinate':
        if (this.data.length > 1) {
          this.combinate = true;
          this.openModal();
        }
        break;
      case 'add indicador':
        let dataArray = [];
        if (!Array.isArray($event.data)) {
          dataArray.push($event.data);
          $event.data = dataArray;
        }

        this.ejercicioServices$.setExercisesList($event.data);

        this.router.navigate(['Ejercicios/Indicador']);
        break;
      case 'asignar':
        if (this.data.length > 0) {
          this.asignDeportista(this.data);
        }

        break;
      default:
        break;
    }
  }

  getActionEventFilter($event: ActionResponse): void {
    const { action, data } = $event;
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
    const { filterData } = event;

    const isOpen = (title: string) => {
      const item = event.jsonData.find((item) => item.title === title);
      return item ? item.isOpen : undefined;
    };

    const isOpenGrupo = isOpen('Grupo');
    const isOpenSubGrupo = isOpen('Subgrupo');
    const isOpenAbreviacion = isOpen('Abreviación');
    const isOpenTipoRelacion = isOpen('Tipo de Relación');

    this.dataEjercicio = this.dataEjercicioAll.filter(
      ({
        Relationship,
        Name,
        SubGrupo,
        SubGrupo: { Grupo },
        Abbreviation,
      }: Ejercicio) => {
        let results: boolean[] = [];

        if (
          filterData['Name'] &&
          !Name.toLowerCase().includes(filterData['Name'].toLowerCase())
        ) {
          results.push(false);
        }

        if (
          isOpenGrupo &&
          filterData['nameGrupo'].length > 0 &&
          !filterData['nameGrupo'].includes(Grupo.ID)
        ) {
          results.push(false);
        }

        if (
          isOpenSubGrupo &&
          filterData['nameSubGrupo'] &&
          !SubGrupo.NameSubGrupo.toLowerCase().includes(
            filterData['nameSubGrupo'].toLowerCase()
          )
        ) {
          results.push(false);
        }

        if (
          isOpenAbreviacion &&
          filterData['abbreviation'] &&
          !Abbreviation.toLowerCase().includes(
            filterData['abbreviation'].toLowerCase()
          )
        ) {
          results.push(false);
        }

        if (
          isOpenTipoRelacion &&
          filterData['relationship'].length > 0 &&
          !filterData['relationship'].some((relation: string) =>
            Relationship.includes(relation)
          )
        ) {
          results.push(false);
        }

        return results.length === 0; // Es válido si no hay resultados falsos
      }
    );
  }

  openModal(): void {
    const data: combinateDialogModel = {
      combinate: this.combinate,
      dataEjercicios: this.combinate ? this.data : [],
    };
    this.ejercicioServices$.dataNewEjercicios(data);
    this.router.navigate(['Ejercicios/NewEjercicio']);
  }

  asignDeportista(data: Ejercicio[]): void {
    this.sporsmanService$.getSportsman().subscribe((res: Sportsman[]) => {
      const dataModal = {
        sportman: res,
        exercise: data,
      };
      this.dialog.open(AsignDeportistaComponent, {
        width: 'auto',
        height: 'calc(70% - 100px)',
        panelClass: 'asingDeportista',
        data: dataModal,
      });
    });
  }
  actionCloseImage(event: boolean): void {
    this.dataValuesImage.dataEjercicio = [];
  }
}
