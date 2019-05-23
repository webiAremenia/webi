import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
    customOptions: any = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['<img src="./assets/images/Path 2926.png"/>', '<img src="./assets/images/Path 2927.png"/>'],
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

    constructor() {
    }

    ngOnInit() {
    }

}
