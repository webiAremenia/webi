import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    scrollAnimation = new Subject<any>();

    constructor() {
    }

    getScrollAnimation() {
        return this.scrollAnimation.asObservable();
    }

    setScrollAnimation(e) {
        const data = {
            introduction: e.introduction,
            slider: e.slider,
            process: e.process,
            portfolio: e.portfolio,
            suggest: e.suggest,
            team: e.team
        };
        this.scrollAnimation.next(data);
    }
}
