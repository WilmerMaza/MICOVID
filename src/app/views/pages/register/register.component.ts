import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { RegisterFormModel } from 'src/app/views/pages/model/RegisterFormModel'
import { DataRegisterModel } from 'src/app/views/pages/model/DataRegisterModel'
import { SessionService } from '../services/session.service';
import { environment } from 'src/environments/environment';
import { error } from 'console';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public register: FormGroup = new RegisterFormModel().formRegister();
  public data: DataRegisterModel = new DataRegisterModel;

  constructor( 
    private registerSession$: SessionService,
    private authService$: AuthService,
    private router$: Router
    ) {
     }
     enviarFormulario() {
      if (this.register.valid) {
        const secretKey = environment.keyEncryp;
        const encryptedData = CryptoJS.AES.encrypt(this.register.get("password")?.value, secretKey).toString();
        this.data = this.register.value;
        this.data.user = this.data.email;
        this.data.image = "defaul.png";
        this.data.phone = this.data.phone?.toString();
        this.data.character = this.data.character?.toString();
        
        this.registerSession$.register(this.data).then( res => {
          this.router$.navigate(['login']);
        })   }
    }

  

}
