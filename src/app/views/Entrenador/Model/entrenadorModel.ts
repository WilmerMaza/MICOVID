export interface requestEntrenador {
  name?: string
  identification?: string
}




export type listEntrenador = Entrandor[]

export interface Entrandor {
  ID: string
  name: string
  identification: string
  typeIdentification: string
  gender: string
  nationality: string
  birtDate: string
  city: string
  stateordepartmen: string
  studyLevelMax: string
  institutionNameStudy: string
  email: string
  phone: string
  image: string
  createdAt: string
  updatedAt: string
  SportsInstitutionID: string
}
