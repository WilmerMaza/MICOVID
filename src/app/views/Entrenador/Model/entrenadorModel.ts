export interface requestEntrenador {
  name?: string;
  identification?: string;
}

export interface requetEntrenador {
  name: string;
  identification: string;
  typeIdentification: string;
  birtDate: string;
  nationality: string;
  city: string;
  stateordepartmen: string;
  institutionNameStudy: string;
  studyLevelMax: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
}

export interface resposeError {
  error: string;
  mjs: string;
}

export interface resposeCreate {
  Menssage: string;
}

export type listEntrenador = Entrandor[];

export interface Entrandor {
  ID: string;
  name: string;
  identification: string;
  typeIdentification: string;
  gender: string;
  nationality: string;
  birtDate: string;
  city: string;
  stateordepartmen: string;
  studyLevelMax: string;
  institutionNameStudy: string;
  email: string;
  phone: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  SportsInstitutionID: string;

  password?: string;
}

export interface listInfo {
  value: string;
  code: string;
}

export interface viewModalEntrenador {
  isVisible?: boolean;
  data?: Entrandor;
}

export interface eventsPaises {
  value: string;
}
