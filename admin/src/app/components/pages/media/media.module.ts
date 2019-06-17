import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MediaListComponent} from './media-list/media-list.component';
import {MediaCreateComponent} from './media-create/media-create.component';
import {MediaViewComponent} from './media-view/media-view.component';
import {MediaEditComponent} from './media-edit/media-edit.component';
import {MediaRoutingModule} from './media-routing.module';


@NgModule({
  declarations: [
    MediaListComponent,
    MediaCreateComponent,
    MediaEditComponent,
    MediaViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MediaRoutingModule
  ],
})
export class MediaModule {
}
