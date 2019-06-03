import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingListComponent} from './setting-list/setting-list.component';
import {SettingEditComponent} from './setting-edit/setting-edit.component';
import {SettingViewComponent} from './setting-view/setting-view.component';
import {SettingCreateComponent} from './setting-create/setting-create.component';
import {SettingRoutingModule} from './setting-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NameFilterPipe} from '../../../_pipes/name-filter.pipe';


@NgModule({
  declarations: [
    SettingListComponent,
    SettingEditComponent,
    SettingViewComponent,
    SettingCreateComponent,
    NameFilterPipe
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SettingModule {
}
