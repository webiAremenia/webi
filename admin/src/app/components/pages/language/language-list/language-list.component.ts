import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../../_services/data.service';
import {ItemService} from '../../../../_services/item.service';
import {Language} from '../../../../_models/Language';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {
  languages: Language[];
  delete: any;
  searchTerm: '';
  constructor(private router: Router, private dataService: DataService, private itemService: ItemService) { }

  ngOnInit() {
    this.dataService.getData('language').subscribe(data => {
      this.languages = data['data'];
    }, (err) => {
      console.log(err);
    });
  }

  deleteLangauge(language, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete === true) {
      this.dataService.delete('language', language._id).subscribe(data => {
        if (data['success']) {
          this.languages.splice(i, 1);
        } else {
          this.router.navigate(['login']);
        }
      });
    }
  }

  updateLangauge(language) {
    this.itemService.language = language;
    this.router.navigate(['admin/language/edit']);
  }

  viewLangauge(language) {
    this.itemService.language = language;
  }
}
