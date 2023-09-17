import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
import { NormaliceLowerValidators } from 'src/app/utils/Validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public register: FormGroup = new RegisterFormModel().formRegister();
  public data: DataRegisterModel = new DataRegisterModel();
  private cryptoService$ = new CryptoService();
  public listPaises: Ipaises[] = PAISESCONST;
  public caracter: Array<string>  = CARACTER;

  constructor(
    private registerSession$: RegisterService,
    private router$: Router,
    private sessionService$: SessionService
  ) {}


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
      this.data.image = 'defaul.png';
      this.data.phone = this.data.phone?.toString();
      this.data.character = this.data.character?.toString();
      this.data.password = dataEncript;
      NormaliceLowerValidators.normaliceData(this.data);
      this.registerSession$
        .register(this.data)
        .subscribe(async (res: ResponseRegister) => {
          const { isRegister } = res;
          if (isRegister) {
            await Toast.fire({
              icon: 'success',
              title: 'Tu registro a sido exitoso'
            })
            this.router$.navigate(['login']);
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
}
