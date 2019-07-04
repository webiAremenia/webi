import {Component, ElementRef, OnDestroy, OnInit, HostListener} from '@angular/core';
import {SettingService} from '../../../_services/setting.service';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../../_services/scroll.service';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss'],
    animations: [fadeInXAnimation]
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
