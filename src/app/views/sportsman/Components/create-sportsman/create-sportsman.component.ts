import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {
  eventsPaises,
  listInfo,
} from 'src/app/views/Entrenador/Model/entrenadorModel';
import { visible } from 'src/app/views/models/HistorialCategoryModel';
import {
  ControlItem,
  SportsmanData,
} from '../../../models/dataFilterSportsman';
import { sportsmanFormModel } from '../../../models/sportsmanFormModel';
import { SportsmanService } from '../../services/sportsman.service';

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
} from 'src/app/utils/Validators';
import { Toast } from 'src/app/utils/alert_Toast';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { Diciplinas } from 'src/app/views/Complementos/model/interfaceComplementos';
import { ComplementosService } from 'src/app/views/Complementos/services/complementos.service';
import { responseUploadMode } from 'src/app/views/Ejercicios/Model/reponseModel';
import {
  gender,
  typeIdentification,
} from 'src/app/views/Entrenador/Model/constantesEntrenador';
import { SuccessResponse } from 'src/app/views/models/SuccessResponse';
import { categoryModel } from 'src/app/views/models/categoryModel';
import { calcularEdad } from 'src/app/utils/UtilFunctions';

@Component({
  selector: 'app-create-sportsman',
  templateUrl: './create-sportsman.component.html',
  styleUrls: ['./create-sportsman.component.scss'],
})
export class CreateSportsmanComponent implements OnInit {
  @Input('viewActive') set setView(value: visible) {
    this.showViewSportsman = value.isVisible;
    this.getcategorys(value);
  }
  @Input('dataCategory') set dataCategory(value: SportsmanData[]) {
    this.dataCreateSportsman = value;
  }
  @Output() CreateSportsman = new EventEmitter<boolean>();
  public dataCreateSportsman: any;
  public showViewSportsman: Boolean = true;
  public currentPage: number = 0;
  public sportsmansForm: FormGroup = new sportsmanFormModel().formsportsman();
  public categorias: ControlItem[];
  public generos: listInfo[];
  public typeIdentification: listInfo[];
  public isEdit: boolean = false;
  public listEstados: Estado[] | undefined = [];
  public dataID: string;
  public activeDepto: boolean = false;
  public activeCity: boolean = false;
  public listPaises: Ipaises[] = PAISESCONST;
  public listCiudades: CityName[] | undefined = [];
  public selectedImageURL: string = '';
  public imageSelected: boolean = false;
  public selectedFiles: File;
  public diciplinasList: Diciplinas[] = [];
  public prefijoPhone:string = "+57";
  public maskPhone:string = "00 0000 0000"; 
  public placeHolderPhone: string = "+57 Colombia";
  private validateRegex: RegExp;

  constructor(
    private sporsmanService$: SportsmanService,
    private imagenFuntionsService$: ImagenFuntionsService,
    private complementos$: ComplementosService
  ) {}
  async ngOnInit(): Promise<void> {
    this.categorias =
      this.dataCreateSportsman.find(
        (item: SportsmanData) => item.property === 'category'
      )?.control || [];
    this.generos = gender;
    this.typeIdentification = typeIdentification;
    this.getDiciplinas();
    this.generarExpresionRegular(this.maskPhone);
  }
  closeCard(): void {
    this.showViewSportsman = false;
    this.defaulCarrusel();
  }

  getcategorys(value: visible): void {
    this.sporsmanService$.getAllCategory().subscribe((res: categoryModel[]) => {
      this.categorias = res.map((categorias: categoryModel) => {
        const { ID, name } = categorias;
        const item = {
          name: name,
          value: name,
          code: ID,
        };
        return item;
      });

      this.dataIni(value);
    });
  }

  defaulCarrusel(): void {
    this.sportsmansForm.reset();
    this.currentPage = 0;
    this.selectedFiles = new File([], 'empty.txt');
    this.imageSelected = false;
    this.selectedImageURL = '';
    this.listEstados = [];
    this.listCiudades = [];
    this.sportsmansForm.get('city')?.disable();
    this.sportsmansForm.get('department')?.disable();
    this.activeDepto = false;
    this.activeCity = false;
    this.CreateSportsman.emit(true);
  }

  getDiciplinas(): void {
    this.complementos$.getDiciplina().subscribe((res: Diciplinas[]) => {
      this.diciplinasList = res;
    });
  }

  dataIni(value: visible): void {
    if (!Validar.isNullOrUndefined(value.data)) {
      const {
        birtDate,
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
        studyLevelMax,
        typeIdentification,
        weight,
        height,
        image,
        DiciplinaID,
      } = value.data;

      const Categorium = this.categorias.find(
        (categoria: ControlItem) => categoria.name === category
      );

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
        DiciplinaID,
        studyLevelMax,
        typeIdentification,
        weight,
        height,
        category: Categorium,
        image,
      };
      const state = {
        value: nationality,
      };
      const citys = {
        value: department,
      };
      this.viewImage(image);
      this.universalCiudadesApis(citys);
      this.universalEstadoApis(state);
      this.sportsmansForm.setValue(data);
      this.isEdit = true;
      this.dataID = value.data.ID;
    } else {
      this.isEdit = false;
    }
  }

  universalCiudadesApis(event: eventsPaises): void {
    this.activeCity = true;
    this.sportsmansForm.get('city')?.enable();
    const { value } = event;
    this.listCiudades = CIUDADESCONST.find(
      (item: Iciudades) => item.state_name === value
    )?.city_name;
  }

  universalEstadoApis(event: eventsPaises): void {
    this.activeDepto = true;
    this.sportsmansForm.get('department')?.enable();
    const { value } = event;
    this.getMaskPhonecountry(value);
    this.listEstados = ESTADOSCONST.find(
      (item: Iestados) => item.country_name === value
    )?.estados;
  }

  hasErrorRegexp(controlName: string):boolean {
    return !this.validateRegex?.test(this.sportsmansForm.get(controlName)?.value);
  }

  getMaskPhonecountry(country: string) : void {
    PAISESCONST.forEach((value: Ipaises) => {
      const { country_name, country_phone_code, mask_phone_code } = value;
      if(country_name === country){
        this.generarExpresionRegular(mask_phone_code);
        this.placeHolderPhone = `${country_phone_code} ${country_name}`;
        this.prefijoPhone = country_phone_code;
        this.maskPhone = mask_phone_code;
      }
    })
  }

  generarExpresionRegular(mask: string):void{
    // Escapar caracteres especiales en la máscara
    const escapedMask = mask.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Reemplazar '0' con '\d'
    const regexString = escapedMask.replace(/0/g, '\\d');

    const withoutSpace = regexString.replace(/\s/g, '')
    // Construir la expresión regular completa
    const regex = new RegExp('^' + withoutSpace + '$');
    
    this.validateRegex = regex;
    this.sportsmansForm.get('phone')?.addValidators(Validators.pattern(regex));
    this.sportsmansForm.get('phone')?.updateValueAndValidity();
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg && nameImg !== 'Default.png') {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, false, (imageUrl) => {
        this.selectedImageURL = imageUrl;
      });
    }
  }
  setCurrentPageL(): void {
    this.currentPage = this.currentPage - 1;
  }

  setCurrentPageR(): void {
    this.currentPage = this.currentPage + 1;
  }

  async createSportsman(): Promise<void> {
    if (this.sportsmansForm.valid) {
      const {
        value: { image, department, city, nationality, category, birtDate },
        value,
      } = this.sportsmansForm;

      NormaliceLowerValidators.normaliceData(value);

      let edad = calcularEdad(birtDate);

      const formSportsman = this.isEdit
        ? {
            ...value,
            image: Validar.isNullOrUndefined(this.selectedFiles)
              ? image
              : this.selectedFiles.name,
            department,
            city,
            nationality,
            age: edad,
            category: category.value,
            CategoriumID: category.code,
            ID: this.dataID,
            deleteImg: Validar.isNullOrUndefined(this.selectedFiles)
              ? ''
              : image,
          }
        : {
            ...value,
            image: Validar.isNullOrUndefined(this.selectedFiles)
              ? 'default.png'
              : this.selectedFiles.name,
            category: category.value,
            CategoriumID: category.code,
            department,
            city,
            nationality,
            age: edad,
          };

      const formData = new FormData();

      if (!Validar.isNullOrUndefined(this.selectedFiles)) {
        formData.append('file', this.selectedFiles);
      }
      this.sporsmanService$[
        this.isEdit ? 'updateSportsman' : 'createSportsman'
      ](formSportsman).subscribe(
        async (res: SuccessResponse) => {
          if (!Validar.isNullOrUndefined(this.selectedFiles)) {
            this.uploadImg(formData);
          } else {
            await Toast.fire({
              icon: 'success',
              title: `${res.Message}`,
            });
          }

          this.defaulCarrusel();
        },
        (respError): void => {
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
