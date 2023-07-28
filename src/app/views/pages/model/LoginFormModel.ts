import { FormControl, FormGroup, Validators } from "@angular/forms";
import { regExps } from "src/app/utils/Validators";

export class LoginFormModel {

    formLogin(): FormGroup {
         return new FormGroup({
           username:new FormControl(null,[Validators.required,Validators.pattern(regExps["emailComplet"])]),
           password: new FormControl(null, [Validators.required]),
           check:new FormControl(false)
         })
    }
}
