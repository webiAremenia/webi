import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from './client.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {EditAccountComponent} from './edit-account/edit-account.component';





const routes: Routes = [
  {path: '', component: ClientComponent},
  {path: 'create', component: CreateAccountComponent},
  {path: 'edit', component: EditAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
