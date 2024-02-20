import { EjercicioIndicadores } from "../sportsman/Models/indicatorsModel";

export interface Sportsman {
  ID: string;
  name: string;
  identification: string;
  typeIdentification: string;
  nationality: string;
  city: string;
  department: string;
  birtDate: string;
  studyLevelMax: string;
  institutionNameStudy: string;
  sportInstition: string;
  DiciplinaID?: string;
  email: string;
  phone: string;
  image: string;
  category: string;
  gender: string;
  weight: string;
  height: string;
  HasIndicators: boolean;
  Diciplina?: Diciplina;
  SportsInstitution?: SportsInstitution;
  age?:string;
  Ejercicios?:EjercicioIndicadores[];
}

export interface Diciplina {
  name: string;
}

export interface SportsInstitution {
  institutionName: string;
}

export interface ICalificacion {
  EjercicioID: string;
  ID: string;
  SportsManID: string;
  maximo: number;
  minimo: number;
  promedio: number;
  consecutivo?: number;
}
