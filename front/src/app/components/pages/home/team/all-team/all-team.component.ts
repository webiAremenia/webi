import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../../_services/team.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-team',
  templateUrl: './all-team.component.html',
  styleUrls: ['./all-team.component.css']
})
export class AllTeamComponent implements OnInit {
  team: any;
  teams;


  constructor(private service: TeamService, private ngbModal: NgbModal) {
  }

  ngOnInit() {
    this.teams = this.service.allTeem || this.service.getAll().subscribe();
  }

  onClick(team: any, modal) {
    this.team = team;
    this.ngbModal.open(modal);
  }

}
