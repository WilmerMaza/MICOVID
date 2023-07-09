import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormModel } from 'src/app/views/pages/model/LoginFormModel'
import { SessionService } from 'src/app/views/pages/services/session.service'
import { NgEncrypt } from 'ng-encrypt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  public loginForm: FormGroup = new LoginFormModel().formLogin();
  private loginSession$: SessionService;
  constructor(
    loginSession$: SessionService
  ) {
    this.loginSession$ = loginSession$;
  }


  sessionLogin(): void {

    if (!this.loginForm.invalid) {
      const encryptor = new NgEncrypt();
      const encryptedPassword = encryptor.encrypt(this.loginForm.get("password")?.value);
      const data = {
        Name: this.loginForm.get("username")?.value,
        Password: encryptedPassword
      }
      this.loginSession$.sessionLogin(data).subscribe();
    }
    console.log(this.loginForm)

  }
}
