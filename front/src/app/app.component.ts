import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router, RouterStateSnapshot, Routes} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webiFront';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.translate.currentLang = 'en';
  }

}


