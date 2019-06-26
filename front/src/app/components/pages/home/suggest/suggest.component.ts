import {Component, ElementRef, OnDestroy, OnInit, AfterContentChecked} from '@angular/core';
import {SettingService} from '../../../_services/setting.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../../_services/scroll.service';

@Component({
    selector: 'app-suggest',
    templateUrl: './suggest.component.html',
    styleUrls: ['./suggest.component.css'],
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
export class SuggestComponent implements OnInit, OnDestroy {
    title;
    state = 'hide';
    stateSubscription: Subscription;


    constructor(
        private scrollService: ScrollService,
        private  settingsService: SettingService,
        private el: ElementRef) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => this.state = animation.suggest
        );
    }

    componentHeight() {
        return this.el.nativeElement.offsetTop;
    }

    ngOnInit() {
        this.title = this.settingsService.getValueByKeyLanguage('home-suggest-title', 'en');
    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }

}
