import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../../_services/team.service';
import {Team} from '../../../_models/team';
import {SettingService} from '../../../_services/setting.service';
import {Globals} from '../../../../app.globals';
import {Subscription} from 'rxjs';
import {ScrollService} from '../../../_services/scroll.service';
import {fadeInSacleAnimation} from '../../../_animations';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css'],
    animations: [fadeInSacleAnimation]

})
export class TeamComponent implements OnInit, OnDestroy {
    state = 'hide';
    stateSubscription: Subscription;

    visible = true;

    done = false;
    team: Team[];
    title;
    text;
    imageUrl;
    // @ts-ignore
    @ViewChild('btnImg', {static: false}) btnImg: ElementRef;

    constructor(
        private scrollService: ScrollService,
        private el: ElementRef,
        private teamService: TeamService,
        private  settingsService: SettingService,
        global: Globals
    ) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => {
                if (animation.team) {
                    this.state = animation.team;
                }
            }
        );
        this.imageUrl = global.imageUrl + 'team/';
    }

    componentHeight() {
        return this.el.nativeElement.offsetTop;
    }

    ngOnInit() {
        this.getTeam();
        this.title = this.settingsService.getValueByKeyLanguage('home-team-title', 'en');
        this.text = this.settingsService.getValueByKeyLanguage('home-team-text', 'en');
        this.visible = window.innerWidth >= 768; // Changed
    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }

    onClick() {
        this.visible = !this.visible;
        if (!this.visible) {
            this.btnImg.nativeElement.classList.add('btnImg');
        } else {
            this.btnImg.nativeElement.classList.remove('btnImg');
        }

    }

    getTeam() {
        this.team = this.teamService.allTeem || this.teamService.getAll().subscribe();
    }

}


