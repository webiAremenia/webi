import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SettingService} from './components/_services/setting.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'webiFront';
    done = false;

    constructor(
        private translate: TranslateService,
        private settings: SettingService
    ) {
        settings.getAll().subscribe(
            d => {
                this.done = true;
            }
        );
        translate.setDefaultLang('en');
        this.translate.currentLang = 'en';
    }

}


