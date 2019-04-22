import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../_services/client.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

    accountForm;
    client;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private service: ClientService
    ) {
    }

    ngOnInit() {
        this.client = this.service.updateClient;

        this.accountForm = this.formBuilder.group({
            firstName: [this.client ? this.client.firstName : '', [Validators.required]],
            lastName: [this.client ? this.client.lastName : '', [Validators.required]],
            nikName: [this.client ? this.client.nikName : '', [Validators.required]],
            email: [this.client ? this.client.email : '', [Validators.email, Validators.required]],
            status: [this.client ? this.client.status : '', defaultStatus = null]
        });
    }

    updateClient() {
        this.service.updateAccount(this.client.id, this.accountForm.value).subscribe(
            d => console.log(d),
            e => console.log(e)
        );
    }

    sendPass() {
        this.service.sendPass(this.client.id).subscribe(
            d => console.log(d),
            e => console.log(e)
        );
    }

}

//
// .subscribe(
//     d => {
//       if (d['success']) {
//         this.router.navigate(['admin/client']);
//       }
//     },
//     e => console.log(e.status)
// );
