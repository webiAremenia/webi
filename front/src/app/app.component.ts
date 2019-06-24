import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SettingService} from './components/_services/setting.service';
import {TeamService} from "./components/_services/team.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'webiFront';
    done = false;
    done2 = false;

    constructor(
        private translate: TranslateService,
        private settings: SettingService,
        private teamService: TeamService
    ) {
        settings.getAll().subscribe(
            d => {
                this.done = true;
            }
        );
        teamService.getAll().subscribe(
            d => {
                this.done2 = true;
            }
        );
        translate.setDefaultLang('en');
        this.translate.currentLang = 'en';
    }

}


