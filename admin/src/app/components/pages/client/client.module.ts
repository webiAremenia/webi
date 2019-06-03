import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxTreeDndModule} from 'ngx-tree-dnd';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

@NgModule({
  declarations: [
    ClientComponent,
    CreateAccountComponent,
    EditAccountComponent

  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTreeDndModule,
    CKEditorModule,

  ],
})
export class ClientModule {
}
