import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss'],
    animations: [fadeInXAnimation]
})
export class TestimonialsComponent implements OnInit {
    state = 'hide';

    url2 = 'assets/images/test/people.jpg';

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
