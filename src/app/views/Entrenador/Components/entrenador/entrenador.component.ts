import { Component, OnInit } from '@angular/core';
import { columnsEntrenadorValue } from 'src/app/views/Entrenador/Model/columnDataEntrenador';
import { EntrenadorServices } from 'src/app/views/Entrenador/services/EntrenadorServices.service';
import { filterEntrenadorValue } from 'src/app/views/Entrenador/Model/filtroDataEntrenador';
import { filterResult } from 'src/app/shared/model/filterModel';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import {
  Entrandor,
  listEntrenador,
  viewModalEntrenador,
} from '../../Model/entrenadorModel';
import {
  NormaliceUpperUnicosValidators,
  NormaliceUpperValidators,
} from 'src/app/utils/Validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.scss'],
})
export class EntrenadorComponent implements OnInit {
  public column = columnsEntrenadorValue;
  public data: listEntrenador;
  public isCheck: boolean = true;
  public selectItemCount: number = 0;
  public isDownload: boolean;
  public nameAdd: string = 'entrenador';
  public filtros = filterEntrenadorValue;
  public showViewEntrenador: viewModalEntrenador = { isVisible: false };
  public showViewCreateEntrenador: viewModalEntrenador = { isVisible: false };
  public dataSingle: Entrandor;
  constructor(
    private entrenadorServices$: EntrenadorServices,
    private router : Router
    ) {}

  ngOnInit(): void {
    this.findEntranador();
  }

  findEntranador(Name?: string, identification?: string): void {
    const filterEntranador = {
      name: Name,
      identification: identification,
    };

    this.entrenadorServices$
      .getAllEntrenadores(filterEntranador)
      .subscribe((response: listEntrenador) => {
        response.forEach((item: Entrandor) => {
          item.name = NormaliceUpperUnicosValidators.normaliceData(item.name);
        });
        NormaliceUpperValidators.normaliceData(response);

        this.data = response;
      });
  }

  getselectItemCount($event: number): void {
    this.selectItemCount = $event;
  }

  getDataFilter(event: filterResult): void {
    const {
      filterData: { Name, identificacion },
    } = event;

    this.findEntranador(Name, identificacion);
  }

  getActionEvent($event: ActionResponse): void {
    const {
      action: { action },
      data,
    } = $event;

    switch (action) {
      case 'ver':
        const dataResponse = {
          ...data,
        };

        this.showViewEntrenador = {
          isVisible: true,
          data: dataResponse,
        };
        break;
      case 'Editar':
        this.showViewCreateEntrenador = {
          isVisible: true,
          data: $event.data,
        };
        break;
      case 'planAnual':
        this.router.navigate(['/plan-anual'],
        {queryParams: {coachId: data.ID}})
      break;
      default:
        break;
    }
  }

  editarEntrenadorView($event: Entrandor): void {
    this.showViewCreateEntrenador = {
      isVisible: true,
      data: $event,
    };
    this.showViewEntrenador = { isVisible: false };
  }

  getActionEventFilter($event: ActionResponse): void {
    const { action } = $event;

    switch (action) {
      case 'add':
        this.showViewCreateEntrenador = { isVisible: true };
        break;
      default:
        break;
    }
  }
}
