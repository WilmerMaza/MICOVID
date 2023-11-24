import { FormControl, FormGroup, Validators } from "@angular/forms";

export class subGrupoFormModel {

    formSubGrupos(): FormGroup {
         return new FormGroup({
          NameSubGrupo:new FormControl(null,[Validators.required]),
           Description: new FormControl(null, [Validators.required]),
           abbreviation: new FormControl(null, [Validators.required]),
           grupo: new FormControl("", [Validators.required]),
         })
    }
}
