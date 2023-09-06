import { FormControl, FormGroup, Validators } from "@angular/forms";
import { regExps } from "src/app/utils/Validators";


export class sportsmanFormModel {

    formsportsman(): FormGroup {
         return new FormGroup({
           name:new FormControl(null,[Validators.required]),
           identification: new FormControl(null, [Validators.required, Validators.pattern(regExps["number"])]),
           typeIdentification: new FormControl(null, [Validators.required]),
           birtDate:new FormControl(null, [Validators.required]),
           nationality :new FormControl(null,[Validators.required]),
           city:new FormControl(null,[Validators.required]),
           department:new FormControl(null,[Validators.required]),
           weight:new FormControl(null,[Validators.required,  Validators.pattern(regExps["decimalNumbers"])]),
           height:new FormControl(null,[Validators.required,  Validators.pattern(regExps["decimalNumbers"])]),
           gender:new FormControl(null,[Validators.required]),
           category:new FormControl('',[Validators.required]),            
           studyLevelMax:new FormControl(null,[Validators.required]),            
           institutionNameStudy:new FormControl(null,[Validators.required]),
           sportInstition:new FormControl(null,[Validators.required]),
           athleticDiscipline:new FormControl(null,[Validators.required]),
           email:new FormControl(null,[Validators.required, Validators.pattern(regExps["emailComplet"])]),
           phone:new FormControl(null,[Validators.required, Validators.pattern(regExps["telefonoRegex"])]),
         })
    }
}

