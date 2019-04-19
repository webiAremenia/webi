import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isLogd = false;

    constructor() {
    }

    getLogin() {
        return this.isLogd;
    }
}
