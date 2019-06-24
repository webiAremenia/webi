import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {Observable, throwError} from 'rxjs';
import {Team} from '../_models/team';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    allTeem;

    constructor(
        private http: HttpClient,
        private global: Globals
    ) {
    }

    query = this.global.queryUrl;

    getAll(): Observable<Team[]> {
        return this.http.get(`${this.query}team`)
            .pipe(map(d => {
                    this.allTeem = d['data'].map(item => {
                        return {
                            id: item._id,
                            fullName: {
                                en: item.fullName.en,
                                ru: item.fullName.ru,
                                am: item.fullName.am
                            },
                            position: {
                                en: item.position.en,
                                ru: item.position.ru,
                                am: item.position.am
                            },
                            info: {
                                en: item.info.en,
                                ru: item.info.ru,
                                am: item.info.am
                            },
                            sort: item.sort,
                            avatar: item.avatar,
                        };
                    });
                    return this.allTeem;
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }

    getOne(id): Observable<Team> {
        return this.http.get(`${this.query}team/${id}`)
            .pipe(map(data => {
                return data['data'];
            }));
    }
}
