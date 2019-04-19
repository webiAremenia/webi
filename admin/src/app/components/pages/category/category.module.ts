import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryViewComponent} from "./category-view/category-view.component";
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {CategoryEditComponent} from "./category-edit/category-edit.component";
import {CategoryRoutingModule} from "./category-routing.module";



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryViewComponent,
    CategoryCreateComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule
  ],
})
export class CategoryModule { }
