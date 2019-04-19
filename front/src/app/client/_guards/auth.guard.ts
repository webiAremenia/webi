import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../login.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private logService: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(route);
        console.log(state.url);

        if (this.logService.getLogin()) {
            console.log('hello');
            return true;
        } else {
            this.router.navigate(['login']);
            console.log('false');
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
