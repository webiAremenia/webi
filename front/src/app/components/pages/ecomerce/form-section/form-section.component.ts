import {Component, OnInit, Input, ElementRef, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../_services/contact.service';
import {fadeInXAnimation} from '../../../_animations';

@Component({
    selector: 'app-form-section',
    templateUrl: './form-section.component.html',
    styleUrls: ['./form-section.component.scss'],
    animations: [fadeInXAnimation]
})
export class FormSectionComponent implements OnInit {
    isCustom = false;
    state = 'hide';

    myForm: FormGroup;
    url = 'assets/images/test/undraw_businessman_97x4.svg';
    emailPattern = '^[a-z0-9._%+-]{5,15}@[a-z0-9.-]+\.[a-z]{2,4}$';

    @Input() formSectionHeading: string;

    constructor( private fb: FormBuilder, private contactService: ContactService, private el: ElementRef) {
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

    @HostListener('window:scroll', ['$event']) checkScroll() {
        const scrollPosition = Math.ceil(window.pageYOffset + (document.documentElement.clientHeight / 2));
        if (scrollPosition > this.el.nativeElement.offsetTop) {
            this.state = 'show';
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
