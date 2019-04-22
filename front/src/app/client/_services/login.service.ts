import {Injectable} from '@angular/core';
import {Globals} from '../../app.globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    queryUrl;
    returnUrl;
    client;

    static logout() {
        localStorage.clear();
    }

    constructor(
        private http: HttpClient,
        private globals: Globals
    ) {
        this.queryUrl = globals.clientUrl;
    }

    login(data) {
        data.nikName = this.returnUrl.split('/')[2];
        console.log(data);
        return this.http.post(this.queryUrl + 'login', data);
    }

    changePass(data) {
        return this.http.post(this.queryUrl + 'change-password', data);
    }

}
