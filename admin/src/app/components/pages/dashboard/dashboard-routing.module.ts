import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: 'admin', component: DashboardComponent, children: [
      {path: 'setting', loadChildren: '../setting/setting.module#SettingModule'},
      {path: 'category', loadChildren: '../category/category.module#CategoryModule'},
      {path: 'language', loadChildren: '../language/language.module#LanguageModule'},
      {path: 'media', loadChildren: '../media/media.module#MediaModule'},
      {path: 'menu', loadChildren: '../menu/menu.module#MenuModule'},
      {path: 'portfolio', loadChildren: '../portfolio/portfolio.module#PortfolioModule'},
      {path: 'page', loadChildren: '../page/page.module#PageModule'},
      {path: 'news', loadChildren: '../news/news.module#NewsModule'},
      {path: 'team', loadChildren: '../team/team.module#TeamModule'},
      {path: 'client', loadChildren: '../client/client.module#ClientModule'},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
