import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    scrollAnimation = new Subject<any>();
    data = null;

    constructor() {
    }

    setComponentsHeight(e) {
        this.data = e;
    }

    // // // Scroll Animation // // //

    getScrollAnimation() {
        return this.scrollAnimation.asObservable();
    }

    setScrollAnimation(e) {
        const data = {
            introduction: e.introduction,
            slider: e.slider,
            process: e.process,
            portfolio: e.portfolio,
            technology: e.technology,
            suggest: e.suggest,
            team: e.team
        };
        this.scrollAnimation.next(data);
    }
}
