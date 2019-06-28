import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../_services/contact.service';

@Component({
    selector: 'app-ecomerce',
    templateUrl: './ecomerce.component.html',
    styleUrls: ['./ecomerce.component.scss']
})
export class EcomerceComponent implements OnInit {

    myForm: FormGroup;
    imageUrl = 'assets/images/test/';
    emailPattern = '^[a-z0-9._%+-]{5,15}@[a-z0-9.-]+\.[a-z]{2,4}$';


    constructor(
        private fb: FormBuilder,
        private contactService: ContactService
    ) {
        this.myForm = fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            phone: ['', [Validators.required]],
            companyName: ['', [Validators.required]]
        });
    }

    ngOnInit() {
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
