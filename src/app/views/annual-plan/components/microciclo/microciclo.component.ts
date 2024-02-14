import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DinamicService } from 'src/app/shared/dinamic.service';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { Etapas } from 'src/app/views/Complementos/model/interfaceComplementos';
import { ComplementosService } from 'src/app/views/Complementos/services/complementos.service';
import { AnnualPlanService } from '../../Services/annual-plan.service';
import { columnsEntrenadorValue } from '../../models/columnsTableMicro';
import { Item, Macrociclo, Microciclo } from '../../models/interfaceFormPlan';
import { AddAssingEtapaComponent } from '../dialogComponents/addAssingEtapa/add-assingetapa.component';

@Component({
  selector: 'app-microciclo',
  templateUrl: './microciclo.component.html',
  styleUrls: ['./microciclo.component.scss'],
})
export class MicrocicloComponent implements OnInit {
  private routeId: string;
  public nameMacro: string = '';
  public columns = columnsEntrenadorValue;
  public dataSource: Microciclo[];
  public showViewTareas: any = { isVisible: false };
  public masiveEtapa: boolean = false;
  private microSelect: Microciclo[] = [];

  constructor(
    private route$: ActivatedRoute,
    private service$: AnnualPlanService,
    private complementos$: ComplementosService,
    public dialog: MatDialog,
    private serviceDinamic$: DinamicService
  ) {}

  ngOnInit(): void {
    const {
      snapshot: { queryParams },
    } = this.route$;
    this.routeId = queryParams['documentId'];
    this.getAllInfoModule();
  }

  getAllInfoModule(): void {
    this.microSelect = [];
    this.masiveEtapa = false;

    this.service$
      .getAllMicrociclos(this.routeId)
      .subscribe((data: Item<Macrociclo>) => {
        const {
          item: { name, Microciclos },
        } = data;
        this.nameMacro = name;
        this.dataSource = Microciclos;
      });
  }

  getActionEvent(event: ActionResponse): void {
    const {
      action: { action },
      data,
    } = event;

    switch (action) {
      case 'ver':
        this.showViewTareas = {
          isVisible: true,
          data: data,
          nameMacro: this.nameMacro,
        };
        break;
      case 'asignar':
        this.microSelect.push(data);
        this.assingEtapa(this.microSelect);
        break;

      case 'Select':
        this.masiveEtapa = data.length > 0 ? true : false;
        this.microSelect = data;
        break;

      default:
        break;
    }
  }

  assingEtapaAction(): void {
    this.assingEtapa(this.microSelect);
  }

  assingEtapa(data: Microciclo[]): void {
    this.complementos$.getEtapas().subscribe((res: Etapas[]) => {
      const request = {
        etapas: res,
        data: data,
      };

      let dialogRef = this.dialog.open(AddAssingEtapaComponent, {
        width: '384px',
        height: '200px',
        data: request,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getAllInfoModule();
      });
    });
  }

  goBack(): void {
    window.history.back();
  }
  closeCardTarea(event: boolean): void {
    this.showViewTareas = { isVisible: event };
  }
}
