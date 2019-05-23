import {Component, OnInit} from '@angular/core';
import {PortfolioService} from '../../_services/portfolio.service';
import {Portfolio} from '../../_models/portfolio';
import {Globals} from '../../../app.globals';
import {SettingService} from '../../_services/setting.service';


@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
    title;
    text;
    imageUrl;
    portfolio: Portfolio[];
    done = false;

    arr: any [] = [];

    constructor(
        private portfolioService: PortfolioService,
        private  settingsService: SettingService,
        global: Globals
    ) {
        this.imageUrl = global.imageUrl + 'portfolio/';
    }

    ngOnInit() {
        this.getPortfolio();
        this.title = this.settingsService.getValueByKeyLanguage('home-portfolio-title', 'en');
        this.text = this.settingsService.getValueByKeyLanguage('home-portfolio-text', 'en');
    }

    getPortfolio() {
        this.portfolioService.getAll().subscribe(
            data => {
                this.portfolio = data;
                this.done = true;
                console.log(this.portfolio);
                this.loadPortfolio();
            },
            err => console.log(err)
        );
    }

    loadPortfolio() {
        this.arr = [];
        let i = 0;
        while (this.arr.length < 5) {
            this.arr.push(this.portfolio[i].image);
            i++;
            if (i >= this.portfolio.length) {
                i = 0;
            }

        }

        console.log(this.arr);
    }
}


