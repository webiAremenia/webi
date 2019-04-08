import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../../../_services/data.service";
import {ItemService} from "../../../../_services/item.service";
import {Category} from "../../../../_models/Category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories : Category[];
  delete: any;
  searchTerm: '';
  constructor(private router : Router, private dataService: DataService, private itemService : ItemService) { }

  ngOnInit() {
    this.dataService.getData('category').subscribe(data => {
      this.categories = data['data'];
    }, (err)=>{
      console.log(err);
    });
  }

  deleteCategory(category,i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('category', category._id).subscribe(data => {
        if (data['success']) {
          this.categories.splice(i, 1);
        } else {
          this.router.navigate(['login']);
        }
      });
    }
  }

  updateCategory(category) {
    this.itemService.category = category;
    this.router.navigate(['admin/category/edit']);
  }

  viewCategory(category) {
    this.itemService.category = category;
  }
}
