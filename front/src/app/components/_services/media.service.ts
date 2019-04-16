import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Media} from '../_models/media';

@Injectable({
    providedIn: 'root'
})
export class MediaService {

    constructor(private http: HttpClient, private global: Globals) {
    }

    query = this.global.queryUrl;

    getAll(): Observable<Media[]> {
        return this.http.get(`${this.query}media`)
            .pipe(map(data => {
                    return data['data'].map(item => {
                        return {
                            id: item._id,
                            category: item.category,
                            image: item.image,
                            alt: {
                                en: item.alt.en,
                                ru: item.alt.ru,
                                am: item.alt.am
                            }
                        };
                    });
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }

    getOne(id): Observable<Media> {
        return this.http.get(`${this.query}media/${id}`)
            .pipe(map(data => {
                return data['data'];
            }));
    }
}
