import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Setting} from '../_models/setting';

@Injectable({
    providedIn: 'root'
})
export class SettingService {

    settings = null;

    constructor(private http: HttpClient, private global: Globals) {
        this.getAll();
    }

    query = this.global.queryUrl;

    getAll(): Observable<void> {
        return this.http.get(`${this.query}setting`)
            .pipe(map(data => {
                    if (data) {
                        this.settings = data['data'].map(item => {
                            return {
                                id: item._id,
                                value: {
                                    en: item.value.en,
                                    ru: item.value.ru,
                                    am: item.value.am
                                },
                                key: item.key,
                                image: item.image,
                            };
                        });
                    }
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }

    getValueByKeyLanguage(key, language) {
        alert(key);
        // console.log();
        if (this.settings && this.settings.filter(r => r.key === key).length > 0) {
            const el = this.settings.filter(r => r.key === key)[0].value;
            return el[language] !== '' ? el[language] : el.en;
        } else {
            return '';
        }
    }

    getOne(id): Observable<Setting> {
        return this.http.get(`${this.query}setting/${id}`)
            .pipe(map(data => {
                return data['data'];
            }));
    }
}
