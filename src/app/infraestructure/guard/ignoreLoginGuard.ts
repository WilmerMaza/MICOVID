import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class IgnoreLoginGuard {
  constructor(private authService$: AuthService) {}
  canActivate(): boolean {
    if (this.authService$.isAuthenticated()) {
      return false;
    } else {
      return true;
    }
  }
}
