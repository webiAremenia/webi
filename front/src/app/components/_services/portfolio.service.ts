import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../../app.globals";
import {Observable, throwError} from "rxjs";
import {Portfolio} from "../_models/portfolio";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http : HttpClient, private global : Globals) { }

  query = this.global.query_url;

  getAll(): Observable<Portfolio[]>{
    return this.http.get(`${this.query}portfolio`)
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
              url : item.url,
              image : item.image,
            };
          });
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

  getOne(id) : Observable<Portfolio>{
    return this.http.get(`${this.query}portfolio/${id}`)
      .pipe(map(data=>{
        return data['data']
      }))
  }
}
