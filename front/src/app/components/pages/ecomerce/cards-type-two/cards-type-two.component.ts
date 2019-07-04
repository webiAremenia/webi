import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-cards-type-two',
    templateUrl: './cards-type-two.component.html',
    styleUrls: ['./cards-type-two.component.scss'],
    animations: [fadeInXAnimation]
})
export class CardsTypeTwoComponent implements OnInit {
    state = 'hide';

    url1 = '../assets/images/test/Breakfast.svg';

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
