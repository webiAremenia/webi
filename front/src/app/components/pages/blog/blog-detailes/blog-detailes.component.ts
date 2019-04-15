import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {BlogDetailesService} from '../../../_services/blog-detailes.service';

@Component({
  selector: 'app-blog-detailes',
  templateUrl: './blog-detailes.component.html',
  styleUrls: ['./blog-detailes.component.css']
})
export class BlogDetailesComponent implements OnInit {
  news: any[];
  blog;
  id;
  fourNews: any[] = [];
  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private service: BlogDetailesService) {
    this.news = this.service.getNews();
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => this.id = params.id);
    this.blog = this.service.getNewsId(this.id);
    this.getFourNews();
  }

  getFourNews() {
    let i = 0;
    this.fourNews=[];
    while ( this.fourNews.length < 4 ) {
      if (this.news[i].id != this.id) {
        this.fourNews.push(this.news[i]);
      }
      i++;
    }
  }
  onVisible(){
    this.blog = this.service.getNewsId(this.id);
    this.getFourNews();
  }

// this.fourNews =this.news.slice(0,4);
}
