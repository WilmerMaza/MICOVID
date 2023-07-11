import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormModel } from 'src/app/views/pages/model/LoginFormModel';
import { SessionService } from 'src/app/views/pages/services/session.service';
import * as CryptoJS from 'crypto-js';
import { ResponseLoginModel } from 'src/app/views/pages/model/ResponseLoginModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  public loginForm: FormGroup = new LoginFormModel().formLogin();

  constructor(
    private loginSession$: SessionService,
    private authService$: AuthService,
    private router$: Router
  ) {

  }


  sessionLogin(): void {

    if (!this.loginForm.invalid) {
      const secretKey = environment.keyEncryp;
      const encryptedData = CryptoJS.AES.encrypt(this.loginForm.get("password")?.value, secretKey).toString();
      const data = {
        Name: this.loginForm.get("username")?.value,
        Password: encryptedData
      }
      this.loginSession$.sessionLogin(data).subscribe((response: ResponseLoginModel) => {
        const { token } = response;
        if (token) {
          this.authService$.setToken(token);
          this.router$.navigate(['/dashboard']);
        }
      });
    }

  }
}
