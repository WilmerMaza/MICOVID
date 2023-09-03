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
  public listPaises: Array<UniversalList> = [];
  public isEdit: boolean = false;
  public listCiudades: Array<UniversalList> = [];
  public listEstados: Array<UniversalList> = [];
  public dataID: string;

  constructor(
    private sporsmanService$: SportsmanService,
    private infoUniversalService$: InfoUniversalService
  ) { }
  async ngOnInit() {
    this.categorias = this.dataCreateSportsman.find((item: SportsmanData) => item.property === 'category')?.control || [];
    this.generos = genero;
    this.typeIdentification = identificación;
    this.listPaises = await firstValueFrom(
      this.infoUniversalService$.getPaises()
    );
  }
  closeCard() {
    this.showViewSportsman = false;
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
        birtDate: birtDate,
        city: city,
        email: email,
        gender: gender,
        identification: identification,
        institutionNameStudy: institutionNameStudy,
        name: name,
        nationality: nationality,
        phone: phone,
        department: department,
        athleticDiscipline: athleticDiscipline,
        sportInstition: sportInstition,
        studyLevelMax: studyLevelMax,
        typeIdentification: typeIdentification,
        weight: weight,
        height: height,
        category: category
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

  universalCiudadesApis(event: eventsPaises) {
    const { value } = event;
    this.infoUniversalService$
      .getCiudades(value)
      .subscribe((res) => (this.listCiudades = res));
  }

  universalEstadoApis(event: eventsPaises) {
    const { value } = event;
    this.infoUniversalService$
      .getEstados(value)
      .subscribe((res: Array<UniversalList>) => (this.listEstados = res));
  }

  setCurrentPageL(): void {
    this.currentPage = this.currentPage - 1;
  }

  setCurrentPageR(): void {
    this.currentPage = this.currentPage + 1;
  }

  createSportsman(): void {
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
    if (!this.isEdit) {
      this.sporsmanService$.createSportsman(formSportsman).subscribe(
        async (res) => {
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
    }
    else {
      this.sporsmanService$.updateSportsman(formSportsman).subscribe(
        async (res) => {
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

    }
  }
}
