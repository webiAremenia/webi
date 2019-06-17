import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Language} from '../../../../_models/Language';

@Component({
  selector: 'app-language-view',
  templateUrl: './language-view.component.html',
  styleUrls: ['./language-view.component.css']
})
export class LanguageViewComponent implements OnInit {

  language: Language;
  done: boolean;
  delete: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.language) {
      this.router.navigate(['admin/language']);
    }
  }

  ngOnInit() {

    this.language = this.itemService.language;
    this.done = true;
  }

  updateLanguage(language) {
    this.itemService.language = language;
    this.router.navigate(['admin/language/edit']);
  }

  ok() {
    this.router.navigate(['admin/language']);
  }


}
