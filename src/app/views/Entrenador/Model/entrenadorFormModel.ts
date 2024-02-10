import { FormControl, FormGroup, Validators } from "@angular/forms";
import { regExps } from "src/app/utils/Validators";


export class entrenadorFormModel {

    formEntrenador(): FormGroup {
         return new FormGroup({
           name:new FormControl(null,[Validators.required]),
           identification: new FormControl(null, [Validators.required,Validators.pattern(regExps["number"])]),
           typeIdentification: new FormControl(null, [Validators.required]),
           birtDate:new FormControl(null, [Validators.required]),
           nationality :new FormControl(null,[Validators.required]),
           city:new FormControl({ value: null, disabled: true },[Validators.required]),
           stateordepartmen:new FormControl({ value: null, disabled: true },[Validators.required]),
           institutionNameStudy:new FormControl(null,[Validators.required]),
           studyLevelMax:new FormControl(null),
           email:new FormControl(null,[Validators.required,Validators.pattern(regExps["emailComplet"])]),
           password:new FormControl(null,[Validators.required,Validators.pattern(regExps["regexPassword"])]),
           passwordVerificate:new FormControl(null,[Validators.required,Validators.pattern(regExps["regexPassword"])]),
           phone:new FormControl(null,[Validators.required]),
           gender:new FormControl(null,[Validators.required]),
           image:new FormControl(null),
         })
    }
}
