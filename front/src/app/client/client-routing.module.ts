import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CabinetComponent} from "./cabinet/cabinet.component";
import {AuthGuard} from "./_guards/auth.guard";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
    {path: 'cabinet/:nik', component: CabinetComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {

}
