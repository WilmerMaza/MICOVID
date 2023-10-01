import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from '../../../services/micovi-api.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataUser } from '../../pages/model/dataUserModel';
import { categoryModel } from '../../models/categoryModel';
import {
  Item,
  ItemMacro,
  MacroDatos,
  Macrociclo,
  PlanAnualForm,
  ReturnInsert,
  RootPlan,
  RootPlanById,
  task,
} from '../models/interfaceFormPlan';
import { resposeCreate } from '../../Entrenador/Model/entrenadorModel';
import { TareasMicrociclo } from '../models/eventsModel';

@Injectable({
  providedIn: 'root',
})
export class AnnualPlanService {
  constructor(
    private micovid$: MicoviApiService,
    private authService$: AuthService
  ) {}

  postInsertAnnualPlan(data: PlanAnualForm): Observable<ReturnInsert> {
    const endpoint = '/home/annualPlan';
    return this.micovid$.post(endpoint, data);
  }

  getCategories(): Observable<categoryModel[]> {
    let data;
    this.authService$.getDataUser.subscribe((res: DataUser) => {
      data = res;
    });
    const endpoint = '/Categoria/getAllByCoach';
    return this.micovid$.post(endpoint, data);
  }

  getAllAnnualPlan(coach: string): Observable<RootPlan> {
    const endpoint = `/home/getAllAnnualPlan?coachId=${coach}`;
    return this.micovid$.get(endpoint);
  }

  getDataPlanById(ID: string): Observable<RootPlanById> {
    const endpoint = `/home/getAnnualPlanById?documentId=${ID}`;
    return this.micovid$.get(endpoint);
  }

  getAllMacrosById(ID: string): Observable<ItemMacro> {
    const endpoint = `/home/getAllMacrociclos?planId=${ID}`;
    return this.micovid$.get(endpoint);
  }

  insertMacro(data: MacroDatos): Observable<ReturnInsert> {
    const endpoint = '/home/postInsertMacro';
    return this.micovid$.post(endpoint, data);
  }

  updateMacro(data: MacroDatos): Observable<ReturnInsert> {
    const endpoint = '/home/updateMacrocycle';
    return this.micovid$.post(endpoint, data);
  }

  getAllMicrociclos(ID: string): Observable<Item<Macrociclo>> {
    const endpoint = `/home/getAllMicro?documentID=${ID}`;
    return this.micovid$.get(endpoint);
  }

  getMicrocicloTask(microcicloId: string): Observable<Array<TareasMicrociclo>> {
    const endpoint = `/Tareas/getMicrocicloTask${microcicloId}`;
    return this.micovid$.get(endpoint);
  }

  getTaskEntrenador(): Observable<task> {
    const endpoint = `/Tareas/getTareas`;
    return this.micovid$.get(endpoint);
  }

  assingTask(data: any): Observable<resposeCreate> {
    const endpoint = '/Tareas/assignTasks';
    return this.micovid$.post(endpoint, data);
  }

  createTask(data: any): Observable<resposeCreate> {
    const endpoint = '/Tareas/create';
    return this.micovid$.post(endpoint, data);
  }
}
