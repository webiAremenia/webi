import {Component, ElementRef, OnDestroy, OnInit, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../../../_services/scroll.service';

@Component({
    selector: 'app-multy-suggest',
    templateUrl: './multy-suggest.component.html',
    styleUrls: ['./multy-suggest.component.css'],
    animations: [
        trigger('scrollAnimation', [
            state('show', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            state('hide', style({
                opacity: 0,
                transform: 'translateY(-100%)'
            })),
            transition('show => hide', animate('700ms ease-out')),
            transition('hide => show', animate('700ms ease-in'))
        ])
    ]
})
export class MultySuggestComponent implements OnInit, OnDestroy {

    state = 'hide';
    stateSubscription: Subscription;

    constructor(private scrollService: ScrollService, private el: ElementRef) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => {
                if (animation.suggest) {
                    this.state = animation.suggest;
                }
            }
            );
        }

    ngOnInit() {
    }


    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }


}
