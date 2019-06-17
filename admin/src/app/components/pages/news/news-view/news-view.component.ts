import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {News} from '../../../../_models/News';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.css']
})
export class NewsViewComponent implements OnInit {

  news: News;
  language: String = 'en';
  done: boolean;
  delete: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.news) {
      this.router.navigate(['admin/news']);
    }
  }

  ngOnInit() {
    this.news = this.itemService.news;
    this.done = true;

  }

  updateNews(news) {
    this.itemService.news = news;
    this.router.navigate(['admin/news/edit']);
  }

  ok() {
    this.router.navigate(['admin/news']);
  }

  deleteNews(news, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete === true) {
      this.dataService.delete('news', news._id).subscribe(data => {
        if (data['success']) {
          this.router.navigate(['admin/news']);
        } else {
          console.log('DAta ', data);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }
}
