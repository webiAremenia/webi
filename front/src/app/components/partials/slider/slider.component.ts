import {Component, OnInit} from '@angular/core';
import {Card} from '../../_models/card';
import {CardService} from '../../_services/card.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
    cards: Card[] | Subscription;
    done = false;
    customOptions: any = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['<img src="assets/images/prew-button.png" alt=""/>', '<img src="assets/images/next-button.png" alt=""/>'],
        navClass: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            740: {
                items: 2
            },
            940: {
                items: 3
            }
        },
        nav: true

    };

    constructor(private service: CardService) {

    }

    ngOnInit() {
        this.initCards();
    }

    initCards() {
        this.service.getAll().subscribe(
            d => {
                this.cards = d;
                this.done = true;
            }
        );
    }
}
