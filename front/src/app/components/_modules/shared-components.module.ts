import {NgModule} from '@angular/core';
import {TopMenuComponent} from '../partials/top-menu/top-menu.component';
import {FooterComponent} from '../partials/footer/footer.component';
import {MultySuggestComponent} from '../pages/home/suggest/multy-suggest/multy-suggest.component';
import {MultyTeamComponent} from '../pages/home/team/multy-team/multy-team.component';
import {SliderComponent} from '../partials/slider/slider.component';
import {SidebarComponent} from '../partials/sidebar/sidebar.component';
import {SharedModule} from './shared.module';

@NgModule({
    declarations: [
        TopMenuComponent,
        FooterComponent,
        SidebarComponent,
        SliderComponent,
        MultyTeamComponent,
        MultySuggestComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        TopMenuComponent,
        FooterComponent,
        SidebarComponent,
        SliderComponent,
        MultyTeamComponent,
        MultySuggestComponent
    ]
})
export class SharedComponentsModule {
}
