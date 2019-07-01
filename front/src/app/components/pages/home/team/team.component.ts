import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener} from '@angular/core';
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
                transform: 'scale(1)'
                // opacity: 1,
                // transform: 'translateX(0)'
            })),
            state('hide', style({
                transform: 'scale(0)'
                // opacity: 0,
                // transform: 'translateX(-100%)'
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
        if (window.innerWidth < 768) {
            this.visible = false;
        } else {
            this.visible = true;
        }
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

    }
}


