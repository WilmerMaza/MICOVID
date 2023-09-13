import { FormControl, FormGroup, Validators } from "@angular/forms";
import { expresionRegular } from "src/app/utils/Factory";
import { regExps } from "src/app/utils/Validators";

export class RegisterFormModel {

    formRegister(): FormGroup {
         return new FormGroup({
           institutionName:new FormControl(null,[Validators.required]),
           legalRepresentative: new FormControl(null,[Validators.required]),
           character: new FormControl(null,[Validators.required]),
           pais: new FormControl(null,[Validators.required]),
           sede: new FormControl(null,[Validators.required]),
           webPage: new FormControl(null,[Validators.pattern(expresionRegular.pageWeb )]),
           email: new FormControl(null,[Validators.required, Validators.email]),
           phone: new FormControl(null,[Validators.required, Validators.pattern(regExps["telefonoRegex"])]),
           password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(expresionRegular.password)])
         })
    }
}