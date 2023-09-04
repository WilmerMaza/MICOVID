import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { entrenadorFormModel } from 'src/app/views/Entrenador/Model/entrenadorFormModel';
import { EntrenadorServices } from '../../services/EntrenadorServices.service';
import { CryptoService } from 'src/app/utils/crypto.service';
import Swal from 'sweetalert2';
import { gender, typeIdentification } from '../../Model/constantesEntrenador';
import { Validators as Validar, regExps } from 'src/app/utils/Validators';
import {
  eventsPaises,
  listInfo,
  viewModalEntrenador,
} from '../../Model/entrenadorModel';
import {
  CIUDADESCONST,
  CityName,
  ESTADOSCONST,
  Estado,
  Iciudades,
  Iestados,
  Ipaises,
  PAISESCONST,
} from 'src/app/models/PaisesConst';

@Component({
  selector: 'app-createEntrenador',
  templateUrl: './createEntrenador.component.html',
  styleUrls: ['./createEntrenador.component.scss'],
})
export class CreateEntrenadorComponent {
  @Input('viewActive') set setView(value: viewModalEntrenador) {
    this.showViewEntrenador = value.isVisible;
    this.dataIni(value);
  }
  @Output() CreateEntrenador = new EventEmitter<boolean>();

  public showViewEntrenador: Boolean | undefined = true;
  public currentPage: number = 0;
  public entrenadorForm: FormGroup = new entrenadorFormModel().formEntrenador();
  private cryptoService$ = new CryptoService();
  public listPaises: Ipaises[] = PAISESCONST;
  public listCiudades: CityName[] | undefined = [];
  public listEstados: Estado[] | undefined = [];
  public genderlist: Array<listInfo> = gender;
  public typeIdentificationlist: Array<listInfo> = typeIdentification;
  public isActiveCrear: boolean = true;
  public isEdit: boolean = false;
  public activeDepto: boolean = true;
  public activeCity: boolean = true;

  constructor(private entrenadorServices$: EntrenadorServices) {}

  closeCard(): void {
    this.showViewEntrenador = false;
    this.defaulCarrusel();
  }

  dataIni(value: viewModalEntrenador): void {
    if (!Validar.isNullOrUndefined(value.data)) {
      const {
        birtDate,
        city,
        email,
        gender,
        identification,
        institutionNameStudy,
        name,
        nationality,
        phone,
        stateordepartmen,
        studyLevelMax,
        typeIdentification,
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
        stateordepartmen: stateordepartmen,
        studyLevelMax: studyLevelMax,
        typeIdentification: typeIdentification,
        password: '',
      };
      const state = {
        value: nationality,
      };
      const citys = {
        value: stateordepartmen,
      };

      this.universalCiudadesApis(citys);
      this.universalEstadoApis(state);
      this.entrenadorForm.setValue(data);
      this.isEdit = true;
      this.quitarValidacion();
    } else {
      this.isEdit = false;
      this.restablecerValidacion();
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

  setCurrentPageR(): void {
    this.currentPage = this.currentPage + 1;
  }

  setCurrentPageL(): void {
    this.currentPage = this.currentPage - 1;
  }

  defaulCarrusel(): void {
    this.entrenadorForm.reset();
    this.currentPage = 0;
    this.CreateEntrenador.emit(true);
  }

  quitarValidacion(): void {
    this.entrenadorForm.get('password')?.clearValidators();
    this.entrenadorForm.get('password')?.updateValueAndValidity();
  }

  // Función para restablecer la validación
  restablecerValidacion(): void {
    this.entrenadorForm
      .get('password')
      ?.setValidators([Validators.pattern(regExps['regexPassword'])]);
    this.entrenadorForm.get('password')?.updateValueAndValidity();
  }

  createEntrenador(): void {
    if (this.entrenadorForm.invalid) {
      return;
    }
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

    const encryptedData = this.cryptoService$
      .Encript(this.entrenadorForm.get('password')?.value)
      .toString();
    const formEntrenador = this.isEdit
      ? {
          ...this.entrenadorForm.value,
        }
      : {
          ...this.entrenadorForm.value,
          password: encryptedData,
        };
    this.entrenadorServices$[
      this.isEdit ? 'updateEntrenador' : 'createEntrenador'
    ](formEntrenador).subscribe(
      async (res) => {
        await Toast.fire({
          icon: 'success',
          title: `${res.Menssage}`,
        });
        this.defaulCarrusel();
      },
      (respError): void => {
        const {
          error: { error },
        } = respError;
        Toast.fire({
          icon: 'error',
          title: error,
        });
      }
    );
  }
}
