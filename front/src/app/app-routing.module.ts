import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';



import {HomeComponent} from './components/pages/home/home.component';
import { AllTeamComponent } from './components/pages/pages/team/all-team/all-team.component';
import { BlogComponent } from './components/pages/pages/blog/blog.component';
import { BlogDetailesComponent } from './components/pages/pages/blog/blog-detailes/blog-detailes.component';
import { AllPortfoliosComponent } from './components/pages/portfolio/all-portfolios/all-portfolios.component';

// import {ContactComponent} from './pages/contact/contact.component';






const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'allTeam', component: AllTeamComponent},
  {path: 'blog', component: BlogComponent},
  // {path: 'contact', component: ContactComponent},
  {path: 'allPortfolios', component: AllPortfoliosComponent},
  {path: 'blog/:id', component: BlogDetailesComponent}
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})


export class AppRoutingModule {
}
