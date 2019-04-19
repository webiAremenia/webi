import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortfolioListComponent} from "./portfolio-list/portfolio-list.component";
import {PortfolioCreateComponent} from "./portfolio-create/portfolio-create.component";
import {PortfolioEditComponent} from "./portfolio-edit/portfolio-edit.component";
import {PortfolioViewComponent} from "./portfolio-view/portfolio-view.component";



const routes: Routes = [
  {path: '', component: PortfolioListComponent},
  {path: 'create', component: PortfolioCreateComponent},
  {path: 'edit', component: PortfolioEditComponent},
  {path: ':id', component: PortfolioViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {
}
