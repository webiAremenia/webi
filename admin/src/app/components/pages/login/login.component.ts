import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';
import * as decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msg: String;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  myLogin() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.msg = data['msg'];
      if (data['success']) {
        const token = data['token'];
        const tokenPayload = decode(token);
        localStorage.setItem('jwt_token', data['token']);
        localStorage.setItem('email', tokenPayload.email);
        this.router.navigate(['admin/portfolio']);
      } else {
        this.router.navigate(['login']);
      }
    }, (err) => {
      localStorage.clear();
      this.router.navigate(['login']);
    });
    this.loginForm.reset();
  }
}
