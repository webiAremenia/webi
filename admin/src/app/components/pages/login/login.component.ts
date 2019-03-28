import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msg: String;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  myLogin() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      console.log('Data ', data);
      this.msg = data['msg'];

      if (data['success']) {
        localStorage.setItem('jwt_token', data['token']);
        localStorage.setItem('email', data['email']);
        this.router.navigate(['admin/portfolio']);
      } else {
        this.router.navigate(['login']);
      }
    });
    this.loginForm.reset()
  }
}
