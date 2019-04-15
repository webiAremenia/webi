import {Component, OnInit} from '@angular/core';
import {PortfolioService} from '../../_services/portfolio.service';
import {Portfolio} from '../../_models/portfolio';


@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

    portfolio: Portfolio[];
    done = false;

    constructor(private portfolioService: PortfolioService) {
    }

    ngOnInit() {
        this.getPortfolio();
    }

    getPortfolio() {
        this.portfolioService.getAll().subscribe(
            data => {
                this.portfolio = data;
                this.done = true;
                console.log(this.portfolio);
            },
            err => console.log(err)
        );
    }

}
