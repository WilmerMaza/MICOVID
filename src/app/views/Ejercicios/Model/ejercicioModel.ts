export interface Grupo {
    ID: string;
    NameGrupo?: string;
    Abbreviation: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    Name?: string;
  }
  
  export interface SubGrupo {
    ID: string;
    NameSubGrupo: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    GrupoID: string;
    EntrenadorID: string;
    Grupo: Grupo;
    abreviatura?: string;
  }
  
  export interface Ejercicio {
    ID: string;
    Name: string;
    Abbreviation: string;
    Description: string;
    VisualIllustration: string;
    Relationship: string;
    createdAt: string;
    updatedAt: string;
    SubGrupoID: string;
    EntrenadorID: string;
    SubGrupo: SubGrupo;
    SubGrupoAbbreviation?: string;
    GrupoAbbreviation?: string;
    Calidad: calidadCantidadModel;
    Cantidad: calidadCantidadModel;
    Indicador?:string;
  }

  export interface viewEjercicio {
    data: Ejercicio;
    dataEjercicio: Ejercicio[];
  }

interface calidadCantidadModel{
  Description: string;
  Name: string;
  ID: string;
}

  
export interface combinateDialogModel {
  dataEjercicios: Ejercicio[];
  combinate: boolean;
}

  
  export interface EjercicioResponse {
    item: Ejercicio[];
  }

  export interface GrupoResponse {
    item: Grupo[];
  }
 
  export interface SubGrupoResponse {
    item: SubGrupo[];
  }  