import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../../app.globals";
import {Observable, throwError} from "rxjs";
import {News} from "../_models/news";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient, private global : Globals) { }

  query = this.global.query_url;

  getAll() : Observable<News[]>{
    return this.http.get(`${this.query}news`)
      .pipe(map(data => {
          return data['data'].map(item => {
            return {
              id: item._id,
              title: {
                en: item.tite.en,
                ru: item.tite.ru,
                am: item.tite.am
              },
              description: {
                en: item.description.en,
                ru: item.description.ru,
                am: item.description.am
              },
              content: {
                en: item.content.en,
                ru: item.content.ru,
                am: item.content.am
              },
              banner : item.banner
            };
          });
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

  getOne(id) : Observable<News>{
    return this.http.get(`${this.query}news/${id}`)
      .pipe(map(data=>{
        return data['data']
      }))
  }
}
