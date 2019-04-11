import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {DataService} from "../../../../_services/data.service";
import {Router} from "@angular/router";
import {ItemService} from "../../../../_services/item.service";
import {Category} from "../../../../_models/Category";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  category : Category;
  language: String = 'en';
  done: boolean;
  delete: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService : ItemService) {
    if (!this.itemService.category) {
      this.router.navigate(['admin/category']);
    }
  }

  ngOnInit() {
    // this.dataService.getOne('setting', localStorage.getItem('settingItem')).subscribe(data => {
    //   console.log('Data ', data);
    //   this.setting = data['setting'];
    //   this.done = true;
    //   console.log('Setting ', this.setting);
    // });
    this.category = this.itemService.category;
    this.done = true;
  }

  updateCategory(category) {
    this.itemService.category = category;
    this.router.navigate(['admin/category/edit']);
  }

  deleteCategory(category, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('category', category._id).subscribe(data => {
        if (data['success']) {
          this.router.navigate(['admin/category']);
        } else {
          console.log('DAta ', data);
        }
      }, (err)=>{
        console.log(err);
      });
    }
  }

  ok() {
    this.router.navigate(['admin/category']);
  }
}
