import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../../../_services/scroll.service';
import {fadeInXAnimation} from '../../../../_animations';

@Component({
    selector: 'app-multy-suggest',
    templateUrl: './multy-suggest.component.html',
    styleUrls: ['./multy-suggest.component.css'],
    animations: [fadeInXAnimation]
})
export class MultySuggestComponent implements OnInit, OnDestroy {

    state = 'hide';
    stateSubscription: Subscription;

    constructor(private scrollService: ScrollService) {
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
