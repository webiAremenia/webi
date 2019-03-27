import {Component, HostListener, OnInit} from '@angular/core';
import {RouterStateSnapshot} from '@angular/router';
import {PageService} from '../../_services/page.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  title;
  content;
  done = false;
  lang;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.lang = this.translateService.currentLang;
    if (this.done) {
      this.getParams();}
  }

  constructor(private pageService: PageService, private translateService: TranslateService) {
    this.lang = translateService.currentLang;
  }

  ngOnInit() {
    this.getContent();
  }

  getContent() {
    this.pageService.getAboutData().subscribe(
      data => {
        this.content = data;
        this.done = true;
        if (this.done) {
          this.getParams();
        }
        // console.log(this.content);
      },
      err => console.log(err)
    );
  }

  getParams() {
    this.content.find(el => {
      if (el.key === 'page-about-title') {
        this.title = el.value[this.lang];
      }
    });
  }
}
