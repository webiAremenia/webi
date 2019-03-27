import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {Test} from '../_models/tets';
import {Observable, of, pipe} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private  http: HttpClient,
    private global: Globals,
    private messageService: MessageService
  ) {}

  getQuestions(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.global.query_url}test`)
      .pipe(
        map((data) => {
          const list = data;
          return list.map( item => {
            return {
              name: item.name,
              hayes: item.hayes ? item.hayes : true
            };
          });
        }),
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getQuestions', []))
      );
  }


  updateQuestions(question: Test): Observable<any> {
    return this.http.put(`${this.global.query_url}test`, question, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero name=${question.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }
}
