import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../../app.globals";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Setting} from "../_models/setting";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http : HttpClient, private global : Globals) { }

  query = this.global.query_url;

  getAll(): Observable<Setting[]>{
    return this.http.get(`${this.query}setting`)
      .pipe(map(data => {
          return data['data'].map(item => {
            return {
              id: item._id,
              value: {
                en: item.value.en,
                ru: item.value.ru,
                am: item.value.am
              },
              key : item.key,
              image : item.image,
            };
          });
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

  getOne(id) : Observable<Setting>{
    return this.http.get(`${this.query}setting/${id}`)
      .pipe(map(data=>{
        return data['data']
      }))
  }
}
