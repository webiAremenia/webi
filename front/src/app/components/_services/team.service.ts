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
  // teams = [
  //   {
  //     name: 'EDUARD',
  //     job: 'CEO',
  //     img: 'Mask Group 9.png',
  //     description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque ' +
  //         'earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'FARAZ',
  //     job: 'CTO',
  //     img: 'Mask Group 8.png',
  //     description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque' +
  //         ' earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'ARTUR',
  //     job: 'CEO',
  //     img: 'Mask Group 8.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque' +
  //         ' earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'VAZGEN',
  //     job: 'CEO',
  //     img: 'Mask Group 9.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque ' +
  //         'earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'LEVON',
  //     job: 'CEO',
  //     img: 'Mask Group 8.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque ' +
  //         'earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'EDUARD',
  //     job: 'CTO',
  //     img: 'Mask Group 9.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque' +
  //         ' earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'LEVON',
  //     job: 'CEO',
  //     img: 'Mask Group 8.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque' +
  //         ' earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'EDUARD',
  //     job: 'CTO',
  //     img: 'Mask Group 9.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque ' +
  //         'earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'LEVON',
  //     job: 'CEO',
  //     img: 'Mask Group 8.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque ' +
  //         'earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'EDUARD',
  //     job: 'CTO',
  //     img: 'Mask Group 9.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque ' +
  //         'earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'LEVON',
  //     job: 'CEO',
  //     img: 'Mask Group 8.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum ' +
  //         'eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'EDUARD',
  //     job: 'CTO',
  //     img: 'Mask Group 9.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum' +
  //         ' eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'LEVON',
  //     job: 'CEO',
  //     img: 'Mask Group 8.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum ' +
  //         'eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'EDUARD',
  //     job: 'CTO',
  //     img: 'Mask Group 9.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum ' +
  //         'eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   },
  //   {
  //     name: 'EDUARD',
  //     job: 'CTO',
  //     img: 'Mask Group 9.png',
  //     description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum ' +
  //         'eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
  //   }
  // ];

  constructor(private http: HttpClient, private global: Globals) { }

  query = this.global.queryUrl;

  getAll(): Observable<Team[]> {
    return this.http.get(`${this.query}team`)
      .pipe(map(data => {
          return data['data'].map(item => {
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
              sort : item.sort,
              avatar : item.avatar,
            };
          });
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

  // getTeam() {
  //   return this.teams;
  // }


}
