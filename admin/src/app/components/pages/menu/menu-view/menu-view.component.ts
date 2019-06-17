import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Menu} from '../../../../../../../front/src/app/components/_models/menu';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit {
  menu: Menu;
  language: String = 'en';
  done: boolean;
  delete: any;
  categories: any = ['category', 'page', 'url'];
  optionVal: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.menu) {
      this.router.navigate(['admin/menu']);
    }
  }

  ngOnInit() {

    this.menu = this.itemService.menu;
    this.done = true;
    this.optionVal = this.categories[+this.menu['type']];
  }

  updateMedia(menu) {
    this.itemService.menu = menu;
    this.router.navigate(['admin/menu/edit']);
  }

  deleteMedia(menu, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('menu', menu._id).subscribe(data => {
        if (data['success']) {
          this.router.navigate(['admin/menu']);
        } else {
          console.log('DAta ', data);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  ok() {
    this.router.navigate(['admin/menu']);
  }
}
