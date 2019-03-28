import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Page} from '../../../../_models/Page';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
  page : Page;
  language: String = 'en';
  done: boolean;
  delete: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService : ItemService) {
    if (!this.itemService.page) {
      this.router.navigate(['admin/page']);
    }
  }

  ngOnInit() {
    this.page = this.itemService.page;
    this.done = true;

  }

  updatePage(page) {
    this.itemService.page = page;
    this.router.navigate(['admin/page/edit']);
  }

  ok() {
    this.router.navigate(['admin/page']);
  }

  deletePage(page, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('page', page._id).subscribe(data => {

        if (data['success']) {
          this.router.navigate(['admin/page']);
        } else {
          console.log('DAta ', data);
        }
      });
    }
  }
}
