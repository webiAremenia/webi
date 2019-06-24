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
        if (this.service.allTeem) {
            this.teams = this.service.allTeem;
            this.teams = this.teams.slice(2, 8);
        } else {
            this.service.getAll().subscribe(data => {
                this.teams = data;
                this.teams = this.teams.slice(2, 8);
            });
        }
    }

    onClick(team: any, modal) {
        this.team = team;
        this.ngbModal.open(modal);
    }

}
