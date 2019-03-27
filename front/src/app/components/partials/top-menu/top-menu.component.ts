import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../_services/menu.service';
import {Menu} from '../../_models/menu';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  menuList;
  done = false;
  language;

  constructor(private menuService: MenuService, private translate: TranslateService) {
    this.language = translate.currentLang;
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.menuService.getMenus().subscribe(
      (data) => {
        console.log(data);
        this.menuList = data;
        this.done = true;
      },
      err => console.log(err)
    );
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.translate.currentLang = language;
    this.language = language;
    // console.log(this.translate.currentLang);
  }
}
