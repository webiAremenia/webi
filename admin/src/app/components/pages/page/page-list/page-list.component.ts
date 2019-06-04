import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Page} from '../../../../_models/Page';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  pages: Page[];
  delete: any;
  searchTerm: String;

  constructor(private dataService: DataService, private router: Router, private itemService: ItemService) {
  }

  ngOnInit() {
    this.dataService.getData('page').subscribe(data => {
      this.pages = data['data'];
    }, (err) => {
      console.log(err);
    });
  }


  deletePage(page, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete === true) {
      this.dataService.delete('page', page._id).subscribe(data => {
        if (data['success']) {
          this.pages.splice(i, 1);
        } else {
          this.router.navigate(['login']);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  updatePage(page) {
    this.itemService.page = page;
    this.router.navigate(['admin/page/edit']);
  }


  viewPage(page) {
    this.itemService.page = page;
  }


}
