import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../app.globals';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    baseUrl;

    constructor(private http: HttpClient, global: Globals) {
        this.baseUrl = global.queryUrl + 'admin/cards';
    }

    createCard(data) {
        return this.http.post(`${this.baseUrl}/`, data);
    }

    getCards() {
        return this.http.get(this.baseUrl);
    }
}
