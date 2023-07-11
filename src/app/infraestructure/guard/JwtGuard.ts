import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';



@Injectable({
    providedIn: 'root'
})

export class JwtGuard  {
    constructor(
        private router: Router,
        private authService$:AuthService
    ) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService$.getToken()) {
            return true;
        }
         this.router.navigate(['/login']);
        return false;
    }
}




