import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSectionComponent} from './form-section/form-section.component';
import {EcomerceComponent} from './ecomerce.component';
import {CardsTypeOneComponent} from './cards-type-one/cards-type-one.component';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import { EcomerceSliderComponent } from './ecomerce-slider/ecomerce-slider.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { DescriptionComponent } from './description/description.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CardsTypeTwoComponent } from './cards-type-two/cards-type-two.component';
import { CardsTypeThreeComponent } from './cards-type-three/cards-type-three.component';

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
        CarouselModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        EcomerceComponent,
        FormSectionComponent,
        TestimonialsComponent,
        EcomerceSliderComponent,
        DescriptionComponent,
        CardsTypeOneComponent,
        CardsTypeTwoComponent,
        CardsTypeThreeComponent
    ]
})
export class EcomerceModule {
}
