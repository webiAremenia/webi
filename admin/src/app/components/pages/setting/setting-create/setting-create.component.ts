import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-setting-create',
  templateUrl: './setting-create.component.html',
  styleUrls: ['./setting-create.component.css']
})
export class SettingCreateComponent implements OnInit {
  settingForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;
  res: String = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.settingForm = this.formBuilder.group({
      key: ['', Validators.required],
      amValue: [''],
      ruValue: [''],
      enValue: ['', Validators.required],
    });

  }


  mySetting() {
    let form = {
      key : this.settingForm.get('key').value,
      value: {
        am: this.settingForm.get('amValue').value,
        ru: this.settingForm.get('ruValue').value,
        en: this.settingForm.get('enValue').value
      },
  };
    // const fd: any = new FormData();

    // fd.append('key', this.settingForm.get('key').value);
    // fd.append('value', JSON.stringify(value));

    this.dataService.sendData(form, 'setting').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/setting']);
      } else {
        this.res = data['msg'];
      }
    }, (err) => {
      console.log(err);
    });
    console.log('FOrm ', form);
  }

  changeLanguage(language) {
    this.language = language;
  }
}
