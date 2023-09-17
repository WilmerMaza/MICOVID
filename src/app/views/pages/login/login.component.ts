import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormModel } from 'src/app/views/pages/model/LoginFormModel';
import { SessionService } from 'src/app/views/pages/services/session.service';
import { CryptoService } from 'src/app/utils/crypto.service';
import { Router } from '@angular/router';
import { Toast } from 'src/app/utils/alert_Toast';
import { NormaliceLowerValidators } from 'src/app/utils/Validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup = new LoginFormModel().formLogin();
  public isChecked: boolean = false;
  private cryptoService$ = new CryptoService();
  constructor(private loginSession$: SessionService, private router$: Router) {}

  sessionLogin(): void {
    if (!this.loginForm.invalid) {
       const data = {
         Name: this.loginForm.get('username')?.value,
         Password: '',
       };
       NormaliceLowerValidators.normaliceData(data)
      data.Password = this.cryptoService$
        .Encript(this.loginForm.get('password')?.value)
        .toString();
      this.loginSession$.sessionLogin(data).subscribe(() => {
        this.router$.navigate(['/home']);
      },
      (loginError: Error) => {
        Toast.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrecta',
        });
      });
    }
  }
}
