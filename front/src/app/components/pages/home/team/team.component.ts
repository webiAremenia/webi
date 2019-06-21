import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../../_services/team.service';
import {Team} from '../../../_models/team';
import {SettingService} from '../../../_services/setting.service';
import {Globals} from '../../../../app.globals';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, AfterViewInit {
    visible = true;
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
        this.visible = true;
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
        this.teamService.getAll().subscribe(
            data => {
                this.team = data;
                this.done = true;
            },
            err => console.log(err)
        );
    }
    ngAfterViewInit(): void {
        this.visible = true;
    }
}


