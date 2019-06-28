import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {Observable, throwError} from 'rxjs';
import {Card} from '../_models/card';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    query;
    cards: Card[];

    constructor(private http: HttpClient, private global: Globals) {
        this.query = this.global.queryUrl;
    }

    getAll(): Observable<Card[]> {
        return this.http.get(`${this.query}cards`)
            .pipe(map(data => {
                    return  data['data'].map(item => {
                        return {
                            id: item._id,
                            title: {
                                en: item.title.en,
                                ru: item.title.ru,
                                am: item.title.am
                            },
                            description: {
                                en: item.description.en,
                                ru: item.description.ru,
                                am: item.description.am
                            },
                            url: item.url,
                            bgColor: item.background,
                            textColor: item.textColor
                        };
                    });
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }

    getOne(id): Observable<Card> {
        return this.http.get(`${this.query}cards/${id}`)
            .pipe(map(data => {
                return data['data'];
            }));
    }

}
