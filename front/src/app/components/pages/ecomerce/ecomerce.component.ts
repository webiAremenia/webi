import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CardsTypeOneComponent} from './cards-type-one/cards-type-one.component';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {EcomerceSliderComponent} from './ecomerce-slider/ecomerce-slider.component';
import {CardsTypeThreeComponent} from './cards-type-three/cards-type-three.component';
import {CardsTypeTwoComponent} from './cards-type-two/cards-type-two.component';
import {FormSectionComponent} from './form-section/form-section.component';
import {DescriptionComponent} from './description/description.component';

@Component({
    selector: 'app-ecomerce',
    templateUrl: './ecomerce.component.html',
    styleUrls: ['./ecomerce.component.scss'],
})
export class EcomerceComponent implements OnInit, AfterViewInit {

    // @ts-ignore
    @ViewChild(CardsTypeOneComponent, {static: false})
    private cardsTypeOneComponent: CardsTypeOneComponent;

    // @ts-ignore
    @ViewChild(CardsTypeThreeComponent, {static: false})
    private cardsTypeThreeComponent: CardsTypeThreeComponent;

    // @ts-ignore
    @ViewChild(CardsTypeTwoComponent, {static: false})
    private cardsTypeTwoComponent: CardsTypeTwoComponent;

    // @ts-ignore
    @ViewChild(DescriptionComponent, {static: false})
    private descriptionComponent: DescriptionComponent;

    // @ts-ignore
    @ViewChild(EcomerceSliderComponent, {static: false})
    private ecomerceSliderComponent: EcomerceSliderComponent;

    // @ts-ignore
    @ViewChild(FormSectionComponent, {static: false})
    private formSectionComponent: FormSectionComponent;

    // @ts-ignore
    @ViewChild(TestimonialsComponent, {static: false})
    private testimonialsComponent: TestimonialsComponent;

    firstFormSectionHeading = 'Our expertise is in setting up, customizing and developing your brand new or ongoing Shopify eCommerce shop';
    secondFormSectionHeading = 'Ready to get started?';

    firstCardsSectionHeading = 'Our Services help eCommerce Merchants Grow';
    secondCardsSectionHeading = 'Shopify development plans';

    firstDescriptionSectionHeading = 'Who is WEBI?';
    secondDescriptionSectionHeading = 'Why WEBI';
    thirdDescriptionSectionHeading = 'Shopify Certified Partner';

    firstText = 'We are Full-Stack eCommerce developers. Our head office is located inYerevan, Armenia with a branch developing in Kazan,' +
        'Russia. The unique economic realities in the regions we’re located in enable us to develop highly talented technical' +
        'teams in a cost-effective manner.';
    firstTextAdditional = 'We’ve built a reputation on stepping in and helping solve customer headaches where others' +
        'have fallen short. Our' +
        'support staff is always online and our experienced project managers will work with you to ensure that you receive' +
        'adequate attention and help to meet your business objectives.';
    secondText = 'We successfully accompanied dozens of eCommerce business.' +
        'We don’t look at the budget or complexity, just we are here to help you.';

    thirdText = 'We are officially certified for Shopify theme customization and App Development. This empowers us to go forward' +
        ' as a complete full stack eCommerce team. Let’s give a try!';


    constructor() {
    }

    ngOnInit() {
        scrollTo(0, 0);
    }

    ngAfterViewInit() {
    }

}
