import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Globals} from '../../app.globals';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Portfolio} from '../_models/portfolio';
import {Setting} from '../_models/setting';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private global: Globals, private  http: HttpClient) {
  }

  query = this.global.query_url;

  getPages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.query}pages`);
  }

  getAboutData(): Observable<Setting[]> {
    return this.http.get<any[]>(`${this.query}about`).pipe(
      map(result => {
        return result.map(el => {
          return {
            key: el.key,
            value: {en: el.value_en, ru: el.value_ru, am: el.value_am},
          };
        });
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      }));
  }


  getPortfolio(): Observable<Portfolio[]> {
    return this.http.get<any[]>(`${this.query}portfolio`)
      .pipe(map(data => {
          return data.map((el) => {
            return {
              url: el.url,
              title: {en: el.title_en, ru: el.title_ru, am: el.title_am},
              description: {en: el.description_en, ru: el.description_ru, am: el.description_am}
            };
          });
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

}




//
// getAboutData(): Observable<any[]> {
//   return this.http.get<any[]>(`${this.query}about`)
//     .pipe(
//       map(result => {
//         let settings: Setting = result.settings;
//         let page = result.page;
//         return {
//           settings: settings.map(el => {
//             return {
//               key: el.key,
//               value: {en: el.value_en, ru: el.value_ru, am: el.value_am},
//             };
//           }),
//           page: page
//         };
//       })
//     );
// }
