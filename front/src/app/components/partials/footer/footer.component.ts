import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {ContactService} from '../../_services/contact.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    myForm: FormGroup;
    data;
    constructor(private formBuilder: FormBuilder, private contact: ContactService) {
        this.myForm = formBuilder.group({

            "firstName": ["", [Validators.required]],
            "email": ["", [Validators.required, Validators.email]],
            "message": ["", [Validators.required, Validators.minLength(10)]],

        });
    }

    ngOnInit() {

    }

    submit() {
        this.contact.sendEmail(this.myForm.value);
        // console.log(this.myForm);
    }
}
