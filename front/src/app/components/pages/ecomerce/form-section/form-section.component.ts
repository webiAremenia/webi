import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../_services/contact.service';

@Component({
    selector: 'app-form-section',
    templateUrl: './form-section.component.html',
    styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit {
    isCustom = false;

    myForm: FormGroup;
    url = 'assets/images/test/undraw_businessman_97x4.svg';
    emailPattern = '^[a-z0-9._%+-]{5,15}@[a-z0-9.-]+\.[a-z]{2,4}$';

    @Input() formSectionHeading: string;

    constructor( private fb: FormBuilder, private contactService: ContactService) {
        this.myForm = fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            phone: ['', [Validators.required]],
            companyName: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        if (this.formSectionHeading ===
            'Our expertise is in setting up, customizing and developing your brand new or ongoing Shopify eCommerce shop') {
            this.isCustom = true;
        }
    }

    sendData() {
        this.contactService.sendECommerceEmail(this.myForm.value).subscribe(
            d => {
                if (d['success']) {
                    this.myForm.reset();
                }
            },
            e => console.log(e)
        );
    }

}
