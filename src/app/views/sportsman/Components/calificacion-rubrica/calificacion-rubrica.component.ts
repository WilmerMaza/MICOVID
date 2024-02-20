import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SportsmanService } from '../../services/sportsman.service';
import { Sportsman } from 'src/app/views/models/DataSportsman';
import {
  EjercicioIndicadores,
  Item,
  Level,
} from '../../Models/indicatorsModel';
import { Toast } from 'src/app/utils/alert_Toast';
import { SuccessResponse } from 'src/app/views/models/SuccessResponse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calificacion-rubrica',
  templateUrl: './calificacion-rubrica.component.html',
  styleUrls: ['./calificacion-rubrica.component.scss'],
})
export class CalificacionRubricaComponent implements OnInit {
  public showInfo: boolean = false;
  public infoSportman: Sportsman;
  public ejercicio: EjercicioIndicadores | undefined;
  public indicadores: Item[] | undefined;
  private arregloNivelSeleccionados: { [key: string]: string }[] =[];
  public nivelSeleccionados: { [key: string]: string } = {};
  public nivel_numero: { [key: string]: number } = {};
  private arregloCalificado: { [key: string]: number }[] = [];
  public repeticiones: number = 1;
  private indexRepeticiones: number = 1;
  private dataSend: { [key: string]: number | string } = {};
  private ejercicioId: string;

  @ViewChild('contenedor_de_calificacion') containerRef!: ElementRef;

  constructor(private service$: SportsmanService, private route$: ActivatedRoute,) {}
  ngOnInit(): void {
    const {
      snapshot: { queryParams },
    } = this.route$;
    this.ejercicioId = queryParams['ejercicio'];
    this.dataInitial();
  }

  dataInitial(): void {
    this.infoSportman = this.service$.getSportmanInfoRedirect()[0];
    if (!this.infoSportman) {
      this.goBack();
      return;
    }
    
    this.ejercicio = this.infoSportman.Ejercicios?.find((item: EjercicioIndicadores) => item.ID === this.ejercicioId);

    this.indicadores = this.ejercicio?.Indicadores;

    this.showInfo = true;
  }

  obtenerArregloIndicador(value: Item): any[] {
    let dataLevels: any[] = new Array(5);
    let numberLevel = 0;
    switch (value.CalificationLevel) {
      case 2:
        for (let index = 0; index < dataLevels.length; index++) {
          if ([0, 4].includes(index)) {
            dataLevels[index] = value.Levels[numberLevel];
            numberLevel++;
          } else {
            dataLevels[index] = undefined;
          }
        }
        break;
      case 3:
        for (let index = 0; index < dataLevels.length; index++) {
          if ([0, 2, 4].includes(index)) {
            dataLevels[index] = value.Levels[numberLevel];
            numberLevel++;
          } else {
            dataLevels[index] = undefined;
          }
        }
        break;
      case 5:
        for (let index = 0; index < dataLevels.length; index++) {
          if ([0, 1, 2, 3, 4].includes(index)) {
            dataLevels[index] = value.Levels[numberLevel];
            numberLevel++;
          } else {
            dataLevels[index] = undefined;
          }
        }
        break;
    }

    return dataLevels;
  }

  includesData(id: string): boolean {
    for (const key in this.nivelSeleccionados) {
      if (this.nivelSeleccionados.hasOwnProperty(key)) {
        if (this.nivelSeleccionados[key] === id) {
          return true;
        }
      }
    }
    return false;
  }

  seleccionarNivel(nivel: Level, indicador: string, index: number): void {
    let name = indicador.replace(/\s/g, '');
    this.nivelSeleccionados[name] = nivel.ID;
    this.nivel_numero[name] = index;
  }

  obtenerCalificacion_Columna(key: string): number {
    let name = key.replace(/\s/g, '');
    return this.nivel_numero[name];
  }

  enviarCalificacion(): void {
    let min = 0;
    let max = 0;
    let promedio = 0;

    let arregloCantidades: number[] = [];

    if (this.indexRepeticiones === 1) {
      let suma = 0;
      for (const key in this.nivel_numero) {
        if (this.nivel_numero.hasOwnProperty(key)) {
          suma += this.nivel_numero[key]
        }
      }
      min = suma;
      max = suma;
      promedio = suma;
    } else {

      for (const key in this.nivel_numero) {
        if (this.nivel_numero.hasOwnProperty(key)) {
          this.arregloCalificado.push(this.nivel_numero);
          this.arregloNivelSeleccionados.push(this.nivelSeleccionados);
          this.nivel_numero = {};
          this.nivelSeleccionados = {};
        }
      }
      let suma = 0;
      this.arregloCalificado.forEach(element => {
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            suma += element[key]
          }
        }
        arregloCantidades.push(suma);
        suma = 0;
      });

      min = Math.min(...arregloCantidades);
      max = Math.max(...arregloCantidades);
      let sumaFull = arregloCantidades.reduce((a, b) => a + b);
      promedio = sumaFull / arregloCantidades.length
    }

    if(!min && !max && !promedio) this.goBack();

    this.dataSend = {
      'minimo': min,
      'maximo': max,
      'promedio':promedio,
      'sportmanId': this.infoSportman.ID,
      'ejercicioId': this.ejercicioId
    }

    this.service$.enviarDataCalificacionFinal(this.dataSend).subscribe(async (res: SuccessResponse) => {
      this.repeticiones = 1;
      this.indexRepeticiones = 1;
      this.arregloCalificado = [];
      this.arregloNivelSeleccionados = [];
      this.nivel_numero = {};
      this.nivelSeleccionados = {};
      await Toast.fire({
        icon: 'success',
        title: `${res.Message}`,
      });
      
    },(respError): void => {
      const { error } = respError;
      Toast.fire({
        icon: 'error',
        title: error,
      });
    })
  }

  next_function():void {

    if(this.repeticiones < this.indexRepeticiones && this.arregloCalificado[this.repeticiones]){
      this.repeticiones++
      this.nivel_numero = this.arregloCalificado[this.repeticiones - 1];
      this.nivelSeleccionados = this.arregloNivelSeleccionados[this.repeticiones - 1];
    }
    else if(this.repeticiones === this.indexRepeticiones && !this.arregloCalificado[this.indexRepeticiones - 1]){

      for (const key in this.nivel_numero) {
        if (this.nivel_numero.hasOwnProperty(key)) {
            this.repeticiones++;
            this.indexRepeticiones++;
            this.arregloCalificado.push(this.nivel_numero);
            this.arregloNivelSeleccionados.push(this.nivelSeleccionados);
            this.nivel_numero = {};
            this.nivelSeleccionados = {};
        }
      }
    }else {

      this.repeticiones++;
      this.nivel_numero = {};
      this.nivelSeleccionados = {};
    }
  }

  back_function():void {
    if(this.repeticiones > 1) {
    if(this.repeticiones === this.indexRepeticiones && !this.arregloCalificado[this.indexRepeticiones - 1]) {
        for (const key in this.nivel_numero) {
          if (this.nivel_numero.hasOwnProperty(key)) {
              this.arregloCalificado.push(this.nivel_numero);
              this.arregloNivelSeleccionados.push(this.nivelSeleccionados);
              this.nivel_numero = {};
              this.nivelSeleccionados = {};
          }
        }
      }

      this.repeticiones--;
      this.nivel_numero = this.arregloCalificado[this.repeticiones - 1];
      this.nivelSeleccionados = this.arregloNivelSeleccionados[this.repeticiones - 1];
    }
  }

  goBack(): void {
    window.history.back();
  }
}
