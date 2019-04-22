import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


import {AppComponent} from './app.component';
import {TopMenuComponent} from './components/partials/top-menu/top-menu.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ContactComponent} from './components/pages/contact/contact.component';
import {AboutComponent} from './components/pages/about/about.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './components/partials/footer/footer.component';
import {PortfolioComponent} from './components/pages/portfolio/portfolio.component';
import {Globals} from './app.globals';
import {MessageComponent} from './components/partials/message/message.component';
import {RouterModule} from '@angular/router';
import {AllPortfoliosComponent} from './components/pages/portfolio/all-portfolios/all-portfolios.component';
import {ScrollSpyDirective} from './components/_directives/scroll-spy.directive';
import {IntroductionComponent} from './components/pages/home/introduction/introduction.component';
import {SidebarComponent} from './components/partials/sidebar/sidebar.component';
import {SliderComponent} from './components/partials/slider/slider.component';
import {TeamComponent} from './components/pages/home/team/team.component';
import {AllTeamComponent} from './components/pages/home/team/all-team/all-team.component';
import {BlogComponent} from './components/pages/blog/blog.component';
import {BlogDetailesComponent} from './components/pages/blog/blog-detailes/blog-detailes.component';
import {ProcessComponent} from './components/pages/home/process/process.component';
import {SuggestComponent} from './components/pages/home/suggest/suggest.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MultyTeamComponent} from './components/pages/home/team/multy-team/multy-team.component';
import {MultySuggestComponent} from './components/pages/home/suggest/multy-suggest/multy-suggest.component';
import {CabinetComponent} from './client/cabinet/cabinet.component';
import {LoginComponent} from './client/login/login.component';
import {TopMenuClientComponent} from './client/top-menu-client/top-menu-client.component';
import {ClientModule} from './client/client.module';
import {InterceptorService} from "./client/_services/interceptor.service";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        TopMenuComponent,
        HomeComponent,
        ContactComponent,
        AboutComponent,
        FooterComponent,
        PortfolioComponent,
        MessageComponent,
        AllPortfoliosComponent,
        ScrollSpyDirective,
        IntroductionComponent,
        SidebarComponent,
        SliderComponent,
        TeamComponent,
        AllTeamComponent,
        BlogComponent,
        BlogDetailesComponent,
        ProcessComponent,
        SuggestComponent,
        MultyTeamComponent,
        MultySuggestComponent,
        CabinetComponent,
        LoginComponent,
        TopMenuClientComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CarouselModule,
        FormsModule,
        ClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [Globals,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
