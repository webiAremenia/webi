import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-ecomerce',
    templateUrl: './ecomerce.component.html',
    styleUrls: ['./ecomerce.component.scss']
})
export class EcomerceComponent implements OnInit {
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
    }

}
