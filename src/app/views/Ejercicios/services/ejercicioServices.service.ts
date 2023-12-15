import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MicoviApiService } from 'src/app/services/micovi-api.service';
import { Ejercicio, EjercicioResponse, GrupoResponse, SubGrupoResponse, combinateDialogModel } from '../Model/ejercicioModel';
import { subgrupoModel } from '../Model/subGrupoModel';
import { UnitsofmeasurementsResponse } from '../Model/UnitsofmeasurementsModel';
import { CreateEjercicioModel } from '../Model/createEjercicioModel';
import { responseModel } from '../Model/reponseModel';
import { IndicatorModel } from '../Model/modelIndicators';

@Injectable({
  providedIn: 'root'
})
export class EjercicioServices {

  constructor(private micovid$: MicoviApiService) { }

  private exercisesList: Ejercicio[] = [];
  private datosFuente = new BehaviorSubject<combinateDialogModel>({ combinate: false, dataEjercicios: [] });
  datosActualesEjercicios = this.datosFuente.asObservable();

  dataNewEjercicios(nuevosDatos: combinateDialogModel) {
    this.datosFuente.next(nuevosDatos);
  }

  getExercisesList(): Array<Ejercicio>{
    return this.exercisesList;
  }

  setExercisesList(listData: Ejercicio[]):void{
    this.exercisesList = listData;
  }

  CreateIndicators(data: IndicatorModel):Observable<responseModel>{
    const enpoint = '/indicators/create-indicators';
    return this.micovid$.post(enpoint, data);
  }

  GetEjercicios(): Observable<EjercicioResponse> {
    const endpoint = '/exercises/getAll-exercises';
    return this.micovid$.get(endpoint);  

  }

  GetGrupos(): Observable<GrupoResponse> {
    const endpoint = '/exercises/getAll-Grupos';
    return this.micovid$.get(endpoint);  
}


  GetSubGrupos(): Observable<SubGrupoResponse> {
    const endpoint = '/exercises/getAll-SubGrupos';
    return this.micovid$.get(endpoint);  
  }

  CreateSubGrupo(data: subgrupoModel): Observable<responseModel> {
    const endpoint = '/exercises/create-subGrupo';
    return this.micovid$.post(endpoint, data);  
  }

  GetAllUnitsofmeasurements(): Observable<UnitsofmeasurementsResponse> {
    const endpoint = '/exercises/getAll-Unitsofmeasurements';
    return this.micovid$.get(endpoint);  
  }

  CreateEjercicio(data: CreateEjercicioModel) : Observable <responseModel>{
    const endpoint = '/exercises/create-exercise';
    return this.micovid$.post(endpoint, data);  
  }

  CreateEjercicioCombinate(data: CreateEjercicioModel) : Observable <responseModel>{
    const endpoint = '/exercises/Combine-Exercise';
    return this.micovid$.post(endpoint, data);  
  }

}