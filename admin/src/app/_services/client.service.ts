import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../app.globals';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    url;

    constructor(private http: HttpClient, globals: Globals) {
        this.url = globals.queryUrl + '/client';
    }

    getClients() {
        return this.http.get(this.url);
    }
}
