import { FormControl, FormGroup, Validators } from "@angular/forms";

export class RegisterFormModel {

    formRegister(): FormGroup {
         return new FormGroup({
           institutionName:new FormControl(null,[Validators.required]),
           legalRepresentative: new FormControl(null,[Validators.required]),
           character: new FormControl(null,[Validators.required]),
           pais: new FormControl(null,[Validators.required]),
           sede: new FormControl(null,[Validators.required]),
           webPage: new FormControl(null,[Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i)]),
           email: new FormControl(null,[Validators.required, Validators.email]),
           phone: new FormControl(null,[Validators.required]),
           password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)])
         })
    }
}