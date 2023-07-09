import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
})

export class JwtGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this.router.navigate(['/login']);
        return true;
    }
}




