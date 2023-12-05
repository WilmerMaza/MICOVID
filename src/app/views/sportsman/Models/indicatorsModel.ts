import { Ejercicio, SubGrupo } from "../../Ejercicios/Model/ejercicioModel";

export interface Level {
  ID: string;
  LevelNumber: string;
  LevelName: string;
  Description: string;
  createdAt: string;
  updatedAt: string;
  IndicadoreID: string;
}

export interface SportsMan {
  ID: string;
  name: string;
  identification: string;
  typeIdentification: string;
  weight: string;
  category: string;
  gender: string;
  nationality: string;
  birtDate: string;
  city: string;
  department: string;
  height: string;
  studyLevelMax: string;
  institutionNameStudy: string;
  sportInstition: string;
  athleticDiscipline: string;
  email: string;
  phone: string;
  image: string;
  HasIndicators: boolean;
  createdAt: string;
  updatedAt: string;
  SportsInstitutionID: string;
}

export interface Item {
  ID: string;
  IndicatorsName: string;
  Abbreviation: string;
  Description: string;
  AbsolutePercentage: string;
  CalificationLevel: number;
  createdAt: string;
  updatedAt: string;
  EjercicioID: string;
  SportsManID: string;
  Ejercicio: Ejercicio;
  Levels: Level[];
  SportsMan: SportsMan;
}

export interface DataIndicators {
  item: Item[];
}


export const columnsIndValue = [
  {
    displayname: 'Nombre',
    name:'Name',
    estado: true,
    type: "text"
  },
  {
    displayname: 'Abreviatura',
    name:'Abbreviation',
    estado: true,
    type: "text"
  },
  {
      displayname: 'Grupo',
      name:'GrupoAbbreviation',
      estado: true,
      type: "text"
  },
  {
    displayname: 'Subgrupo',
    name:'SubGrupoAbbreviation',
    estado: true,
    type: "text"
  },
  {
      displayname: 'Tipo relación',
      name:'Relationship',
      estado: true,
      type: "text"
  },
  {
    displayname:'noName',
    estado:true,
    type: 'button indicador',
    menu:[]
  }
]