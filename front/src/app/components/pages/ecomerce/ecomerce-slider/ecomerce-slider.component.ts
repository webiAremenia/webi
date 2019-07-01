import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-ecomerce-slider',
    templateUrl: './ecomerce-slider.component.html',
    styleUrls: ['./ecomerce-slider.component.scss']
})
export class EcomerceSliderComponent implements OnInit {

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

    constructor() {
    }

    ngOnInit() {
    }

}
