import { Component, OnInit } from '@angular/core';
import {SettingService} from '../../../_services/setting.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
    title;
    text;
  constructor(private  settingsService: SettingService) { }

  ngOnInit() {
      this.title = this.settingsService.getValueByKeyLanguage('home-process-title', 'en');
      this.text = this.settingsService.getValueByKeyLanguage('home-process-text', 'en');
  }

}
