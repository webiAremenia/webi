import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../../_services/team.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Globals} from '../../../../../app.globals';

@Component({
    selector: 'app-multy-team',
    templateUrl: './multy-team.component.html',
    styleUrls: ['./multy-team.component.css']
})
export class MultyTeamComponent implements OnInit {
    team: any;
    teams;
    imageUrl;
    currentLanguge = 'en';

    constructor(private service: TeamService, private ngbModal: NgbModal, global: Globals) {
        this.imageUrl = global.imageUrl + 'team/';
    }

    ngOnInit() {
        this.service.getAll().subscribe(data => {
            this.teams = data;
            console.log(this.teams);
            this.teams = this.teams.slice(0, 6);
        });


    }

    onClick(team: any, modal) {
        this.team = team;
        this.ngbModal.open(modal);
    }

}
