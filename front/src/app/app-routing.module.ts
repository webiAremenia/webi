import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {HomeComponent} from './components/pages/home/home.component';
import {AllTeamComponent} from './components/pages/home/team/all-team/all-team.component';
import {BlogComponent} from './components/pages/blog/blog.component';
import {BlogDetailesComponent} from './components/pages/blog/blog-detailes/blog-detailes.component';
import {AllPortfoliosComponent} from './components/pages/portfolio/all-portfolios/all-portfolios.component';





const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'allTeam', component: AllTeamComponent},
    {path: 'blog', component: BlogComponent, pathMatch: 'full'},
    {path: 'allPortfolios', component: AllPortfoliosComponent, pathMatch: 'full'},
    {path: 'blog/:id', component: BlogDetailesComponent}
];


@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})


export class AppRoutingModule {
}
