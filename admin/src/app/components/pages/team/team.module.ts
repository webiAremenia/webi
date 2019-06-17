import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxTreeDndModule} from 'ngx-tree-dnd';

import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {TeamRoutingModule} from './team-routing.module';
import {TeamListComponent} from './team-list/team-list.component';
import {TeamCreateComponent} from './team-create/team-create.component';
import {TeamEditComponent} from './team-edit/team-edit.component';
import {TeamViewComponent} from './team-view/team-view.component';
import {SortablejsModule} from 'angular-sortablejs';


@NgModule({
  declarations: [
    TeamListComponent,
    TeamCreateComponent,
    TeamEditComponent,
    TeamViewComponent

  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTreeDndModule,
    CKEditorModule,
    SortablejsModule.forRoot({animation: 150}),
  ],
})
export class TeamModule {
}
