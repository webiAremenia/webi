import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorService} from './_services/interceptor.service';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {SideNavComponent} from './components/partials/side-nav/side-nav.component';
import {PortfolioListComponent} from './components/pages/portfolio/portfolio-list/portfolio-list.component';
import {PortfolioCreateComponent} from './components/pages/portfolio/portfolio-create/portfolio-create.component';
import {PortfolioEditComponent} from './components/pages/portfolio/portfolio-edit/portfolio-edit.component';
import {TitleFilterPipe} from './_pipes/title-filter.pipe';
import {PortfolioViewComponent} from './components/pages/portfolio/portfolio-view/portfolio-view.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { HeaderComponent } from './components/partials/header/header.component';
import { MediaListComponent } from './components/pages/media/media-list/media-list.component';
import { MediaCreateComponent } from './components/pages/media/media-create/media-create.component';
import { MediaViewComponent } from './components/pages/media/media-view/media-view.component';
import { MediaEditComponent } from './components/pages/media/media-edit/media-edit.component';
import { SettingListComponent } from './components/pages/setting/setting-list/setting-list.component';
import { SettingViewComponent } from './components/pages/setting/setting-view/setting-view.component';
import { SettingEditComponent } from './components/pages/setting/setting-edit/setting-edit.component';
import { SettingCreateComponent } from './components/pages/setting/setting-create/setting-create.component';
import { PageListComponent } from './components/pages/page/page-list/page-list.component';
import { PageViewComponent } from './components/pages/page/page-view/page-view.component';
import { PageEditComponent } from './components/pages/page/page-edit/page-edit.component';
import { PageCreateComponent } from './components/pages/page/page-create/page-create.component';
import { TeamListComponent } from './components/pages/team/team-list/team-list.component';
import { TeamViewComponent } from './components/pages/team/team-view/team-view.component';
import { TeamCreateComponent } from './components/pages/team/team-create/team-create.component';
import { TeamEditComponent } from './components/pages/team/team-edit/team-edit.component';
import {SortablejsModule} from 'angular-sortablejs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideNavComponent,
    PortfolioListComponent,
    PortfolioCreateComponent,
    PortfolioEditComponent,
    TitleFilterPipe,
    PortfolioViewComponent,
    HeaderComponent,
    MediaListComponent,
    MediaCreateComponent,
    MediaViewComponent,
    MediaEditComponent,
    SettingListComponent,
    SettingViewComponent,
    SettingEditComponent,
    SettingCreateComponent,
    PageListComponent,
    PageViewComponent,
    PageEditComponent,
    PageCreateComponent,
    TeamListComponent,
    TeamViewComponent,
    TeamCreateComponent,
    TeamEditComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    SortablejsModule.forRoot({ animation: 150 }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
