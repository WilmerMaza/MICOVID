import { FormControl, FormGroup, Validators } from "@angular/forms";

export class ejerciciosFormModel {

    formEjercicios(): FormGroup {
         return new FormGroup({
           name:new FormControl(null,[Validators.required]),
           description: new FormControl(null, [Validators.required]),
           abbreviation: new FormControl(null, [Validators.required]),
           subgrupo: new FormControl(null, [Validators.required]),
           relationship: new FormControl(null, [Validators.required]),
           cantidad: new FormControl(null, [Validators.required]),
           calidadPromedio: new FormControl(null, [Validators.required]),
           visualIlustration: new FormControl(null),
           linkEjercicios: new FormControl(null),
         })
    }
}
