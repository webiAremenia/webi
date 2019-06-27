import {Component, ElementRef, OnDestroy, OnInit, HostListener} from '@angular/core';
import {SettingService} from '../../../_services/setting.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../../_services/scroll.service';

@Component({
    selector: 'app-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss'],
    animations: [
        trigger('scrollAnimation', [
            state('show', style({
                // opacity: 1,
                transform: 'translateX(0)'
            })),
            state('hide', style({
                // opacity: 0,
                transform: 'translateX(-100%)'
            })),
            transition('show => hide', animate('700ms ease-out')),
            transition('hide => show', animate('700ms ease-in'))
        ])
    ]
})
export class ProcessComponent implements OnInit, OnDestroy {
    title;
    text;
    state = 'hide';
    stateSubscription: Subscription;


    constructor(
        private scrollService: ScrollService,
        private settingsService: SettingService,
        private el: ElementRef) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => {
                if (animation.process) {
                    this.state = animation.process;
                }
            }
        );
    }

    componentHeight() {
        return this.el.nativeElement.offsetTop;
    }

    ngOnInit() {
        this.title = this.settingsService.getValueByKeyLanguage('home-process-title', 'en');
        this.text = this.settingsService.getValueByKeyLanguage('home-process-text', 'en');
    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }

}
