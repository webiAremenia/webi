import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Team} from '../../../../_models/Team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[];
  delete: any;
  searchTerm: String;
  options;
  personsArr: any[];

  constructor(private dataService: DataService, private router: Router, private itemService: ItemService) {
  }

  ngOnInit() {
    this.dataService.getData('team').subscribe(data => {
      this.teams = data['teams'];
    },(err)=>{
      console.log(err);
    });
    let arr = [];
    // [this.teams[event.newIndex], this.teams[event.oldIndex]] = [this.teams[event.oldIndex], this.teams[event.newIndex]];

    this.options = {
      onUpdate: (event: any) => {
        arr = [];
        this.teams.forEach(person=>{
          arr.push(person._id)
        });

        this.personsArr = arr;
      }
    };

  }


  deleteTeam(team, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('team', team._id).subscribe(data => {
        if (data['success']) {
          this.teams.splice(i, 1);
        } else {
          this.router.navigate(['login']);
        }
      },(err)=>{
        console.log(err);
      });
    }
  }

  updateTeam(team) {
    this.itemService.team = team;
    this.router.navigate(['admin/team/edit']);
  }


  viewTeam(team) {
    this.itemService.team = team;
  }

  save() {
    if (this.personsArr) {
      this.dataService.teamUpdate(this.personsArr, 'team').subscribe(data => {
        console.log(data);
      },(err)=>{
        console.log(err);
      });
      this.personsArr.length = 0;
    }
  }

}
