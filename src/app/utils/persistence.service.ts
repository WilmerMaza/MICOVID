import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Validators } from 'src/app/utils/Validators';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})

export class Persistence {


  constructor(
    private localSet$: LocalStorageService,
    private Crypto$: CryptoService
  ) {
  }

  save(key: string, value: any) {
    const _key = this.Encript(key);
    const _value = this.Encript(JSON.stringify(value));
     localStorage.setItem(_key, _value);
  }

  get(key: string) {
    const _key = this.Encript(key);
    const valueEncript = localStorage.getItem(_key);
    if (Validators.isNullOrUndefined(valueEncript)) {
      return null;
    }
    return JSON.parse(this.Crypto$.Decrypt(valueEncript));
  }


  delete = (key: string) => localStorage.removeItem(this.Encript(key));

  deleteAll = () => {
    localStorage.clear();
    location.reload();
  }

  clearStorage = () => {
    this.localSet$.clear();
  }

  private Encript = (value: string) => this.Crypto$.Encript(value).toString();
}
