export interface categoriaRequest {
  name: string;
  descripcion: string;
}
export interface diciplinaRequest {
  name: string;
  describe: string;
}

export type responseGrupo = Grupo[]

export interface Grupo {
  item: Item
}

export interface Item {
  ID: string
  NameGrupo: string
  Abbreviation: string
  Description: string
  createdAt: string
  updatedAt: string
}

export interface Etapas {
  ID: string
  name: string
  descripcion: string
  createdAt: string
  updatedAt: string
  EntrenadorID: string
}

export interface Diciplinas {
  ID: string
  name: string
  describe: string
  createdAt: string
  updatedAt: string
  SportsInstitutionID: string
}
