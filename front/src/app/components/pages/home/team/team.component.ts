import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../_services/team.service';
import {Team} from '../../../_models/team';
import {SettingService} from '../../../_services/setting.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
    visible = true;
    done = false;
    team: Team[];
    title;
    text;
    constructor(private teamService: TeamService,
                private  settingsService: SettingService
                ) {
    }

    ngOnInit() {
        this.getTeam();
        this.title = this.settingsService.getValueByKeyLanguage('home-team-title', 'en');
        this.text = this.settingsService.getValueByKeyLanguage('home-team-text', 'en');
    }

    onClick() {
        this.visible = !this.visible;
    }

    getTeam() {
        this.teamService.getAll().subscribe(
            data => {
                this.team = data;
                this.done = true;
                console.log(data);
            },
            err => console.log(err)
        );
    }
}


