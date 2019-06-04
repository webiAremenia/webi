import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxTreeDndModule} from 'ngx-tree-dnd';

import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NewsListComponent} from './news-list/news-list.component';
import {NewsCreateComponent} from './news-create/news-create.component';
import {NewsEditComponent} from './news-edit/news-edit.component';
import {NewsViewComponent} from './news-view/news-view.component';
import {NewsRoutingModule} from './news-routing.module';


@NgModule({
  declarations: [
    NewsListComponent,
    NewsCreateComponent,
    NewsEditComponent,
    NewsViewComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTreeDndModule,
    CKEditorModule,

  ],
})
export class NewsModule {
}
