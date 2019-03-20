import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './components/pages/about/about.component';
import {ContactComponent} from './components/pages/contact/contact.component';
import {HomeComponent} from './components/pages/home/home.component';
import {PagesComponent} from './components/pages/pages/pages.component';
import {AuthGuard} from './components/_guards/auth.guard';
import {PortfolioComponent} from './components/pages/portfolio/portfolio.component';


// const pageRoutes: Routes = [
//   {path: 'detail', component: PageDetailComponent}
// ];

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'pages', component: PagesComponent},
  {path: 'portfolio', component: PortfolioComponent},
  // {path: 'pages/:id', component: PageDetailComponent},
  // {path: 'pages/:id', component: PageDetailComponent, children: pageRoutes},
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})


export class AppRoutingModule {
}
