import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../../app.globals";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Language} from "../_models/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http : HttpClient, private global : Globals) { }

  query = this.global.query_url;

  getAll(): Observable<Language[]>{
    return this.http.get(`${this.query}language`)
      .pipe(map(data => {
          return data['data'].map(item => {
            return {
              id: item._id,
              value : item.value,
              status : item.status
            };
          });
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

  getOne(id) : Observable<Language>{
    return this.http.get(`${this.query}language/${id}`)
      .pipe(map(data=>{
        return data['data']
      }))
  }
}
