import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../_services/team.service';
import {Team} from '../../../_models/team';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
    visible = true;
    done = false;
    team: Team[];

    constructor(private teamService: TeamService) {
    }

    ngOnInit() {
        this.getTeam();
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


