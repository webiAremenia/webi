import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NewsService} from '../../../_services/news.service';
import {Globals} from '../../../../app.globals';

@Component({
    selector: 'app-blog-detailes',
    templateUrl: './blog-detailes.component.html',
    styleUrls: ['./blog-detailes.component.css']
})
export class BlogDetailesComponent implements OnInit {
    news: any[];
    blog;
    id;
    title;
    text;
    fourNews: any[] = [];
    imageUrl;
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, private service: NewsService, global: Globals) {
        this.imageUrl = global.imageUrl + 'news/';

    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => this.id = params.id);
        this.getNews();
        this.onVisible();
    }


    getNews() {
        this.service.getAll().subscribe(data => {
                this.news = data;
                this.getFourNews();
            },
            err => console.log(err)
        );
    }


    getFourNews() {
        let i = 0;
        this.fourNews = [];
        while (this.fourNews.length < 4) {
            if (this.news[i].id !== this.id) {
                this.fourNews.push(this.news[i]);
            }
            i++;
        }
    }

    onVisible() {
        this.service.getOne(this.id).subscribe(
            d => {
                this.blog = d;
            }
        );
        this.getFourNews();
    }


}
