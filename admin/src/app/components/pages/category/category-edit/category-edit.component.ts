import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../../_services/data.service";
import {Router} from "@angular/router";
import {ItemService} from "../../../../_services/item.service";
import {Category} from "../../../../_models/Category";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: Category;
  categoryForm: FormGroup;
  language: String = 'en';
  done: boolean;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.category) {
      this.router.navigate(['admin/category']);
    }
  }

  ngOnInit() {

    this.category = this.itemService.category;
    this.done = true;

    this.categoryForm = this.formBuilder.group({
      amName: [this.category['name'].am],
      ruName: [this.category['name'].ru],
      enName: [this.category['name'].en, Validators.required]
    });
  }


  changeLanguage(language) {
    this.language = language;
  }

  myCategory() {
    let form = {
      name: {
        am: this.categoryForm.controls.amName.value,
        ru: this.categoryForm.controls.ruName.value,
        en: this.categoryForm.controls.enName.value,
      }
    };
    this.dataService.updateData(form, 'category', this.category._id).subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/category']);
      }
    },(err)=>{
      console.log(err);
    });
    console.log('FOrm ', form);
  }



}
