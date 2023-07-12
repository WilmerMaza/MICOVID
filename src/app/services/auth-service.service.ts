import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'token';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    // Opción alternativa utilizando sessionStorage:
    // sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? '';
    // Opción alternativa utilizando sessionStorage:
    // return sessionStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // Opción alternativa utilizando sessionStorage:
    // sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
