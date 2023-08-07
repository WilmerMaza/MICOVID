export interface session {
  dataUser: DataUser;
  token:    string;
}

export interface DataUser {
  ID:                  string;
  email:               string;
  institutionName?:     string;
  legalRepresentative?: string;
  character?:           string;
  pais?:                string;
  sede?:                string;
  webPage?:             string;
  phone?:               string;
  image?:               string;
  createdAt?:           Date;
  updatedAt?:           Date;
}
