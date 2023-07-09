import { FormControl, FormGroup, Validators } from "@angular/forms";

export class LoginFormModel {

    formLogin(): FormGroup {
         return new FormGroup({
           username:new FormControl(null,[Validators.required]),
           password: new FormControl(null, [Validators.required])
         })
    }
}