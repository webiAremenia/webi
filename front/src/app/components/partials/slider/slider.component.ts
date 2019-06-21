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
        touchDrag: true,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['<img src="./assets/images/prew-button.png" alt=""/>', '<img src="./assets/images/next-button.png" alt=""/>'],
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
