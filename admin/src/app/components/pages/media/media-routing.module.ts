import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MediaListComponent} from "./media-list/media-list.component";
import {MediaCreateComponent} from "./media-create/media-create.component";
import {MediaEditComponent} from "./media-edit/media-edit.component";
import {MediaViewComponent} from "./media-view/media-view.component";


 const routes: Routes = [
  {path: '', component: MediaListComponent},
  {path: 'create', component: MediaCreateComponent},
  {path: 'edit', component: MediaEditComponent},
  {path: ':id', component: MediaViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule {
}
