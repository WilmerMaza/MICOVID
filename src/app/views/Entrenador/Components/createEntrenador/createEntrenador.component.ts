import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
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
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import {
  NormaliceLowerValidators,
  Validators as Validar,
  regExps,
} from 'src/app/utils/Validators';
import { Toast } from 'src/app/utils/alert_Toast';
import { CryptoService } from 'src/app/utils/crypto.service';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { responseUploadMode } from 'src/app/views/Ejercicios/Model/reponseModel';
import { entrenadorFormModel } from 'src/app/views/Entrenador/Model/entrenadorFormModel';
import {
  entradorNivelEducativo,
  gender,
  typeIdentification,
} from '../../Model/constantesEntrenador';
import {
  eventsPaises,
  listInfo,
  resposeCreate,
  viewModalEntrenador,
} from '../../Model/entrenadorModel';
import { EntrenadorServices } from '../../services/EntrenadorServices.service';
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
  public entrenadorNivel: Array<listInfo> = entradorNivelEducativo;
  public typeIdentificationlist: Array<listInfo> = typeIdentification;
  public isActiveCrear: boolean = true;
  public isEdit: boolean = false;
  public activeDepto: boolean = false;
  public activeCity: boolean = false;
  public selectedFiles: File;
  public imageSelected: boolean = false;
  public selectedImageURL: string = '';
  public imageUrl: string = '';
  private veryficatePass: boolean = false;
  tooltipText: string = 'Esta es una imagen de muestra';
  public prefijoPhone:string = "+57";
  public maskPhone:string = "00 0000 0000"; 

  constructor(
    private entrenadorServices$: EntrenadorServices,
    private imagenFuntionsService$: ImagenFuntionsService
  ) {}

  closeCard(): void {
    this.showViewEntrenador = false;
    this.defaulCarrusel();
  }

  dataIni(value: viewModalEntrenador): void {
    if (!Validar.isNullOrUndefined(value.data)) {
      const {
        data: { nationality, stateordepartmen, studyLevelMax },
      } = value;
      const {
        ID,
        createdAt,
        updatedAt,
        SportsInstitutionID,

        ...dataEntrandor
      } = value.data;
      dataEntrandor.password = '';
      dataEntrandor.passwordVerificate = '';
      dataEntrandor.studyLevelMax = studyLevelMax.toLowerCase();
      const state = {
        value: nationality,
      };
      const citys = {
        value: stateordepartmen,
      };
      this.viewImage(dataEntrandor.image);
      this.universalCiudadesApis(citys);
      this.universalEstadoApis(state);
      this.entrenadorForm.setValue(dataEntrandor);
      this.isEdit = true;
      this.quitarValidacion();
    } else {
      this.isEdit = false;
      this.restablecerValidacion();
    }
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, (imageUrl) => {
        this.selectedImageURL = imageUrl;
      });
    }
  }

  validatePassword():void {
    const password = this.entrenadorForm.get('password')?.value;
    const confirmPassword =
      this.entrenadorForm.get('passwordVerificate')?.value;

    if (password !== confirmPassword) {
      this.entrenadorForm
        .get('passwordVerificate')
        ?.setErrors({ passwordMismatch: true });
      this.veryficatePass = true;
    } else {
      this.entrenadorForm.get('passwordVerificate')?.setErrors(null);
      this.veryficatePass = false;
    }
  }

  universalCiudadesApis(event: eventsPaises): void {
    this.activeCity = true;
    this.entrenadorForm.get('city')?.enable();
    const { value } = event;
    this.listCiudades = CIUDADESCONST.find(
      (item: Iciudades) => item.state_name.toLowerCase() === value.toLowerCase()
    )?.city_name;
  }

  universalEstadoApis(event: eventsPaises): void {
    this.activeDepto = true;
    this.entrenadorForm.get('stateordepartmen')?.enable();
    const { value } = event;
    this.getMaskPhonecountry(value);
    this.listEstados = ESTADOSCONST.find(
      (item: Iestados) =>
        item.country_name.toLowerCase() === value.toLowerCase()
    )?.estados;
  }

  getMaskPhonecountry(country: string) : void {
    PAISESCONST.forEach((value) => {
      if(value.country_name === country){
        this.prefijoPhone = value.country_phone_code;
        this.maskPhone = value.mask_phone_code;
      }
    })
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
    this.selectedFiles = new File([], 'empty.txt');
    this.imageSelected = false;
    this.selectedImageURL = '';
    this.entrenadorForm.get('city')?.disable();
    this.entrenadorForm.get('stateordepartmen')?.disable();
    this.activeDepto = false;
    this.activeCity = false;
    this.CreateEntrenador.emit(true);
  }

  quitarValidacion(): void {
    this.entrenadorForm.get('password')?.clearValidators();
    this.entrenadorForm.get('passwordVerificate')?.clearValidators();
    this.entrenadorForm.get('password')?.disable();
    this.entrenadorForm.get('passwordVerificate')?.disable();
    this.entrenadorForm.get('password')?.updateValueAndValidity();
    this.entrenadorForm.get('passwordVerificate')?.updateValueAndValidity();
  }

  // Función para restablecer la validación
  restablecerValidacion(): void {
    this.entrenadorForm
      .get('password')
      ?.setValidators([Validators.pattern(regExps['regexPassword'])]);
    this.entrenadorForm.get('password')?.updateValueAndValidity();
    this.entrenadorForm.get('password')?.enable();
    this.entrenadorForm.get('passwordVerificate')?.enable();
  }

  createEntrenador(): void {
    this.entrenadorForm.markAllAsTouched();
    if (this.entrenadorForm.invalid) {
      return;
    }

    if (this.veryficatePass) {
      return;
    }

    const { value } = this.entrenadorForm;
    const encryptedData = this.cryptoService$
      .Encript(this.entrenadorForm.get('password')?.value)
      .toString();

    const { stateordepartmen, city, nationality, image, phone } = value;
    NormaliceLowerValidators.normaliceData(value);

    let telef = `${this.prefijoPhone} ${phone}`
    const formEntrenador = this.isEdit
      ? {
          ...value,
          stateordepartmen,
          city,
          nationality,
          image: Validar.isNullOrUndefined(this.selectedFiles)
            ? image
            : this.selectedFiles.name,
          deleteImg: Validar.isNullOrUndefined(this.selectedFiles) ? '' : image,
          phone: telef
        }
      : {
          ...value,
          password: encryptedData,
          image: Validar.isNullOrUndefined(this.selectedFiles)
            ? ''
            : this.selectedFiles.name,
          stateordepartmen,
          city,
          nationality,
          phone: telef
        };

    const formData = new FormData();

    if (!Validar.isNullOrUndefined(this.selectedFiles)) {
      formData.append('file', this.selectedFiles);
    }

    this.entrenadorServices$[
      this.isEdit ? 'updateEntrenador' : 'createEntrenador'
    ](formEntrenador).subscribe(
      async (res: resposeCreate) => {
        if (!Validar.isNullOrUndefined(this.selectedFiles)) {
          this.uploadImg(formData);
        } else {
          Toast.fire({
            icon: 'success',
            title: res.Menssage,
          });
          this.defaulCarrusel();
        }
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

  uploadImg(formData: FormData): void {
    this.imagenFuntionsService$.subirImg(formData).subscribe(
      (respuesta: responseUploadMode) => {
        Toast.fire({
          icon: 'success',
          title: respuesta.msg,
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

  onFilesSelected(event: any): void {
    const {
      target: { files },
    } = event;

    this.selectedFiles = files[0];

    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageURL = e.target.result;
        this.imageSelected = true; // Establecer imageSelected en true
      };
      reader.readAsDataURL(file);
    }
  }
}
