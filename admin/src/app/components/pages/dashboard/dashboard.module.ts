import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {HeaderComponent} from "../../partials/header/header.component";
import {SideNavComponent} from "../../partials/side-nav/side-nav.component";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
})
export class DashboardModule { }
