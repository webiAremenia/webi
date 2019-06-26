import {Component, OnInit} from '@angular/core';
import {Card} from '../../_models/card';
import {CardService} from '../../_services/card.service';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ScrollService} from '../../_services/scroll.service';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('scrollAnimation', [
            state('show', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            state('hide',   style({
                opacity: 0,
                transform: 'translateY(+100%)'
            })),
            transition('show => hide', animate('700ms ease-out')),
            transition('hide => show', animate('700ms ease-in'))
        ])
    ]
})
export class SliderComponent implements OnInit {

    state = 'show';
    stateSubscription: Subscription;

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

    constructor(private service: CardService, private scrollService: ScrollService,) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => this.state = animation.introduction
        );
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
