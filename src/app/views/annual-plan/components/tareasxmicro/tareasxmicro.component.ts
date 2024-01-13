import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/es';
import { firstValueFrom } from 'rxjs';
import { Validators } from 'src/app/utils/Validators';
import { AnnualPlanService } from '../../Services/annual-plan.service';
import {
  Data,
  Events,
  TareasMicrociclo,
  events,
  fechaTask,
  itemEvents,
  modalDataEvent,
} from '../../models/eventsModel';
import { task } from '../../models/interfaceFormPlan';
import { AddAssingTareaComponent } from '../dialogComponents/addAssingTarea/add-assingtarea.component';

@Component({
  selector: 'app-tareasxmicro',
  templateUrl: './tareasxmicro.component.html',
  styleUrls: ['./tareasxmicro.component.scss'],
})
export class TareasxmicroComponent implements OnInit {
  @Input('viewActive') set setView(value: modalDataEvent) {
    const { isVisible, nameMacro, data } = value;
    this.showViewTareas = isVisible;
    this.nameMacro = nameMacro;
    if (data) {
      this.dataMicrociclo(data);
    }
  }

  @Output() closeCardView = new EventEmitter<boolean>();
  public showViewTareas: Boolean | undefined = true;
  public nameMacro: string = '';
  public fechaInicio: string = '';
  public fechaFin: string = '';
  public numMicrociclo: string = '';
  private microcicloId: string = '';

  private events: Events;
  public diasFechas: fechaTask[] = [];

  constructor(
    private annualPlanService$: AnnualPlanService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  closeCard(): void {
    this.showViewTareas = false;
    this.closeCardView.emit(false);
  }
  async dataMicrociclo(data: Data): Promise<void> {
    const { date_initial, date_end, number_micro, ID } = data;
    this.microcicloId = ID;
    await this.searchTareasMicro(this.microcicloId);

    const dateinitial = moment(date_initial);
    const dateFinal = moment(date_end);

    this.fechaInicio = dateinitial.format('DD/MM/YYYY');
    this.fechaFin = dateFinal.format('DD/MM/YYYY');
    this.numMicrociclo = number_micro;

    this.daysCalendar(dateinitial, dateFinal);
  }

  daysCalendar(fechaInicio: Moment, fechaFin: Moment): void {
    this.diasFechas = [];

    while (fechaInicio.isSameOrBefore(fechaFin, 'day')) {
      this.diasFechas.push({
        number: parseInt(fechaInicio.format('DD')),
        dia: fechaInicio.format('dddd').charAt(0).toUpperCase(),
        mes: fechaInicio.format('MM'),
        fecha: fechaInicio.format(),
      });

      fechaInicio.add(1, 'day'); // Avanza un día
    }
  }

  eventsDay(item: fechaTask): events[] {
    const { number, mes } = item;
    const eventsDays: events[] = [];
    const dayPositions: { [day: string]: number } = {}; // Lleva un seguimiento de las posiciones por día
    if (this.events) {
      this.events.forEach((event: itemEvents) => {
        const { start, end } = event;

        if (Validators.isNullOrUndefined(end)) {
          event.end = start;
        }

        const endSingle = Validators.isNullOrUndefined(end) ? start : end;
        const fechaInicio = moment(start);
        const fechaFin = moment(endSingle);
        const startDay = fechaInicio.format('DD');
        const startMonth = fechaInicio.format('MM'); // Obtén el mes de inicio del evento

        // Calcula la cantidad de días que dura el evento
        const durationDays = fechaFin.diff(fechaInicio, 'days') + 1;

        // Verifica si el evento abarca varios días
        if (durationDays > 1) {
          // Verifica si es un nuevo día y reinicia la posición
          if (!dayPositions[startDay]) {
            dayPositions[startDay] = 1;
          }

          // Asigna la posición al evento en el primer día
          event.position = dayPositions[startDay];

          // Incrementa la posición para el próximo evento en el mismo día
          dayPositions[startDay]++;

          // Actualiza las posiciones para los días siguientes
          for (let i = 1; i < durationDays; i++) {
            const nextDay = moment(start).add(i, 'days').format('DD');
            dayPositions[nextDay] = dayPositions[startDay];
          }
        } else {
          // El evento dura un solo día, verifica si es un nuevo día y reinicia la posición
          if (!dayPositions[startDay]) {
            dayPositions[startDay] = 1;
          }

          // Asigna la posición al evento
          event.position = dayPositions[startDay];

          // Incrementa la posición para el próximo evento en el mismo día
          dayPositions[startDay]++;
        }
        event.durationDays = durationDays;

        // Obtén el mes de la fecha actual (item)
        const currentMonth = mes;

        // Verifica si el evento pertenece al día actual y al mismo mes
        const numberDay = parseInt(startDay);
        if (number === numberDay && currentMonth === startMonth) {
          eventsDays.push(event);
        }
      });
    }

    return eventsDays;
  }

  async searchTareasMicro(microcicloID: string): Promise<void> {
    const res = await firstValueFrom(
      this.annualPlanService$.getMicrocicloTask(microcicloID)
    );

    const eventos = res.map(
      ({
        fechaInicio,
        fechaFin,
        Tarea: { name, color },
      }: TareasMicrociclo) => ({
        title: name,
        start: fechaInicio,
        end: fechaFin,
        color: color,
      })
    );

    this.events = eventos as Events;
  }

  assigntask(fechaData: fechaTask): void {
    this.annualPlanService$.getTaskEntrenador().subscribe((res: task) => {
      const data = {
        tareas: res,
        fecha: fechaData,
        MicrocicloID: this.microcicloId,
      };

      let dialogRef = this.dialog.open(AddAssingTareaComponent, {
        width: '384px',
        data,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.searchTareasMicro(this.microcicloId);
      });
    });
  }
}
