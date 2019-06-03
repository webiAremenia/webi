import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LanguageListComponent} from './language-list/language-list.component';
import {LanguageCreateComponent} from './language-create/language-create.component';
import {LanguageEditComponent} from './language-edit/language-edit.component';
import {LanguageViewComponent} from './language-view/language-view.component';


const routes: Routes = [
  {path: '', component: LanguageListComponent},
  {path: 'create', component: LanguageCreateComponent},
  {path: 'edit', component: LanguageEditComponent},
  {path: ':id', component: LanguageViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule {
}
