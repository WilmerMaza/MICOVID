import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpModel } from '../models/IHttp.Model';
import { MicoviApiService } from './micovi-api.service';
import { HttpHeaders } from '@angular/common/http';
import { responseUploadMode } from '../views/Ejercicios/Model/reponseModel';

@Injectable({
  providedIn: 'root',
})
export class ImagenFuntionsService {
  constructor(private micoviApiService$: MicoviApiService) {}

  getImg(name: String): Observable<Blob> {
    const solicitud: IHttpModel = {
      url: `/subirImagen/lower/${name}`, // Reemplaza con la ruta del archivo que deseas descargar
      method: 'GET', // Opcional, ya que GET es el método por defecto
      options: {
        responseType: 'blob', // Especificamos 'blob' como el tipo de respuesta
      },
    };

    return this.micoviApiService$.generic(solicitud);
  }


  subirImg(files: FormData): Observable<responseUploadMode> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.micoviApiService$.token, // Reemplaza 'tuToken' con el token real
    });
    const solicitud: IHttpModel = {
      url: `/subirImagen/upload`, // Reemplaza con la ruta del archivo que deseas descargar
      method: 'POST', // Opcional, ya que GET es el método por defecto
      options: {
        responseType: 'json', // Especificamos 'blob' como el tipo de respuesta
        body: files,
        headers: headers,
      },
    };

    return this.micoviApiService$.generic(solicitud);
  }

  subirRegisterImg(files: FormData): Observable<responseUploadMode> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.micoviApiService$.token, // Reemplaza 'tuToken' con el token real
    });
    const solicitud: IHttpModel = {
      url: `/subirImagenRegistro/uploadRegister`, // Reemplaza con la ruta del archivo que deseas descargar
      method: 'POST', // Opcional, ya que GET es el método por defecto
      options: {
        responseType: 'json', // Especificamos 'blob' como el tipo de respuesta
        body: files,
        headers: headers,
      },
    };

    return this.micoviApiService$.generic(solicitud);
  }

  getAdminImg(name: String): Observable<Blob> {
    const solicitud: IHttpModel = {
      url: `/subirImagenRegistro/lowerWithoutFolter/${name}`, // Reemplaza con la ruta del archivo que deseas descargar
      method: 'GET', // Opcional, ya que GET es el método por defecto
      options: {
        responseType: 'blob', // Especificamos 'blob' como el tipo de respuesta
      },
    };

    return this.micoviApiService$.generic(solicitud);
  }

}
