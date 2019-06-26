import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../../_services/team.service';
import {Team} from '../../../_models/team';
import {SettingService} from '../../../_services/setting.service';
import {Globals} from '../../../../app.globals';
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, AfterViewInit {
    visible: boolean;
    done = false;
    team: Team[];
    title;
    text;
    imageUrl;
    @ViewChild('btnImg') btnImg: ElementRef;

    constructor(
        private teamService: TeamService,
        private  settingsService: SettingService,
        global: Globals
    ) {
        this.imageUrl = global.imageUrl + 'team/';
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


