import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/pages/login/login.component';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {AuthGuard} from './_guards/auth.guard';
import {PortfolioListComponent} from './components/pages/portfolio/portfolio-list/portfolio-list.component';
import {PortfolioCreateComponent} from './components/pages/portfolio/portfolio-create/portfolio-create.component';
import {PortfolioEditComponent} from './components/pages/portfolio/portfolio-edit/portfolio-edit.component';
import {PortfolioViewComponent} from './components/pages/portfolio/portfolio-view/portfolio-view.component';
import {MediaListComponent} from './components/pages/media/media-list/media-list.component';
import {MediaCreateComponent} from './components/pages/media/media-create/media-create.component';
import {MediaEditComponent} from './components/pages/media/media-edit/media-edit.component';
import {MediaViewComponent} from './components/pages/media/media-view/media-view.component';
import {SettingListComponent} from './components/pages/setting/setting-list/setting-list.component';
import {SettingCreateComponent} from './components/pages/setting/setting-create/setting-create.component';
import {SettingEditComponent} from './components/pages/setting/setting-edit/setting-edit.component';
import {SettingViewComponent} from './components/pages/setting/setting-view/setting-view.component';
import {PageListComponent} from './components/pages/page/page-list/page-list.component';
import {PageCreateComponent} from './components/pages/page/page-create/page-create.component';
import {PageEditComponent} from './components/pages/page/page-edit/page-edit.component';
import {PageViewComponent} from './components/pages/page/page-view/page-view.component';
import {TeamListComponent} from './components/pages/team/team-list/team-list.component';
import {TeamCreateComponent} from './components/pages/team/team-create/team-create.component';
import {TeamEditComponent} from './components/pages/team/team-edit/team-edit.component';
import {TeamViewComponent} from './components/pages/team/team-view/team-view.component';
import {CategoryListComponent} from './components/pages/category/category-list/category-list.component';
import {CategoryCreateComponent} from './components/pages/category/category-create/category-create.component';
import {CategoryEditComponent} from './components/pages/category/category-edit/category-edit.component';
import {CategoryViewComponent} from './components/pages/category/category-view/category-view.component';
import {MenuListComponent} from './components/pages/menu/menu-list/menu-list.component';
import {MenuCreateComponent} from './components/pages/menu/menu-create/menu-create.component';
import {MenuEditComponent} from './components/pages/menu/menu-edit/menu-edit.component';
import {MenuViewComponent} from './components/pages/menu/menu-view/menu-view.component';
import {MenuSortComponent} from './components/pages/menu/menu-sort/menu-sort.component';
import {LanguageListComponent} from './components/pages/language/language-list/language-list.component';
import {LanguageCreateComponent} from './components/pages/language/language-create/language-create.component';
import {LanguageEditComponent} from './components/pages/language/language-edit/language-edit.component';
import {LanguageViewComponent} from './components/pages/language/language-view/language-view.component';
import {NewsListComponent} from './components/pages/news/news-list/news-list.component';
import {NewsCreateComponent} from './components/pages/news/news-create/news-create.component';
import {NewsEditComponent} from './components/pages/news/news-edit/news-edit.component';
import {NewsViewComponent} from './components/pages/news/news-view/news-view.component';
import {ClientComponent} from './components/client/client.component';
import {CreateAccountComponent} from "./components/client/create-account/create-account.component";


const dashboardRoutes: Routes = [
  {path: 'portfolio', component: PortfolioListComponent},
  {path: 'portfolio/create', component: PortfolioCreateComponent},
  {path: 'portfolio/edit', component: PortfolioEditComponent},
  {path: 'portfolio/:id', component: PortfolioViewComponent},

  {path: 'media', component: MediaListComponent},
  {path: 'media/create', component: MediaCreateComponent},
  {path: 'media/edit', component: MediaEditComponent},
  {path: 'media/:id', component: MediaViewComponent},

  {path: 'setting', component: SettingListComponent},
  {path: 'setting/create', component: SettingCreateComponent},
  {path: 'setting/edit', component: SettingEditComponent},
  {path: 'setting/:id', component: SettingViewComponent},

  {path: 'page', component: PageListComponent},
  {path: 'page/create', component: PageCreateComponent},
  {path: 'page/edit', component: PageEditComponent},
  {path: 'page/:id', component: PageViewComponent},

  {path: 'team', component: TeamListComponent},
  {path: 'team/create', component: TeamCreateComponent},
  {path: 'team/edit', component: TeamEditComponent},
  {path: 'team/:id', component: TeamViewComponent},

  {path: 'category', component: CategoryListComponent},
  {path: 'category/create', component: CategoryCreateComponent},
  {path: 'category/edit', component: CategoryEditComponent},
  {path: 'category/:id', component: CategoryViewComponent},

  {path: 'menu', component: MenuListComponent},
  {path: 'menu/create', component: MenuCreateComponent},
  {path: 'menu/sort', component: MenuSortComponent},
  {path: 'menu/edit', component: MenuEditComponent},
  {path: 'menu/:id', component: MenuViewComponent},

  {path: 'language', component: LanguageListComponent},
  {path: 'language/create', component: LanguageCreateComponent},
  {path: 'language/edit', component: LanguageEditComponent},
  {path: 'language/:id', component: LanguageViewComponent},

  {path: 'news', component: NewsListComponent},
  {path: 'news/create', component: NewsCreateComponent},
  {path: 'news/edit', component: NewsEditComponent},
  {path: 'news/:id', component: NewsViewComponent},

  {path: 'client', component: ClientComponent},
  {path: 'client/create', component: CreateAccountComponent},

];


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', canActivate: [AuthGuard], component: DashboardComponent, children: dashboardRoutes},
  {path: '', redirectTo: '/admin/portfolio', pathMatch: 'full'},
  // {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
