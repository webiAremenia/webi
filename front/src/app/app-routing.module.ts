import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {AllTeamComponent} from './components/pages/home/team/all-team/all-team.component';
import {BlogComponent} from './components/pages/blog/blog.component';
import {BlogDetailesComponent} from './components/pages/blog/blog-detailes/blog-detailes.component';
import {AllPortfoliosComponent} from './components/pages/portfolio/all-portfolios/all-portfolios.component';
import {PortfolioDetailesComponent} from './components/pages/portfolio/portfolio-detailes/portfolio-detailes.component';


const routes: Routes = [
    // {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: '', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule)},
    {path: 'allTeam', component: AllTeamComponent},
    {path: 'blog', component: BlogComponent, pathMatch: 'full'},
    {path: 'allPortfolios', component: AllPortfoliosComponent, pathMatch: 'full'},
    {path: 'blog/:id', component: BlogDetailesComponent},
    {path: 'portfolio/:id', component: PortfolioDetailesComponent},
    {path: 'ecommerce', loadChildren: () => import('./components/pages/ecomerce//ecomerce.module').then(m => m.EcomerceModule)}
];


@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})


export class AppRoutingModule {
}
