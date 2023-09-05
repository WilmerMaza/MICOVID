import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sportsmanFormModel } from '../../../models/sportsmanFormModel'
import { genero, identificación } from '../../../models/constSportsman'
import { FormGroup } from '@angular/forms';
import { ControlItem, SportsmanData } from '../../../models/dataFilterSportsman'
import Swal from 'sweetalert2';
import { SportsmanService } from '../../services/sportsman.service';
import { visible } from 'src/app/views/models/HistorialCategoryModel';
import { Error } from 'src/app/views/models/errorsModel';
import { UniversalList, eventsPaises } from 'src/app/views/Entrenador/Model/entrenadorModel';
import { firstValueFrom } from 'rxjs';
import { Validators as Validar, regExps } from 'src/app/utils/Validators';
import { InfoUniversalService } from 'src/app/services/infoUniversal.service';
import { SuccessResponse } from 'src/app/views/models/SuccessResponse';
import { CIUDADESCONST, CityName, ESTADOSCONST, Estado, Iciudades, Iestados, Ipaises, PAISESCONST } from 'src/app/models/PaisesConst';

@Component({
  selector: 'app-create-sportsman',
  templateUrl: './create-sportsman.component.html',
  styleUrls: ['./create-sportsman.component.scss']
})
export class CreateSportsmanComponent implements OnInit {
  @Input('viewActive') set setView(value: visible) {
    this.showViewSportsman = value.isVisible;
    this.dataIni(value);
  }
  @Input('dataCategory') set dataCategory(value: SportsmanData) {
    this.dataCreateSportsman = value;
  }
  @Output() CreateSportsman = new EventEmitter<boolean>();
  public dataCreateSportsman: any;
  public showViewSportsman: Boolean = true;
  public currentPage: number = 0;
  public sportsmansForm: FormGroup = new sportsmanFormModel().formsportsman();
  public categorias: ControlItem[];
  public generos: string[];
  public typeIdentification: string[];
  public isEdit: boolean = false;
  public listEstados: Estado[] | undefined = [];
  public dataID: string;
  public activeDepto: boolean = true;
  public activeCity: boolean = true;
  public listPaises: Ipaises[] = PAISESCONST;
  public listCiudades: CityName[] | undefined = [];

  constructor(
    private sporsmanService$: SportsmanService,
    private infoUniversalService$: InfoUniversalService
  ) { }
  async ngOnInit():Promise<void> {
    this.categorias = this.dataCreateSportsman.find((item: SportsmanData) => item.property === 'category')?.control || [];
    this.generos = genero;
    this.typeIdentification = identificación;
  }
  closeCard() : void{
    this.showViewSportsman = false;
    this.defaulCarrusel();
  }

   defaulCarrusel(): void {
    this.sportsmansForm.reset();
    this.currentPage = 0;
    this.CreateSportsman.emit(true);
  }

  dataIni(value: visible): void {
    if (!Validar.isNullOrUndefined(value.data)) {
      const {
        birtDate,
        sportInstition,
        city,
        department,
        category,
        email,
        gender,
        identification,
        institutionNameStudy,
        name,
        nationality,
        phone,
        athleticDiscipline,
        studyLevelMax,
        typeIdentification,
        weight,
        height

      } = value.data;
      const data = {
        birtDate,
        city,
        email,
        gender,
        identification,
        institutionNameStudy,
        name,
        nationality,
        phone,
        department,
        athleticDiscipline,
        sportInstition,
        studyLevelMax,
        typeIdentification,
        weight,
        height,
        category
      };
      const state = {
        value: nationality,
      };
      const citys = {
        value: department,
      };
      this.universalCiudadesApis(citys);
      this.universalEstadoApis(state);
      this.sportsmansForm.setValue(data);
      this.isEdit = true;
      this.dataID = value.data.ID;
    } else {
      this.isEdit = false;
    }
  }

  universalCiudadesApis(event: eventsPaises):void {
    this.activeCity = false;
    const { value } = event;
    this.listCiudades = CIUDADESCONST.find(
      (item:Iciudades) => item.state_name === value
    )?.city_name;
  }

  universalEstadoApis(event: eventsPaises):void {
    this.activeDepto = false;
    const { value } = event;
    this.listEstados = ESTADOSCONST.find(
      (item:Iestados) => item.country_name === value
    )?.estados;
  }

  setCurrentPageL(): void {
    this.currentPage = this.currentPage - 1;
  }

  setCurrentPageR(): void {
    this.currentPage = this.currentPage + 1;
  }

  createSportsman(): void {
    if (this.sportsmansForm.valid) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    const formSportsman = {
      ...this.sportsmansForm.value,
      image: 'default.png',
      category: this.sportsmansForm.value.category,
      CategoriumID: this.categorias.find(item => item.name == this.sportsmansForm.value.category)?.code,
      ID: this.dataID
    };
      this.sporsmanService$[this.isEdit?"updateSportsman":"createSportsman"](formSportsman).subscribe(
        async (res: SuccessResponse ) => {
          await Toast.fire({
            icon: 'success',
            title: `${res.Message}`,
          });
          this.sportsmansForm.reset();
          this.currentPage = 0;
          this.CreateSportsman.emit(true);

        },
        (respError: Error): void => {
          const { error } = respError;
          Toast.fire({
            icon: 'error',
            title: error,
          });
        }
      );
    } else {
       this.sportsmansForm.markAllAsTouched();       
    }
  }  
}