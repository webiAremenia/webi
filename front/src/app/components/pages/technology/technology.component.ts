import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../_services/scroll.service';

@Component({
    selector: 'app-technology',
    templateUrl: './technology.component.html',
    styleUrls: ['./technology.component.css'],
    animations: [
        trigger('scrollAnimation', [
            state('show', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            state('hide', style({
                opacity: 0,
                transform: 'translateX(-100%)'
            })),
            transition('show => hide', animate('700ms ease-out')),
            transition('hide => show', animate('700ms ease-in'))
        ])
    ]
})
export class TechnologyComponent implements OnInit, OnDestroy {
    state = 'hide';
    stateSubscription: Subscription;
    icons =
        [
            {img: 'Jira.png', title: 'JIRA'},
            {img: 'JavaScript.png', title: 'Javascript'},
            {img: 'Java.png', title: 'Java'},
            {img: 'React.png', title: 'React'},
            {img: 'Cordova.png', title: 'Cordova'},
            {img: 'Xamarin.png', title: 'Xamarin'},
            {img: 'Android.png', title: 'Android'},
            {img: 'IOS.png', title: 'IOS'},
            {img: 'PostgresQL.png', title: 'PostgresQL'},
            {img: 'MySQL.png', title: 'MySQL'},
            {img: 'MS SQL-Server.png', title: 'MS SQL-Server'},
            {img: 'Python.png', title: 'Python'},
            {img: 'NodeJS.png', title: 'NodeJS'},
            {img: 'PHP.png', title: 'PHP'},
            {img: 'Ruby-on-Rails.png', title: 'Ruby-on-Rails'},
            {img: 'Net-Core.png', title: 'Net-Core'},
            {img: 'Firebase.png', title: 'Firebase'},
            {img: 'CSS3.png', title: 'CSS3'},
            {img: 'HTML5.png', title: 'HTML'},
            {img: 'Polymer.png', title: 'Polymer'},
            {img: 'Appium-1.png', title: 'Appium'},
            {img: 'Adobe-CC.png', title: 'Adobe-CC'},
            {img: 'InVision.png', title: 'InVision'},
            {img: 'Sketch.png', title: 'Sketch'}
        ];


    constructor(
        private scrollService: ScrollService,
        private el: ElementRef) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => {
                if (animation.technology) {
                    this.state = animation.technology;
                }
            }
        );
    }

    componentHeight() {
        return this.el.nativeElement.offsetTop;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }

}
