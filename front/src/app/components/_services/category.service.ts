import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Category} from '../_models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient, private global: Globals) {
    }

    query = this.global.queryUrl;

    getAll(): Observable<Category[]> {
        return this.http.get(`${this.query}category`)
            .pipe(map(data => {
                    return data['data'].map(item => {
                        return {
                            id: item._id,
                            name: {
                                en: item.name.en,
                                ru: item.name.ru,
                                am: item.name.am
                            }
                        };
                    });
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }

    getOne(id): Observable<Category> {
        return this.http.get(`${this.query}category/${id}`)
            .pipe(map(data => {
                return data['data'];
            }));
    }

}
