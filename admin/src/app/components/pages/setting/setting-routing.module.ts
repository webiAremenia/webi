import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SettingListComponent} from "./setting-list/setting-list.component";
import {SettingCreateComponent} from "./setting-create/setting-create.component";
import {SettingEditComponent} from "./setting-edit/setting-edit.component";
import {SettingViewComponent} from "./setting-view/setting-view.component";


 const routes: Routes = [
  {path: '', component: SettingListComponent},
  {path: 'create', component: SettingCreateComponent},
  {path: 'edit', component: SettingEditComponent},
  {path: ':id', component: SettingViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}
