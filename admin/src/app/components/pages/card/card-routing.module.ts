import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CardCreateComponent} from './card-create/card-create.component';
import {CardListComponent} from './card-list/card-list.component';
import {CardEditComponent} from './card-edit/card-edit.component';
import {CardViewComponent} from './card-view/card-view.component';


const CARD_ROUTES: Routes = [
    {path: '', component: CardListComponent},
    {path: 'create', component: CardCreateComponent},
    {path: 'edit', component: CardEditComponent},
    {path: ':id', component: CardViewComponent},
];

@NgModule({
    imports: [RouterModule.forChild(CARD_ROUTES)],
    exports: [RouterModule]
})
export class CardRoutingModule {
}
