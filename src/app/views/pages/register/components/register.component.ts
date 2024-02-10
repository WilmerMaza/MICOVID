import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterFormModel } from 'src/app/views/pages/model/RegisterFormModel';
import { DataRegisterModel } from 'src/app/views/pages/model/DataRegisterModel';
import { ResponseRegister } from 'src/app/views/pages/model/ResponseLoginModel';
import { CryptoService } from 'src/app/utils/crypto.service';
import { RegisterService } from '../services/register.service';
import { SessionService } from '../../services/session.service';
import Swal from 'sweetalert2';
import { DynamicError } from 'src/app/shared/model/filterModel';
import { Ipaises, PAISESCONST } from 'src/app/models/PaisesConst';
import { CARACTER } from '../../model/constRegister';
import { NormaliceLowerValidators, Validators as Validar, regExps } from 'src/app/utils/Validators';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { responseUploadMode } from 'src/app/views/Ejercicios/Model/reponseModel';
import { Toast } from 'src/app/utils/alert_Toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public register: FormGroup = new RegisterFormModel().formRegister();
  public data: DataRegisterModel = new DataRegisterModel();
  private cryptoService$ = new CryptoService();
  public listPaises: Ipaises[] = PAISESCONST;
  public caracter: Array<string>  = CARACTER;
  public changingForm: string = "form-one";
  public selectedImageURL: string = '';
  public selectedFiles: File;
  public imageSelected: boolean = false;
  public placeholderSelect: string = "+57 Colombia";
  public prefijoPhone:string = "+57";
  public maskPhone:string = "00 0000 0000"; 

  constructor(
    private registerSession$: RegisterService,
    private router$: Router,
    private sessionService$: SessionService,
    private imagenFuntionsService$: ImagenFuntionsService
  ) {}

    ngOnInit(): void {
      this.selectedFiles = new File([], 'empty.txt');
    }
    
  enviarFormulario():void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    if (this.register.valid) {
      const dataEncript = this.cryptoService$
        .Encript(this.register.get('password')?.value)
        .toString();
      this.data = this.register.value;
      this.data.user = this.data.email;
      this.data.image = Validar.isNullOrUndefined(this.selectedFiles)
      ? 'defaul.png'
      : this.selectedFiles.name;
      this.data.phone = `${this.prefijoPhone} ${this.data.phone?.toString()}`;
      this.data.character = this.data.character?.toString();
      this.data.password = dataEncript;
      NormaliceLowerValidators.normaliceData(this.data);

      const formData = new FormData();
      if (!Validar.isNullOrUndefined(this.selectedFiles)) {
        formData.append('file', this.selectedFiles);
      }
      
      this.registerSession$
        .register(this.data)
        .subscribe(async (res: ResponseRegister) => {
          const { isRegister } = res;
          if (isRegister) {
            if (!Validar.isNullOrUndefined(this.selectedFiles)) {
               this.uploadImg(formData);
            } else {
              await Toast.fire({
                icon: 'success',
                title: 'Tu registro a sido exitoso'
              })
              this.router$.navigate(['login']);
            }
            
          }
        },(respError: DynamicError<any>): void => {
          const { error: {msg}} = respError;
          Toast.fire({
            icon: 'error',
            title: msg
          })
        });
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.register.get(controlName)?.hasError(errorName) || false;
  }

  isTouched(controlName: string): boolean {
    return this.register.get(controlName)?.touched || false;
  }

  changeForm(value: string): void{
    this.changingForm = value;
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

  selectMask(event: any){
    const selectedCountry = event.target.value;
    PAISESCONST.forEach((value: Ipaises) => {
      const { country_name, country_phone_code, mask_phone_code } = value;
      if(country_name === selectedCountry){
        this.prefijoPhone = country_phone_code;
        this.placeholderSelect = `${country_phone_code} ${selectedCountry}`;
        this.maskPhone = mask_phone_code;
      }
    })
  }

  uploadImg(formData: FormData): void {
    this.imagenFuntionsService$.subirRegisterImg(formData).subscribe(
      (respuesta: responseUploadMode) => {
        Toast.fire({
          icon: 'success',
          title: respuesta.msg,
        });
        this.router$.navigate(['login']);
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
