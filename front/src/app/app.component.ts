import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router, RouterStateSnapshot, Routes} from '@angular/router';
import {MediaService} from "./components/_services/media.service";
import {CategoryService} from "./components/_services/category.service";
import {LanguageService} from "./components/_services/language.service";
import {MenuService} from "./components/_services/menu.service";
import {NewsService} from "./components/_services/news.service";
import {PageService} from "./components/_services/page.service";
import {PortfolioService} from "./components/_services/portfolio.service";
import {SettingService} from "./components/_services/setting.service";
import {TeamService} from "./components/_services/team.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webiFront';
  id : string = '5caaf3c2250c062804911d70';

  constructor(private translate: TranslateService, private service : NewsService) {
    this.service.getOne(this.id).subscribe(data=>{
      console.log('Data ', data)
    });

    translate.setDefaultLang('en');
    this.translate.currentLang = 'en';
  }

}


