import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from "./client.component";
import {CreateAccountComponent} from "./create-account/create-account.component";





const routes: Routes = [
  {path: '', component: ClientComponent},
  {path: 'create', component: CreateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
