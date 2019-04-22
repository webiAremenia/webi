import {Component, OnInit} from '@angular/core';
import {LoginService} from '../_services/login.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-top-menu-client',
    templateUrl: './top-menu-client.component.html',
    styleUrls: ['./top-menu-client.component.css']
})
export class TopMenuClientComponent implements OnInit {
    myForm: FormGroup;
    dropMenu = true;
    client;
    passHidden = true;

    constructor(
        private service: LoginService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.client = localStorage.getItem('client');
        this.myForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    addMenu() {
        this.dropMenu = !this.dropMenu;
    }

    logout() {
        LoginService.logout();
        this.router.navigate(['/']);
    }

    openForm() {
        this.dropMenu = true;
        this.passHidden = !this.passHidden;
    }

    changePass() {
        this.service.changePass(this.myForm.value).subscribe(
            d => {
                if (d) {
                    this.myForm.reset();
                    this.passHidden = true;
                }
            },
            e => console.log(e)
        );
    }
}
