import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MenuCreateComponent} from './menu-create/menu-create.component';
import {MenuEditComponent} from './menu-edit/menu-edit.component';
import {MenuViewComponent} from './menu-view/menu-view.component';
import {MenuSortComponent} from './menu-sort/menu-sort.component';
import {MenuRoutingModule} from './menu-routing.module';
import {NgxTreeDndModule} from 'ngx-tree-dnd';


@NgModule({
  declarations: [
    MenuListComponent,
    MenuCreateComponent,
    MenuEditComponent,
    MenuViewComponent,
    MenuSortComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTreeDndModule,

  ],
})
export class MenuModule {
}
