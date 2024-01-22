import { FormControl, FormGroup, Validators } from '@angular/forms';

export class indicatorsFormModel {
  formIndicators(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      levelCal: new FormControl('', [Validators.required]),
      nameLevel: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      level: new FormControl({ value: 1, disabled: true }),
      descriptionLevel: new FormControl({ value: null, disabled: true }),
      absolute: new FormControl('', [Validators.required]),
      abrevt: new FormControl('', [Validators.required]),
    });
  }
}

export interface IndicatorModel {
  name: string | null;
  description: string | null;
  levelCal: number | null;
  absolute: boolean | null;

  levelList: templateList[];
  exercisesList: string[];
  abrev: string;
}

export interface levelList {
  level: number;
}

export interface listSportMan {
  name: string;
  ID: string;
}

export interface templateList {
  number: number;
  name: string;
  description: string;
}
