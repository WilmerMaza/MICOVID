import { Component, OnInit } from '@angular/core';
import { columnsEntrenadorValue } from 'src/app/views/Entrenador/Model/columnDataEntrenador';
import { EntrenadorServices } from 'src/app/views/Entrenador/services/EntrenadorServices.service';
import { filterEntrenadorValue } from 'src/app/views/Entrenador/Model/filtroDataEntrenador';
import { filterResult } from 'src/app/shared/model/filterModel';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { Entrandor, listEntrenador } from '../../Model/entrenadorModel';
import { DateValidators } from 'src/app/utils/Validators';

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
  public showViewEntrenador: any = false;
  public showViewCreateEntrenador: any = true;
  public dataSingle: Entrandor;
  constructor(private entrenadorServices$: EntrenadorServices) {}

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
        response.map((item) => {
          item.birtDate = DateValidators.parseDate(item.birtDate);
          item.nationality = `${item.nationality}, ${item.city} (${item.stateordepartmen})`;
        });
        this.data = response;
      });
  }

  getselectItemCount($event: number): void {
    this.selectItemCount = $event;
  }

  getDataFilter(event: filterResult): void {
    const {
      filterData: { Name },
    } = event;

    this.findEntranador(Name);
  }

  getActionEvent($event: ActionResponse): void {
    const {
      action: { action },
    } = $event;

    switch (action) {
      case 'ver':
        this.showViewEntrenador = {
          isVisible: true,
          data: $event.data,
        };
        break;
      default:
        break;
    }
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
