import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-cards-type-three',
    templateUrl: './cards-type-three.component.html',
    styleUrls: ['./cards-type-three.component.scss'],
    animations: [fadeInXAnimation]
})
export class CardsTypeThreeComponent implements OnInit {
    state = 'hide';

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
