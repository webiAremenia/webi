import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss'],
    animations: [fadeInXAnimation]
})
export class DescriptionComponent implements OnInit {
    state = 'hide';

    @Input() descriptionHeading;
    @Input() descriptionText;
    @Input() descriptionTextAdditional;
    @Input() descriptionButton;

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
