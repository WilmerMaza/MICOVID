export class ResponseLoginModel {
    name?: string;
    email?: string;
    imagen?: string;
    token?: string;
}

export interface ResponseRegister {
    isRegister:boolean;
    msg: string;
    error: string;
}