import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Team} from '../../../../_models/Team';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {
  team: Team;
  language: String = 'en';
  done: boolean;
  delete: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.team) {
      this.router.navigate(['admin/team']);
    }
  }

  ngOnInit() {
    this.team = this.itemService.team;
    this.done = true;

  }

  updateTeam(team) {
    this.itemService.team = team;
    this.router.navigate(['admin/team/edit']);
  }

  ok() {
    this.router.navigate(['admin/team']);
  }

  deleteTeam(team, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete === true) {
      this.dataService.delete('team', team._id).subscribe(data => {
        if (data['success']) {
          this.router.navigate(['admin/team']);
        } else {
          console.log('DAta ', data);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }
}
