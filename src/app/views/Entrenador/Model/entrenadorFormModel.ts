import { FormControl, FormGroup, Validators } from "@angular/forms";


export class entrenadorFormModel {

    formEntrenador(): FormGroup {
         return new FormGroup({
           name:new FormControl(null,[Validators.required]),
           identification: new FormControl(null, [Validators.required]),
           typeIdentification: new FormControl(null, [Validators.required]),
           birtDate:new FormControl(null, [Validators.required]),
           nationality :new FormControl(null,[Validators.required]),
           city:new FormControl(null,[Validators.required]),
           stateordepartmen:new FormControl(null,[Validators.required]),
           institutionNameStudy:new FormControl(null,[Validators.required]),
           studyLevelMax:new FormControl(null,[Validators.required]),
           email:new FormControl(null,[Validators.required]),
           password:new FormControl(null,[Validators.required]),
           phone:new FormControl(null,[Validators.required]),
           gender:new FormControl(null,[Validators.required])
         })
    }
}
