import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterFormModel } from 'src/app/views/pages/model/RegisterFormModel'
import { DataRegisterModel } from 'src/app/views/pages/model/DataRegisterModel'
import { ResponseRegister } from 'src/app/views/pages/model/ResponseLoginModel';
import { CryptoService } from 'src/app/utils/crypto.service';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public register: FormGroup = new RegisterFormModel().formRegister();
  public data: DataRegisterModel = new DataRegisterModel;
  private cryptoService$ = new CryptoService();

  constructor(
    private registerSession$: RegisterService,
    private router$: Router
    ) {
     }
     enviarFormulario() {
      if (this.register.valid) {
        const dataEncript =  this.cryptoService$.Encript(this.register.get("password")?.value).toString();
        this.data = this.register.value;
        this.data.user = this.data.email;
        this.data.image = "defaul.png";
        this.data.phone = this.data.phone?.toString();
        this.data.character = this.data.character?.toString();
        this.data.password = dataEncript;
        this.registerSession$.register(this.data).subscribe((res: ResponseRegister) => {
          if(res.isRegister) this.router$.navigate(['plans']);
        })
      }
    }

    hasError(controlName: string, errorName: string): boolean {
      return this.register.get(controlName)?.hasError(errorName) || false;
    }

    isTouched(controlName: string): boolean {
      return this.register.get(controlName)?.touched || false;
    }

}
