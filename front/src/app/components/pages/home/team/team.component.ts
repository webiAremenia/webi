import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../../_services/team.service';
import {Team} from '../../../_models/team';
import {SettingService} from '../../../_services/setting.service';
import {Globals} from '../../../../app.globals';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {Scroll} from '@angular/router';
import {ScrollService} from '../../../_services/scroll.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css'],
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
export class TeamComponent implements OnInit, AfterViewInit, OnDestroy {
    state = 'hide';
    stateSubscription: Subscription;

    visible = true;
    done = false;
    team: Team[];
    title;
    text;
    imageUrl;
    @ViewChild('btnImg', {static: false}) btnImg: ElementRef;

    constructor(
        private scrollService: ScrollService,
        private el: ElementRef,
        private teamService: TeamService,
        private  settingsService: SettingService,
        global: Globals
    ) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => this.state = animation.team
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
        this.visible = true;
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

    ngAfterViewInit(): void {
        this.visible = true;
    }
}


