import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-ecomerce-slider',
    templateUrl: './ecomerce-slider.component.html',
    styleUrls: ['./ecomerce-slider.component.scss'],
    animations: [fadeInXAnimation]
})
export class EcomerceSliderComponent implements OnInit {
    state = 'hide';

    images = [
        'assets/images/test/site.jpg',
        'assets/images/test/site.png',
        'assets/images/test/site.jpg',
    ];

    SliderOptions: any = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        autoplay: true,
        slideTransition: 'linear',
        autoplaySpeed: 3000,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            }
        },
        nav: false,
        dotsClass: 'owl-dots'
    };

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
