import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Menu} from '../../../../../../../front/src/app/components/_models/menu';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  menu: Menu;
  menuForm: FormGroup;
  language: String = 'en';
  done: boolean;
  categories: any = ['category', 'page', 'url'];
  optionVal: any;
  value: String;
  categoriesArr;
  pagesArr;
  menus: Menu[];

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.menu) {
      this.router.navigate(['admin/menu']);
    } else {
      this.menu = this.itemService.menu;
      this.done = true;
    }


  }

  ngOnInit() {

    this.dataService.getPagesAndCategories('pc').subscribe(data => {
      this.categoriesArr = data['data'].category;
      this.pagesArr = data['data'].page;
      this.value = this.categories[this.menu['type']];
    });

    this.dataService.getData('menu').subscribe(data => {
      this.menus = data['menus'].filter((item) => {
        return item.title.en !== this.menu.title.en && !item.parent;
      });
    });


    this.menuForm = this.formBuilder.group({
      amTitle: [this.menu['title'].am],
      ruTitle: [this.menu['title'].ru],
      enTitle: [this.menu['title'].en, Validators.required],
      type: [this.menu['type'], Validators.required],
      typeId: [this.menu['typeId']],
      order: [this.menu['order']],
      parent: [this.menu['parent']],
    });


  }


  changeLanguage(language) {
    this.language = language;
  }

  myMedia() {

    const form = {
      title: {
        am: this.menuForm.get('amTitle').value,
        ru: this.menuForm.get('ruTitle').value,
        en: this.menuForm.get('enTitle').value
      },
      type: this.menuForm.get('type').value,
      typeId: this.menuForm.get('typeId').value,
      order: this.menuForm.get('order').value,
      parent: this.menuForm.get('parent').value
    };
    this.dataService.updateData(form, 'menu', this.menu['_id']).subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/menu']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  mySelect(e) {
    this.value = this.categories[e.target.value];

    if (this.value === 'url') {
      this.menuForm.get('typeId').setValue('');
      this.done = true;
    }

  }


}
