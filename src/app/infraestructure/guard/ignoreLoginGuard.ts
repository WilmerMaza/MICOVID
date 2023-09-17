import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IgnoreLoginGuard {
  constructor(private authService$: AuthService,private router: Router) {}
  canActivate(): boolean {
    if (this.authService$.isAuthenticated()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
