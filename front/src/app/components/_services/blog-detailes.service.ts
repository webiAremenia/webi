import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {News} from '../_models/news';


@Injectable({
    providedIn: 'root'
})
export class BlogDetailesService {
    news = [
        {
            id: 1,
            title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia' +
                ' perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt ' +
                'quibusdam reprehenderit veritatis.',
            img: './assets/images/portfolio1.PNG'
        },
        {
            id: 2,
            title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia' +
                ' perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt ' +
                'quibusdam reprehenderit veritatis.',
            img: './assets/images/portfolio2.PNG'
        },
        {
            id: 3,
            title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia' +
                ' perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt' +
                ' quibusdam reprehenderit veritatis.',
            img: './assets/images/portfolio3.PNG'
        },
        {
            id: 4,
            title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia ' +
                'perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt ' +
                'quibusdam reprehenderit veritatis.',
            img: './assets/images/portfollio4.PNG'
        },
        {
            id: 5,
            title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia ' +
                'perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt ' +
                'quibusdam reprehenderit veritatis.',
            img: './assets/images/portfolio5.PNG'
        },
        {
            id: 6,
            title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia' +
                ' perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt' +
                ' quibusdam reprehenderit veritatis.',
            img: './assets/images/portfolio1.PNG'
        }
    ];


    constructor(private http: HttpClient, private global: Globals) {
    }

    query = this.global.queryUrl;

    getAll(): Observable<News[]> {
        return this.http.get(`${this.query}news`)
            .pipe(map(data => {
                    return data['data'].map(item => {
                        return {
                            id: item._id,
                            title: {
                                en: item.title.en,
                                ru: item.title.ru,
                                am: item.title.am
                            },
                            description: {
                                en: item.description.en,
                                ru: item.description.ru,
                                am: item.description.am
                            },
                            url: item.url,
                            image: item.image,
                        };
                    });
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }


    getNews() {
        return this.news;
    }

    getNewsId(id) {

        const found = this.news.find((element) => {
            return String(element.id) === String(id);
        });
        return found;
    }


}
