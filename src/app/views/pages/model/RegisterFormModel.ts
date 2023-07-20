import { FormControl, FormGroup, Validators } from "@angular/forms";

export class RegisterFormModel {

    formRegister(): FormGroup {
         return new FormGroup({
           institutionName:new FormControl(null,[Validators.required]),
           legalRepresentative: new FormControl(null,[Validators.required]),
           character: new FormControl(null,[Validators.required]),
           type: new FormControl(null,[Validators.required]),
           sede: new FormControl(null,[Validators.required]),
           webPage: new FormControl(null,[Validators.required]),
           email: new FormControl(null,[Validators.required, Validators.email]),
           phone: new FormControl(null,[Validators.required]),
           password: new FormControl(null, [Validators.required, Validators.minLength(6)])
         })
    }
}