import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {Setting} from '../../../../_models/Setting';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
  styleUrls: ['./setting-edit.component.css']
})
export class SettingEditComponent implements OnInit {
  settingForm: FormGroup;
  setting: Setting;
  language: String = 'en';
  done: boolean;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
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

    this.settingForm = this.formBuilder.group({
      amValue: [this.setting['value'].am],
      ruValue: [this.setting['value'].ru],
      enValue: [this.setting['value'].en, Validators.required]
    });
  }


  changeLanguage(language) {
    this.language = language;
  }

  mySetting() {
    let form = {
      value: {
        am: this.settingForm.controls.amValue.value,
        ru: this.settingForm.controls.ruValue.value,
        en: this.settingForm.controls.enValue.value,
      }
    };
    this.dataService.updateData(form, 'setting', this.setting._id).subscribe(data => {
      console.log('DAta ', data);
      if (data['success']) {
        this.router.navigate(['admin/setting']);
      }
    });
    console.log('FOrm ', form);
  }


}
