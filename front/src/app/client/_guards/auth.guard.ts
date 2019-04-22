import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../_services/login.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private logService: LoginService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const client = localStorage.getItem('client-token');

        if (client) {
            return true;
        } else {
            this.logService.returnUrl = state.url;
            this.router.navigate(['login']);
            return false;
        }
    }


}


// canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     console.log(state.url);
//     return true;
//
// }
