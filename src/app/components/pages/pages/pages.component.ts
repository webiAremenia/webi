import {Component, OnInit} from '@angular/core';
import {PageService} from '../../_services/page.service';
import {Page} from '../../models/page';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  done = false;
  pages: Page[];
  private id: number;
  private routeSubscription: Subscription;

  constructor(private pageService: PageService, private route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    // console.log(this.id);
  }


  ngOnInit() {
    this.getPages();
  }

  getPages() {
    this.pageService.getPages().subscribe(
      result => {
        this.pages = result;
        this.done = true;
      },
      err => console.log(err)
    );
  }

}
