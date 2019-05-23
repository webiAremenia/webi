import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ContactService} from '../../_services/contact.service';
import {SettingService} from '../../_services/setting.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    myForm: FormGroup;
    data;
    phone;
    Email;
    address;
    emailPattern = '^[a-z0-9._%+-]{5,15}@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor(private formBuilder: FormBuilder, private contact: ContactService,
                private  settingsService: SettingService) {
        this.myForm = formBuilder.group({

            firstName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            message: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    ngOnInit() {
        this.phone = this.settingsService.getValueByKeyLanguage('footer-phone', 'en');
        this.Email = this.settingsService.getValueByKeyLanguage('footer-email', 'en');
        this.address = this.settingsService.getValueByKeyLanguage('footer-address', 'en');
    }

    submit() {
        this.contact.sendEmail(this.myForm.value).subscribe(
            data => {
                if (data.success) {
                    this.resetForm();
                }

            },
            e => console.log(e)
        );
    }

    resetForm() {
        this.myForm.reset();
    }
}
