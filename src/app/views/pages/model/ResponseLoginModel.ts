import { DataUser } from "./dataUserModel";

export class ResponseLoginModel {
    name?: string;
    email?: string;
    imagen?: string;
    token?: string;
}

export interface ResponseRegister {
    isRegister:boolean;
    dataUser:DataUser;
    msg: string;
    error: string;
}

export interface universalToken{
  auth_token:string;
}
