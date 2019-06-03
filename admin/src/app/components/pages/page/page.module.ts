import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxTreeDndModule} from 'ngx-tree-dnd';
import {PageRoutingModule} from './page-routing.module';
import {PageListComponent} from './page-list/page-list.component';
import {PageCreateComponent} from './page-create/page-create.component';
import {PageViewComponent} from './page-view/page-view.component';
import {PageEditComponent} from './page-edit/page-edit.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    PageListComponent,
    PageCreateComponent,
    PageViewComponent,
    PageEditComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTreeDndModule,
    CKEditorModule,

  ],
})
export class PageModule {
}
