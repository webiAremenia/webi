import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule, HttpClient} from '@angular/common/http';
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
import {PagesComponent} from './components/pages/pages/pages.component';
import {RouterModule, RouterStateSnapshot} from '@angular/router';


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
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule {
}
