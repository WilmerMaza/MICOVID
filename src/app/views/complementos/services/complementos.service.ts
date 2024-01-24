import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { SubGrupoResponse } from '../../Ejercicios/Model/ejercicioModel';
import { resposeCreate } from '../../Entrenador/Model/entrenadorModel';
import { task } from '../../annual-plan/models/interfaceFormPlan';
import { categoryModel } from '../../models/categoryModel';
import {
  Diciplinas,
  Etapas,
  Grupo,
  categoriaRequest,
  diciplinaRequest,
  editComplement,
  editDisciplinaRequest,
  editSubGrupoComplement,
  editTareaComplement,
} from '../model/interfaceComplementos';

@Injectable({
  providedIn: 'root',
})
export class ComplementosService {
  constructor(private micovid$: MicoviApiService) {}

  getAllCategory(): Observable<categoryModel[]> {
    const endpoint = '/Categoria/getAll';
    return this.micovid$.get(endpoint);
  }

  getTaskEntrenador(): Observable<task> {
    const endpoint = `/Tareas/getTareas`;
    return this.micovid$.get(endpoint);
  }

  GetSubGrupos(): Observable<SubGrupoResponse> {
    const endpoint = '/exercises/getAll-SubGrupos';
    return this.micovid$.get(endpoint);
  }

  deleteCategoria(idCategoria: string): Observable<string> {
    const endpoint = `/Categoria/delete/${idCategoria}`;
    return this.micovid$.delete(endpoint);
  }

  crearCategoria(request: categoriaRequest): Observable<resposeCreate> {
    const endpoint = `/Categoria/create`;
    return this.micovid$.post(endpoint, request);
  }

  deleteTarea(idTarea: string): Observable<string> {
    const endpoint = `/Tareas/delete/${idTarea}`;
    return this.micovid$.delete(endpoint);
  }
  getGrupo(idGrupo: string): Observable<Grupo> {
    const endpoint = `/exercises/get-Grupo/${idGrupo}`;
    return this.micovid$.get(endpoint);
  }

  crearEtapa(request: categoriaRequest): Observable<resposeCreate> {
    const endpoint = `/Etapa/create`;
    return this.micovid$.post(endpoint, request);
  }

  getEtapas(): Observable<Etapas[]> {
    const endpoint = `/Etapa/getAll`;
    return this.micovid$.get(endpoint);
  }

  getDiciplina(): Observable<Diciplinas[]> {
    const endpoint = `/Diciplinas/getAll`;
    return this.micovid$.get(endpoint);
  }

  crearDiciplina(request: diciplinaRequest): Observable<resposeCreate> {
    const endpoint = `/Diciplinas/create`;
    return this.micovid$.post(endpoint, request);
  }

  editarEtapa(data: editComplement): Observable<resposeCreate> {
    const endpoint = `/Etapa/update`;
    return this.micovid$.put(endpoint, data);
  }

  editarSubGrupo(data: editSubGrupoComplement):Observable<resposeCreate>{
    const endpoint = `/exercises/update-subgrupo`;
    return this.micovid$.put(endpoint, data);
  }

  editarTarea(data: editTareaComplement): Observable<resposeCreate> {
    const endpoint = `/Tareas/update`;
    return this.micovid$.put(endpoint, data);
  }

  editarDiciplina(data: editDisciplinaRequest):Observable<resposeCreate>{
    const endpoint = `/Diciplinas/update`;
    return this.micovid$.put(endpoint, data);
  }

  editarCategoria(data: editComplement): Observable<resposeCreate>{
    const endpoint = `/Categoria/update-category`;
    return this.micovid$.put(endpoint, data);
  }
}
