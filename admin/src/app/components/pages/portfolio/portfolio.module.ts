import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PortfolioListComponent} from "./portfolio-list/portfolio-list.component";
import {PortfolioCreateComponent} from "./portfolio-create/portfolio-create.component";
import {PortfolioEditComponent} from "./portfolio-edit/portfolio-edit.component";
import {PortfolioViewComponent} from "./portfolio-view/portfolio-view.component";
import {PortfolioRoutingModule} from "./portfolio-routing.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";



@NgModule({
  declarations: [
    PortfolioListComponent,
    PortfolioCreateComponent,
    PortfolioEditComponent,
    PortfolioViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortfolioRoutingModule,
    CKEditorModule,
  ],
})
export class PortfolioModule { }
