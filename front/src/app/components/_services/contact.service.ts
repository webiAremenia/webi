import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.globals';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    url;

    constructor(private  http: HttpClient,  private config: Globals) {
        this.url = config.queryUrl;
    }

    sendEmail(form): any {
        return this.http.post(`${this.url}contact`, form);
    }
}
