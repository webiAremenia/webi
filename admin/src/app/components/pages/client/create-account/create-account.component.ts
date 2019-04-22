import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ClientService} from '../../../../_services/client.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

    accountForm;

    constructor(
        private service: ClientService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {

        this.accountForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            nikName: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            status: ['', defaultStatus = null]
        });
    }

    sendForm() {
        this.service.addAccount(this.accountForm.value).subscribe(
            d => {
                if (d['success']) {
                    this.router.navigate(['admin/client']);
                }
            },
            e => console.log(e.status)
        );
    }

}
