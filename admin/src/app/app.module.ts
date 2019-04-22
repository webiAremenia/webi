import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {InterceptorService} from './_services/interceptor.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgSelectModule} from '@ng-select/ng-select';
import {DashboardModule} from './components/pages/dashboard/dashboard.module';
import {Globals} from './app.globals';
import {FullNameFilterPipe} from './_pipes/full-name-filter.pipe';
import {TitleDescriptionFilterPipe} from './_pipes/title-description-filter.pipe';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@NgModule({
    declarations: [
        FullNameFilterPipe,
        TitleDescriptionFilterPipe,
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DashboardModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // TranslateModule.forRoot({
        //   loader: {
        //     provide: TranslateLoader,
        //     useFactory: HttpLoaderFactory,
        //     deps: [HttpClient]
        //   }
        // }),
        NgSelectModule
    ],
    providers: [
        Globals,
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
