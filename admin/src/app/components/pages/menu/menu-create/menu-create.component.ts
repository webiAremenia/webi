import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../../_services/data.service";
import {Router} from "@angular/router";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ItemService} from "../../../../_services/item.service";
import {Menu} from "../../../../../../../front/src/app/components/_models/menu";

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})
export class MenuCreateComponent implements OnInit {
  menuForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;
  options: any;
  categories: any = ['category', 'page', 'url'];
  categoriesArr;
  pagesArr;
  value: string;
  menuValue: string;
  done: boolean;
  menus: Menu[];

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    // if (!this.itemService.menus) {
    //   this.router.navigate(['admin/menus']);
    // }else{
    //   this.menus = this.itemService.menus;
    // }
  }

  ngOnInit() {

    this.dataService.getPagesAndCategories('pc').subscribe(data=>{
      this.categoriesArr = data['data'].category;
      this.pagesArr = data['data'].page;
    });

    this.dataService.getData('menu').subscribe(data => {
      this.menus = data['menus'];
    }, (err)=>{
      console.log(err);
    });


    this.menuForm = this.formBuilder.group({
      amTitle: [''],
      ruTitle: [''],
      enTitle: ['', [Validators.required]],
      type: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      order: ['', [Validators.required]],
      parent: [null]
    });

    this.dataService.getPagesAndCategories('pc').subscribe(data=>{
      console.log(data)
    },(err) => {
      console.log(err);
    })

  }


  myMedia() {
    let form = {
      title: {
        am: this.menuForm.get('amTitle').value,
        ru: this.menuForm.get('ruTitle').value,
        en: this.menuForm.get('enTitle').value
      },
      type: this.menuForm.get('type').value,
      typeId: this.menuForm.get('typeId').value,
      order: this.menuForm.get('order').value,
      parent : this.menuForm.get('parent').value
    };


    this.dataService.sendData(form, 'menu').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/menu']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }

  mySelect(e) {
    this.value = this.categories[e.target.value];
    if (this.value == 'url') {
      // this.categoriesArr = '';
      // this.pagesArr = '';
      this.menuForm.get('typeId').setValue('');
      this.done = true;
    }

  }

  menuParent(e) {
    this.menuForm.get('parent').setValue(e.target.value);
  }


}
