import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EcomerceComponent} from './ecomerce.component';

const routes: Routes = [
    {path: '', component: EcomerceComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class EcomerceRoutingModule {
}
