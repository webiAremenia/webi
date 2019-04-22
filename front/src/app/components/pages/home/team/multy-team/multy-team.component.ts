import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../../_services/team.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-multy-team',
    templateUrl: './multy-team.component.html',
    styleUrls: ['./multy-team.component.css']
})
export class MultyTeamComponent implements OnInit {
    team: any;
    teams;

    constructor(private service: TeamService, private ngbModal: NgbModal) {
    }

    ngOnInit() {
        this.teams = this.service.getTeam();
        this.teams = this.teams.slice(0, 6);

    }

    onClick(team: any, modal) {
        this.team = team;
        this.ngbModal.open(modal);
    }

}
