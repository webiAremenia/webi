import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Globals} from '../../app.globals';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Menu} from '../_models/menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private global: Globals, private  http: HttpClient) {
  }

  query = this.global.query_url;

  getMenus(): Observable<Menu[]> {
    return this.http.get<any[]>(`${this.query}menu`)
      .pipe(map(data => {
          return data.map(item => {
            return {
              id: item.id,
              title: {
                en: item.title_en,
                ru: item.title_ru,
                am: item.title_am
              },
              parent: item.parent,
              position: item.position,
              url: item.url
            };
          });
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

}
