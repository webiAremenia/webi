import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../../_services/data.service";
import {Router} from "@angular/router";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;
  res: String = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      amName: [''],
      ruName: [''],
      enName: ['', Validators.required],
    });

  }


  myCategory() {
    let form = {
      name: {
        am: this.categoryForm.get('amName').value,
        ru: this.categoryForm.get('ruName').value,
        en: this.categoryForm.get('enName').value
      },
    };

    this.dataService.sendData(form, 'category').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/category']);
      } else {
        this.res = data['msg'];
      }
    },(err)=>{
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }
}
