import {Component, OnInit} from '@angular/core';
import {SettingService} from '../../../_services/setting.service';

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

    title = '';
    text = '';

    constructor(private  settingsService: SettingService) {
    }

    ngOnInit() {
        this.title = this.settingsService.getValueByKeyLanguage('home-introduction-title', 'en');
        this.text = this.settingsService.getValueByKeyLanguage('home-introduction-text', 'en');

    }


}


