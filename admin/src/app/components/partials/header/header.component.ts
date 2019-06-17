import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgSelectConfig} from '@ng-select/ng-select';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email: String;
  languages = [
    {
      name: 'en',
      image: '../../../../assets/images/language/en.png'
    },
    {
      name: 'ru',
      image: '../../../../assets/images/language/ru.png'
    },
    {
      name: 'am',
      image: '../../../../assets/images/language/am.png'
    }
  ];
  final;
  lan = {
    image: '../../../../assets/images/language/en.png',
    name: ''
  };

  constructor(private router: Router, private translate: TranslateService, private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.final = this.languages.filter(item => {
      return item.name !== 'en';
    });
  }


  switchLanguage(l) {

    this.translate.use(l.name);
    this.lan = l;

    this.final = this.languages.filter(item => {
      return item.name !== l.name;
    });
  }

  myLogout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
