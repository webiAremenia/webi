import {Component, OnInit, ElementRef, OnDestroy, HostListener} from '@angular/core';
import {Card} from '../../_models/card';
import {CardService} from '../../_services/card.service';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../_services/scroll.service';
import {fadeInYAnimation} from '../../_animations';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [fadeInYAnimation]
})
export class SliderComponent implements OnInit, OnDestroy {

    state = 'hide';
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

    constructor(private service: CardService, private scrollService: ScrollService, private el: ElementRef) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => {
                if (animation.slider) {
                    this.state = animation.slider;
                }
            }
        );
    }

    ngOnInit() {
        this.initCards();
    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }

    componentHeight() {
        return this.el.nativeElement.offsetTop;
    }

    // async initCards() {
    //     try {
    //         const d = await this.service.getAll().toPromise();
    //         this.cards = d;
    //         this.done = true;
    //         const slider = true;
    //         this.scrollService.setComponentHeight({slider});
    //     } catch (e) {
    //         console.log(e);
    //     }
    //
    // }

    initCards() {
        this.service.getAll().subscribe(
            d => {
                this.cards = d;
                this.done = true;
            }
        );
    }
}
