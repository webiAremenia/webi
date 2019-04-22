import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../_services/login.service';
import * as decode from 'jwt-decode';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    myForm: FormGroup;
    returnUrl: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private service: LoginService
    ) {
        this.returnUrl = this.service.returnUrl;
    }

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    submit() {
        this.service.login(this.myForm.value).subscribe(
            data => {
                if (data['success']) {
                    const token = data['token'];
                    const tokenPayload = decode(token);
                    localStorage.setItem('client-token', data['token']);
                    localStorage.setItem('client', tokenPayload.firstName + ' ' + tokenPayload.lastName);
                    this.router.navigate([this.returnUrl]);
                    console.log(tokenPayload);
                } else {
                    this.router.navigate(['login']);
                }
            }, (err) => {
                localStorage.clear();
                this.router.navigate(['login']);
            });
    }

}
