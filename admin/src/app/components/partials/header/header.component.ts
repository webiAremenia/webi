import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email : String;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
  }

  myLogout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
