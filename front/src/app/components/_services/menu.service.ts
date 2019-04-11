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

  getAll(): Observable<Menu[]> {
    return this.http.get<any[]>(`${this.query}menu`)
      .pipe(map(data => {
          return data['data'].map(item => {
            return {
              id: item._id,
              title: {
                en: item.tite.en,
                ru: item.tite.ru,
                am: item.tite.am
              },
              parent: item.parent,
              order: item.order,
              type : item.type,
              typeId : item.typeId
            };
          });
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

  getOne(id) : Observable<Menu>{
    return this.http.get(`${this.query}menu/${id}`)
      .pipe(map(data=>{
        return data['data']
      }))
  }

}

