import { Component, OnInit } from '@angular/core';
import {SettingService} from '../../../_services/setting.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {
    title;

  constructor(private  settingsService: SettingService) { }

  ngOnInit() {
      this.title = this.settingsService.getValueByKeyLanguage('home-suggest-title', 'en');

  }

}
