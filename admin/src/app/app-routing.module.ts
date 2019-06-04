import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/pages/login/login.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: '', redirectTo: '/admin/portfolio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
