import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MenuListComponent} from "./menu-list/menu-list.component";
import {MenuCreateComponent} from "./menu-create/menu-create.component";
import {MenuEditComponent} from "./menu-edit/menu-edit.component";
import {MenuViewComponent} from "./menu-view/menu-view.component";
import {MenuSortComponent} from "./menu-sort/menu-sort.component";


 const routes: Routes = [
  {path: '', component: MenuListComponent},
  {path: 'create', component: MenuCreateComponent},
  {path: 'edit', component: MenuEditComponent},
  {path: 'sort', component: MenuSortComponent},
  {path: ':id', component: MenuViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {
}
