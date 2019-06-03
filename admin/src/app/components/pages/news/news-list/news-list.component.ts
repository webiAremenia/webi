import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {News} from '../../../../_models/News';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  newses: News[];
  delete: any;
  searchTerm: String;

  constructor(private dataService: DataService, private router: Router, private itemService: ItemService) {
  }

  ngOnInit() {
    this.dataService.getData('news').subscribe(data => {
      this.newses = data['data'];
    }, (err) => {
      console.log(err);
    });
  }


  deleteNews(news, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete === true) {
      this.dataService.delete('news', news._id).subscribe(data => {
        if (data['success']) {
          this.newses.splice(i, 1);
        } else {
          this.router.navigate(['login']);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  updateNews(news) {
    this.itemService.news = news;
    this.router.navigate(['admin/news/edit']);
  }


  viewNews(news) {
    this.itemService.news = news;
  }


}
