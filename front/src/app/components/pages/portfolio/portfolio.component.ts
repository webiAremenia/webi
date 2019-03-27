import {Component, HostListener, Input, OnInit} from '@angular/core';
import {PageService} from '../../_services/page.service';
import {Portfolio} from '../../_models/portfolio';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolio: Portfolio[];
  done = false;
  lang;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.lang = this.translateService.currentLang;
    // console.log(this.lang);
  }

  constructor(private pageService: PageService, public  translateService: TranslateService) {
    this.lang = translateService.currentLang;

  }

  ngOnInit() {
    // this.lang = this.translateService.currentLang;
    this.getPortfolio();
  }

  getPortfolio() {
    this.pageService.getPortfolio().subscribe(
      data => {
        this.portfolio = data;
        this.done = true;
        // console.log(data);
      }
      ,
      err => console.log(err)
    );
  }

}
