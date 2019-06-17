import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeamListComponent} from './team-list/team-list.component';
import {TeamCreateComponent} from './team-create/team-create.component';
import {TeamEditComponent} from './team-edit/team-edit.component';
import {TeamViewComponent} from './team-view/team-view.component';




const routes: Routes = [
  {path: '', component: TeamListComponent},
  {path: 'create', component: TeamCreateComponent},
  {path: 'edit', component: TeamEditComponent},
  {path: ':id', component: TeamViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {
}
