import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from 'src/app/utils/Validators';
import { Toast } from 'src/app/utils/alert_Toast';
import { Sportsman } from 'src/app/views/models/DataSportsman';
import { SportsmanService } from 'src/app/views/sportsman/services/sportsman.service';
import { Ejercicio } from '../../Model/ejercicioModel';
import {
  IndicatorModel,
  indicatorsFormModel,
  levelList,
  listSportMan,
  templateList,
} from '../../Model/modelIndicators';
import { responseModel } from '../../Model/reponseModel';
import { EjercicioServices } from '../../services/ejercicioServices.service';
@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.scss'],
})
export class IndicadorComponent implements OnInit {
  public formIndicador: FormGroup = new indicatorsFormModel().formIndicators();
  public sportList: listSportMan[] = [];
  public levelsList: levelList[] = [{ level: 2 }, { level: 3 }, { level: 5 }];
  public countTemplates: templateList[];
  public countLeves: Array<number> = [];
  public active: number = 0;
  public siguiente: boolean = false;
  public level: number = 0;
  public isRequeridoNivel: boolean = false;

  constructor(
    private ejercicioServices$: EjercicioServices,
    private sporsmanService$: SportsmanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSportMan();
  }

  getSportMan(): void {
    this.sporsmanService$.getSportsman().subscribe((res: Sportsman[]) => {
      res.forEach((item: Sportsman) => {
        this.sportList.push({ name: item.name, ID: item.ID });
      });
    });
  }

  createTemplate(level: number): void {
    this.countTemplates = new Array(level);
    this.countLeves = new Array(level);
    this.level = level;
    this.siguiente = true;
    this.formIndicador.get('descriptionLevel')?.enable();
    this.formIndicador.get('nameLevel')?.enable();
  }

  isFormValid(): boolean {
    if (this.isRequeridoNivel) {
      if (
        Validators.isNullOrUndefined(this.countTemplates[this.level]) ||
        this.countTemplates[this.level].name === ''
      ) {
        return true;
      }
    }

    return false;
  }

  changeTab(tab: any): void {
    let plus = 1;

    if (this.level === 2) {
      plus = 4;
    }
    if (this.level === 3) {
      plus = 2;
    }

    if (
      tab !== this.active &&
      this.formIndicador.get('nameLevel')?.value !== ''
    ) {
      if (tab > this.active) {
        this.countTemplates[this.active] = {
          number: this.formIndicador.get('level')?.value,
          name: this.formIndicador.get('nameLevel')?.value,
          description: this.formIndicador.get('descriptionLevel')?.value,
        };

        if (
          Validators.isNullOrUndefined(
            this.countTemplates[this.active + 1]?.name
          ) ||
          this.countTemplates[this.active + 1]?.name === ''
        ) {
          this.formIndicador.patchValue({
            level: this.formIndicador.get('level')?.value + plus,
            nameLevel: '',
            descriptionLevel: '',
          });
        } else {
          const { name, description, number } = this.countTemplates[tab];
          this.formIndicador.patchValue({
            level: number,
            nameLevel: name,
            descriptionLevel: description,
          });
        }

        this.active++;
      } else {
        if (
          Validators.isNullOrUndefined(this.countTemplates[this.active]?.name)
        ) {
          this.countTemplates[this.active] = {
            number: this.formIndicador.get('level')?.value,
            name: this.formIndicador.get('nameLevel')?.value,
            description: this.formIndicador.get('descriptionLevel')?.value,
          };
        }

        const { name, description, number } = this.countTemplates[tab];
        this.formIndicador.patchValue({
          level: number,
          nameLevel: name,
          descriptionLevel: description,
        });
        this.active = tab;
      }
    } else {
      this.formIndicador.markAllAsTouched();
      return;
    }
  }

  isTheSame = (tab: number): string => {
    let color = '';

    if ((this.countTemplates[tab]?.name ?? '') === '') {
      color = 'blue';
    } else {
      color = 'green';
    }

    if (this.isRequeridoNivel) {
      if (
        Validators.isNullOrUndefined(this.countTemplates[tab]) ||
        this.countTemplates[tab].name === ''
      ) {
        color = 'red';
      }
    }
    return color;
  };

  createIndicator(): void {
    this.countTemplates[this.active] = {
      number: this.formIndicador.get('level')?.value,
      name: this.formIndicador.get('nameLevel')?.value,
      description: this.formIndicador.get('descriptionLevel')?.value,
    };

    if (
      (this.countTemplates[this.level - 1]?.name ?? '') === '' ||
      this.formIndicador.get('nameLevel')?.invalid
    ) {
      this.isRequeridoNivel = true;
      return;
    }

    let indicatoRequest: IndicatorModel = {
      name: this.formIndicador.get('name')?.value,
      description: this.formIndicador.get('description')?.value,
      levelCal: this.formIndicador.get('levelCal')?.value,
      absolute: this.formIndicador.get('absolute')?.value,

      levelList: this.countTemplates,
      exercisesList: this.ejercicioServices$
        .getExercisesList()
        .map((data: Ejercicio) => data.ID),
      abrev: this.formIndicador.get('abrevt')?.value,
    };

    this.ejercicioServices$.CreateIndicators(indicatoRequest).subscribe(
      (data: responseModel) => {
        if (data.success) {
          this.ejercicioServices$.setExercisesList([]);
          Toast.fire({
            icon: 'success',
            title: data.msg,
          });
          this.goBackSuccess();
        }
      },
      (error) => {
        Toast.fire({
          icon: 'error',
          title: error,
        });
      }
    );
  }

  goBackSuccess(): void {
    this.router.navigate(['/Ejercicios']);
  }

  goBack(): void {
    window.history.back();
  }
}
