import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import { EcomerceRoutingModule } from './ecomerce-routing.module';

import { EcomerceComponent } from './ecomerce.component';
import { FormSectionComponent } from './form-section/form-section.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { EcomerceSliderComponent } from './ecomerce-slider/ecomerce-slider.component';
import { DescriptionComponent } from './description/description.component';
import { CardsTypeOneComponent } from './cards-type-one/cards-type-one.component';
import { CardsTypeTwoComponent } from './cards-type-two/cards-type-two.component';
import { CardsTypeThreeComponent } from './cards-type-three/cards-type-three.component';
import {SharedModule} from '../../_modules';

@NgModule({
    declarations: [
        EcomerceComponent,
        FormSectionComponent,
        TestimonialsComponent,
        EcomerceSliderComponent,
        DescriptionComponent,
        CardsTypeOneComponent,
        CardsTypeTwoComponent,
        CardsTypeThreeComponent
    ],
    imports: [
        CommonModule,
        EcomerceRoutingModule,
        SharedModule
    ]
})
export class EcomerceModule {
}
