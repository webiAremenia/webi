import { Component, OnInit } from '@angular/core';
import {BlogDetailesService} from '../../../_services/blog-detailes.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  news;
  id;
  constructor(private service: BlogDetailesService) { }

  ngOnInit() {
    this.news = this.service.getNews();

  }

}
