import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
    visible=true;
  constructor() {
  }

  ngOnInit() {
  }
  onClick()
  {
   this.visible = !this.visible;
  }
}


