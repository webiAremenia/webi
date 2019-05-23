import {Component, OnInit} from '@angular/core';
import {News} from '../../_models/news';
import {Globals} from '../../../app.globals';
import {NewsService} from '../../_services/news.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    news: News[];
    id;
    imageUrl;
    done = false;

    constructor(private service: NewsService, global: Globals) {
        this.imageUrl = global.imageUrl + 'news/';
    }

    ngOnInit() {
        this.getNews();

    }

    getNews() {
        this.service.getAll().subscribe(data => {
                this.news = data;
                this.done = true;
            },
            err => console.log(err)
        );
    }
}
