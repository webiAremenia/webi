import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../_services/team.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public messageService: TeamService) {
  }

  ngOnInit() {

  }

}
