import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardCreateComponent} from './card-create/card-create.component';
import {CardListComponent} from './card-list/card-list.component';
import {CardRoutingModule} from './card-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import { CardEditComponent } from './card-edit/card-edit.component';
import { CardViewComponent } from './card-view/card-view.component';

@NgModule({
    declarations: [
        CardCreateComponent,
        CardListComponent,
        CardEditComponent,
        CardViewComponent
    ],
    imports: [
        CommonModule,
        CardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ColorPickerModule
    ]
})
export class CardModule {
}
