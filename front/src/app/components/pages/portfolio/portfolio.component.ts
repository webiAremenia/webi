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
    arr = [];
    arrId = [];
    arrHover = [];

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
                this.loadPortfolio();
                this.loadPortfolioId();
                this.loadPortfolioHover();
                console.log(data);
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

    }

    loadPortfolioId() {
        this.arrId = [];
        let i = 0;
        while (this.arrId.length < 5) {
            this.arrId.push(this.portfolio[i].id);
            i++;
            if (i >= this.portfolio.length) {
                i = 0;
            }
        }
    }
    loadPortfolioHover() {
        this.arrHover = [];
        let i = 0;
        while (this.arrHover.length < 5) {
            this.arrHover.push(this.portfolio[i].hover);
            i++;
            if (i >= this.portfolio.length) {
                i = 0;
            }
        }
    }

}


