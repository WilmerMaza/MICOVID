import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';



@Injectable({
    providedIn: 'root'
})

export class JwtGuard   {
    constructor(
        private router: Router,
        private authService$:AuthService
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService$.isAuthenticated()) {
      // Si el usuario está autenticado, se permite el acceso a la ruta.
      return true;
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión.
      this.router.navigate(['/login']);
      return false;
    }
  }
}




