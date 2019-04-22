import {Injectable} from '@angular/core';
import {Globals} from '../../app.globals';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    queryUrl;

    constructor(
        private http: HttpClient,
        private globals: Globals
    ) {
        this.queryUrl = globals.clientUrl;
    }

    getInvoice() {
        const data = {};
        return this.http.post(this.queryUrl + 'invoice', data);
    }
}
