import {NgModule} from '@angular/core';
import {IntroductionComponent} from './introduction/introduction.component';
import {ProcessComponent} from './process/process.component';
import {SuggestComponent} from './suggest/suggest.component';
import {TeamComponent} from './team/team.component';
import {PortfolioComponent} from '../portfolio/portfolio.component';
import {TechnologyComponent} from '../technology/technology.component';
import {SharedComponentsModule, SharedModule} from '../../_modules';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';

@NgModule({
    declarations: [
        HomeComponent,
        IntroductionComponent,
        ProcessComponent,
        PortfolioComponent,
        TechnologyComponent,
        SuggestComponent,
        TeamComponent,
    ],
    imports: [
        SharedModule,
        SharedComponentsModule,
        HomeRoutingModule,
    ],
    exports: [
        HomeComponent,
        IntroductionComponent,
        ProcessComponent,
        PortfolioComponent,
        TechnologyComponent,
        SuggestComponent,
        TeamComponent,
    ]
})
export class HomeModule {
}
