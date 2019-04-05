import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {Setting} from '../../../../_models/Setting';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.css']
})
export class SettingViewComponent implements OnInit {
  setting : Setting;
  language: String = 'en';
  done: boolean;
  delete: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService : ItemService) {
    if (!this.itemService.setting) {
      this.router.navigate(['admin/setting']);
    }
  }

  ngOnInit() {
    // this.dataService.getOne('setting', localStorage.getItem('settingItem')).subscribe(data => {
    //   console.log('Data ', data);
    //   this.setting = data['setting'];
    //   this.done = true;
    //   console.log('Setting ', this.setting);
    // });
    this.setting = this.itemService.setting;
    this.done = true;
  }

  updateSetting(setting) {
    this.itemService.setting = setting;
    this.router.navigate(['admin/setting/edit']);
  }

  ok() {
    this.router.navigate(['admin/setting']);
  }


}
