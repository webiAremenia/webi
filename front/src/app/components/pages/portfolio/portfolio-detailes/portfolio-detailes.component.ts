import {Component, OnInit} from '@angular/core';
import {PortfolioService} from '../../../_services/portfolio.service';
import {Portfolio} from '../../../_models/portfolio';
import {SettingService} from '../../../_services/setting.service';
import {Globals} from '../../../../app.globals';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-portfolio-detailes',
    templateUrl: './portfolio-detailes.component.html',
    styleUrls: ['./portfolio-detailes.component.css']
})
export class PortfolioDetailesComponent implements OnInit {
    id;
    title;
    text;
    imageUrl;
    portfolio: Portfolio[];
    singlPortfolio;
    done = false;
    arrPort = [];
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, private portfolioService: PortfolioService, private  settingsService: SettingService,
                global: Globals) {
        this.imageUrl = global.imageUrl + 'portfolio/';

    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => this.id = params.id);
        this.getPortfolio();
        this.onVisible();


    }

    getPortfolio() {
        this.portfolioService.getAll().subscribe(
            data => {
                this.portfolio = data;
                this.done = true;
                this.getFourPortfolio();
            },
            err => console.log(err)
        );
    }

    getFourPortfolio() {
        let i = 0;
        this.arrPort = [];
        while (this.arrPort.length < 4) {
            if (this.portfolio[i].id !== this.id) {
                this.arrPort.push(this.portfolio[i]);
            }
            i++;
        }

    }

    onVisible() {
        this.portfolioService.getOne(this.id).subscribe(
            d => {
                this.singlPortfolio = d;
            }
        );
        this.getFourPortfolio();
    }
}
