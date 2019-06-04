import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../_services/data.service';
import {Portfolio} from '../../../../_models/Portfolio';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {
  portfolios: Portfolio[];
  delete: any;
  searchTerm: String;

  constructor(private dataService: DataService, private router: Router, private itemService: ItemService) {
  }

  ngOnInit() {
    this.dataService.getData('portfolio').subscribe(data => {
      this.portfolios = data['portfolios'];
    }, (err) => {
      if (err.status === 401) {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    });
  }


  deletePortfolio(portfolio, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('portfolio', portfolio._id).subscribe(data => {

        if (data['success']) {
          this.portfolios.splice(i, 1);
        } else {
          this.router.navigate(['login']);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  updatePortfolio(portfolio) {
    this.itemService.portfolio = portfolio;
    this.router.navigate(['admin/portfolio/edit']);
  }


  viewPortfolio(portfolio) {
    this.itemService.portfolio = portfolio;
  }


}
