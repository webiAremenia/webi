import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../../_services/data.service';
import {Setting} from '../../../../_models/Setting';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.css']
})
export class SettingListComponent implements OnInit {
  delete: any;
  searchTerm: String;
  settings : Setting[];
  constructor(private router : Router, private dataService: DataService, private itemService : ItemService) { }

  ngOnInit() {
    this.dataService.getData('setting').subscribe(data => {
      console.log('Data ', data);
      this.settings = data['settings'];
      // console.log('ALt ', this.settings[0]);
    });
  }

  // deleteSetting(setting,i) {
  //   this.delete = confirm('Are you want to delete?');
  //   if (this.delete == true) {
  //     this.dataService.delete('setting', setting._id).subscribe(data => {
  //       console.log('Data ', data);
  //
  //       if (data['success']) {
  //         this.settings.splice(i, 1);
  //       } else {
  //         this.router.navigate(['login']);
  //       }
  //     });
  //   }
  // }

  updateSetting(setting) {
    this.itemService.setting = setting;
    this.router.navigate(['admin/setting/edit']);
  }

  viewSetting(setting) {
    this.itemService.setting = setting;
  }
}
