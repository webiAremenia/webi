import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {CategoryViewComponent} from './category-view/category-view.component';


const CATEGORY_ROUTES: Routes = [
  {path: '', component: CategoryListComponent},
  {path: 'create', component: CategoryCreateComponent},
  {path: 'edit', component: CategoryEditComponent},
  {path: ':id', component: CategoryViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(CATEGORY_ROUTES)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
