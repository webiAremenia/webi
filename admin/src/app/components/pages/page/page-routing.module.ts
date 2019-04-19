import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageListComponent} from "./page-list/page-list.component";
import {PageCreateComponent} from "./page-create/page-create.component";
import {PageEditComponent} from "./page-edit/page-edit.component";
import {PageViewComponent} from "./page-view/page-view.component";




const routes: Routes = [
  {path: '', component: PageListComponent},
  {path: 'create', component: PageCreateComponent},
  {path: 'edit', component: PageEditComponent},
  {path: ':id', component: PageViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {
}
