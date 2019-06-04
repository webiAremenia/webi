import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Portfolio} from '../../../../_models/Portfolio';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.css']
})
export class PortfolioViewComponent implements OnInit {
  portfolio: Portfolio;
  language: String = 'en';
  done: boolean;
  delete: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.portfolio) {
      this.router.navigate(['admin/portfolio']);
    }
  }

  ngOnInit() {
    this.portfolio = this.itemService.portfolio;
    this.done = true;

  }

  updatePortfolio(portfolio) {
    this.itemService.portfolio = portfolio;
    this.router.navigate(['admin/portfolio/edit']);
  }

  ok() {
    this.router.navigate(['admin/portfolio']);
  }

  deletePortfolio(portfolio, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('portfolio', portfolio._id).subscribe(data => {
        if (data['success']) {
          this.router.navigate(['admin/portfolio']);
        } else {
          console.log('DAta ', data);
        }
      });
    }
  }

}
