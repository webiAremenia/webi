import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {Observable, throwError} from 'rxjs';
import {Portfolio} from '../_models/portfolio';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    constructor(private http: HttpClient, private global: Globals) {
    }

    query = this.global.queryUrl;

    getAll(): Observable<Portfolio[]> {
        return this.http.get(`${this.query}portfolio`)
            .pipe(map(data => {
                    return data['data'].map(item => {
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
                            shortDescription: {
                                en: item.shortDescription.en,
                                ru: item.shortDescription.ru,
                                am: item.shortDescription.am
                            },
                            hover: {
                                en: item.hover.en,
                                ru: item.hover.ru,
                                am: item.hover.am
                            },
                            url: item.url,
                            image: item.image,
                        };
                    });
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }

    getOne(id): Observable<Portfolio> {
        return this.http.get(`${this.query}portfolio/${id}`)
            .pipe(map(data => {
                return data['data'];
            }));
    }
}
