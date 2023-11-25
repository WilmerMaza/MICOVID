export interface categoriaRequest {
  name: string;
  descripcion: string;
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