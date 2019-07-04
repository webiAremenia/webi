import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {SettingService} from '../../../_services/setting.service';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../../_services/scroll.service';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-suggest',
    templateUrl: './suggest.component.html',
    styleUrls: ['./suggest.component.css'],
    animations: [fadeInXAnimation]
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
            animation => {
                if (animation.suggest) {
                    this.state = animation.suggest;
                }
            }
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
