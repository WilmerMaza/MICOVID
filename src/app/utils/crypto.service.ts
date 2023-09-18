import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { CipherParams } from 'crypto-ts/src/lib/CipherParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private getHexaKey = environment.GetHexaKey;
  constructor() { }

  private GetKey = () => enc.Utf8.parse(this.getHexaKey);

  public Encript = (value: string): CipherParams =>
    AES.encrypt(value, this.GetKey());

  public Decrypt = (value: string):string => AES.decrypt(value, this.GetKey()).toString(enc.Utf8);

  public DecryptSecret = (value: string): Array<string> => {
    return atob(value).split('/');
  }

}
