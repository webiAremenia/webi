import {Component, OnInit, Input, ElementRef, HostListener} from '@angular/core';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-cards-type-one',
    templateUrl: './cards-type-one.component.html',
    styleUrls: ['./cards-type-one.component.scss'],
    animations: [fadeInXAnimation]
})
export class CardsTypeOneComponent implements OnInit {
    state = 'hide';

    @Input() cardsHeading: string;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', ['$event']) checkScroll() {
        const scrollPosition = Math.ceil(window.pageYOffset + (document.documentElement.clientHeight / 2));
        if (scrollPosition > this.el.nativeElement.offsetTop) {
            this.state = 'show';
        }
    }

}
