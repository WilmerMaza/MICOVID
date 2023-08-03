import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { CipherParams } from 'crypto-ts/src/lib/CipherParams';
import { GetHexaKey } from 'src/app/config/keys';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  private GetKey = () => enc.Utf8.parse(GetHexaKey);

  public Encript = (value: string): CipherParams =>
    AES.encrypt(value, this.GetKey());

  public Decrypt = (value: string):string => AES.decrypt(value, this.GetKey()).toString(enc.Utf8);

  public DecryptSecret = (value: string): Array<string> => {
    return atob(value).split('/');
  }

}
