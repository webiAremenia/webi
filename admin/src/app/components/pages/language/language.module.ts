import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LanguageListComponent} from './language-list/language-list.component';
import {LanguageCreateComponent} from './language-create/language-create.component';
import {LanguageEditComponent} from './language-edit/language-edit.component';
import {LanguageViewComponent} from './language-view/language-view.component';
import {LanguageRoutingModule} from './language-routing.module';
import {KeyFilterPipe} from '../../../_pipes/key-filter.pipe';


@NgModule({
  declarations: [
    LanguageListComponent,
    LanguageCreateComponent,
    LanguageEditComponent,
    LanguageViewComponent,
    KeyFilterPipe
  ],
  imports: [
    CommonModule,
    LanguageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class LanguageModule {
}
